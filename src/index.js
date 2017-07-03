global.platform = process.platform;
import getExecutable from './util/getExecutable';
import processElevator from './util/processElevator';
import commander from 'commander';
import _package from '../package';
import _config from '../config';
import path from 'path';
import os from 'os';
import * as fs from 'async-file';
import asar from 'asar';
import isElevated from 'is-elevated';
import sudo from 'sudo';
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

    let executable = await getExecutable(commander);
    let elevated = await isElevated();

    console.log("Using Discord instance", executable);
    console.log("Extracting app.asar...");

    let extractedPath = executable.path;
    if(executable.path.endsWith('.asar')) extractedPath = extractedPath.slice(0, -1 * '.asar'.length)

    let _continue = true;

    try {

        await fs.mkdir(extractedPath);
        asar.extractAll(executable.path, extractedPath);
        await fs.rename(executable.path, executable.path + ".bak");

    }catch(e) {
        if(!elevated) {
            console.log("Process not elevated, retrying with elevation...");
            await processElevator(executable);
            _continue = false;
            return;
        } else console.error(e);
    }

    if(!_continue) return;

    let
        _indexSrc = (await fs.readFile(path.join(extractedPath, './index.js'))).toString(),
        payloads = await payload.getPayloads(),
        identification = await payload.identify(_indexSrc),
        thePayload = await payload.createPayload({
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

_do();
