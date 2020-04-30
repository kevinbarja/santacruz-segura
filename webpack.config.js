const path = require("path");
const OfflinePlugin = require("offline-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	entry : {
		// App Shell has only a single entry point
		// this entry point loads pages with import()
		shell: "./app/shell.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name]-[chunkhash].js",
		chunkFilename: "[chunkhash].js"
	},
	devServer: {
		contentBase: path.resolve(__dirname, "./app"),
		overlay: true,
		watchContentBase: true
	  },	
	module: {
		rules: [
			{
				test: /\.html/,
				use: "html-loader"
			},			
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: "file-loader",
						options: {
							esModule: false,
							name: "images/[name].[ext]"
						}
					},
					{
						loader: "image-webpack-loader"
					}
				]
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: "css-loader"
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [autoprefixer()]
						}
					},
					{
						loader: "sass-loader",
						options: {
							includePaths: ["./node_modules"]
						}
					}
				]
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
				  presets: ['@babel/preset-env']
				},
			}			
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name]-[chunkhash].css"
		}),
		// Generate a HTML page per page
		// This could be replace by some server logic or SSR
		new HtmlWebpackPlugin({
			template: 'app/template.html',
			filename: "index.html"
		}),
		new HtmlWebpackPlugin({
			template: 'app/template-panuelos-blancos.html',
			filename: "panuelos-blancos.html"
		}),			
		new HtmlWebpackPlugin({
			template: 'app/template.html',
			filename: "covid19.html"
		}),			
		new HtmlWebpackPlugin({
			template: 'app/template.html',
			filename: "mercados-moviles.html"
		}),		
	
		new HtmlWebpackPlugin({
			template: 'app/template.html',
			filename: "productores-online.html"
		}),			
		new HtmlWebpackPlugin({
			template: 'app/template.html',
			filename: "empresas-alimentarias.html"
		}),	
		/*
		new OfflinePlugin({
			caches: {
				main: [
					// These assets don't have a chunk hash.
					// SW fetch them on every SW update.
					"index.html",
					"covid19.html",
					"mercados-moviles.html",
					"productores-online.html",
					"empresas-alimentarias.html"
				],
				additional: [
					// All other assets have a chunk hash.
					// SW only fetch them once.
					// They'll have another name on change.
					":rest:"
				]
			},
			// To remove a warning about additional need to have hash
			safeToUseOptionalCaches: true,
			// "additional" section is fetch only once.
			updateStrategy: "changed"
		}),
		*/
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, "./app/manifest.json"),
				to: path.resolve(__dirname, "./dist/manifest.json")
			},
			{
				from: path.resolve(__dirname, "./app/favicon.ico"),
				to: path.resolve(__dirname, "./dist/favicon.ico")
			},
			{
				from: path.resolve(__dirname, "./app/images/"),
				to: path.resolve(__dirname, "./dist/images/")
		}]),
	]
};