/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const StylelintPlugin = require('stylelint-webpack-plugin');

const rewrites = require('./proxy.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
  },
  webpack: (config, { dev, webpack }) => {
    config.plugins.push(new StylelintPlugin());

    config.module.rules.push(
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: { not: [/component/] },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: /component/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              typescript: true,
              expandProps: 'end',
              replaceAttrValues: { '#000001': 'currentColor' },
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                ],
              },
            },
          },
        ],
      },
    );

    config.plugins.push(
      new webpack.DefinePlugin({
        isDevelopment: String(dev),
      }),
    );

    return config;
  },
  rewrites,
};

module.exports = withBundleAnalyzer(nextConfig);
