/**
 * gulpfile v1.0.0
 * 2019-07-01
 */
import { parallel, series } from "gulp";
import { clean } from "./tasks/clean";
import { sass, sassBuild } from "./tasks/sass";
import { webpack, webpackBuild } from "./tasks/webpack";
import { server } from "./tasks/server";
import { ejs } from "./tasks/ejs";


/**
 * develop mode
 * command: npm run dev or gulp
 */
export default parallel(server, ejs, sass, webpack);

/**
 * staging mode
 * command: npm run stg or gulp stg
 */
export const stg = series(clean, parallel(ejs, server, sassBuild, webpackBuild));

/**
 * production mode
 * command: npm run prd or gulp prd
 */
export const prd = series(clean, parallel(ejs, sassBuild, webpackBuild));

/**
 * server
 * command: npm run srv or gulp srv
 */
export const srv = parallel(server);

/**
 * ejs
 * command: gulp _ejs
 */
export const _ejs = parallel(ejs);
