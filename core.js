(() => {
    /* Global */
    if (!window.saveConfig)
        window.saveConfig = () => console.log("Could not save config!");
    if (!window.config)
        window.config = {};
    
    let _baseUrl = "https://rawgit.com/justinoboyle/mydiscord/master/";
    
    const request = require('request');
    let userid = document.getElementsByClassName("username")[0].textContent + document.getElementsByClassName("discriminator")[0].textContent;
    
    /* Google Analytics */ // google analytics, sorry!! but you can disable this if you want by setting a global variable called "noAnalyze" or directly from MyDiscord options in Discord
    function initGa(){
        (function (i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date(); a = s.createElement(o),
            m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
        ga('create', 'UA-78491625-4', 'auto');
        ga('send', 'pageview');
        ga('set', 'userId', userid);
    }
    
    function sendGa(data){
        if(!global.noAnalyze && ga){
            ga('send', data);
        }
    }
    
    if (!global.noAnalyze) {
        initGa();
    }
    
    if (!document.getElementById('mydiscord-css')){
        let stylesheet = document.createElement("link");
        stylesheet.id = 'mydiscord-css';
        stylesheet.rel = 'stylesheet';
        stylesheet.href = _baseUrl + 'styles.css?nocache=' + Math.random() * (666 - 100) + 100;
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
    }
    
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
        !document.querySelector('.app .layers .layer+.layer .sidebar > div').innerHTML.includes('MyDiscord')){
            
            let header_class = document.querySelector('.app .layers .layer+.layer .sidebar > div > div').className;
            let unselected_class = document.querySelector('.app .layers .layer+.layer .sidebar > div > div + div + div').className;
            let selected_class = document.querySelector('.app .layers .layer+.layer .sidebar > div > div + div').className;
            let social_class = document.querySelector('.app .layers .layer+.layer .sidebar > div > div[class*=socialLinks]').className;
            let social_link_class = document.querySelector('.app .layers .layer+.layer .sidebar > div > div[class*=socialLinks] a').className;
            
            let button = document.createElement('div');
            button.className = unselected_class;
            button.innerHTML = "MyDiscord";
            button.addEventListener("click", buildUi);
            
            let header = document.createElement("div");
            header.className = header_class;
            header.innerHTML = "MyDiscord links";
            
            let social_links = document.createElement("div");
            social_links.className = social_class;
            
            let github_link = document.createElement("a");
            github_link.target = "_blank";
            github_link.rel = "MyDiscord author";
            github_link.title = "MyDiscord - GitHub";
            github_link.href = "https://github.com/justinoboyle/mydiscord";
            github_link.className = social_link_class;
            github_link.innerHTML = '<span class="settings-logo-github"></span>';
            
            let discord_link = document.createElement("a");
            discord_link.target = "_blank";
            discord_link.rel = "MyDiscord author";
            discord_link.title = "MyDiscord - Discord chat";
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
        
        /* Creating elements */
        let discord_container = document.querySelector(".app .layers .layer+.layer .content-column > div");
        discord_container.className = "mydiscord-options";
        
        let container = document.createElement("div");
        container.className = "flex-vertical";
        
        let title = document.createElement("h2");
        title.className = "settings-title";
        title.innerHTML = "MyDiscord";
        
        let option_ga = getCheckbox("Google Analytics", "MyDiscord sends stats about your utilisation of MyDiscord. You can disable it or just let it turned on", !global.noAnalyze, function(){
                global.noAnalyze = !global.noAnalyze;
                if(!global.noAnalyze && !ga){
                    initGa();
                }
            });
        
        /* Building */
        discord_container.innerHTML = null;
        container.appendChild(title);
        container.appendChild(option_ga);
        discord_container.appendChild(container);
    }
    
    
    function getCheckbox(title, descText, state, clickCallback){
        /* Creating elements */
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
        
        /* Building element */
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
})();