const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{ test: /\.(js)$/, use: 'babel-loader' },
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] }
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		})
	],
	devServer: {
		historyApiFallback: true,
		port: 7080
	},
	mode: 'development'
};
