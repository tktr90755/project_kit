/**
 * gitClone v1.0.0
 * 2019-06-17
 */
import $gitClone from "git-clone";


export function gitClone(repo = "https://github.com/1-10/1906_id_programming-style.git", targetPath = "htdocs") {
	return $gitClone(repo, targetPath);
}
