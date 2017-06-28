import ps from 'ps-node';

export default function() {
    return new Promise((resolve, reject) => {
        ps.lookup({ }, function(err, resultList) {
            if (err)
                return reject(err);
            let list = [];
            for(let process of resultList) {
                if(!process.command.toLowerCase().includes("discord"))
                    continue;
                if(process.arguments)
                    for(let argument of process.arguments)
                        if(argument.startsWith("--app-path="))
                            list.push({path: argument.substring("--app-path=".length), pid: process.pid})
            }
            resolve(list);
        });
    })
    
}