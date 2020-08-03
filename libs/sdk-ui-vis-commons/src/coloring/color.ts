// (C) 2007-2020 GoodData Corporation
import { IColor, IColorPalette, IColorPaletteItem, IRgbColorValue } from "@gooddata/sdk-model";
import { isAttributeDescriptor, isResultAttributeHeader } from "@gooddata/sdk-backend-spi";
import {
    DataViewFacade,
    DefaultColorPalette,
    getMappingHeaderLocalIdentifier,
    IHeaderPredicate,
    IHeaderPredicateContext,
    IMappingHeader,
} from "@gooddata/sdk-ui";
import { IColorMapping } from "./types";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";

/**
 * @internal
 */
function lighter(color: number, percent: number) {
    const t = percent < 0 ? 0 : 255;
    const p = Math.abs(percent);

    return Math.round((t - color) * p) + color;
}

/**
 * @internal
 */
function formatColor(red: number, green: number, blue: number) {
    return `rgb(${red},${green},${blue})`;
}

/**
 * @internal
 */
export function parseRGBColorCode(color: string): { R: number; G: number; B: number } {
    const f = color.split(",");
    const R = parseInt(f[0].slice(4), 10);
    const G = parseInt(f[1], 10);
    const B = parseInt(f[2], 10);
    return { R, G, B };
}

/**
 * Source:
 *     http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @internal
 */
export function getLighterColor(color: string, percent: number): string {
    const { R, G, B } = parseRGBColorCode(color);

    return formatColor(lighter(R, percent), lighter(G, percent), lighter(B, percent));
}

/**
 * @internal
 */
export function getLighterColorFromRGB(color: IRgbColorValue, percent: number): IRgbColorValue {
    const { r, g, b } = color;

    return {
        r: lighter(r, percent),
        g: lighter(g, percent),
        b: lighter(b, percent),
    };
}

/**
 * @internal
 */
export function normalizeColorToRGB(color: string): string {
    const hexPattern = /#([0-9A-F]{2})([0-9A-F]{2})([0-9A-F]{2})/i;
    return color.replace(hexPattern, (_prefix: string, r: string, g: string, b: string) => {
        return `rgb(${[r, g, b].map((value) => parseInt(value, 16).toString(10)).join(", ")})`;
    });
}

/**
 * @internal
 */
export function getColorPaletteFromColors(colors: string[]): IColorPalette {
    try {
        return colors.map((color: string, index: number) => {
            const { R, G, B } = parseRGBColorCode(normalizeColorToRGB(color));
            if (isNaN(R) || isNaN(G) || isNaN(B)) {
                throw Error;
            }
            return {
                guid: String(index),
                fill: {
                    r: R,
                    g: G,
                    b: B,
                },
            };
        });
    } catch (_ignored) {
        return DefaultColorPalette;
    }
}

/**
 * @internal
 */
export function getRgbString(color: IColorPaletteItem): string {
    return `rgb(${color.fill.r},${color.fill.g},${color.fill.b})`;
}

/**
 * @internal
 */
export function isCustomPalette(palette: IColorPalette): boolean {
    return !isEqual(palette, DefaultColorPalette);
}

/**
 * @internal
 */
export function getColorFromMapping(
    mappingHeader: IMappingHeader,
    colorMapping: IColorMapping[],
    dv: DataViewFacade,
): IColor | undefined {
    if (!colorMapping) {
        return undefined;
    }

    const mapping = colorMapping.find((item) => item.predicate(mappingHeader, { dv }));
    return mapping && mapping.color;
}

/**
 * @internal
 */
export function getColorByGuid(colorPalette: IColorPalette, guid: string, index: number): IRgbColorValue {
    const inPalette = colorPalette.find((item: any) => item.guid === guid);

    return inPalette ? inPalette.fill : colorPalette[index % colorPalette.length].fill;
}

/**
 * @internal
 */
export function getRgbStringFromRGB(color: IRgbColorValue): string {
    return `rgb(${color.r},${color.g},${color.b})`;
}

/**
 * Creates new predicate for mapping colors to chart entities:
 *
 * -  if attribute header, URI is expected to match testValue
 * -  otherwise (attr or measure descriptor) expecting local identifier match
 *
 * @param testValue - right hand side to test against
 * @internal
 */
export function getColorMappingPredicate(testValue: string): IHeaderPredicate {
    return (header: IMappingHeader, _context: IHeaderPredicateContext): boolean => {
        if (isResultAttributeHeader(header)) {
            return testValue ? testValue === header.attributeHeaderItem.uri : false;
        }

        if (isAttributeDescriptor(header)) {
            return testValue ? testValue === header.attributeHeader.uri : false;
        }

        const headerLocalIdentifier = getMappingHeaderLocalIdentifier(header);
        return headerLocalIdentifier ? headerLocalIdentifier === testValue : false;
    };
}

/**
 * Applies color properties preferences. If palette is specified and non-empty, it is returned. Otherwise
 * non-empty colors are transformed into a palette and returned. If all else fails, default color palette
 * is returned
 *
 * @internal
 */
export function getValidColorPalette(colors?: string[], colorPalette?: IColorPalette): IColorPalette {
    if (colorPalette && !isEmpty(colorPalette)) {
        return colorPalette;
    }

    if (colors && !isEmpty(colors)) {
        return getColorPaletteFromColors(colors);
    }

    return DefaultColorPalette;
}

// For re-exporting in index.ts
// Create object here since TSC can't reexport external types used by getColorMappingPredicate

/**
 * @internal
 */
export const ColorUtils = {
    getColorByGuid,
    getColorMappingPredicate,
};
