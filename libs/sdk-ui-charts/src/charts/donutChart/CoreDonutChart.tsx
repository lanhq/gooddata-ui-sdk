// (C) 2007-2018 GoodData Corporation
import React from "react";
import { ICoreChartProps } from "../../interfaces";
import { BaseChart } from "../_base/BaseChart";

export class CoreDonutChart extends React.PureComponent<ICoreChartProps> {
    public render(): React.ReactNode {
        return <BaseChart type="donut" {...this.props} />;
    }
}
