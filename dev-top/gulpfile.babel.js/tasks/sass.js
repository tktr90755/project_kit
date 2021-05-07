/**
 * sass v1.0.0
 * 2019-06-04
 */
import config from "../config.js";
import _ from "lodash";
import { src, dest, watch } from "gulp";
import $plumber from "gulp-plumber";
import $sass from "gulp-sass";
import $autoprefixer from "gulp-autoprefixer";



let sassConfig = _.merge({
	src: "src/sass/**/*.scss",
	dest: "htdocs/assets/css/",
	sass: {
		outputStyle: "expanded"
	},
	autoprefixer: {
		browsers: ["last 2 versions"],
		add: true
	}
}, config.sass);


export function sass (){
	if (config.isPrd){
		return sassBuild();
	} else {
		return watch(sassConfig.src, sassBuild);
	}
}


export function sassBuild() {
	return src(sassConfig.src)
		.pipe($plumber())
		.pipe($sass(sassConfig.sass).on("error", $sass.logError))
		.pipe($autoprefixer(sassConfig.autoprefixer))
		.pipe(dest(sassConfig.dest));
}
