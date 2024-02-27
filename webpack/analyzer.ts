import merge from 'webpack-merge';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import prodConfig from './prd';

module.exports = merge(prodConfig, {
  plugins: [new BundleAnalyzerPlugin()],
});
