import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildPlugins({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[] {
  return [
    // HtmlWebpackPlugin index.html file ga hamma js file, script larni boglash yani usherga yigishini taminlab beradi
    new HtmlWebpackPlugin({
      // hamma js scriptlarni index.html faylni ichiga yigish un template ishlatamiz va unga public ichidagi index.html file ni kursatamiz
      template: paths.html,
    }),
    // webpack.ProgressPlugin() zborka jarayonini qanchasi zborka buldi etc shularni kursatib turadi
    new webpack.ProgressPlugin(),
    // Css fillerni uqish uchun kere
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css'
    }),
    // webpack dagi bron bir globalniy qiymatni prj dagi webpack dan tashqari boshqa file larda ishlatish imkonini beradi
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
    }),
    // ushbu plugin prj ni biron qismidia uzgarish qilgnanimizda page ni refresh qimasdan uzi automatic yangilab beradi uzgarishlarni
    new webpack.HotModuleReplacementPlugin(),
  ]
}

