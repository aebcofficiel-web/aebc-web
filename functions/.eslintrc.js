module.exports = {
  env: {
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    // Empêche l'utilisation de variables globales non définies
    "no-restricted-globals": ["error", "name", "length"],

    // Encourage les fonctions fléchées pour une syntaxe moderne
    "prefer-arrow-callback": "error",

    // Force l'utilisation de guillemets doubles, autorise les templates
    "quotes": ["error", "double", { "allowTemplateLiterals": true }],

    // Désactive les règles trop strictes de Google pour Firebase
    "require-jsdoc": "off",
    "valid-jsdoc": "off",
  },
  overrides: [
    {
      files: ["**/*.spec.*"],
      env: {
        mocha: true,
      },
      rules: {},
    },
  ],
  globals: {},
};
