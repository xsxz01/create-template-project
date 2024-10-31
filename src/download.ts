import gitclone from "git-clone";
import fs from "fs";
import path from "path";
import ora from "ora";
export const downloadTemplate = async (
templateGitUrl: string, downloadPath: string, targetBranch?: string) => {
    const loading = ora("download template");
    return new Promise((resolve, reject) => {
        loading.start("start download template");

        gitclone(
            templateGitUrl,
            downloadPath,
            {
                checkout: targetBranch,
                shallow: true,
            },
            (e) => {
                if (e) {
                    loading.fail("download fail");
                    loading.stop();
                    reject(e);
                } else {
                    loading.succeed("download success");
                    loading.stop();
                    // 删除 .git
                    fs.rmSync(path.join(downloadPath, ".git"), {
                        recursive: true,
                        force: true,
                    });
                    resolve("download success");
                }
            }
        );
    });
};
