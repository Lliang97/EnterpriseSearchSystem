const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
//打包前清空
let {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
	entry: {
        bundle:'./src/index.js'
    },//入口文件
	output: {
		filename: '[name].js',//打包出口文件
		path: path.resolve(__dirname, 'dist')//出口目录
	},
	module: {
		rules: [
			{// 转换ES5
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
                },
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
			},
            {// 解析less
                test: /\.less$/,     
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'less-loader'] // 从右向左解析
                })
            },
            {// 解析scss
                test: /\.scss$/,     
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader'] // 从右向左解析
                })
            },
            {// 解析css
                test: /\.css$/,     
                use: ExtractTextWebpackPlugin.extract({
                    // 将css用link的方式引入就不再需要style-loader了
                    fallback: "style-loader",
                    use: ['css-loader']
                })
            },
			{// 图片配置
				test: /\.(png|svg|jpg|gif)$/,
				use: ['url-loader']
			},
			{// 引用字体图片和svg图片
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['url-loader']
			}
		]
    },
    resolve: {//省去不写后缀
        // 别名
        alias: {
          pages:path.join(__dirname,'src/pages'),
          component:path.join(__dirname,'src/component'),
          actions:path.join(__dirname,'src/redux/actions'),
          reducers:path.join(__dirname,'src/redux/reducers'),
        },
        // 省略后缀
        extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.less']
    },
	plugins: [
		new HtmlWebpackPlugin({
            template: './src/index.html',    // 模板文件位置
            //chunks: ['vendor', 'index', 'utils']  //  引入需要的chunk 
        }),
        // hot 检测文件改动替换plugin
		new webpack.NamedModulesPlugin(),      
        new webpack.HotModuleReplacementPlugin(),
        // 打包前先清空
        new CleanWebpackPlugin(),
    ],
    // webpack-dev-server 配置
	devServer: {
		contentBase: './dist',
        hot: true,
        overlay: true, // 浏览器页面上显示错误
        historyApiFallback: true
	},
    mode:'development',
    devtool: 'inline-source-map'
};