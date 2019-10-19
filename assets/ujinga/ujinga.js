let jQueryCdnUrl = "https://code.jquery.com/jquery-3.4.1.min.js";

let ujinga = null;
let logger = true;
let caching = false;
let init_timer = null;
let ujingaUrlElementTag = "a";
let ujingaUrlElementProperty = "href";

/******************* Master Functions ************************/

function log(messege, forceLog = false) {
    if (logger || forceLog) {
        console.log(messege);
        // ToDo: Add further action
    }
}

function init() {
    log("Initializing");
    ensureJquery();
}

function ensureJquery() {
    log("Ensuring jQuery");
    init_timer = setInterval(checkJquery, 200);
    if (!window.jQuery) loadScript(); // Checking if jQuery is loaded. Will add jquery CDN if not loaded
}

function loadScript(scriptUrl = null, callback = null) {
    log(`Pure JS Script Loading: ${scriptUrl}`);
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                if (callback != null) callback();
            }
        };
    } else script.onload = function () {
        if (callback != null) callback();
    }; // Other Browsers

    script.src = (scriptUrl != null) ? scriptUrl : jQueryCdnUrl;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function checkJquery() {
    log("Checking jQuery");
    if (window.jQuery) {
        clearInterval(init_timer);
        log("Cleared Timer");
        getConfig();
    }
}

function getConfig() {
    log("Getting Config");
    let ujingaUrlElement = $(ujingaUrlElementTag);
    let ujingaUrl = ujingaUrlElement.prop(ujingaUrlElementProperty);
    $('html').html('');
    getJson(ujingaUrl, function (ujingaConfig) {
        ujinga = ujingaConfig;
        log(ujinga, true);
        router();
    });

}

function cacheScript(scriptUrl, options) {
    log(`jQuery Caching Script: ${scriptUrl}`);
    options = $.extend(options || {}, {
        dataType: "script",
        cache: caching,
        url: scriptUrl
    });
    return $.ajax(options);
}

function tryParse(json) {
    try {
        return JSON.parse(json);
    } catch (e) {
        return undefined;
    }
}

function unloadScript() {
    // let mainJs    = document.getElementById("mainJs");
    // document.head.removeChild(mainJS);//Remooves main.js from the DOM tree
    //
    // let flushFile = document.createElement("script");
    // flushFile.setAttribute("src", "flush.js");
    // document.head.appendChild(flushFile);//Loads flush.js into the DOM tree, overwriting all functions and variables of main.js in browser memory to null
    // ToDo: Work on it, test with two scripts an finish
}

/******************* API Call Functions **********************/

function getJson(jsonUrl, callback) {
    fetch(jsonUrl, function (response) {
        let jsonData = tryParse(response);
        if (jsonData) callback(jsonData);
        else log("Failed to fetch config!");
    });
}

function fetch(fetchUrl, callback) {
    $.post(fetchUrl, function (response) {
        callback(response);
    });
}

/******************* Routing Functions ***********************/

function router() {
    cacheScript(ujinga.config.defaultJsUrl);
}


/******************* Huston, we got ignition  ****************/

window.onload = function () {
    init();
};
