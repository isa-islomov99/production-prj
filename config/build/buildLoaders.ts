import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders({isDev}: BuildOptions): webpack.RuleSetRule[] {

  // svg file larni webpack tushuna olishi va biz ishlata olishimiz uchun kere
  const svgLoader = {
    test: /\.svg$/,
    use: ['@svgr/webpack']
  }

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      {
        loader: "css-loader",
        options: {
          modules: {
            // build da oddiy scss file un ham module niy classlarni generatsiya qiliberopti, auto orqali biz file ni oxiri module.scss bn tugagagn yoki yuqligini aniqladik
            // shunga qarab module bulmasa class generatsiya qilmemiz
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            // Bu orqali biz mode dev bulsa module niy class larni tushunarli qldik, a prod mode da 8 belgili classname generatsiya qlib ber dedik
            localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[hash:base64:8]'
          },
        }
      },
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }

  // Agar TypeScript ishlatmasak jsx kodni tushunish uchun - babel-loader kerak bulardi. Ts ni uzi jsx kodni tanidi shuni uchun babel-loader keremas
  const typescriptLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  // Png, Jpg rasmlarni webpack tushuna olishi va biz ishlata olishimiz uchun kere
  const fileLoader = {
      test: /\.(png|jpe?g|gif|woff2|woff)$/i,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    }

  return [
    typescriptLoader,
    cssLoader,
    fileLoader,
    svgLoader
  ]
}