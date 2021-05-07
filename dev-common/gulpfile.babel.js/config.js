/**
 * config.js v1.0.0
 * 2019-07-01
 */
import _ from "lodash";

let config = {
	isDev: process.argv[2] == void 0,
	isStg: process.argv[2] == "stg",
	isPrd: process.argv[2] == "prd",
	mode: process.argv[2] || "dev",
	args: process.argv.slice(2),
	src: "./src/",
	dest: "../htdocs/",
}

// ejs
config.ejs = {
	src: [
		`${config.src}**/*.ejs`,
		`!${config.src}**/_*.ejs`
	],
	dest: `${config.dest}`,
	ejs: {
		data: {
			isDev: config.isDev,
			// isRoot: true,
		}
	}
}

// webpack: webpackでのjsコンパイル
import ConcatPlugin from "webpack-concat-plugin";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";

// エントリーポイント複数ある場合
// 以下サンプルコードの、引数は初期値なので引数なしと同じです。
import createEntries from "./tasks/createEntries";
// const entries = createEntries();

// const entries = createEntries(`**/*.js`, {
// 	cwd: "./src/assets/js/entries/" // 検索対象ディレクトリ
// }, function(fileName, fullpath){
// 	let data = {};
// 		data[fileName] = fullpath;
// 	return data;
// });

config.webpack = {
	src: [
		`${config.src}assets/js/**/*.js`
	],
	dest: `${config.dest}assets/common/js/`,
	config: {
		mode: config.isDev ? "development" : "production",
		entry: {
			"common.js": `${config.src}assets/js/index.js`
		},
		// entryポイントが複数の場合
		// entry: entries,
		output: {
			filename: "[name]"
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					use: [{
						loader: "babel-loader",
						options: {
							presets: [
								["@babel/preset-env", {
									targets: "last 2 versions, ie >= 11, Android >= 4.4"
									// 必要な polyfill のみを import させたい場合、'usage'を指定する（必須）
									// useBuiltIns: "usage"
								}]
							]
						}
					}],
					exclude: /node_modules/,
				}
			]
		},
		devtool: "source-map",

		plugins: [
			// ファイル連結
			// new ConcatPlugin({
			// 	uglify: false,
			// 	sourceMap: false,
			// 	name: "libs",
			// 	outputPath: "./",
			// 	fileName: "[name].js",
			// 	filesToConcat: [
			// 		// npm
			// 		// "./node_modules/jquery/dist/jquery.min.js",
			// 		// "./node_modules/velocity-animate/velocity.min.js",
			// 		// libs
			// 		// `${config.src}assets/js/libs/core/**/*.js`,
			// 		// `${config.src}assets/js/libs/plugins/**/*.js`
			// 	],
			// 	attributes: {
			// 		async: false
			// 	}
			// })
		],
		optimization: {
			minimizer: [
				new UglifyJSPlugin({
					uglifyOptions: {
						output: {
							comments: /^\**!|@preserve|@license|@cc_on/
						},
						compress: {
							drop_console: true
						}
					}
				})
			]
		}
	}
}


// sass: sassコンパイル
config.sass = {
	src: `${config.src}assets/sass/**/*.scss`,
	dest: `${config.dest}assets/common/css/`,
	sass: {
		outputStyle: config.isDev ? "expanded" : "compressed"
	},
	autoprefixer: {
		browsers: ["last 2 versions", "Android >= 4.4"],
		add: true
	}
}


// clean: ファイル削除
config.clean = {
	files: [
		`${config.dest}assets/common/js/**/*.map`,
		`${config.dest}template.html`
	]
}


// server: ローカルサーバー
config.server = {
	browserSync: {
		isUse: true,
		liveReload: true,
		options: {
			server: {
				baseDir: "../htdocs/"
			},
			startPath: "./template.html",
		},
		watchFiles: [
			`${config.dest}**/*.html`,
			`${config.dest}assets/common/css/**/*.css`
		]
	},
	connectPhp: {
		isUse: false, // connectPhp 有無
	}
}

export default config;
