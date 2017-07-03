import ps from 'ps-node';
import fs from 'fs';
import path from 'path';

export default function () {
    return new Promise((resolve, reject) => {
        ps.lookup({}, function (err, resultList) {
            if (err)
                return reject(err);
            let list = [];
            outer: for (let process of resultList) {
                if (!process.command.toLowerCase().includes("discord"))
                    continue;
                let _path = _process(process.command);
                for(let x1 of list)
                    if(x1.path == _path)
                        continue outer;
                list.push({ path: _path, pid: process.pid })
            }
            resolve(list);
        });
    })

}

function _process(command) {
    let _test = path.join(command, '..', 'resources', 'app.asar');

    if(fs.existsSync(_test))
        return _test;

    _test = path.join(command, '..', 'resources', 'app');

    if(fs.existsSync(_test))
        return _test;

    return null;
}