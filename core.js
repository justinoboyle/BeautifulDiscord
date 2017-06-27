(() => {
    if (!window.saveConfig)
        window.saveConfig = () => console.log("Could not save config!");
    if (!window.config)
        window.config = {};
    const request = require('request');
    let userid = document.getElementsByClassName("username")[0].textContent + document.getElementsByClassName("discriminator")[0].textContent;
    // google analytics, sorry!! but you can disable this if you want by setting a global variable called "noAnalyze"
    if (!global.noAnalyze) {
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
    let toastStyling = `
.toast {
    width: 100%;
    position: fixed;
    background-color: rgba(0,0,0,0.8);
    z-index: 100;
    bottom: 0px;
    padding: 10px 10px 10px 10px;
    color: white;
    webkit-transition: all 150ms ease-in ease-out;
    transition: all 150ms ease-in ease-out;
    opacity: 100%;
}
.toast-dying {
    opacity: 0%;
    bottom: -43px;
    webkit-transition: all 150ms ease-in ease-out;
    transition: all 150ms ease-in ease-out;
}
.toast-main {
    font-size: 20px;
    font-weight: 600;
}
.toast-subtext:before {
    font-size: 20px;
    font-weight: 200;
    content: " | "
}
.toast-subtext {
    font-size: 18px;
    font-weight: 300;
}
.toast-content {
    padding-right: 40px;
}
.toast-closeButton {
    right: 30px;
    position: absolute;
    bottom: 25%;
}
#app-mount {
    z-index: 1;
}`;
    let openToasts = {};
    let id = 0;
    if (typeof (window.config.toasts) === "undefined") {
        window.config.toasts = {};
        saveConfig();
    }
    function toast(main, subtext, _anaid) {
        _insertCSS();
        if (_anaid) {
            if (openToasts[_anaid])
                return;
            openToasts[_anaid] = true;
            ga('send', 'toast-open-' + _anaid);
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
            ga('send', 'toast-close-' + _anaid);    
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
    function _insertCSS() {
        let _tsEl;
        if (!document.getElementById('toastStyling')) {
            _tsEl = document.createElement("style");
            _tsEl.setAttribute('id', 'toastStyling');
            document.body.insertBefore(_tsEl, document.getElementById('app-mount'));
        }
        _tsEl = document.getElementById("toastStyling");
        _tsEl.innerHTML = toastStyling;
        return _tsEl;
    }
    function check() {
        request('https://raw.githubusercontent.com/justinoboyle/mydiscord/master/announcements.json', function (error, response, body) {
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
})();
