/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const StylelintPlugin = require('stylelint-webpack-plugin');

const rewrites = require('./proxy.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
  },
  output: 'standalone',
  // TODELETE
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // END TODELETE
  sassOptions: {
    includePaths: [path.join(__dirname, './src/styles')],
  },
  webpack: (config, { dev, webpack }) => {
    if (!dev) {
      config.plugins.push(new StylelintPlugin());
    }

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
