// (C) 2019 GoodData Corporation
import { GdcExecuteAFM as AFM } from "../GdcExecuteAFM";
import { InvalidInputTestCases } from "../../../__mocks__/typeGuards";

describe("GdcExecuteAFM", () => {
    const expressionFilter: AFM.CompatibilityFilter = {
        value: "MAQL",
    };
    const relativeDateFilter: AFM.CompatibilityFilter = {
        relativeDateFilter: {
            dataSet: {
                uri: "/gdc/mock/ds",
            },
            granularity: "gram",
            from: -10,
            to: 0,
        },
    };
    const absoluteDateFilter: AFM.CompatibilityFilter = {
        absoluteDateFilter: {
            dataSet: {
                uri: "/gdc/mock/ds",
            },
            from: "1",
            to: "2",
        },
    };
    const negativeAttributeFilter: AFM.CompatibilityFilter = {
        negativeAttributeFilter: {
            displayForm: {
                uri: "/gdc/mock/date",
            },
            notIn: ["/gdc/mock/attribute/value_1", "/gdc/mock/attribute/value_2"],
        },
    };
    const positiveAttributeFilter: AFM.CompatibilityFilter = {
        positiveAttributeFilter: {
            displayForm: {
                uri: "/gdc/mock/attribute",
            },
            in: ["/gdc/mock/attribute/value_1", "/gdc/mock/attribute/value_2"],
        },
    };
    const measureValueFilter: AFM.CompatibilityFilter = {
        measureValueFilter: {
            measure: {
                uri: "/gdc/mock/date",
            },
        },
    };
    const identifierObjectQualifier: AFM.ObjQualifier = {
        identifier: "id",
    };
    const uriObjectQualifier: AFM.ObjQualifier = {
        uri: "/gdc/mock/id",
    };
    const simpleMeasureDefinition: AFM.ISimpleMeasureDefinition = {
        measure: {
            item: {
                uri: "/gdc/mock/measure",
            },
        },
    };
    const arithmeticMeasureDefinition: AFM.IArithmeticMeasureDefinition = {
        arithmeticMeasure: {
            measureIdentifiers: ["/gdc/mock/measure"],
            operator: "sum",
        },
    };
    const popMeasureDefinition: AFM.IPopMeasureDefinition = {
        popMeasure: {
            measureIdentifier: "m1",
            popAttribute: {
                uri: "/gdc/mock/measure",
            },
        },
    };
    const previousPeriodMeasureDefinition: AFM.IPreviousPeriodMeasureDefinition = {
        previousPeriodMeasure: {
            measureIdentifier: "m1",
            dateDataSets: [
                {
                    dataSet: {
                        uri: "/gdc/mock/date",
                    },
                    periodsAgo: 1,
                },
            ],
        },
    };
    const attributeSortItem: AFM.IAttributeSortItem = {
        attributeSortItem: {
            direction: "asc",
            attributeIdentifier: "a1",
        },
    };
    const measureSortItem: AFM.IMeasureSortItem = {
        measureSortItem: {
            direction: "asc",
            locators: [
                {
                    measureLocatorItem: {
                        measureIdentifier: "m1",
                    },
                },
            ],
        },
    };
    const attributeLocatorItem: AFM.IAttributeLocatorItem = {
        attributeLocatorItem: {
            attributeIdentifier: "a1",
            element: "element",
        },
    };
    const measureLocatorItem: AFM.IMeasureLocatorItem = {
        measureLocatorItem: {
            measureIdentifier: "m1",
        },
    };

    describe("isDateFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "relative date filter", relativeDateFilter],
            [true, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isDateFilter(input)).toBe(expectedResult);
        });
    });

    describe("isRelativeDateFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isRelativeDateFilter(input)).toBe(expectedResult);
        });
    });

    describe("isAbsoluteDateFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [true, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isAbsoluteDateFilter(input)).toBe(expectedResult);
        });
    });

    describe("isAttributeFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [true, "positive attribute filter", positiveAttributeFilter],
            [true, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isAttributeFilter(input)).toBe(expectedResult);
        });
    });

    describe("isPositiveAttributeFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [true, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isPositiveAttributeFilter(input)).toBe(expectedResult);
        });
    });

    describe("isNegativeAttributeFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [true, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isNegativeAttributeFilter(input)).toBe(expectedResult);
        });
    });

    describe("isMeasureValueFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [false, "expression filter", expressionFilter],
            [true, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isMeasureValueFilter(input)).toBe(expectedResult);
        });
    });

    describe("isExpressionFilter", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "relative date filter", relativeDateFilter],
            [false, "absolute date filter", absoluteDateFilter],
            [false, "positive attribute filter", positiveAttributeFilter],
            [false, "negative attribute filter", negativeAttributeFilter],
            [true, "expression filter", expressionFilter],
            [false, "measure value filter", measureValueFilter],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isExpressionFilter(input)).toBe(expectedResult);
        });
    });

    const attributeElementsByRef = {
        uris: ["a", "b", "c"],
    };
    const valuesElementsByValue = {
        values: ["a", "b", "c"],
    };
    const valuesElementsArray = ["a", "b", "c"];

    describe("isAttributeElementsArray", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases.filter(testCase => testCase[1] !== "array"),
            [true, "empty array", []],
            [false, "attribute elements by ref", attributeElementsByRef],
            [false, "attribute elements by value", valuesElementsByValue],
            [true, "attribute elements array", valuesElementsArray],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isAttributeElementsArray(input)).toBe(expectedResult);
        });
    });

    describe("isAttributeElementsByRef", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "attribute elements by ref", attributeElementsByRef],
            [false, "attribute elements by value", valuesElementsByValue],
            [false, "attribute elements array", valuesElementsArray],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isAttributeElementsByRef(input)).toBe(expectedResult);
        });
    });

    describe("isAttributeElementsByValue", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "attribute elements by ref", attributeElementsByRef],
            [true, "attribute elements by value", valuesElementsByValue],
            [false, "attribute elements array", valuesElementsArray],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isAttributeElementsByValue(input)).toBe(expectedResult);
        });
    });

    describe("isObjectUriQualifier", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "identifier object qualifier", identifierObjectQualifier],
            [true, "uri object qualifier", uriObjectQualifier],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isObjectUriQualifier(input)).toBe(expectedResult);
        });
    });

    describe("isObjIdentifierQualifier", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "identifier object qualifier", identifierObjectQualifier],
            [false, "uri object qualifier", uriObjectQualifier],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isObjIdentifierQualifier(input)).toBe(expectedResult);
        });
    });

    describe("isMeasureDefinition", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "simple measure definition", simpleMeasureDefinition],
            [false, "arithmetic measure definition", arithmeticMeasureDefinition],
            [false, "pop measure definition", popMeasureDefinition],
            [false, "previous period measure definition", previousPeriodMeasureDefinition],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isSimpleMeasureDefinition(input)).toBe(expectedResult);
        });
    });

    describe("isArithmeticMeasureDefinition", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "simple measure definition", simpleMeasureDefinition],
            [true, "arithmetic measure definition", arithmeticMeasureDefinition],
            [false, "pop measure definition", popMeasureDefinition],
            [false, "previous period measure definition", previousPeriodMeasureDefinition],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isArithmeticMeasureDefinition(input)).toBe(expectedResult);
        });
    });

    describe("isPopMeasureDefinition", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "simple measure definition", simpleMeasureDefinition],
            [false, "arithmetic measure definition", arithmeticMeasureDefinition],
            [true, "pop measure definition", popMeasureDefinition],
            [false, "previous period measure definition", previousPeriodMeasureDefinition],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isPopMeasureDefinition(input)).toBe(expectedResult);
        });
    });

    describe("isPreviousPeriodMeasureDefinition", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "simple measure definition", simpleMeasureDefinition],
            [false, "arithmetic measure definition", arithmeticMeasureDefinition],
            [false, "pop measure definition", popMeasureDefinition],
            [true, "previous period measure definition", previousPeriodMeasureDefinition],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isPreviousPeriodMeasureDefinition(input)).toBe(expectedResult);
        });
    });

    describe("isAttributeSortItem", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "attribute sort item", attributeSortItem],
            [false, "measure sort item", measureSortItem],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isAttributeSortItem(input)).toBe(expectedResult);
        });
    });

    describe("isMeasureSortItem", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "attribute sort item", attributeSortItem],
            [true, "measure sort item", measureSortItem],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isMeasureSortItem(input)).toBe(expectedResult);
        });
    });

    describe("isAttributeLocatorItem", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [true, "attribute locator item", attributeLocatorItem],
            [false, "measure locator item", measureLocatorItem],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isAttributeLocatorItem(input)).toBe(expectedResult);
        });
    });

    describe("isMeasureLocatorItem", () => {
        const Scenarios: Array<[boolean, string, any]> = [
            ...InvalidInputTestCases,
            [false, "attribute locator item", attributeLocatorItem],
            [true, "measure locator item", measureLocatorItem],
        ];

        it.each(Scenarios)("should return %s when input is %s", (expectedResult, _desc, input) => {
            expect(AFM.isMeasureLocatorItem(input)).toBe(expectedResult);
        });
    });
});