import fs from "fs-extra";
import path from "path";
import handlebars from "handlebars";
import ora from "ora";

const log = ora("modify");

export const modifyPackageJson = function (downloadPath: string, options: {
    project_name: string,
    description: string,
    author: string,
    license: string
}) {
    log.start("start modifying package.json")
    const packagePath = path.join(downloadPath, "package.json");
    if (fs.existsSync(packagePath)) {
        const content = fs.readFileSync(packagePath).toString();
        const template = handlebars.compile(content);

        const param = {
            project_name: options.project_name,
            description: options.description,
            author: options.author,
            license: options.license
        };

        const result = template(param);
        fs.writeFileSync(packagePath, result);
        log.succeed("modify package.json complete");
        log.stop();
    } else {
        log.fail("modify package.json fail");
        log.stop();
        throw new Error("no package.json");
    }
};
