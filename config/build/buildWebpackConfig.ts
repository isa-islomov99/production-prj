import {BuildOptions} from "./types/config";
import webpack from "webpack";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {buildDevServer} from "./buildDevServer";

export function buildWebpackConfig(options: BuildOptions): webpack.Configuration {

  const {mode, paths, isDev} = options

  return {
    // mode bu app ni development yoki production daligini bildiradi
    mode: mode,
    // entry bu prilojeniyani boshlangich nuqtasi yanig glavniy js file
    entry: paths.entry,
    // output bu zborkani qayerga va qanaqa qlishimizni bildiradigan qism
    output: {
      // build bugan papkani nomi doim bir xil busa browser keshledi va agar biz prilojeniyani yangi versiyasini chiqarsak ham har doim eski faylni beradi userga,
      // shu un contenthash doim unique name yaratadi va kesh bn muammo yuqoladi
      filename: "[name].[contenthash].js",
      path: paths.build,
      clean: true
    },
    plugins: buildPlugins(options),
    module: {
      // rules js ramkasidan chiqadigan barcha narsa css, rasmlar svg lar ...etc js ramkasidan chiqadigan hamma file larni abrabotka qlish imkonini beradi
      rules: buildLoaders(options),
    },
    // Bu Resolve bizga file ni import qilganimizda oxiridagi qushimcha js, jsx, tsx larni yozmaslik imkonini beradi
    resolve: buildResolvers(options),
    // Bu bizga biron file da error chiqqanda qaysi error aynan qaysi file da ekanligini kursatib beradi, agar bu bumasa misol 10 ta js file 1 ta build ga yigilganda
    // error ni qayerdan chiqqan ekanligini bila olmasdik
    devtool: isDev ? "inline-source-map" : undefined,
    // devServer qilingan uzgarishlarni kurish uchun har doim ruchnoy build qlmasligimiz un kerak yani biz un automatik uzi build qladi
    // React da ishlaguncha qilingan uzgarishni browser da kurishimizni sababi shundan
    devServer: isDev ? buildDevServer(options) : undefined
  }
}