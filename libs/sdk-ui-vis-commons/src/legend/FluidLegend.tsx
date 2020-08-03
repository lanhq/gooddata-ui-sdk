// (C) 2007-2018 GoodData Corporation
import React from "react";
import cx from "classnames";
import noop from "lodash/noop";
import { LegendList } from "./LegendList";
import { calculateFluidLegend } from "./helpers";
import { IPushpinCategoryLegendItem } from "./types";

/**
 * @internal
 */
export interface IFluidLegendProps {
    containerWidth: number;
    series: IPushpinCategoryLegendItem[];
    enableBorderRadius?: boolean;
    onItemClick?(item: IPushpinCategoryLegendItem): void;
}

interface IFluidLegendState {
    showAll: boolean;
}

/**
 * @internal
 */
export class FluidLegend extends React.PureComponent<IFluidLegendProps, IFluidLegendState> {
    public state: IFluidLegendState = {
        showAll: false,
    };

    public toggleShowAll = (): void => {
        this.setState({
            showAll: !this.state.showAll,
        });
    };

    public renderSeries = (itemWidth: number, visibleItemsCount: number): React.ReactNode => {
        const { series, onItemClick = noop, enableBorderRadius } = this.props;

        const limit = this.state.showAll ? series.length : visibleItemsCount;
        const pagedSeries = series.slice(0, limit);

        return (
            <div className="series">
                <LegendList
                    enableBorderRadius={enableBorderRadius}
                    series={pagedSeries}
                    onItemClick={onItemClick}
                    width={itemWidth}
                />
            </div>
        );
    };

    public renderPaging = (): React.ReactNode => {
        const classes = cx("gd-button-link", "gd-button-icon-only", "paging-button", {
            "icon-chevron-up": this.state.showAll,
            "icon-chevron-down": !this.state.showAll,
        });
        return (
            <div className="paging">
                <button className={classes} onClick={this.toggleShowAll} />
            </div>
        );
    };

    public render(): React.ReactNode {
        const { series, containerWidth } = this.props;
        const { itemWidth, hasPaging, visibleItemsCount } = calculateFluidLegend(
            series.length,
            containerWidth,
        );
        return (
            <div className="viz-legend fluid">
                {this.renderSeries(itemWidth, visibleItemsCount)}
                {hasPaging && this.renderPaging()}
            </div>
        );
    }
}
