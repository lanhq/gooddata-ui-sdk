// (C) 2007-2019 GoodData Corporation
import {
    dualAxesLabelFormatter,
    removeDecimal,
    roundNumber,
    formatValueInShallowRange,
} from "../dualAxesLabelFormatter";
import { ISeriesItem } from "../../../../../../interfaces/Config";
import { VisualizationTypes } from "../../../../../../constants/visualizationTypes";

describe("dual axes label format", () => {
    it("test remove decimal", () => {
        let value = removeDecimal("1");
        expect(value).toEqual("1");

        value = removeDecimal("1.1");
        expect(value).toEqual("1.1");

        value = removeDecimal("1.1111");
        expect(value).toEqual("1.1");

        value = removeDecimal("11");
        expect(value).toEqual("11");

        value = removeDecimal("11.1111");
        expect(value).toEqual("11.1");

        value = removeDecimal("111.1111");
        expect(value).toEqual("111.1");

        value = removeDecimal("1111.1111");
        expect(value).toEqual("1111");
    });

    describe("test format value in shallow range", () => {
        it("min=0, max=1", () => {
            const min = 0;
            const max = 1;
            let value = formatValueInShallowRange(0.39375000000000004, min, max);
            expect(value).toEqual(0.39);

            value = formatValueInShallowRange(0.525, min, max);
            expect(value).toEqual(0.52);

            value = formatValueInShallowRange(0.7, min, max);
            expect(value).toEqual(0.7);
        });

        it("min=0, max=0.1", () => {
            const min = 0;
            const max = 0.1;
            let value = formatValueInShallowRange(0.0125, min, max);
            expect(value).toEqual(0.012);

            value = formatValueInShallowRange(0.037500000000000006, min, max);
            expect(value).toEqual(0.037);

            value = formatValueInShallowRange(0.1, min, max);
            expect(value).toEqual(0.1);
        });

        it("min=0, max=0.001", () => {
            const min = 0;
            const max = 0.001;
            let value = formatValueInShallowRange(0.000125, min, max);
            expect(value).toEqual(0.00012);

            value = formatValueInShallowRange(0.0005, min, max);
            expect(value).toEqual(0.0005);
        });

        it("min=11, max=12", () => {
            const min = 11;
            const max = 12;
            let value = formatValueInShallowRange(11.39375000000000004, min, max);
            expect(value).toEqual(11.39);

            value = formatValueInShallowRange(11.525, min, max);
            expect(value).toEqual(11.52);

            value = formatValueInShallowRange(11.7, min, max);
            expect(value).toEqual(11.7);
        });

        it("should format number lower than 1 in exponential notation", () => {
            const min = 0;
            const max = 1;

            let value = formatValueInShallowRange(1.3877787807814457e-16, min, max);
            expect(value).toEqual(0);

            value = formatValueInShallowRange(1.3877787807814457e-16, min, max);
            expect(value).toEqual(0);
        });

        it("should format number greater than 1 in exponential notation", () => {
            const exponentialNumber = 1.3877787807814457e16;
            const min = exponentialNumber - 1;
            const max = exponentialNumber + 1;

            let value = formatValueInShallowRange(exponentialNumber, min, max);
            expect(value).toEqual(13877787807814456);

            value = formatValueInShallowRange(exponentialNumber, min, max);
            expect(value).toEqual(13877787807814456);

            value = formatValueInShallowRange(exponentialNumber + 0.001, min, max);
            expect(value).toEqual(13877787807814456);

            value = formatValueInShallowRange(1.3877787807814457e10 + 0.001, min, max);
            expect(value).toEqual(13877787807.815456);
        });
    });

    describe("test round number", () => {
        it("(max - min) <= 100", () => {
            let value = roundNumber("1", -50, 50);
            expect(value).toEqual(1);

            value = roundNumber("1.1", -50, 50);
            expect(value).toEqual(1.1);

            value = roundNumber("11.1", -50, 50);
            expect(value).toEqual(11.1);

            value = roundNumber("111.1", -50, 50);
            expect(value).toEqual(111.1);
        });

        it("(max - min) <= 1000", () => {
            let value = roundNumber("500", -500, 500);
            expect(value).toEqual(500);

            value = roundNumber("1111.1", -500, 500);
            expect(value).toEqual(1100);
        });

        it("(max - min) <= 10000", () => {
            let value = roundNumber("12345", 0, 10000);
            expect(value).toEqual(12300);

            value = roundNumber("98765", 0, 10000);
            expect(value).toEqual(98800);
        });

        it("(max - min) <= 100000", () => {
            let value = roundNumber("123456", 0, 100000);
            expect(value).toEqual(123500);

            value = roundNumber("987654", 0, 100000);
            expect(value).toEqual(987700);
        });

        it("big number and small range", () => {
            let value = roundNumber("26123", 26000, 27000);
            expect(value).toEqual(26100);

            value = roundNumber("27999", 26000, 27000);
            expect(value).toEqual(28000);
        });
    });

    describe("dualAxesLabelFormatter", () => {
        const series: ISeriesItem[] = [];
        const tickPositions: number[] = [1, 2, 3, 4, 5];
        const data = {
            axis: {
                opposite: false,
                series,
                tickPositions,
                userOptions: { defaultFormat: "" },
                defaultLabelFormatter() {
                    return this.value + "";
                },
            },
            chart: { userOptions: { stackMeasuresToPercent: true } },
            value: 49,
        };

        it.each([["49", "#.###"], ["4900%", "#.###%"]])(
            "should return %s if format is %s",
            (expectedResult: string, format: string) => {
                const dualAxesLabelData = { ...data };
                dualAxesLabelData.axis.userOptions.defaultFormat = format;
                dualAxesLabelData.chart.userOptions.stackMeasuresToPercent = false;

                const result = dualAxesLabelFormatter.call(dualAxesLabelData);
                expect(result).toEqual(expectedResult);
            },
        );

        it.each([["49%", false], ["49", true]])(
            "should return %s if seriesInAxis > 0 and opposite is %s",
            (expectedResult: string, opposite: boolean) => {
                const dualAxesLabelData = { ...data };
                dualAxesLabelData.axis.userOptions.defaultFormat = "";
                dualAxesLabelData.chart.userOptions.stackMeasuresToPercent = true;
                dualAxesLabelData.axis.opposite = opposite;
                dualAxesLabelData.axis.series = [{}];

                const result = dualAxesLabelFormatter.call(dualAxesLabelData);
                expect(result).toEqual(expectedResult);
            },
        );

        it("should not format to pecent when chart type is line", () => {
            const dualAxesLabelData = { ...data };
            dualAxesLabelData.axis.userOptions.defaultFormat = "#.###";
            dualAxesLabelData.chart.userOptions.stackMeasuresToPercent = true;
            dualAxesLabelData.axis.series = [
                {
                    type: VisualizationTypes.LINE,
                },
            ];

            const result = dualAxesLabelFormatter.call(dualAxesLabelData);
            expect(result).toEqual("49");
        });
    });
});
