// (C) 2020 GoodData Corporation
import { IUriIdentifierPair } from "@gooddata/gd-bear-client/lib/metadata";
import { sanitizeDrillingPostMessageData } from "..";
import { IPostMessageData } from "@gooddata/sdk-model";

describe("sanitizeDrillingPostMessageData", () => {
    const mockIdToUriConverter = async (
        _projectId: string,
        identifiers: string[],
    ): Promise<IUriIdentifierPair[]> =>
        identifiers.map(
            (identifier): IUriIdentifierPair => ({
                identifier,
                uri: `/gdc/md/${identifier}`,
            }),
        );

    const testCases: Array<[string, IPostMessageData, IPostMessageData]> = [
        [
            "not convert uris",
            {
                uris: ["/foo", "/measure"],
                identifiers: [],
            },
            {
                uris: ["/foo", "/measure"],
                composedFrom: {
                    uris: [],
                },
            },
        ],
        [
            "not convert composed from uris",
            {
                uris: [],
                identifiers: [],
                composedFrom: { uris: ["/foo", "/measure"] },
            },
            {
                uris: [],
                composedFrom: {
                    uris: ["/foo", "/measure"],
                },
            },
        ],
        [
            "convert identifiers",
            {
                uris: [],
                identifiers: ["foo", "bar"],
            },
            {
                uris: ["/gdc/md/foo", "/gdc/md/bar"],
                composedFrom: {
                    uris: [],
                },
            },
        ],
        [
            "convert composed from identifiers",
            {
                uris: [],
                composedFrom: { identifiers: ["foo", "bar"] },
            },
            {
                uris: [],
                composedFrom: {
                    uris: ["/gdc/md/foo", "/gdc/md/bar"],
                },
            },
        ],
        [
            "deduplicate uris",
            {
                uris: ["/foo", "/foo"],
                identifiers: [],
            },
            {
                uris: ["/foo"],
                composedFrom: {
                    uris: [],
                },
            },
        ],
        [
            "deduplicate composed from uris",
            {
                uris: [],
                identifiers: [],
                composedFrom: { uris: ["/foo", "/foo"] },
            },
            {
                uris: [],
                composedFrom: {
                    uris: ["/foo"],
                },
            },
        ],
        [
            "deduplicate identifiers",
            {
                uris: [],
                identifiers: ["foo", "foo"],
            },
            {
                uris: ["/gdc/md/foo"],
                composedFrom: {
                    uris: [],
                },
            },
        ],
        [
            "deduplicate composed from identifiers",
            {
                uris: [],
                composedFrom: { identifiers: ["foo", "foo"] },
            },
            {
                uris: [],
                composedFrom: {
                    uris: ["/gdc/md/foo"],
                },
            },
        ],
    ];
    it.each(testCases)("should %s", async (_, input, expected) => {
        const actual = await sanitizeDrillingPostMessageData("", input, mockIdToUriConverter);
        expect(actual).toEqual(expected);
    });
});
