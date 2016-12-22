var path = require('path');

module.exports = {
	entry: './src/bootstrap.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			}
		]
	},

	resolve: {
		alias: {
			'components': path.resolve('./src/components')
		}
	}
}