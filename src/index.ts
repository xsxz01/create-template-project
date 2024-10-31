#!/usr/bin/env node
import { Command } from 'commander';
import { input } from '@inquirer/prompts'
import { downloadTemplate } from './download';
import { modifyPackageJson } from './modify';
const templateGitUrl = "https://github.com/xsxz01/tsground_template.git"
const program = new Command()

program
    .name('tsground')
    .description('CLI for tsground')
    .version('0.0.1');

program
    .command('init <name> [branch]')
    .description('initialize a new project')
    .action(async (name: string, branch?: string) => {
        console.log(`Initializing project ${name}`);
        const targetBranch = branch ?? 'main';
        const initOptions = {
            project_name: await input({ message: 'Project name: ', default: name }),
            description: await input({ message: 'Description: ' }),
            author: await input({ message: 'Author: ' }),
            license: await input({ message: 'License: ', default: 'MIT' })
        };
        try {
            const downloadPath =`./${initOptions.project_name}`;
            await downloadTemplate(templateGitUrl, downloadPath, targetBranch);
            await modifyPackageJson(downloadPath, {
                ...initOptions
            })
        } catch (error) {
            console.error(error);
        }
    });

program.parse()