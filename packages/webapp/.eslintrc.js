module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "standard"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    semi: "off",
    "react/prop-types": "off",
    quotes: "off",
    "comma-dangle": "off",
    "no-undef": "off",
    "space-before-function-paren": "off",
    "no-unused-vars": "off",
  },
};
