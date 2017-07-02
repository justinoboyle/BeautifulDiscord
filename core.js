(() => {
    /* Global */
    if (!window.saveConfig)
        window.saveConfig = () => console.log("Could not save config!");
    if (!window.config)
        window.config = {};
    
    window.addEventListener("beforeunload", saveConfig);
    
    if(!window.mydiscord)
        window.mydiscord = {};
    
    let customOptions = [];
    
    // TODO: allow no callback
    function getCheckbox(title, descText, state, clickCallback){
        /* Create elements */
        let container = document.createElement('div');
        container.className = "settings-container";
        
        let option = document.createElement('div');
        option.className = "flex";
        
        let label = document.createElement('h3');
        label.className = "settings-label";
        label.innerHTML = title;
        
        let checkbox_wrap = document.createElement('div');
        checkbox_wrap.className = "settings-checkbox-wrap";
        
        let checkbox_switch = document.createElement('div');
        checkbox_switch.className = state?'settings-checkbox-switch settings-checkbox-checked':'settings-checkbox-switch';
        
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = state?'on':'off';
        checkbox.className = 'settings-checkbox'
        checkbox.addEventListener("click", function(){
            isOn = this.value === "on";
            this.value = isOn?'off':'on';
            
            checkbox_switch.className = isOn?'settings-checkbox-switch':'settings-checkbox-switch settings-checkbox-checked';
            
            clickCallback();
        });
        
        let divider = document.createElement('div');
        divider.className = "settings-divider";
        
        /* Build element */
        checkbox_wrap.appendChild(checkbox);
        checkbox_wrap.appendChild(checkbox_switch);
        option.appendChild(label);
        option.appendChild(checkbox_wrap);
        container.appendChild(option);
        
        /* Add desc */
        if(descText !== null){
            let desc = document.createElement('div')
            desc.className = 'settings-desc';
            desc.innerHTML = descText;
            container.appendChild(desc);
        }
        
        container.appendChild(divider);
        
        return container;
    }
    
    // TODO: allow no callback
    function getInput(title, descText, properties, inputCallback){
        /* Create elements */
        let container = document.createElement('div');
        container.className = "settings-container";
        
        let option = document.createElement('div');
        option.className = "settings-input-field";
        
        let label = document.createElement('h3');
        label.className = "settings-label";
        label.innerHTML = title;
        
        let input = document.createElement('input');
        input.type = properties.type || "text";
        input.placeholder = properties.placeholder || "";
        input.id = properties.id || "";
        input.name = properties.name || "";
        input.value = properties.value || "";
        input.className = 'settings-input'
        input.addEventListener("change", inputCallback);
        
        let divider = document.createElement('div');
        divider.className = "settings-divider";
        
        /* Build element */
        option.appendChild(label);
        option.appendChild(input);
        container.appendChild(option);
        
        /* Add desc */
        if(descText !== null){
            let desc = document.createElement('div')
            desc.className = 'settings-desc';
            desc.innerHTML = descText;
            container.appendChild(desc);
        }
        
        container.appendChild(divider);
        
        return container;
    }
    
    window.mydiscord.loadCSS = function(link){
        let stylesheet = document.createElement("link");
        stylesheet.rel = 'stylesheet';
        stylesheet.href = link + '?nocache=' + Math.random() * (666 - 100) + 100;
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
    }
    
    // TODO: options, & remap css classes (thx discord... :( )
    window.mydiscord.addSettingsConnection = function(name, icon, color, deleteCallback){
        if(document.querySelector(".user-settings-connections") !== null){
            /* Create elements */
            let connection = document.createElement("div");
            connection.className = "connection elevation-low margin-bottom-8";
            connection.setAttribute("style", "border-color: " + color + "; background-color: " + color + ";");
            
            let connection_header = document.createElement("div");
            connection_header.className = "connection-header";
            
            let img = document.createElement("img");
            img.className = "connection-icon no-user-drag";
            img.src = icon;
            
            let connection_name_wrapper = document.createElement("div");
            
            let connection_name = document.createElement("div");
            connection_name.className = "connection-account-value";
            connection_name.innerHTML = name;
            
            let connection_label = document.createElement("div");
            connection_label.className = "connection-account-label";
            connection_label.innerHTML = "Account Name";
            
            let connection_delete = document.createElement("div");
            connection_delete.className = "connection-delete flex-center";
            connection_delete.innerHTML = "<span>Disconnect</span>";
            connection_delete.addEventListener("click", function(){
                this.parentNode.parentNode.remove();
                deleteCallback();
            });
            
            /* Build elements */
            connection_name_wrapper.appendChild(connection_name);
            connection_name_wrapper.appendChild(connection_label);
            connection_header.appendChild(img);
            connection_header.appendChild(connection_name_wrapper);
            connection_header.appendChild(connection_delete);
            connection.appendChild(connection_header);
            
            document.querySelector(".user-settings-connections .connection-list").appendChild(connection);
        }
    }
    
    // TODO: remap css classes
    window.mydiscord.addConnectButton = function(icon, callback){
        let connect = document.createElement("div");
        connect.className = "connect-account-btn";
        
        let btn = document.createElement("button");
        btn.className = "connect-account-btn-inner";
        btn.type = "button";
        btn.setAttribute("style", "background-image: url('" + icon + "');");
        btn.addEventListener("click", callback);
        
        connect.appendChild(btn);
        document.querySelector(".connect-account-list .settings-connected-accounts").appendChild(connect);
    }
    
    // TODO: remap css classes
    window.mydiscord.addProfileConnection = function(connectionName, connectionIcon, isVerified, externalLink){
        if(document.querySelector("#user-profile-modal") != null && document.querySelector("#user-profile-modal .tab-bar :first-child").className == "tab-bar-item selected"){
            let account = document.createElement("div");
            account.className = "connected-account";
            
            let icon = document.createElement("img");
            icon.className = "connected-account-icon";
            icon.src = connectionIcon;
            
            let name_wrapper = document.createElement("div");
            name_wrapper.className = "connected-account-name-inner";
            
            let name = document.createElement("div");
            name.className = "connected-account-name";
            name.innerHTML = connectionName;
            
            let verified = document.createElement("i");
            verified.className = "connected-account-verified-icon";
            
            let link = document.createElement("a");
            link.href = externalLink;
            link.rel = "noreferrer";
            link.target = "_blank";
            link.innerHTML = "<div class=\"connected-account-open-icon\"></div>";
            
            name_wrapper.appendChild(name);
            if(isVerified) name_wrapper.appendChild(verified);
            
            account.appendChild(icon);
            account.appendChild(name_wrapper);
            account.appendChild(link);
            
            if(document.querySelector("#user-profile-modal .connected-accounts") == null){
                let section = document.createElement("div");
                section.className = "section";
                
                let account_wrap = document.createElement("div");
                div.className = "connected-accounts";
                
                section.appendChild(account_wrap);
                document.querySelector("#user-profile-modal .guilds").appendChild(section);
            }
            document.querySelector("#user-profile-modal .connected-accounts").appendChild(account);
        }
    }
    
    window.mydiscord.addOptionCheckbox = function(title, desc, state, callback){
        if(customOptions[title] != undefined) throw new Error("Key " + title + " already exists !");
        customOptions[title] = getCheckbox(title, desc, state, callback);
        customOptions.length++;
        
        if(document.querySelector('.mydiscord-options') !== null){
            buildUi();
        }
    }
    
    window.mydiscord.addOptionInput = function(title, desc, inputProperties, callback){
        if(customOptions[title] != undefined) throw new Error("Key " + title + " already exists !");
        customOptions[title] = getInput(title, desc, inputProperties, callback);
        customOptions.length++;
        
        if(document.querySelector('.mydiscord-options') !== null){
            buildUi();
        }
    }
    
    window.mydiscord.removeOption = function(title){
        if(customOptions[title] == undefined) throw new Error("Key " + title + " not found !");
        delete customOptions[title];
        customOptions.length--;
        
        if(document.querySelector('.mydiscord-options') !== null){
            buildUi();
        }
    }
    
    // TODO: dialog types (info, question, error...), form inputs
    window.mydiscord.dialog = function(title, contents, doneCallback){
        if(doneCallback === undefined || doneCallback === null) doneCallback = function(){};
        
        if(document.querySelector(".mydiscord-dialog") !== null) document.querySelector(".mydiscord-dialog").remove();
        
        let global_container = document.createElement("div");
        global_container.className = "theme-dark mydiscord-dialog";
        
        let overlay = document.createElement("div");
        overlay.className = "callout-backdrop";
        overlay.setAttribute("style", "opacity: 0.85; background-color: rgb(0, 0, 0); transform: translateZ(0px);")
        overlay.addEventListener("click", function(){
            document.querySelector(".mydiscord-dialog").remove();
            doneCallback();
        });
        
        let modal = document.createElement("div");
        modal.className = "mydiscord-modal";
        
        let modal_inner = document.createElement("div");
        modal_inner.className = "mydiscord-modal-inner";
        
        let header = document.createElement("div");
        header.className = "mydiscord-modal-header";
        
        let header_title = document.createElement("h4");
        header_title.innerHTML = title;
        
        let modal_contents_wrap = document.createElement("div");
        modal_contents_wrap.className = "mydiscord-modal-scollerWrap";
        
        let modal_contents = document.createElement("div");
        modal_contents.className = "mydiscord-modal-scroller";
        modal_contents.innerHTML = contents;
        
        let modal_footer = document.createElement("div");
        modal_footer.className = "mydiscord-modal-footer";
        
        let modal_button = document.createElement("button");
        modal_button.className = "mydiscord-modal-button-done";
        modal_button.type = "button";
        modal_button.innerHTML = "<div class=\"mydiscord-modal-button-inner\">Done</div>";
        modal_button.addEventListener("click", function(){
            document.querySelector(".mydiscord-dialog").remove();
            doneCallback();
        });
        
        modal_footer.appendChild(modal_button);
        modal_contents_wrap.appendChild(modal_contents);
        
        header.appendChild(header_title);
        
        modal_inner.appendChild(header);
        modal_inner.appendChild(modal_contents_wrap);
        modal_inner.appendChild(modal_footer);
        modal.appendChild(modal_inner);
        
        global_container.appendChild(overlay);
        global_container.appendChild(modal);
        
        document.querySelector("#app-mount > div").appendChild(global_container);
    }
    
    let _baseUrl = "https://rawgit.com/justinoboyle/mydiscord/master/";
    
    const request = require('request');
    
    /* Google Analytics */ // google analytics, sorry!! but you can disable this if you want by setting a global variable called "noAnalyze" or directly from myDiscord options in Discord
    function initGa(){
        (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-78491625-4', 'auto');
        ga('send', 'pageview');
        ga('set', 'userId', document.getElementsByClassName("username")[0].textContent + document.getElementsByClassName("discriminator")[0].textContent);
    }
    
    function sendGa(data){
        if(!global.noAnalyze && ga){
            ga('send', data);
        }
    }
    
    if (!global.noAnalyze) {
        setTimeout(() => { // Fix https://bowser65.tk/data/mydiscord-bug1.png
            initGa();
        }, 2000);
    }
    
    mydiscord.loadCSS(_baseUrl + 'styles.css');
    
    /* Toast */
    let openToasts = {};
    let id = 0;
    if (typeof (window.config.toasts) === "undefined") {
        window.config.toasts = {};
        saveConfig();
    }
    function toast(main, subtext, _anaid) {
        if (_anaid) {
            if(openToasts[_anaid])
                return;
            openToasts[_anaid] = true;
            sendGa('toast-open-' + _anaid);
        }
        let _id = id++;
        const html = `
        <div class="toast-content">
            <span class="toast-main">${main}</span>
            ${subtext ? `<span class="toast-subtext">${subtext}</span>` : ``}
        </div>
        <div class="toast-closeButton" onclick="global._closeToast(${_id}, '${_anaid || "no"}');">X</div>
    `;
        const el = document.createElement("div");
        el.setAttribute("class", "toast toast-dying");
        el.setAttribute("id", "toast" + _id);
        el.innerHTML = html;
        document.body.insertBefore(el, document.getElementById('app-mount'));
        setTimeout(() => {
            el.setAttribute("class", "toast");
        }, 200);
        return el;
    }
    function closeToast(id, _anaid) {
        if (!document.getElementById('toast' + id))
            return;
        if (_anaid && _anaid !== "no") {
            sendGa('toast-close-' + _anaid);
            if (openToasts[_anaid])
                delete openToasts[_anaid];
            if(!window.config.toasts)
                window.config.toasts = {};
            window.config.toasts[_anaid] = "seen";
            window.saveConfig();
        }
        let toast = document.getElementById('toast' + id);
        toast.setAttribute('class', 'toast toast-dying');
        setTimeout(() => {
            toast.parentNode.removeChild(toast);
        }, 200);
    }
    global._toast = toast;
    global._closeToast = closeToast;
    function check() {
        request(_baseUrl + 'announcements.json', function (error, response, body) {
            let parse = JSON.parse(body);
            for (let key in parse) {
                if (!window.config.toasts[key] && !openToasts[key]) {
                    let obj = parse[key];
                    toast(obj.main, obj.subtext, key);
                    return; // one at a time.
                }
            }
        });
    }
    check();
    setInterval(check, 10 * 1000);
    
    /* MyDiscord UI */
    
    setInterval(() => {
        if(document.querySelector('.app .layers .layer+.layer .btn-close') !== null &&
        document.querySelector('.app .layers .layer+.layer .sidebar > div').innerHTML.includes('User Settings') &&
        !document.querySelector('.app .layers .layer+.layer .sidebar > div').innerHTML.includes('MyDiscord')){
            
            let header_class = document.querySelector('.app .layers .layer+.layer .sidebar > div > div').className;
            let unselected_class = document.querySelector('.app .layers .layer+.layer .sidebar > div > div + div + div').className;
            let selected_class = document.querySelector('.app .layers .layer+.layer .sidebar > div > div[class*=itemDefaultSelected]').className;
            let social_class = document.querySelector('.app .layers .layer+.layer .sidebar > div > div[class*=socialLinks]').className;
            let social_link_class = document.querySelector('.app .layers .layer+.layer .sidebar > div > div[class*=socialLinks] a').className;
            
            let button = document.createElement('div');
            button.className = unselected_class;
            button.innerHTML = "myDiscord";
            button.addEventListener("click", buildUi);
            
            let header = document.createElement("div");
            header.className = header_class;
            header.innerHTML = "myDiscord links";
            
            let social_links = document.createElement("div");
            social_links.className = social_class + " settings-social-mydiscord";
            
            let github_link = document.createElement("a");
            github_link.target = "_blank";
            github_link.rel = "MyDiscord author";
            github_link.title = "MyDiscord - GitHub";
            github_link.href = "https://github.com/justinoboyle/mydiscord";
            github_link.className = social_link_class;
            github_link.innerHTML = '<span class="settings-logo-github"></span>';
            
            let discord_link = document.createElement("a");
            discord_link.target = "_blank";
            discord_link.rel = "myDiscord author";
            discord_link.title = "myDiscord - Discord chat";
            discord_link.href = "https://discord.gg/rN3WMWn";
            discord_link.className = social_link_class;
            discord_link.innerHTML = '<span class="settings-logo-discord"></span>';
            
            let ref = document.querySelector('.app .layers .layer+.layer .sidebar > div div:nth-child(20)');
            ref.parentNode.insertBefore(button, ref.nextSibling);
            
            social_links.appendChild(github_link);
            social_links.appendChild(discord_link);
            ref.parentNode.appendChild(header);
            ref.parentNode.appendChild(social_links);
            
            let elements = document.querySelectorAll('.app .layers .layer+.layer .sidebar > div > div[class*=item]');
            for (i = 0; i < elements.length; ++i) {
                let el = elements[i];
                el.addEventListener("click", function(){
                    let a = document.querySelectorAll("." + selected_class.split(" ").join("."));
                    a[a.length - 1].className = unselected_class;
                    this.className = selected_class;
                });
            }
            
        }
    }, 100);
    
    function buildUi(){
        /* Checking */
        if(document.querySelector(".app .layers .layer+.layer .content-column") === null) return;
        
        /* Create elements */
        let discord_container = document.querySelector(".app .layers .layer+.layer .content-column > div");
        discord_container.className = "mydiscord-options";
        
        let container = document.createElement("div");
        container.className = "flex-vertical";
        
        let title = document.createElement("h2");
        title.className = "settings-title";
        title.innerHTML = "MyDiscord";
        
        let option_ga = getCheckbox("Google Analytics", "MyDiscord sends stats about your utilisation of myDiscord to help us improve. You can disable it or just leave it turned on.", !global.noAnalyze, function(){
                global.noAnalyze = !global.noAnalyze;
                if(!global.noAnalyze && !ga){
                    initGa();
                }
            });
        
        /* Build */
        discord_container.innerHTML = null;
        container.appendChild(title);
        container.appendChild(option_ga);
        
        /* Add users options */
        if(customOptions.length != 0){
            let heading = document.createElement("h5");
            heading.className = "settings-heading";
            heading.innerHTML = "Plugin options";
            container.appendChild(heading);
            
            for(let k in customOptions) {
                container.appendChild(customOptions[k]);
            }
        }
        
        discord_container.appendChild(container);
    }
})();
