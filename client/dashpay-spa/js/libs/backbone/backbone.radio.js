// Backbone.Radio v0.9.1
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("underscore"),require("backbone")):"function"==typeof define&&define.amd?define(["underscore","backbone"],t):e.Backbone.Radio=t(e._,e.Backbone)}(this,function(e,t){"use strict";function n(e,t,n,s){var r=e[t];return n&&n!==r.callback&&n!==r.callback._callback||s&&s!==r.context?void 0:(delete e[t],!0)}function s(t,s,r,i){t||(t={});for(var a=s?[s]:e.keys(t),o=!1,c=0,u=a.length;u>c;c++)s=a[c],t[s]&&n(t,s,r,i)&&(o=!0);return o}function r(t){return u[t]||(u[t]=e.partial(o.log,t))}function i(t){return e.isFunction(t)?t:function(){return t}}var a=t.Radio,o=t.Radio={};o.VERSION="0.9.1",o.noConflict=function(){return t.Radio=a,this},o.DEBUG=!1,o._debugText=function(e,t,n){return e+(n?" on the "+n+" channel":"")+': "'+t+'"'},o.debugLog=function(e,t,n){o.DEBUG&&console&&console.warn&&console.warn(o._debugText(e,t,n))};var c=/\s+/;o._eventsApi=function(t,n,s,r){if(!s)return!1;var i={};if("object"==typeof s){for(var a in s){var o=t[n].apply(t,[a,s[a]].concat(r));c.test(a)?e.extend(i,o):i[a]=o}return i}if(c.test(s)){for(var u=s.split(c),l=0,h=u.length;h>l;l++)i[u[l]]=t[n].apply(t,[u[l]].concat(r));return i}return!1},o._callHandler=function(e,t,n){var s=n[0],r=n[1],i=n[2];switch(n.length){case 0:return e.call(t);case 1:return e.call(t,s);case 2:return e.call(t,s,r);case 3:return e.call(t,s,r,i);default:return e.apply(t,n)}};var u={};e.extend(o,{log:function(t,n){var s=e.rest(arguments,2);console.log("["+t+'] "'+n+'"',s)},tuneIn:function(e){var t=o.channel(e);return t._tunedIn=!0,t.on("all",r(e)),this},tuneOut:function(e){var t=o.channel(e);return t._tunedIn=!1,t.off("all",r(e)),delete u[e],this}}),o.Commands={command:function(t){var n=e.rest(arguments);if(o._eventsApi(this,"command",t,n))return this;var s=this.channelName,r=this._commands;if(s&&this._tunedIn&&o.log.apply(this,[s,t].concat(n)),r&&(r[t]||r["default"])){var i=r[t]||r["default"];n=r[t]?n:arguments,o._callHandler(i.callback,i.context,n)}else o.debugLog("An unhandled command was fired",t,s);return this},comply:function(e,t,n){return o._eventsApi(this,"comply",e,[t,n])?this:(this._commands||(this._commands={}),this._commands[e]&&o.debugLog("A command was overwritten",e,this.channelName),this._commands[e]={callback:t,context:n||this},this)},complyOnce:function(t,n,s){if(o._eventsApi(this,"complyOnce",t,[n,s]))return this;var r=this,i=e.once(function(){return r.stopComplying(t),n.apply(this,arguments)});return this.comply(t,i,s)},stopComplying:function(e,t,n){return o._eventsApi(this,"stopComplying",e)?this:(e||t||n?s(this._commands,e,t,n)||o.debugLog("Attempted to remove the unregistered command",e,this.channelName):delete this._commands,this)}},o.Requests={request:function(t){var n=e.rest(arguments),s=o._eventsApi(this,"request",t,n);if(s)return s;var r=this.channelName,i=this._requests;if(r&&this._tunedIn&&o.log.apply(this,[r,t].concat(n)),i&&(i[t]||i["default"])){var a=i[t]||i["default"];return n=i[t]?n:arguments,o._callHandler(a.callback,a.context,n)}o.debugLog("An unhandled request was fired",t,r)},reply:function(e,t,n){return o._eventsApi(this,"reply",e,[t,n])?this:(this._requests||(this._requests={}),this._requests[e]&&o.debugLog("A request was overwritten",e,this.channelName),this._requests[e]={callback:i(t),context:n||this},this)},replyOnce:function(t,n,s){if(o._eventsApi(this,"replyOnce",t,[n,s]))return this;var r=this,a=e.once(function(){return r.stopReplying(t),i(n).apply(this,arguments)});return this.reply(t,a,s)},stopReplying:function(e,t,n){return o._eventsApi(this,"stopReplying",e)?this:(e||t||n?s(this._requests,e,t,n)||o.debugLog("Attempted to remove the unregistered request",e,this.channelName):delete this._requests,this)}},o._channels={},o.channel=function(e){if(!e)throw new Error("You must provide a name for the channel.");return o._channels[e]?o._channels[e]:o._channels[e]=new o.Channel(e)},o.Channel=function(e){this.channelName=e},e.extend(o.Channel.prototype,t.Events,o.Commands,o.Requests,{reset:function(){return this.off(),this.stopListening(),this.stopComplying(),this.stopReplying(),this}});var l,h,d=[t.Events,o.Commands,o.Requests];e.each(d,function(t){e.each(t,function(t,n){o[n]=function(t){return h=e.rest(arguments),l=this.channel(t),l[n].apply(l,h)}})}),o.reset=function(t){var n=t?[this._channels[t]]:this._channels;e.invoke(n,"reset")};var f=o;return f});
//# sourceMappingURL=backbone.radio.min.js.map