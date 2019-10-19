let jQueryCdnUrl = "https://code.jquery.com/jquery-3.4.1.min.js";
let ujingaUrl = "http://localhost/ujinga/assets/ujinga/ujinga.json";

let ujinga = null;
let logger = true;
let caching = false;
let init_timer = null;

function log(messege) {
  if(logger) {
    console.log(messege);
    // ToDo: Add further action
  }
}

function init () {
  log("Initializing");
  ensureJquery();
}

function ensureJquery() {
  log("Ensuring jQuery");
  init_timer = setInterval(checkJquery, 200);
  if (!window.jQuery) loadScript(); // Checking if jQuery is loaded. Will add jquery CDN if not loaded
}

function loadScript(scriptUrl=null, callback=null){
  log(`Pure JS Script Loading: ${scriptUrl}`);
  var script = document.createElement("script")
  script.type = "text/javascript";
  if (script.readyState){  //IE
      script.onreadystatechange = function(){
          if (script.readyState == "loaded" || script.readyState == "complete"){
              script.onreadystatechange = null;
              if(callback != null) callback();
          }
      };
  } else script.onload = function(){if(callback != null) callback();}; // Other Browsers

  script.src = (scriptUrl != null) ? scriptUrl : jQueryCdnUrl;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function checkJquery() {
  log("Checking jQuery");
  if(window.jQuery) {
    clearInterval(init_timer);
    log("Cleared Timer");
    getConfig();
  }
}

function getConfig() {
  log("Getting Config");
  $.getJSON( ujingaUrl, function( ujingaConfig ) {
    ujinga = ujingaConfig;
    log(ujinga);
    router();
  });
  
}

function router() {
  log(ujinga.config);
  cacheScript("assets/ujinga/script.js").done(function(script) {
    log("Cached Script: script.js");
  });
}

function cacheScript ( scriptUrl, options ) {
  log(`jQuery Caching Script: ${scriptUrl}`);
  options = $.extend( options || {}, {
      dataType: "script",
      cache: caching,
      url: scriptUrl
  });
  return $.ajax( options );
}

/*********************************************************************/

window.onload = function() {
  init();
}
