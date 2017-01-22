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
               <header>MyDiscord has been installed.</header>
            </div>
            <div class="form-inner" style="background: #212121;border:none;">
               <div class="help-text" style="color: white">
                MyDiscord has just been installed, congrats!<br /><br />
                You can <a style="text-decoration:none;color:#697ec4" href="#" onclick="global.openTextFile(global.cssFile)">edit your styles</a> (which hot-reload, awesome!), <br /><br />
                Or <a style="text-decoration:none;color:#697ec4" href="#" onclick="global.openTextFile(global.pluginFile)">edit your scripts</a> (<strong>Do not enter code that you don't understand... seriously!</strong>) <br /><br />
                Anyway, enjoy MyDiscord!
                </div>
            </div>
            <div class="form-actions" style="background: #252525;border:none;">
                <a href="#" style="text-decoration:none;background:none;" class="btn btn-default" onclick="setTimeout(() => { global.toggleShowsOnBoot(); document.getElementById('boot-modal').style='display:none;' }, 1);">${(global.config.showsOnBoot) ? "Don't show on boot" : "Show on boot"}</a>
                <a href="#" style="text-decoration:none;" class="btn btn-primary" onclick="setTimeout(() => document.getElementById('boot-modal').style='display:none;', 1);">Gotcha</a>
            </div>
         </form>
      </div>
   </div>
`;
    document.getElementById('boot-modal').style = '';
}
if(typeof(global.config.showsOnBoot) === "undefined") {
    global.config.showsOnBoot = true;
    saveConfig();
}
global.toggleShowsOnBoot = () => {
    global.config.showsOnBoot = !global.config.showsOnBoot;
    saveConfig();
}
if (global.config.showsOnBoot === true)
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
    if (document.getElementsByClassName('change-log-button-container').length == 0)
        return;
    const parent = document.getElementsByClassName('change-log-button-container')[0];
    if (!parent.innerHTML.includes('MyDiscord'))
        parent.innerHTML += `<br /><a class="change-log-button" onclick="global.openWelcomeModal()">MyDiscord</a>`;
}, 1000);