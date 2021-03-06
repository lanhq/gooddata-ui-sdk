## API Report File for "@gooddata/sdk-ui-pivot"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { IAnalyticalBackend } from '@gooddata/sdk-backend-spi';
import { IAttribute } from '@gooddata/sdk-model';
import { IAttributeOrMeasure } from '@gooddata/sdk-model';
import { Identifier } from '@gooddata/sdk-model';
import { IFilter } from '@gooddata/sdk-model';
import { IMeasureLocatorItem } from '@gooddata/sdk-model';
import { IPreparedExecution } from '@gooddata/sdk-backend-spi';
import { ISeparators } from '@gooddata/numberjs';
import { ISortItem } from '@gooddata/sdk-model';
import { ITotal } from '@gooddata/sdk-model';
import { IVisualizationCallbacks } from '@gooddata/sdk-ui';
import { IVisualizationProps } from '@gooddata/sdk-ui';
import { default as React_2 } from 'react';
import { WrappedComponentProps } from 'react-intl';

// @public (undocumented)
export type ColumnWidth = IAbsoluteColumnWidth | IAutoColumnWidth;

// @public (undocumented)
export type ColumnWidthItem = IAttributeColumnWidthItem | IMeasureColumnWidthItem | IAllMeasureColumnWidthItem | IWeakMeasureColumnWidthItem;

// @internal (undocumented)
export const CorePivotTable: React_2.FC<ICorePivotTableProps>;

// @public (undocumented)
export type DefaultColumnWidth = "viewport" | "unset";

// @public (undocumented)
export interface IAbsoluteColumnWidth {
    // (undocumented)
    allowGrowToFit?: boolean;
    // (undocumented)
    value: number;
}

// @public (undocumented)
export interface IAllMeasureColumnWidthItem {
    // (undocumented)
    measureColumnWidthItem: {
        width: IAbsoluteColumnWidth;
    };
}

// @public (undocumented)
export interface IAttributeColumnWidthItem {
    // (undocumented)
    attributeColumnWidthItem: {
        width: IAbsoluteColumnWidth;
        attributeIdentifier: Identifier;
    };
}

// @public (undocumented)
export interface IAutoColumnWidth {
    // (undocumented)
    value: "auto";
}

// @public (undocumented)
export interface IColumnSizing {
    columnWidths?: ColumnWidthItem[];
    defaultWidth?: DefaultColumnWidth;
    growToFit?: boolean;
}

// @internal (undocumented)
export interface ICorePivotTableProps extends IPivotTableBaseProps, WrappedComponentProps {
    // (undocumented)
    execution: IPreparedExecution;
}

// @public (undocumented)
export interface IMeasureColumnWidthItem {
    // (undocumented)
    measureColumnWidthItem: {
        width: ColumnWidth;
        locators: LocatorItem[];
    };
}

// @public (undocumented)
export interface IMenu {
    aggregations?: boolean;
    aggregationsSubMenu?: boolean;
}

// @public (undocumented)
export interface IPivotTableAttributeLocatorItem {
    // (undocumented)
    attributeLocatorItem: {
        attributeIdentifier: Identifier;
        element?: string;
    };
}

// @public (undocumented)
export interface IPivotTableBaseProps extends IVisualizationProps, IVisualizationCallbacks {
    config?: IPivotTableConfig;
    groupRows?: boolean;
    onColumnResized?: (columnWidths: ColumnWidthItem[]) => void;
    pageSize?: number;
}

// @public (undocumented)
export interface IPivotTableBucketProps {
    columns?: IAttribute[];
    filters?: IFilter[];
    measures?: IAttributeOrMeasure[];
    rows?: IAttribute[];
    sortBy?: ISortItem[];
    totals?: ITotal[];
}

// @public (undocumented)
export interface IPivotTableConfig {
    columnSizing?: IColumnSizing;
    maxHeight?: number;
    menu?: IMenu;
    separators?: ISeparators;
}

// @public (undocumented)
export interface IPivotTableProps extends IPivotTableBaseProps, IPivotTableBucketProps {
    backend?: IAnalyticalBackend;
    workspace?: string;
}

// @public (undocumented)
export function isAbsoluteColumnWidth(columnWidth: ColumnWidth): columnWidth is IAbsoluteColumnWidth;

// @public (undocumented)
export function isAllMeasureColumnWidthItem(columnWidthItem: ColumnWidthItem): columnWidthItem is IAllMeasureColumnWidthItem;

// @public (undocumented)
export function isAttributeColumnWidthItem(columnWidthItem: ColumnWidthItem): columnWidthItem is IAttributeColumnWidthItem;

// @public (undocumented)
export function isMeasureColumnWidthItem(columnWidthItem: ColumnWidthItem): columnWidthItem is IMeasureColumnWidthItem;

// @public (undocumented)
export function isWeakMeasureColumnWidthItem(columnWidthItem: ColumnWidthItem): columnWidthItem is IWeakMeasureColumnWidthItem;

// @public (undocumented)
export interface IWeakMeasureColumnWidthItem {
    // (undocumented)
    measureColumnWidthItem: {
        width: IAbsoluteColumnWidth;
        locator: IMeasureLocatorItem;
    };
}

// @public (undocumented)
export type LocatorItem = IPivotTableAttributeLocatorItem | IMeasureLocatorItem;

// @public
export const PivotTable: React_2.ComponentType<IPivotTableProps>;


// (No @packageDocumentation comment for this package)

```
