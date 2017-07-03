import inquirer from 'inquirer';
import getDiscordExecutables from './getDiscordExecutables';

export default async function(commander) {
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