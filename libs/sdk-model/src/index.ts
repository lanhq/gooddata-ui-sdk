// (C) 2019 GoodData Corporation

export {
    IAttribute,
    isAttribute,
    attributeLocalId,
    AttributePredicate,
    anyAttribute,
    idMatchAttribute,
    attributesFind,
    attributeUri,
    attributeIdentifier,
} from "./attribute";

export { newAttribute, AttributeBuilder, AttributeModifications } from "./attribute/factory";

export {
    Identifier,
    UriRef,
    IdentifierRef,
    LocalIdRef,
    ObjRef,
    ObjRefInScope,
    isUriRef,
    isIdentifierRef,
    objectRefValue,
} from "./base";

export {
    IDimension,
    isDimension,
    dimensionTotals,
    DimensionItem,
    newTwoDimensional,
    newDimension,
    MeasureGroupIdentifier,
    dimensionSetTotals,
} from "./base/dimension";

export { TotalType, ITotal, isTotal, newTotal, totalIsNative } from "./base/totals";

export {
    SortDirection,
    IAttributeSortItem,
    SortItem,
    IMeasureSortItem,
    LocatorItem,
    IAttributeLocatorItem,
    IMeasureLocatorItem,
    isMeasureLocator,
    isAttributeLocator,
    isMeasureSort,
    isAttributeSort,
    newMeasureSort,
    newAttributeSort,
    newAttributeLocator,
    SortEntityIds,
    sortEntityIds,
} from "./base/sort";

export {
    IAttributeElementsByRef,
    IAttributeElementsByValue,
    AttributeElements,
    IPositiveAttributeFilter,
    INegativeAttributeFilter,
    IAbsoluteDateFilter,
    IRelativeDateFilter,
    IFilter,
    IDateFilter,
    IAttributeFilter,
    isAbsoluteDateFilter,
    isRelativeDateFilter,
    isPositiveAttributeFilter,
    isNegativeAttributeFilter,
    isDateFilter,
    isAttributeFilter,
    isAttributeElementsByRef,
    isAttributeElementsByValue,
    filterIsEmpty,
} from "./filter";

export {
    newAbsoluteDateFilter,
    newNegativeAttributeFilter,
    newPositiveAttributeFilter,
    newRelativeDateFilter,
} from "./filter/factory";

export {
    IMeasureDefinitionType,
    IMeasureDefinition,
    ArithmeticMeasureOperator,
    IArithmeticMeasureDefinition,
    IPoPMeasureDefinition,
    IMeasure,
    MeasureAggregation,
    IPreviousPeriodMeasureDefinition,
    IPreviousPeriodDateDataSet,
    isMeasure,
    isSimpleMeasure,
    isPoPMeasure,
    isPreviousPeriodMeasure,
    isArithmeticMeasure,
    isMeasureDefinition,
    isPoPMeasureDefinition,
    isPreviousPeriodMeasureDefinition,
    isArithmeticMeasureDefinition,
    measureId,
    MeasurePredicate,
    anyMeasure,
    idMatchMeasure,
    measureDoesComputeRatio,
    measureUri,
    measureIdentifier,
    measureMasterIdentifier,
    measureArithmeticOperands,
    measureDisableComputeRatio,
    measureAlias,
    measureTitle,
    measureArithmeticOperator,
} from "./measure";

export {
    IPreviousPeriodDateDataSetSimple,
    ArithmeticMeasureBuilder,
    MeasureBuilder,
    MeasureModifications,
    PoPMeasureBuilder,
    PreviousPeriodMeasureBuilder,
    MeasureBuilderBase,
    newMeasure,
    modifyMeasure,
    newArithmeticMeasure,
    newPopMeasure,
    newPreviousPeriodMeasure,
} from "./measure/factory";

export {
    AttributeOrMeasure,
    IBucket,
    isBucket,
    idMatchBucket,
    anyBucket,
    MeasureInBucket,
    AttributeInBucket,
    newBucket,
    bucketIsEmpty,
    bucketAttributes,
    bucketAttribute,
    bucketMeasure,
    bucketMeasures,
    bucketTotals,
    bucketItems,
    BucketPredicate,
    applyRatioRule,
    ComputeRatioRule,
} from "./buckets";

export {
    bucketsFind,
    bucketsMeasures,
    bucketsIsEmpty,
    bucketsAttributes,
    bucketsFindMeasure,
    bucketsById,
    bucketsFindAttribute,
    bucketsItems,
    bucketsTotals,
} from "./buckets/bucketArray";

export {
    IExecutionDefinition,
    DimensionGenerator,
    defWithFilters,
    defFingerprint,
    defSetDimensions,
    defSetSorts,
    defTotals,
} from "./executionDefinition";

export {
    newDefForItems,
    newDefForBuckets,
    newDefForInsight,
    defWithDimensions,
    defWithSorting,
    defaultDimensionsGenerator,
    emptyDef,
} from "./executionDefinition/factory";

export {
    GuidType,
    RGBType,
    IColor,
    IColorItem,
    IColorMappingProperty,
    IColorPalette,
    IColorPaletteItem,
    IGuidColorItem,
    IRGBColorItem,
    isGuidColorItem,
    isRgbColorItem,
} from "./colors";

export {
    IInsight,
    IVisualizationClass,
    VisualizationProperties,
    isInsight,
    insightMeasures,
    insightHasMeasures,
    insightAttributes,
    insightHasAttributes,
    insightHasDataDefined,
    insightProperties,
    insightBuckets,
    insightSorts,
    insightBucket,
    insightTotals,
    insightFilters,
    insightVisualizationClassIdentifier,
    insightSetProperties,
    insightSetSorts,
    visClassUrl,
} from "./insight";

export { factoryNotationFor } from "./objectFactoryNotation";
export { DateGranularity } from "./filter";
