/**
 * createEntries v1.0.0
 * 2019-06-18
 */
const glob = require("glob");
const path = require("path");


let _options = {
	cwd: "./src/js/entries/"
}


/**
 * createEntry webpackの複数エントリポイントの生成
 * example: https://qiita.com/masato_makino/items/7130bbe408ca929e7f0d
 * @param {string} pattern 検索対象ファイル
 * @param {object} options see: https://github.com/isaacs/node-glob
 * @param {function} forming ファイル名を成型する関数
 */
export default function createEntries(pattern = `**/*.js`, options = _options, forming) {
	let entries = {};

	glob.sync(pattern, options).map(function (fileName) {
		if (forming){
			let data = forming(fileName, path.resolve(options.cwd, fileName));
			for (let key in data){
				entries[key] = data[key];
			}
		} else {
			entries[fileName] = path.resolve(options.cwd, fileName);
		}
	});
	return entries;
}
