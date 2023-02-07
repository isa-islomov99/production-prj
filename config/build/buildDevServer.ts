import {Configuration as DevServerConfiguration} from "webpack-dev-server"
import {BuildOptions} from "./types/config";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    open: true,
    historyApiFallback: true,
    // ushbu hot property prj ni biron qismidia uzgarish qilgnanimizda page ni refresh qimasdan uzi automatic yangilab beradi uzgarishlarni
    hot: true
  }
}