/**
 * server v1.0.0
 * 2019-06-17
 */
import config from "../config.js";
import _ from "lodash";
import { watch } from "gulp";
import $connectPhp from "gulp-connect-php";
import $browserSync from "browser-sync";
import proxyMiddleware from "http-proxy-middleware";


let serverConfig = _.merge({
	browserSync: {
		isUse: true, // browserSync 有無
		liveReload: true,
		watchFiles: [
			// `${config.dest}**/*.html`,
			// `${config.dest}**/*.php`,
			// `${config.dest}assets/js/**/*.js`,
			// `${config.dest}assets/css/**/*.css`
		],
		apiServer: null,
		options: {
			server: {
				baseDir: config.dest
			},
			middleware: null
		}
	},
	connectPhp: {
		isUse: false, // connectPhp 有無
		// see: https://www.npmjs.com/package/gulp-connect-php
		options: null
	}
}, config.server);


export function browserSync () {
	if (serverConfig.browserSync.liveReload) {
		watch(serverConfig.browserSync.watchFiles)
			.on("change", () => {
					$browserSync.reload();
			});
	}

	if (serverConfig.browserSync.apiServer){
		serverConfig.browserSync.options.middleware = serverConfig.browserSync.options.middleware || [];

		proxyMiddleware(serverConfig.browserSync.apiServer.context, serverConfig.browserSync.apiServer.options);
	}

	return $browserSync.init(serverConfig.browserSync.options);
}


export function server () {
	if (serverConfig.connectPhp.isUse) {
		return $connectPhp.server(serverConfig.connectPhp.options, () => {
			if (serverConfig.browserSync.isUse) {
				browserSync();
			}
		});

	} else if (serverConfig.browserSync.isUse) {
		return browserSync();
	}
}
