const path = require('path');
const ForkTsCheckWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserJsPlugin = require('terser-webpack-plugin')

module.exports = (env, argv) => {

  const production = (env && env.production) || (argv && argv.mode == 'production') ? true : false;
  const docs = env && env.docs;
  console.log('Environment:', (production ? 'Production' : 'Development') + (docs ? ' (docs)' : '') + '!')
return {
  mode: production ? 'production' : 'development',
  entry: {
    'tiny-files': path.resolve(__dirname, 'src', 'main.ts'),
  },

  output: {
    path: path.resolve(__dirname, docs ? 'docs' : production ? 'dist' : 'build'),
    publicPath: '',
    filename: '[name].[contenthash].js',
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.[jt]s$/,
        loader: 'ts-loader',
        options: { transpileOnly: true }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2, url: false } },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff2?)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader'
      }
    ]
  },

  resolve: {
    modules: ['node_modules'],
    extensions: ['.vue', '.ts', '.js', '.json', '.html', '.scss', '.css'],
    plugins: [new TsConfigPathsPlugin()]
  },

  devtool: production ? undefined : 'inline-source-map',

  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [ new TerserJsPlugin({
      terserOptions: { sourceMap: production ? false : true  }
    }) ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new ForkTsCheckWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      chunks: ['tiny-files'],
      template: 'src/index.html',
      filename: 'index.html'
    })
  ]
}
}
