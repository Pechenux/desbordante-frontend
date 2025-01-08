module.exports = {
  extends: 'stylelint-config-recommended-scss',
  plugins: ['stylelint-prettier'],
  rules: {
    'prettier/prettier': true,
    'no-duplicate-selectors': true,
    'color-hex-length': 'long',
    'color-named': 'never',
    'selector-attribute-quotes': 'always',
    'property-no-vendor-prefix': true,
    'value-no-vendor-prefix': true,
    'function-url-quotes': 'always',
    'font-weight-notation': 'numeric',
    'font-family-name-quotes': 'always-unless-keyword',
    'comment-whitespace-inside': 'always',
    'comment-empty-line-before': 'always',
    'at-rule-no-vendor-prefix': true,
    'selector-pseudo-element-colon-notation': 'double',
    'selector-no-vendor-prefix': true,
    'media-feature-name-no-vendor-prefix': true,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['export', 'global'],
      },
    ],

    'property-no-unknown': [
      true,
      {
        ignoreProperties: [
          'railColor',
          'standardSectionColor',
          'otherSectionColor',
          'hoverSectionColor',
          'errorColor',
        ],
      },
    ],
  },
};
