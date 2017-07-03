import sudo from 'sudo';

export default async function(executable) {
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
}