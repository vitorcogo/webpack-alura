
const path = require('path');
const HtmlWebpack = require('html-webpack-plugin'); // plugin para carregar html no build
const MiniCSSExtract = require('mini-css-extract-plugin'); // plugin para extrair o css para um arquivo css, e evitar carregamento sem estilo da pagina
const CSSMinimizerWebpack = require('css-minimizer-webpack-plugin'); // plugin para mimificar css
const webpack = require('webpack');

module.exports = {
  entry: './app/src/js/app.js', // entrada dos modulos que serão utilizados para a compactação
  output: {
    filename: 'bundle.js', // saida dos modulos compactados em um unico "bundle"
    path: path.resolve(__dirname, 'app/dist'), // necessário passar o caminho absoluto!
    clean: true // parametro utilizado para limpar os arquivos do build e gerar um novo, evitando arquivos antigos
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader', // loaders para carregar modulos de css 'css-loader', e "renderizar" os mesmos 'style-loader'
          MiniCSSExtract.loader,
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CSSMinimizerWebpack(),
      '...' // utilizar para o webpack não deixar de utilizar os minimizers padrões 
    ]
  },
  plugins: [ // todo plugin tem que ser instanciado
    new HtmlWebpack({
      template: './app/src/index.html', // referenciar o html que iremos utilizar
      filename: 'index.html',
      hash: true // necessário para atualizar o bundle sempre que há uma nova atualização, evitando o cache do bundle incorreto
    }),
    new MiniCSSExtract({
      filename: 'style.css'
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000
  }
};
