import commander from 'commander';
import _package from '../package';
import _config from '../config';
import path from 'path';
import os from 'os';
import getDiscordExecutables from './util/getDiscordExecutables';
import inquirer from 'inquirer';
import * as fs from 'async-file';
import asar from 'asar';
import isElevated from 'is-elevated';
import sudo from 'sudo';
import fileUtils from './util/fileUtils';
import payload from 'mydiscord-inject';

commander
    .version(_package.version)
    .option('--install [path]', 'Change install location.')
    .option('--discordexec [path]', 'Change discord executable')
    .option('--discordpid [pid]', 'Change discord executable pid')
    .parse(process.argv);
 
let
    installLocation = commander.install || path.join(os.homedir(), '/.mydiscord/'),
    injectRemote = _config.injectRemote;

async function _do() {
    let executable = await getExecutable();
    let elevated = await isElevated();
    console.log(elevated);
    console.log("Using Discord instance", executable);
    console.log("Extracting app.asar...");
    let extractedPath = executable.path;
    if(executable.path.endsWith('.asar'))
        extractedPath = extractedPath.slice(0, -1 * '.asar'.length)
    let _continue = true;
    try {
        await fs.mkdir(extractedPath);
        asar.extractAll(executable.path, extractedPath);
        
        await fs.rename(executable.path, executable.path + ".bak"); 
    }catch(e) {
        if(!elevated) {
            console.log("Process not elevated, retrying with elevation...");
            let temp = process.argv;
            temp = temp.slice(1);
            temp.push('--discordexec');
            temp.push(executable.path);
            temp.push('--discordpid');
            temp.push(executable.pid);
            let child = sudo(temp);
            child.stdout.on('data', (d) => process.stdout.write(d + ""));
            child.stdout.on('error', process.stderr.write);
            child.stderr = process.stderr;
            _continue = false;
            return;
        } else console.error(e);
    }
    if(!_continue) return;
    let _indexSrc = (await fs.readFile(path.join(extractedPath, './index.js'))).toString()
    console.log("Extracted app.asar");
    let payloads = await payload.getPayloads();
    let identification = await payload.identify(_indexSrc);
    let thePayload = await payload.createPayload({
        userScriptRoot: installLocation,
        rootDir: installLocation
    })
    console.log("Identified as " + identification);
    console.log("Injecting...");
    _indexSrc = _indexSrc.replace(payloads[identification], thePayload);
    await fs.writeFile(path.join(extractedPath, 'index.js'), _indexSrc);
    console.log("Injection successful!")
    console.log("Feel free to relaunch Discord at your earliest convenience :)");
}

async function getExecutable() {
    if(commander['discordexec']) {
        return {
            path: commander['discordexec'],
            pid: commander['discordpid']
        };
    }
    let runningExecutables = await getDiscordExecutables();
    if(runningExecutables.length == 0) {
        console.log("No running Discord executables found.");
        process.exit(1);
        return;
    }
    let executable = runningExecutables[0];
    if(runningExecutables.length > 1) {
        let { _pickedLocation } = await inquirer.prompt([{
            type: "rawlist",
            name: "_pickedLocation",
            message: "Pick the Discord instance you wish to use.",
            choices: runningExecutables
        }]);
        executable = _pickedLocation;
    }
    return executable;
}

_do();