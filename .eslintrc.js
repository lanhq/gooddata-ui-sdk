// (C) 2020 GoodData Corporation
module.exports = {
    root: true,
    ignorePatterns: ["**/dist/**/*.*"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-hooks", "prettier"],
    extends: ["@gooddata", "plugin:react/recommended", "plugin:import/errors", "plugin:import/typescript"],
    settings: {
        react: {
            version: "detect",
        },
    },
    rules: {
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/ban-ts-comment": ["error", { "ts-expect-error": "allow-with-description" }],
        "@typescript-eslint/ban-types": [
            "error",
            {
                types: {
                    object: false,
                },
                extendDefaults: true,
            },
        ],
        "@typescript-eslint/explicit-member-accessibility": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/member-ordering": "off",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "import/order": "off",
    },
};
