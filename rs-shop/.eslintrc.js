module.exports = {
  root: true,
  ignorePatterns: [
    "projects/**/*"
  ],
  overrides: [
    {
      files: [
        "*.ts"
      ],
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        createDefaultProgram: true
      },
      plugins: ["import"],
      extends: [
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "airbnb-typescript/base",
        "plugin:prettier/recommended"
      ],
      rules: {
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "no-nested-ternary": "off",
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ]
      }
    },
    {
      files: [
        "*.html"
      ],
      extends: [
        "plugin:@angular-eslint/template/recommended"
      ],
      rules: {}
    }
  ]
}
