// webpack.prod.ts
import merge from 'webpack-merge';
import webpack from "webpack";
import Common from './common'; // 引入webpack.common.ts
import { CleanWebpackPlugin } from 'clean-webpack-plugin'; // 引入CleanWebpackPlugin插件

const ProdConfig: webpack.Configuration = merge(Common, { // 将webpack.common.ts合并到当前文件
	mode: 'production',
	devtool: 'hidden-source-map',
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
	]
})

export default ProdConfig;
