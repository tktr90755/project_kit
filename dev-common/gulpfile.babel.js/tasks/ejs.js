/**
 * sass v1.0.0
 * 2019-08-29
 */
import config from "../config.js";
import _ from "lodash";
import { src, dest, watch } from "gulp";
import $plumber from "gulp-plumber";
import $ejs from "gulp-ejs";
import $rename from "gulp-rename";


let ejsConfig = _.merge({
	src: "src/**/*.ejs",
	dest: "htdocs/",
	ejs: {
		data: {},
		options: {
			// async: true
		}
	},
	rename: {
		extname: ".html"
	}
}, config.ejs);


export function ejs (){
	if (config.isPrd){
		return ejsBuild();
	} else {
		return watch(ejsConfig.src, ejsBuild);
	}
}


export function ejsBuild() {
	return src(ejsConfig.src)
		.pipe($plumber())
		.pipe($ejs({data: ejsConfig.ejs.data}, ejsConfig.ejs.options))
		.pipe($rename(ejsConfig.rename))
		.pipe(dest(ejsConfig.dest));
}
