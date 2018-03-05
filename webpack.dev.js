const path = require( 'path' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const ExtractTextPlugin = require( "extract-text-webpack-plugin" );
const webpack = require( 'webpack' );
const basePath = __dirname;

const babelOptions = {
  plugins: [ 'react-hot-loader/babel' ],
  presets: [
    [
      'env',
      {
        targets: {
          browsers: [ 'last 2 versions', '> 1% in KR' ],
        },
      },
    ],
    'react',
    'stage-0',
  ],
};

module.exports = {
  context: path.join( basePath, '.' ),
  resolve: {
    extensions: [ '.js', '.ts', '.tsx' ],
    modules: ['dev', 'node_modules'],
    alias: {
      'datagrid-ts': path.resolve( __dirname, 'src/' ),
      '@root': path.resolve( __dirname, '' )
    }
  },
  entry: {
    app: './dev/index.tsx'
  },
  output: {
    path: path.join( basePath, './docs' ),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { ...babelOptions, cacheDirectory: true },
          },
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { ...babelOptions, cacheDirectory: true },
          },
          { loader: 'awesome-typescript-loader' },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]-[hash:base64:3]'
            }
          },
          {
            loader: 'typed-css-modules-loader',
            options: {
              camelCase: true
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract( {
          fallback: "style-loader",
          use: "css-loader"
        } )
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ],
  },
  // For development https://webpack.js.org/configuration/devtool/#for-development
  devtool: 'eval',
  devServer: {
    host: '0.0.0.0',
    port: 4000,
    noInfo: true,
    hot: true,
    historyApiFallback: {
      rewrites: [
        { from: /./, to: '/' }
      ]
    }
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /^\.\/pages$/,
      '\.\/pages/index.async',
    ),
    // chunk
    new webpack.optimize.CommonsChunkPlugin( {
      name: 'vendor',
      minChunks: ( { resource } ) => /node_modules/.test( resource ),
    } ),
    //Generate index.html in /dist => https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin( {
      filename: 'index.html', //Name of file in ./dist/
      template: './dev/index.html', //Name of template in ./src
      favicon: './dev/assets/favicon.ico',
      hash: true
    } ),
    new webpack.optimize.CommonsChunkPlugin( {
      names: [ 'vendor', 'manifest' ],
    } ),
    new ExtractTextPlugin( "styles.css" ),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
};