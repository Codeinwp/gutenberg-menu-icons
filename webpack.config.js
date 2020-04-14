const webpack = require( 'webpack' );
const path = require( 'path' );
const NODE_ENV = process.env.NODE_ENV || 'development';
const ExtractCssChunks = require( 'extract-css-chunks-webpack-plugin' );

module.exports = {
	mode: NODE_ENV,
	entry: {
		editor: './src/index.js',
		frontend: './src/frontend.js'
	},
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /.js?$/,
				use: [ {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: [
							[
								'@babel/plugin-transform-react-jsx', {
									'pragma': 'wp.element.createElement'
								}
							]
						]
					}
				},
				'eslint-loader' ],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: [ {
					loader: ExtractCssChunks.loader
				},
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						plugins: [
							require( 'autoprefixer' )
						]
					}
				},
				'sass-loader' ]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify( NODE_ENV )
		}),
		new ExtractCssChunks({
			filename: '[name].css'
		})
	]
};
