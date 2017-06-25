global.modal = document.createElement('div');
global.modal.id = 'boot-modal';

global._fs = require('fs');

document.getElementsByTagName('body')[0].appendChild(global.modal);

global.openWelcomeModal = () => {
    global.modal.innerHTML = `
   <div class="callout-backdrop" style="opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);"></div>
   <div class="modal" style="opacity: 1; transform: scale(1) translateZ(0px);">
      <div class="modal-inner">
         <form class="form" style="background: #212121;border:none;">
            <div class="form-header" style="background: #252525;border:none;">
               <header>MyDiscord - Announcement</header>
            </div>
            <div class="form-inner" style="background: #212121;border:none;">
               <div class="help-text" style="color: white">
                Hi! I'm justin#4752, the developer of MyDiscord. I would really appreciate it if you could let me know either by a GitHub Issue or just a Discord DM if there is anything you'd like to see in a new version of MyDiscord!<br /><br />
                Psst, there's a <a style="text-decoration:none;color:#697ec4" href="https://github.com/justinoboyle/mydiscord/tree/rewrite">rewrite effort</a> going on... a full npm plugin system sound nice? :)<br /><br />
                You can <a style="text-decoration:none;color:#697ec4" href="#" onclick="global.openTextFile(global.cssFile)">edit your styles</a> (which hot-reload, awesome!), <br /><br />
                Or <a style="text-decoration:none;color:#697ec4" href="#" onclick="global.openTextFile(global.pluginFile)">edit your scripts</a> (<strong>Do not enter code that you don't understand... seriously!</strong>) <br /><br />
                </div>
            </div>
            <div class="form-actions" style="background: #252525;border:none;">
                <a href="#" style="text-decoration:none;background:none;" class="btn btn-default" onclick="setTimeout(() => { global.toggleShowsOnBoot(); document.getElementById('boot-modal').style='display:none;' }, 1);">${(global.config.showsOnBootv2) ? "Don't show on boot" : "Show on boot"}</a>
                <a href="#" style="text-decoration:none;" class="btn btn-primary" onclick="setTimeout(() => document.getElementById('boot-modal').style='display:none;', 1);">Let's go</a>
            </div>
         </form>
      </div>
   </div>
`;
    document.getElementById('boot-modal').style = '';
}
if (typeof (global.config.showsOnBootv2) === "undefined") {
    global.config.showsOnBootv2 = true;
    saveConfig();
}
global.toggleShowsOnBoot = () => {
    global.config.showsOnBootv2 = !global.config.showsOnBootv2;
    saveConfig();
}
if (global.config.showsOnBootv2 === true)
    global.openWelcomeModal();

global.getFileOpener = () => {
    switch (process.platform) {
        case 'darwin': return 'open';
        case 'win32': return 'start notepad';
        case 'win64': return 'start notepad';
        default: return 'xdg-open';
    }
}

global.openTextFile = (filePath) => {
    const sys = require('sys');
    const exec = require('child_process').exec;

    exec(getFileOpener() + ' ' + filePath);
}

setInterval(() => {
    if (document.getElementsByClassName('ui-tab-bar').length == 0)
        return;
    const parent = document.getElementsByClassName('ui-tab-bar')[0];
    if (!parent.innerHTML.includes('MyDiscord'))
        document.getElementsByClassName('ui-tab-bar-separator')[3].insertAdjacentHTML('beforebegin',`<div class="ui-tab-bar-item" onclick="global.openWelcomeModal()">MyDiscord</div>`);
}, 100);
