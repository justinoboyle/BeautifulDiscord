import ps from 'ps-node';
import fs from 'fs';
import path from 'path';

export default function () {
    return new Promise((resolve, reject) => {
        ps.lookup({}, function (err, resultList) {
            if (err)
                reject(err);
            let list = [];
            outer: for (let process of resultList) {
                if (!process.command.toLowerCase().includes("discord"))
                    continue;
                let _path = _process(fixPath(process));
                if(!_path)
                    continue;
                if((_path + "").toLowerCase().includes("helper"))
                    continue;
                if((_path + "").toLowerCase().includes("framework"))
                    continue;
                for(let x1 of list)
                    if(x1.path == _path)
                        continue outer;
                list.push({ path: _path, pid: process.pid })
            }
            resolve(list);
        });
    })

}

function fixPath(process) {
    if(global.platform !== "darwin")
        return process.command;
    let temp = [process.command];
    for(let x of process.arguments)
        if(x.startsWith("--"))
            break;
        else
            temp.push(x);
    return temp.join(' ');
}

function _process(command) {
    if(global.platform == "darwin")
        return _processMacWhyIsThisSoStrange(command);

    let _test = path.join(command, '..', 'resources', 'app');

    if(fs.existsSync(_test))
        return _test;

    _test = path.join(command, '..', 'resources', 'app.asar');

    if(fs.existsSync(_test))
        return _test;
}

function _processMacWhyIsThisSoStrange(command) {

    let _test = path.join(command, '../..', 'Resources', 'app');

    if(fs.existsSync(_test))
        return _test;
    _test = path.join(command, '../..', 'Resources', 'app.asar');
    if(fs.existsSync(_test))
        return _test;
}
