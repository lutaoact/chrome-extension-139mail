﻿var PluginConfig = {
    Plugin_Pop_Page_Width: 312,
    Max_Mail_Count: 10,
    ExceptFidMap: [5, 6, 11],
    BehaviorId: {
        "Chrome": {
            "Register": 10163,
            "Login": 10164,
            "SSOLogin": 10165
        },
        "Sogou": {
            "Register": 10215,
            "Login": 10216,
            "SSOLogin": 10217
        },
        "Maxthon": {
            "Register": 10293,
            "Login": 10292,
            "SSOLogin": 10294
        }
    },
    DomainConfig: {
        "AppServer": "html5.mail.10086.cn",
        "RM_AppServer": "appmail.mail.10086.cn",
        "Index": "mail.10086.cn",
        "ImgCodeServer": "imagecode.mail.10086.cn",
        "BehaviorServer": "g2.mail.10086.cn"
    },
    ServerPath: {
        "Login": "/Login/Login.ashx",
        "AutoLogin": "/login/autologin.ashx",
        "LoginProxy": "/RmWeb/chrome/extensionLogin.html",
        "LoginSuccessProxy": "/RmWeb/chrome/extensionLoginSuccess.html",
        "WebMail": "/m2015/html/index.html?func=global:execTemp",
        "Register": "/s?func=umc:rdirectTo",
        "ImgCode": "/getimage?clientid=1&5377",
        "Behavior": "/Behavior/BehaviorGather.ashx"
    },
    StorageKey: {
        "UserData": "$mobile$-userdata",
        "LoginFlag": "$mobile$-login-flag",
        "UserSettings": "$mobile$-user-settings",
        "BehaviorData": "behavior-data"
    },
    DefaultSettings: {
        showNotificationFlag: true,
        checkMailInterval: 5,
        autoLoginFlag: true
    },
    getProtocal: function () {
        return "http://";
    },
    getBehaviorServer: function () {
        return this.getProtocal() + this.DomainConfig.BehaviorServer + this.ServerPath.Behavior;
    },
    getImgCodeServer: function () {
        return this.getProtocal() + this.DomainConfig.ImgCodeServer + this.ServerPath.ImgCode;
    },
    getRegisterServer: function () {
        return this.getProtocal() + this.DomainConfig.Index + this.ServerPath.Register;
    },
    getRmAppServer: function (webappServer) {
        var appServer = webappServer || this.DomainConfig.RM_AppServer;
        return this.getProtocal() + appServer + this.ServerPath.WebMail;
    },
    getLoginServer: function () {
        return this.getProtocal() + this.DomainConfig.Index + this.ServerPath.Login;
    },
    getAutoLoginServer: function () {
        return this.getProtocal() + this.DomainConfig.Index + this.ServerPath.AutoLogin;
    },
    getLoginProxySrc: function () {
        return this.getProtocal() + this.DomainConfig.RM_AppServer + this.ServerPath.LoginProxy;
    },
    getLoginSuccessProxySrc: function () {
        return this.getProtocal() + this.DomainConfig.RM_AppServer + this.ServerPath.LoginSuccessProxy;
    }
};

﻿///<reference path='../ts/chrome.d.ts' />
String.prototype.trim = function () {
    return this.replace(/^\s*/, '').replace(/\s*$/, '');
};

var _;
(function (_) {
    (function (Dom) {
        function bind(el, eventType, eventHandler) {
            if (typeof el === "string") {
                el = this.getEl(el);
            }
            if (el.addEventListener) {
                el.addEventListener(eventType, eventHandler);
            } else {
                el.attachEvent('on' + eventType, eventHandler);
            }
        }
        Dom.bind = bind;

        function unbind(el, eventType, eventHandler) {
            if (typeof el === "string") {
                el = this.getEl(el);
            }
            if (el.removeEventListener) {
                el.removeEventListener(eventType, eventHandler);
            } else {
                el.detachEvent('on' + eventType, eventHandler);
            }
        }
        Dom.unbind = unbind;

        function getEl(id) {
            return document.getElementById(id);
        }
        Dom.getEl = getEl;

        function getInputValue(id) {
            return this.getEl(id).value.trim();
        }
        Dom.getInputValue = getInputValue;

        function isInputEmpty(id) {
            return this.getInputValue(id) === "";
        }
        Dom.isInputEmpty = isInputEmpty;

        function getAll(expression) {
            return document.querySelectorAll(expression);
        }
        Dom.getAll = getAll;

        function show(el) {
            if (_.Utils.isArray(el)) {
                for (var i in el) {
                    arguments.callee(el[i]);
                }
            } else {
                if (typeof el === "string") {
                    el = this.getEl(el);
                }
                el.style.display = "block";
            }
        }
        Dom.show = show;

        function hide(el) {
            if (_.Utils.isArray(el)) {
                for (var i in el) {
                    arguments.callee(el[i]);
                }
            } else {
                if (typeof el === "string") {
                    el = this.getEl(el);
                }
                el.style.display = "none";
            }
        }
        Dom.hide = hide;

        function hasClass(el, className) {
            el = typeof el === "string" ? this.getEl(el) : el;
            return (" " + el.className + " ").replace(/[\n\t\r]/g, " ").indexOf(className) > -1;
        }
        Dom.hasClass = hasClass;

        function addClass(el, className) {
            if (_.Utils.isArray(el)) {
                for (var p in el) {
                    arguments.callee(el[p]);
                }
            } else {
                el = typeof el === "string" ? this.getEl(el) : el;
                var classNames = className.split(/\s+/);
                if (el.nodeType === 1) {
                    if (!el.className && classNames.length === 1) {
                        el.className = className;
                    } else {
                        var setClass = " " + el.className + " ";

                        for (var i = 0, len = classNames.length; i < len; i++) {
                            if (setClass.indexOf(" " + classNames[i] + " ") < 0) {
                                setClass += classNames[i] + " ";
                            }
                        }
                        el.className = setClass.trim();
                    }
                }
            }
        }
        Dom.addClass = addClass;

        function removeClass(el, className) {
            if (_.Utils.isArray(el)) {
                for (var p in el) {
                    arguments.callee(el[p]);
                }
            } else {
                el = typeof el === "string" ? this.getEl(el) : el;
                var classNames = className.split(/\s+/);
                if (el.nodeType === 1) {
                    classNames = (className || "").split(/\s+/);
                    if (el.nodeType === 1 && el.className) {
                        if (className) {
                            className = (" " + el.className + " ").replace(/[\n\t\r]/g, " ");
                            for (var i = 0, len = classNames.length; i < len; i++) {
                                className = className.replace(" " + classNames[i] + " ", " ");
                            }
                            el.className = className.trim();
                        } else {
                            el.className = "";
                        }
                    }
                }
            }
        }
        Dom.removeClass = removeClass;

        function toggleClass(el, className1, className2) {
            if (_.Utils.isArray(el)) {
                for (var p in el) {
                    arguments.callee(el[p]);
                }
            } else {
                el = typeof el === "string" ? this.getEl(el) : el;
                if (typeof className2 != 'undefined') {
                    if (this.hasClass(el, className1)) {
                        this.removeClass(el, className1);
                        this.addClass(el, className2);
                    } else {
                        this.removeClass(el, className2);
                        this.addClass(el, className1);
                    }
                } else {
                    if (this.hasClass(el, className1)) {
                        this.removeClass(el, className1);
                    } else {
                        this.addClass(el, className1);
                    }
                }
            }
        }
        Dom.toggleClass = toggleClass;

        function removeEl(el) {
            var arr = [];
            if (el instanceof NodeList && el.length) {
                for (var k = 0, len = el.length; k < len; k++) {
                    arr.push(el[k]);
                }
                el = arr;
            }

            if (_.Utils.isArray(el)) {
                for (var i = 0, l = el.length; i < l; i++) {
                    arguments.callee.call(this, el[i]);
                }
            } else {
                try  {
                    el = this.getEl(el);
                    el.parentNode.removeChild(el);
                } catch (e) {
                }
            }
        }
        Dom.removeEl = removeEl;

        function getParent(el, parentTagName, className) {
            var parent = el;
            do {
                parent = parent.parentNode;
            } while(parent && ((typeof (className) == "undefined" && parent.tagName.toLowerCase() != parentTagName) || (typeof (className) != "undefined" && (!this.hasClass(parent, className) || parent.tagName.toLowerCase() != parentTagName))) && parent.tagName.toLowerCase() != "body");
            return parent && ((typeof (className) == "undefined" && parent.tagName.toLowerCase() == parentTagName) || (typeof (className) != "undefined" && this.hasClass(parent, className) && parent.tagName.toLowerCase() == parentTagName)) ? parent : null;
        }
        Dom.getParent = getParent;

        function ready(callBack) {
            document.addEventListener("DOMContentLoaded", callBack, false);
        }
        Dom.ready = ready;
    })(_.Dom || (_.Dom = {}));
    var Dom = _.Dom;

    (function (Event) {
        Event.KeyCode = {
            'Enter': '13'
        };

        function getEvent(e) {
            return e || window.event;
        }
        Event.getEvent = getEvent;

        function getEventTarget(e) {
            var event = this.getEvent(e);
            return event.srcElement || event.target;
        }
        Event.getEventTarget = getEventTarget;

        function stopEventBubble(e) {
            var event = this.getEvent(e);
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
        }
        Event.stopEventBubble = stopEventBubble;
    })(_.Event || (_.Event = {}));
    var Event = _.Event;

    (function (Text) {
        function htmlEncode(htmlStr) {
            if (typeof htmlStr != "string")
                return "";
            htmlStr = htmlStr.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/ /g, "&nbsp;").replace(/&amp;#([^\;]+);/ig, "&#$1;");
            return htmlStr;
        }
        Text.htmlEncode = htmlEncode;

        function xmlEncode(text) {
            var charMap = {
                '&amp;': '&',
                '&quot;': '"',
                '&lt;': '<',
                '&gt;': '>'
            };

            //多次replace有bug，必须用逼近式替换
            return text.replace(/([\&"<>])/g, function (str, item) {
                return charMap[item];
            });
        }
        Text.xmlEncode = xmlEncode;

        function format(template, dataObj) {
            var tmp;
            for (var k in dataObj) {
                var re = new RegExp('\\{' + k + '\\}', 'gm');
                tmp = String(dataObj[k]).replace(/\$/g, "$$$$");
                template = template.replace(re, tmp);
            }
            return template;
        }
        Text.format = format;

        function parseXML(text) {
            var b = null;
            try  {
                var d = new DOMParser();
                b = d.parseFromString(text, "text/xml");
            } catch (c) {
            }
            return b;
        }
        Text.parseXML = parseXML;

        function xml2object(xmlStr) {
            var result = null;
            var doc = this.parseXML(xmlStr);
            if (doc && doc.documentElement) {
                var el = doc.documentElement;
                result = getObject(el);
            }
            return result;
            function getObject(el) {
                if (el.firstChild && el.firstChild.nodeType == 3) {
                    return el.firstChild.textContent;
                } else {
                    if (el.firstChild) {
                        var obj = {};
                        if (el.childNodes) {
                            for (var i = 0; i < el.childNodes.length; i++) {
                                var child = el.childNodes[i];
                                var oldItem = obj[child.nodeName];

                                if (oldItem) {
                                    if (!oldItem.sort) {
                                        obj[child.nodeName] = [oldItem];
                                    }
                                    obj[child.nodeName].push(getObject(child));
                                } else {
                                    obj[child.nodeName] = getObject(child);
                                }
                            }
                        }
                        return obj;
                    } else {
                        return "";
                    }
                }
            }
        }
        Text.xml2object = xml2object;

        function tryEval(str) {
            var result = null;
            try  {
                result = eval('(' + str + ')');
            } catch (e) {
            }
            return result;
        }
        Text.tryEval = tryEval;

        function parseJson(json) {
            var result = null;
            try  {
                result = JSON.parse(json);
            } catch (e) {
            }

            if (result) {
                return result;
            }

            json = json.replace(/\\(.)/g, function (v, $1) {
                if ($1 == '"') {
                    return '\\u0022';
                } else if ($1 == '\\') {
                    return "\\u005c";
                } else if ($1 == "'") {
                    return "\\u0027";
                }
                return v;
            });

            json = json.replace(/:\s*"([^"]*)"/g, function (v, $1) {
                $1 = $1.replace(/'/g, "\\u0027");
                $1 = $1.replace(/:/g, "\\u003a");
                return ':"' + $1 + '"';
            });

            json = json.replace(/'([^']*)'/g, function (v, $1) {
                $1 = $1.replace(/"/g, "\\u0022");
                $1 = $1.replace(/:/g, "\\u003a");
                return '"' + $1 + '"';
            });

            json = json.replace(/([_a-zA-Z0-9]+)\s*:/g, function (v, $1) {
                return '"' + $1 + '":';
            });

            try  {
                result = JSON.parse(json);
            } catch (e) {
                console.log(json);
            }
            return result;
        }
        Text.parseJson = parseJson;

        function json2xml(obj) {
            return varToXML(obj);
            function varToXML(obj) {
                return namedVarToXML(null, obj, "\n").substr(1);
            }
            function getDataType(obj) {
                return Object.prototype.toString.call(obj).replace(/^\[object (\w+)\]$/, "$1");
            }
            function namedVarToXML(name, obj, prefix) {
                if (obj == null) {
                    return prefix + tagXML("null", name);
                }
                var type = getDataType(obj);
                if (type == "String") {
                    return prefix + tagXML("string", name, this.xmlEncode(textXML(obj)));
                } else {
                    if (type == "Object") {
                        if (obj.nodeType) {
                            return "";
                        }
                        var s = "";
                        for (var p in obj) {
                            s += namedVarToXML(p, obj[p], prefix + "  ");
                        }
                        return prefix + tagXML("object", name, s + prefix);
                    } else {
                        if (type == "Array") {
                            var s = "";
                            for (var i = 0; i < obj.length; i++) {
                                s += namedVarToXML(null, obj[i], prefix + "  ");
                            }
                            return prefix + tagXML("array", name, s + prefix);
                        } else {
                            if (type == "Boolean" || type == "Number") {
                                var s = obj.toString();
                                return prefix + tagXML(getVarType(obj, s), name, s);
                            } else {
                                if (type == "Date") {
                                    var s = "" + obj.getFullYear() + "-" + (obj.getMonth() + 1) + "-" + obj.getDate();
                                    if (obj.getHours() > 0 || obj.getMinutes() > 0 || obj.getSeconds() > 0) {
                                        s += " " + obj.getHours() + ":" + obj.getMinutes() + ":" + obj.getSeconds();
                                    }
                                    return prefix + tagXML(getVarType(obj, s), name, s);
                                } else {
                                    return "";
                                }
                            }
                        }
                    }
                }
            }
            function getVarType(obj, stringValue) {
                if (obj == null) {
                    return "null";
                }
                var type = getDataType(obj);
                if (type == "Number") {
                    var s = stringValue ? stringValue : obj.toString();
                    if (s.indexOf(".") == -1) {
                        if (obj >= -2 * 1024 * 1024 * 1024 && obj < 2 * 1024 * 1024 * 1024) {
                            return "int";
                        } else {
                            if (!isNaN(obj)) {
                                return "long";
                            }
                        }
                    }
                    return "int";
                } else {
                    return type;
                }
            }
            function tagXML(dataType, name, val) {
                var s = "<" + dataType;
                if (name) {
                    s += " name=\"" + textXML(name) + "\"";
                }
                if (val) {
                    s += ">" + val;
                    if (val.charAt(val.length - 1) == ">") {
                        s += "\n";
                    }
                    return s + "</" + dataType + ">";
                } else {
                    return s + " />";
                }
            }
            function textXML(s) {
                //s=s.htmlencode();
                s = s.replace(/[\x00-\x08\x0b\x0e-\x1f]/g, "");
                return s;
            }
            function replaceDataType(arr, xml) {
                var count = arr.length;
                for (var i = 0; i < count; i++) {
                    xml = xml.replace(arr[i].type, arr[i].replaceTxt);
                }
                return xml;
            }
        }
        Text.json2xml = json2xml;
    })(_.Text || (_.Text = {}));
    var Text = _.Text;

    (function (Email) {
        function getName(email) {
            email = email.trim();
            if (this.check(email)) {
                return email.split("@")[0];
            } else if (this.checkText(email)) {
                var name = email.replace(/<[^@<>]+@[^@<>]+>$/, "");
                name = name.replace(/"/g, "").trim();
                if (name == "")
                    return this.getAccount(email);
                return name;
            } else {
                return "";
            }
        }
        Email.getName = getName;

        function check(text) {
            text = text.trim();

            //RFC 2822
            var reg = new RegExp("^[a-z0-9\.!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$", "i");
            var result = reg.test(text);
            return result;
        }
        Email.check = check;

        function checkText(text) {
            text = text.trim();
            if (this.check(text)) {
                return true;
            }
            var a = new RegExp('<([^<>\\s]+)>$');
            var b = text.match(a);
            if (b) {
                if (this.check(b[1])) {
                    return true;
                } else {
                    return false;
                }
            }
            return false;
        }
        Email.checkText = checkText;

        function getAccount(email) {
            email = email.trim();
            if (this.check(email)) {
                return email.split("@")[0];
            } else if (this.checkText(email)) {
                return email.match(/<([^@<>]+)@[^@<>]+>$/)[1];
            } else {
                return "";
            }
        }
        Email.getAccount = getAccount;

        function getEmail(number) {
            return _.Mobile.remove86(number) + "@139.com";
        }
        Email.getEmail = getEmail;

        function getSendText(name, email) {
            return name.replace(/[\s;,；，<>"]/g, " ") + "<" + email.replace(/[\s;,；，<>"]/g, "") + ">";
        }
        Email.getSendText = getSendText;
    })(_.Email || (_.Email = {}));
    var Email = _.Email;

    (function (Mobile) {
        function remove86(num) {
            return num.trim().replace(/^86(?=\d{11}$)/, "");
        }
        Mobile.remove86 = remove86;

        function getEmail(num) {
            if (_.Email.check(num)) {
                return num;
            }
            return num + "@139.com";
        }
        Mobile.getEmail = getEmail;
    })(_.Mobile || (_.Mobile = {}));
    var Mobile = _.Mobile;

    (function (DateTime) {
        function format(template, date) {
            var o = {
                "M+": date.getMonth() + 1,
                "d+": date.getDate(),
                "h+": date.getHours(),
                "m+": date.getMinutes(),
                "s+": date.getSeconds(),
                "q+": Math.floor((date.getMonth() + 3) / 3),
                "S": date.getMilliseconds(),
                "w": "日一二三四五六".charAt(date.getDay()),
                "y{4}": date.getFullYear(),
                "y{2}": date.getFullYear().toString().substring(2)
            };
            for (var k in o) {
                var reg = new RegExp(k);
                template = template.replace(reg, match);
            }
            function match(m) {
                return m.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length);
            }
            return template;
        }
        DateTime.format = format;

        function getFriendlyString(date, now) {
            if (!date)
                return "";
            now = now || new Date();
            var result;

            //今天的邮件
            var t = now.getTime() - date.getTime();
            if (t < 0) {
                result = this.format("yyyy-M-dd", date);
            } else if (date.getFullYear() == now.getFullYear() && date.getMonth() == now.getMonth() && date.getDate() == now.getDate()) {
                var minutes = Math.round(t / 1000 / 60);

                if (minutes >= 0 && minutes < 60) {
                    result = minutes + "分钟前";
                } else {
                    result = Math.floor(minutes / 60) + "小时前";
                }
            } else if (date.getFullYear() == new Date().getFullYear()) {
                result = this.format("M-dd (w) hh: mm", date);
            } else {
                result = this.format("yyyy-M-dd(w)", date);
            }
            return result;
        }
        DateTime.getFriendlyString = getFriendlyString;

        function getHelloString(date) {
            date = date || new Date();
            var hour = date.getHours();
            var map = {
                "0": "凌晨了",
                "1": "上午好",
                "2": "中午好",
                "3": "下午好",
                "4": "晚上好",
                "5": "夜深了"
            };

            //0点-3点深夜 3点-6点凌晨 6点-11点上午 11点-13点中午……
            var hoursList = "555000111112233333344444";
            var index = hoursList.charAt(hour);
            return map[index];
        }
        DateTime.getHelloString = getHelloString;
    })(_.DateTime || (_.DateTime = {}));
    var DateTime = _.DateTime;

    (function (Url) {
        function getParam(key, url) {
            url = url || location.href;
            var urlObj = this.getUrlObj(url);
            return urlObj[key];
        }
        Url.getParam = getParam;

        function getUrlObj(url) {
            var urlObj = {};
            url = url || location.href;

            var paramPattens = url.match(/([^?#&]*)=([^#&]*)/g);

            if (paramPattens) {
                for (var i = 0, len = paramPattens.length; i < len; i++) {
                    var match = paramPattens[i].match(/([^=]*)=(.*)/);
                    if (match) {
                        var key = match[1], value = match[2];
                        try  {
                            value = decodeURIComponent(value);
                        } catch (e) {
                        }

                        urlObj[key] = value;
                    }
                }
            }
            return urlObj;
        }
        Url.getUrlObj = getUrlObj;

        function makeUrl(url, options) {
            var paramMap = [];
            var flag = url.indexOf("?") > -1 ? "&" : "?";

            for (var p in options) {
                paramMap.push(p + "=" + encodeURIComponent(options[p]));
            }

            return url + flag + paramMap.join("&");
        }
        Url.makeUrl = makeUrl;
    })(_.Url || (_.Url = {}));
    var Url = _.Url;

    (function (Cookie) {
        function getAllCookie(cookie) {
            var cookies = cookie || document.cookie;
            var cookieObj = {};

            try  {
                var cookiePatterns = cookie.match(new RegExp("(^|\\W)([^=]*)=([^;]*)(;|$)", "g"));

                for (var i = 0, len = cookiePatterns.length; i < len; i++) {
                    var match = cookiePatterns[i].match(/([^=]*)=([^;]*)(?:;)/);
                    if (match) {
                        var key = match[1], value = match[2];
                        try  {
                            value = decodeURIComponent(value);
                        } catch (e) {
                        }

                        cookieObj[key] = value;
                    }
                }
            } catch (e) {
            }

            return cookieObj;
        }
        Cookie.getAllCookie = getAllCookie;

        function getCookieItem(name, cookie) {
            var result = null;
            var cookiePattern = cookie.match(new RegExp("(^|\\W)" + name + "=([^;]*)(;|$)"));
            try  {
                result = cookiePattern[2];
            } catch (e) {
            }
            return result;
        }
        Cookie.getCookieItem = getCookieItem;
    })(_.Cookie || (_.Cookie = {}));
    var Cookie = _.Cookie;

    (function (Utils) {
        function extend(source, obj) {
            for (var p in source) {
                if (!obj.hasOwnProperty(p)) {
                    obj[p] = source[p];
                }
            }
            return obj;
        }
        Utils.extend = extend;

        function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        }
        Utils.isArray = isArray;

        //判断两个变量、对象是否相等。如果对象中包含数组，则要求数组必须是有序的
        function isEqual(raw, usr) {
            if (typeof raw !== typeof usr) {
                return false;
            }

            if (typeof raw !== 'object') {
                if (raw != usr) {
                    return false;
                }
            } else if (this.isArray(raw)) {
                if (this.isArray(usr)) {
                    if (raw.length != usr.length) {
                        return false;
                    } else {
                        for (var i = 0, l = raw.length; i < l; i++) {
                            if (!arguments.callee.call(this, raw[i], usr[i])) {
                                return false;
                            }
                        }
                    }
                } else {
                    return false;
                }
            } else {
                for (var key in raw) {
                    if (typeof usr[key] == 'undefined' && typeof raw[key] == 'undefined') {
                        continue;
                    } else if (typeof usr[key] != 'undefined') {
                        if (!arguments.callee.call(this, raw[key], usr[key])) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
                for (var key in usr) {
                    if (typeof usr[key] == 'undefined' && typeof raw[key] == 'undefined') {
                        continue;
                    } else if (typeof raw[key] != 'undefined') {
                        if (!arguments.callee.call(this, usr[key], raw[key])) {
                            return false;
                        }
                    } else {
                        return false;
                    }
                }
            }
            return true;
        }
        Utils.isEqual = isEqual;
    })(_.Utils || (_.Utils = {}));
    var Utils = _.Utils;

    (function (Ajax) {
        function getXHR() {
            return new XMLHttpRequest();
        }
        Ajax.getXHR = getXHR;

        function setHeaders(xhr, headers) {
            for (var p in headers) {
                xhr.setRequestHeader(p, headers[p]);
            }
        }
        Ajax.setHeaders = setHeaders;

        function send(conf) {
            var This = this;

            //服务器请求
            var reqHeaders = conf.headers || {};
            var xhr = this.getXHR();
            var sendData = null;
            var method = conf.method.toLowerCase();

            if (conf.dataType == "xml" && typeof conf.data == "object") {
                //sendData = T.Text.json2xml(conf.data);
                sendData = JSON.stringify(conf.data);
                reqHeaders["Content-Type"] = "application/xml";
            } else if (typeof conf.data == "object") {
                var arr = [];
                var data = conf.data;
                for (var p in data) {
                    arr.push(p + "=" + encodeURIComponent(data[p]));
                }
                if (method == "get") {
                    if (conf.url.indexOf("?") == -1)
                        conf.url += "?";
                    conf.url += arr.join("&");
                } else {
                    sendData = arr.join("&");
                }
            } else if (typeof conf.data == "string") {
                sendData = conf.data;
            }
            var url = conf.url;
            if (conf.behaviorKey) {
                url += "&behaviorData=" + (_.Storage.get(conf.behaviorKey, true) || "");
            }
            url += "&rnd=" + Math.random();
            xhr.open(conf.method, url, true);
            this.setHeaders(xhr, reqHeaders);
            var timeout = conf.timeout || 60000;
            var timer = setTimeout(function () {
                if (xhr.readyState == 3 && xhr.status == 200)
                    return;
                xhr.abort();
                if (conf.fail) {
                    conf.fail({ isTimeout: true });
                }
            }, timeout);
            xhr.onreadystatechange = function (data) {
                if (xhr.readyState == 4 && xhr.status != 0) {
                    clearTimeout(timer);

                    if (xhr.status == 304 || (xhr.status >= 200 && xhr.status < 300)) {
                        var para = {
                            xhr: xhr,
                            isJSON: conf.isJSON
                        };
                        var info = This.getResponseInfo(para);
                        if (conf.success)
                            conf.success(info.responseText, info.json);
                    } else {
                        if (conf.fail) {
                            conf.fail(xhr.responseText);
                        }
                    }
                }
            };

            xhr.send(sendData);
            return xhr;
        }
        Ajax.send = send;

        function getHeaders(xhr) {
            var lines = xhr.getAllResponseHeaders();
            var result = {};
            if (lines) {
                lines = lines.split(/\r?\n/);
                for (var i = 0; i < lines.length; i++) {
                    var l = lines[i];
                    var arr = l.split(": ");
                    var h = arr[0].replace(/^\w|-\w/g, function (v) {
                        return v.toUpperCase();
                    });
                    result[h] = arr[1];
                }
            }
            return result;
        }
        Ajax.getHeaders = getHeaders;

        function getResponseInfo(conf) {
            var xhr = conf.xhr;
            var json;
            var responseText = xhr.responseText;
            var resHeaders = this.getHeaders(xhr);
            var storage = conf.storage;

            //序列化json
            var isJSON = conf.isJSON || /json|javascript/i.test(resHeaders["Content-Type"]) || xhr.responseText.indexOf("{") == 0;
            if (isJSON) {
                json = _.Text.parseJson(responseText) || _.Text.tryEval(responseText);
            }
            return {
                responseText: responseText,
                json: json
            };
        }
        Ajax.getResponseInfo = getResponseInfo;

        function get(conf) {
            conf.method = "GET";
            return this.send(conf);
        }
        Ajax.get = get;

        function post(conf) {
            conf.method = "POST";
            return this.send(conf);
        }
        Ajax.post = post;
    })(_.Ajax || (_.Ajax = {}));
    var Ajax = _.Ajax;

    (function (Storage) {
        function set(key, value) {
            this.remove(key);
            window.localStorage.setItem(key, value);
        }
        Storage.set = set;

        function get(key, clearType) {
            var value = window.localStorage.getItem(key);
            if (clearType) {
                this.remove(key);
            }
            return value;
        }
        Storage.get = get;

        function remove(key) {
            window.localStorage.removeItem(key);
        }
        Storage.remove = remove;

        function refresh() {
            window.localStorage.clear();
        }
        Storage.refresh = refresh;
    })(_.Storage || (_.Storage = {}));
    var Storage = _.Storage;

    (function (Service) {
        Service.BehaviorStatistics = "$mobile$-behavior-statics";

        Service.ServiceReg = {
            username: /^[-a-z0-9_]+$/i
        };

        function getSid(result) {
            return result.match(/;sid=([^;$]*)/)[1];
        }
        Service.getSid = getSid;

        function checkUserName(username) {
            return Service.ServiceReg.username.test(username);
        }
        Service.checkUserName = checkUserName;

        function initStorageKey(number, StorageKey) {
            var storageKey = {};
            for (var i in StorageKey) {
                storageKey[i] = StorageKey[i].replace('$mobile$', number);
            }
            return storageKey;
        }
        Service.initStorageKey = initStorageKey;

        function getBehaviorData(behaviorIdMap) {
            var browser = this.getBrowserType();
            return behaviorIdMap[browser];
        }
        Service.getBehaviorData = getBehaviorData;

        function getBrowserType() {
            if (Extension.Browser.isChrome()) {
                return "Chrome";
            }

            if (Extension.Browser.isSogou()) {
                return "Sogou";
            }

            if (Extension.Browser.isMaxthon()) {
                return "Maxthon";
            }
        }
        Service.getBrowserType = getBrowserType;
    })(_.Service || (_.Service = {}));
    var Service = _.Service;
})(_ || (_ = {}));

var Extension;
(function (Extension) {
    (function (Browser) {
        function isChrome() {
            return undefined !== window['chrome'];
        }
        Browser.isChrome = isChrome;

        function isSogou() {
            return undefined !== window['sogouExplorer'];
        }
        Browser.isSogou = isSogou;

        function isMaxthon() {
            return undefined !== window.external['mxGetRuntime'];
        }
        Browser.isMaxthon = isMaxthon;
    })(Extension.Browser || (Extension.Browser = {}));
    var Browser = Extension.Browser;

    (function (UI) {
        function setBadgeText(count) {
            var text;
            text = count > 99 ? "99+" : "" + count;
            if (count == 0) {
                text = "";
            }
            if (undefined === count) {
                text = "?";
            }
            if (Extension.Browser.isMaxthon()) {
                window.external['mxGetRuntime']().icon.showBadge(count);
            } else {
                var browser = window['chrome'] || sogouExplorer;
                browser.browserAction.setBadgeText({ text: text });
            }
        }
        UI.setBadgeText = setBadgeText;

        function setIconImage() {
        }
        UI.setIconImage = setIconImage;
    })(Extension.UI || (Extension.UI = {}));
    var UI = Extension.UI;

    (function (Communication) {
        function sendMessage(message) {
            if (Extension.Browser.isMaxthon()) {
                var rt = window.external['mxGetRuntime']();
                rt.post(message.sendType, message);
            } else {
                var sendMessageApi;
                if (Extension.Browser.isChrome()) {
                    if (chrome.runtime) {
                        sendMessageApi = chrome.runtime.sendMessage;
                    } else {
                        sendMessageApi = chrome.extension['sendRequest'];
                    }
                } else {
                    sendMessageApi = sogouExplorer.extension.sendRequest;
                }
                sendMessageApi(message);
            }
        }
        Communication.sendMessage = sendMessage;

        function onMessage(message, responseHandle) {
            if (Extension.Browser.isMaxthon()) {
                var rt = window.external['mxGetRuntime']();
                rt.listen(message.onType, function (request) {
                    responseHandle && responseHandle(request.message);
                });
            } else {
                var onMessageApi;
                if (Extension.Browser.isChrome()) {
                    if (chrome.runtime) {
                        onMessageApi = chrome.runtime.onMessage;
                    } else {
                        onMessageApi = chrome.extension['onRequest'];
                    }
                } else {
                    onMessageApi = sogouExplorer.extension.onRequest;
                }
                onMessageApi.addListener(function (request, sender) {
                    if (request.onType === message.onType) {
                        return;
                    }
                    responseHandle && responseHandle(request.message);
                });
            }
        }
        Communication.onMessage = onMessage;
    })(Extension.Communication || (Extension.Communication = {}));
    var Communication = Extension.Communication;

    (function (Tab) {
        function create(options, callback) {
            if (Extension.Browser.isMaxthon()) {
                // 获取浏览器接口
                var broswerApi = window.external['mxGetRuntime']().create("mx.browser");
                broswerApi.tabs.newTab({ url: options.url }, function () {
                    callback && callback();
                });
            } else {
                var browser = window['chrome'] || sogouExplorer;
                browser.tabs.create({ url: options.url }, function () {
                    callback && callback();
                });
            }
        }
        Tab.create = create;
    })(Extension.Tab || (Extension.Tab = {}));
    var Tab = Extension.Tab;

    (function (Notification) {
        function create(options) {
            if (Extension.Browser.isChrome() && window['chrome'].notifications && !options.useHTML5API) {
                window['chrome'].notifications.create('', options, function (notificationId) {
                });
                if (options.clickEvent) {
                    window['chrome'].notifications.onClicked.addListener(function (notificationId) {
                        options.clickEvent();
                        window['chrome'].notifications.clear(notificationId);
                    });
                }
            } else {
                var notification = window['webkitNotifications'].createNotification(options.iconUrl, options.title, options.message);
                notification.onclick = function () {
                    if (options.clickEvent) {
                        options.clickEvent();
                        notification.close();
                    }
                };
                notification.show();
                setTimeout(function () {
                    notification.close();
                }, 15000);
            }
        }
        Notification.create = create;
    })(Extension.Notification || (Extension.Notification = {}));
    var Notification = Extension.Notification;
})(Extension || (Extension = {}));

﻿///<reference path='background.ts' />
var SettingsPage;
(function (SettingsPage) {
    function init() {
        this.MailService.init();
    }
    SettingsPage.init = init;

    (function (MailService) {
        MailService.self;

        MailService.UserData;

        MailService.UserSettings;

        MailService.StorageKey;

        function init() {
            var currentNumber = _.Storage.get("currentNumber");
            MailService.StorageKey = _.Service.initStorageKey(currentNumber, PluginConfig.StorageKey);

            MailService.self = SettingsPage.MailService;
            this.actions.initData();
            this.render.setDefaultSettings();
            this.render.resizePanel();
            this.actions.initEvents();
        }
        MailService.init = init;

        (function (render) {
            //todo  判断classname为true真是丑。改。
            function setDefaultSettings() {
                var statuText = _.Dom.getEl("statusText");
                _.Dom.getEl("account").innerHTML = _.Email.getSendText(MailService.UserData.userName, MailService.UserData.uid);
                statuText.innerHTML = MailService.UserSettings.autoLoginFlag ? "取消自动登录" : "自动登录";
                statuText.className = MailService.UserSettings.autoLoginFlag ? "true" : "";

                _.Dom.getEl("txtInterval").value = MailService.UserSettings.checkMailInterval + "分钟";
                _.Dom.getEl("notifyCheckBox").checked = MailService.UserSettings.showNotificationFlag;
            }
            render.setDefaultSettings = setDefaultSettings;

            function resizePanel() {
                if (!Extension.Browser.isChrome()) {
                    window.resizeTo(PluginConfig.Plugin_Pop_Page_Width, _.Dom.getEl("container").offsetHeight + 5);
                }
            }
            render.resizePanel = resizePanel;

            function showSuccessTip() {
                _.Dom.show("successTip");
            }
            render.showSuccessTip = showSuccessTip;
        })(MailService.render || (MailService.render = {}));
        var render = MailService.render;

        (function (actions) {
            function initData() {
                MailService.UserData = MailService.self.io.getUserData();
                MailService.UserSettings = MailService.self.io.getUserSettings() || PluginConfig.DefaultSettings;
            }
            actions.initData = initData;

            function initEvents() {
                var _this = this;
                _.Dom.bind("aCancel", "click", function () {
                    return _this.goBack();
                });
                _.Dom.bind("aConfirm", "click", function () {
                    return _this.saveSettings();
                });

                _.Dom.bind("intervalList", "click", function (e) {
                    return _this.changeInterval(e);
                });
                _.Dom.bind("txtInterval", "click", function () {
                    return _this.toggleIntervalList();
                });
                _.Dom.bind("statusText", "click", function () {
                    return _this.switchAutoLoginStatus();
                });

                var tabUl = _.Dom.getEl("tabUl");
                var menus = tabUl.querySelectorAll("li");
                var tabsMap = {
                    "commonSets": "commonSetsContent",
                    "accountSets": "accountSetsContent"
                };

                for (var i = 0, len = menus.length; i < len; i++) {
                    (function (i) {
                        menus[i].onclick = function () {
                            var current = tabUl.querySelector(".current");
                            var tagA = this.querySelector("a");
                            if (_.Dom.hasClass(tagA, "current")) {
                                return;
                            }
                            var targetId = this.getAttribute("id");
                            var currentId = current.parentNode.getAttribute("id");
                            _.Dom.addClass(tagA, "current");
                            _.Dom.removeClass(current, "current");
                            _.Dom.show(tabsMap[targetId]);
                            _.Dom.hide(tabsMap[currentId]);
                        };
                    })(i);
                }
            }
            actions.initEvents = initEvents;

            function goBack() {
                history.go(-1);
            }
            actions.goBack = goBack;

            function toggleIntervalList() {
                _.Dom.toggleClass("intervalList", "hide");
            }
            actions.toggleIntervalList = toggleIntervalList;

            function changeInterval(e) {
                var txtInterval = _.Dom.getEl("txtInterval");
                _.Event.stopEventBubble(e);
                var target = _.Event.getEventTarget(e);
                var tagA = target.querySelector("a") || target;
                txtInterval.value = tagA.innerHTML;
                this.toggleIntervalList();
            }
            actions.changeInterval = changeInterval;

            function switchAutoLoginStatus() {
                var target = _.Dom.getEl("statusText");
                _.Dom.toggleClass(target, "true");
                target.innerHTML = target.innerHTML == "取消自动登录" ? "自动登录" : "取消自动登录";
            }
            actions.switchAutoLoginStatus = switchAutoLoginStatus;

            function saveSettings() {
                var currentSettings = {
                    showNotificationFlag: _.Dom.getEl("notifyCheckBox").checked,
                    checkMailInterval: parseInt(_.Dom.getInputValue("txtInterval").match(/\d+/)[0]),
                    autoLoginFlag: _.Dom.hasClass("statusText", "true")
                };

                if (_.Utils.isEqual(currentSettings, MailService.UserSettings)) {
                    this.goBack();
                } else {
                    var This = this;
                    _.Storage.set(MailService.StorageKey.UserSettings, JSON.stringify(currentSettings));
                    MailService.self.render.showSuccessTip();
                    setTimeout(function () {
                        This.goBack();
                    }, 1000);
                }
            }
            actions.saveSettings = saveSettings;
        })(MailService.actions || (MailService.actions = {}));
        var actions = MailService.actions;

        (function (io) {
            function getUserData() {
                return JSON.parse(_.Storage.get(MailService.StorageKey.UserData));
            }
            io.getUserData = getUserData;

            function getUserSettings() {
                return JSON.parse(_.Storage.get(MailService.StorageKey.UserSettings));
            }
            io.getUserSettings = getUserSettings;
        })(MailService.io || (MailService.io = {}));
        var io = MailService.io;
    })(SettingsPage.MailService || (SettingsPage.MailService = {}));
    var MailService = SettingsPage.MailService;
})(SettingsPage || (SettingsPage = {}));

_.Dom.ready(function () {
    SettingsPage.init();
});

