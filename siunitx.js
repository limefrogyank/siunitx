!function(){"use strict";var e={80:function(e,n){n.VK=MathJax._.input.tex.Configuration.Configuration,MathJax._.input.tex.Configuration.ConfigurationHandler,MathJax._.input.tex.Configuration.ParserConfiguration},579:function(e,n){MathJax._.input.tex.SymbolMap.parseResult,MathJax._.input.tex.SymbolMap.AbstractSymbolMap,MathJax._.input.tex.SymbolMap.RegExpMap,MathJax._.input.tex.SymbolMap.AbstractParseMap,MathJax._.input.tex.SymbolMap.CharacterMap,MathJax._.input.tex.SymbolMap.DelimiterMap,MathJax._.input.tex.SymbolMap.MacroMap,n.QQ=MathJax._.input.tex.SymbolMap.CommandMap,MathJax._.input.tex.SymbolMap.EnvironmentMap},516:function(e,n){n.Z=MathJax._.input.tex.TexError.default},693:function(e,n){n.Z=MathJax._.input.tex.TexParser.default}},n={};function t(r){var i=n[r];if(void 0!==i)return i.exports;var o=n[r]={exports:{}};return e[r](o,o.exports,t),o.exports}t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)};var r={};!function(){t.d(r,{Z:function(){return ae}});var e=t(80),n=t(579),i=t(693),o=t(516);function a(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,n,t){return n&&a(e.prototype,n),t&&a(e,t),Object.defineProperty(e,"prototype",{writable:!1}),e}var u=l((function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}));function c(e,n,t,r,i,o,a){if(e.length>=t){var l=e.split(""),u=0,c=-1!=o?o:n,s=c;if(i)for(var p=c;p<l.length;p+=s)e=e.slice(0,p+u)+r+e.slice(p+u,e.length+u),u+=r.length,s=-1!=a?a:n;else for(var f=l.length-c;f>=0;f-=s)e=e.slice(0,f)+r+e.slice(f,e.length+u),u+=r.length,s=-1!=a?a:n}return e}u.TooManySemicolonsInAngle=new o.Z("101","There are two many semi-colons.  Should only be two at most.");var s=new Map([["all",function(e,n){e.whole=c(e.whole,n.digitGroupSize,n.groupMinimumDigits,n.groupSeparator,!1,n.digitGroupFirstSize,n.digitGroupOtherSize),e.fractional=c(e.fractional,n.digitGroupSize,n.groupMinimumDigits,n.groupSeparator,!0,n.digitGroupFirstSize,n.digitGroupOtherSize)}],["decimal",function(e,n){e.fractional=c(e.fractional,n.digitGroupSize,n.groupMinimumDigits,n.groupSeparator,!0,n.digitGroupFirstSize,n.digitGroupOtherSize)}],["integer",function(e,n){e.whole=c(e.whole,n.digitGroupSize,n.groupMinimumDigits,n.groupSeparator,!1,n.digitGroupFirstSize,n.digitGroupOtherSize)}],["none",function(e,n){}]]);function p(e,n,t){if("bracket"==e.type){var r=e.whole.length-n.fractional.length;r>0&&"compact-marker"==t.uncertaintyMode&&(e.fractional=e.whole.slice(r,e.whole.length),e.whole=e.whole.slice(0,r),e.decimal=t.outputDecimalMarker)}else{if(+(e.whole+e.decimal+e.fractional)<1){for(var i=0,o=0;o<e.fractional.length&&"0"==e.fractional[o];o++)i++;e.whole=e.fractional.slice(i,e.fractional.length),e.decimal="",e.fractional=""}}}function f(e,n){var t=n.uncertaintySeparator;return t+=n.outputOpenUncertainty,t+=e.whole,t+="compact-marker"==n.uncertaintyMode&&""!=e.decimal?n.outputDecimalMarker:"",t+=e.fractional,t+=n.outputCloseUncertainty}var g=new Map([["separate",function(e,n,t){return function(e,n,t){if("pm"!=e.type&&""==e.decimal){var r=n.fractional.length-e.whole.length;if(r>=0){for(var i=0;i<r;i++)e.fractional+="0";e.fractional+=e.whole,e.whole="0",e.decimal=t.outputDecimalMarker}}}(e,n,t),function(e,n){return"\\pm"+m(e,n)}(e,t)}],["compact",function(e,n,t){return p(e,n,t),f(e,t)}],["full",function(e,n,t){return p(e,n,t),f(e,t)}],["compact-marker",function(e,n,t){return p(e,n,t),f(e,t)}]]);function m(e,n){var t,r="";return s.get(n.groupDigits)(e,n),""!=n.negativeColor&&(r+="{\\color{"+n.negativeColor+"}"),n.bracketNegativeNumbers?"-"==e.sign&&(r+="("):n.printImplicitPlus&&""==e.sign?r+="+":r+=e.sign,"1"!=e.whole||""!=e.fractional||n.printUnityMantissa?(""==e.whole&&e.fractional||"0"==e.whole?n.printZeroInteger&&(r+="0"):r+=e.whole,r+=""!=e.decimal?n.outputDecimalMarker:"",n.zeroDecimalAsSymbol&&0==+e.fractional?r+=n.zeroSymbol:r+=e.fractional):n.printZeroExponent||""!=e.exponent&&("1"!=e.exponent||"-"==e.exponentSign)||(r+="1"),null===(t=e.uncertainty)||void 0===t||t.forEach((function(t){r+=g.get(n.uncertaintyMode)(t,e,n)})),!n.printZeroExponent||""!=e.exponent&&"0"!=e.exponent?""!=e.exponent&&"0"!=e.exponent&&("1"!=e.whole||""!=e.fractional||n.printUnityMantissa?""!=e.exponentMarker&&(""!=n.outputExponentMarker?(r+=n.outputExponentMarker,r+=e.exponentSign+e.exponent):(r+=""!=e.whole||""!=e.fractional?n.exponentProduct:"",r+=n.exponentBase,r+="^{"+e.exponentSign+e.exponent+"}")):(r+=n.exponentBase,r+="^{"+e.exponentSign+e.exponent+"}")):""!=n.outputExponentMarker?(r+=n.outputExponentMarker,r+="0"):(r+=n.exponentProduct,r+=n.exponentBase,r+="^{0}"),n.bracketNegativeNumbers&&"-"==e.sign&&(r+=")"),""!=n.negativeColor&&(r+="}"),r}function h(e,n){var t=(+(e.sign+e.whole+e.decimal+e.fractional+(""!=e.exponent?"e"+e.exponentSign+e.exponent:""))).toExponential(),r=H(ae,t,n),i=0;if(""!=e.fractional)for(var o=e.fractional.length-1;o>=0&&"0"==e.fractional[o];o--)i++;if(""!=e.whole&&e.fractional.length==i)for(var a=e.whole.length-1;a>=0&&"0"==e.whole[a];a--)i++;for(var l=0;l<i;l++)r.fractional+="0";for(var u in""==r.decimal&&i>0&&(r.decimal="."),e)e[u]=r[u]}function d(e,n,t){if(null!=e){for(var r=n-+(e.exponentSign+e.exponent),i=Math.sign(r),o=0;o<Math.abs(r);o++)i<0?e.fractional.length>0?(e.whole=e.whole+e.fractional.slice(0,1),e.fractional=e.fractional.slice(1,e.fractional.length)):e.whole=e.whole+"0":e.whole.length>0?(e.fractional=e.whole.slice(e.whole.length-1,e.whole.length)+e.fractional,e.whole=e.whole.slice(0,e.whole.length-1)):e.fractional="0"+e.fractional;""!=e.fractional&&""==e.decimal&&(e.decimal="."),e.exponent=Math.abs(n).toString(),e.exponentSign=Math.sign(n)<0?"-":""}}var y=new Map([["input",function(e,n){}],["fixed",function(e,n){h(e,n),d(e,n.fixedExponent)}],["engineering",function(e,n){h(e,n);for(var t=+(e.exponentSign+e.exponent);t%3!=0;)t--;d(e,t)}],["scientific",h]]);function v(e,n,t){var r=!1;return n>5?r=!0:5==n&&(r=!t||e%2!=0),r}function b(e,n,t){var r="",i=new Array,o=+e[n]+1,a=0==o;i.push(o);for(var l=n-1;l>=0;l--)a?(a=0==(o=+e[l]+1),i.push(o)):(o=+e[l],i.push(o));return i.reverse(),i.forEach((function(e){return r+=e})),r}function w(e,n){if(0==Math.abs(+(e.whole+e.decimal+e.fractional+(""!=e.exponentMarker?"e":"")+e.exponentSign+e.exponent)))if("0"!=n.roundMinimum){e.prefix="\\lt";var t=H(ae,n.roundMinimum,n);e.sign=t.sign,e.whole=t.whole,e.decimal=t.decimal,e.fractional=t.fractional,e.exponentMarker=t.exponentMarker,e.exponentSign=t.exponentSign,e.exponent=t.exponent}else n.roundZeroPositive&&(e.sign="")}var x=new Map([["none",function(e,n){}],["places",function(e,n){if(0==e.uncertainty.length){if(e.fractional.length>n.roundPrecision){var t=+e.fractional.slice(n.roundPrecision,n.roundPrecision+1);if(v(+e.fractional.slice(n.roundPrecision-1,n.roundPrecision),t,"even"==n.roundHalf)){var r=b(e.whole+e.fractional,e.whole.length+n.roundPrecision-1),i=e.whole.length;e.whole=r.slice(0,i),e.fractional=r.slice(i,r.length)}else e.fractional=e.fractional.slice(0,n.roundPrecision)}else if(e.fractional.length<n.roundPrecision&&n.roundPad)for(var o=0;o<n.roundPrecision-e.fractional.length;o++)e.fractional+="0";w(e,n)}}],["figures",function(e,n){if(0==e.uncertainty.length){var t=e.whole+e.fractional;if(t.length>n.roundPrecision){var r,i=+t.slice(n.roundPrecision,n.roundPrecision+1);if((r=v(+t.slice(n.roundPrecision-1,n.roundPrecision),i,"even"==n.roundHalf)?b(t,n.roundPrecision-1):t.slice(0,n.roundPrecision)).length>=e.whole.length)e.fractional=r.slice(e.whole.length,r.length);else{e.fractional="",e.decimal="";var o=e.whole.length-r.length;e.whole=r;for(var a=0;a<o;a++)e.whole+="0"}}else if(t.length<n.roundPrecision&&n.roundPad)for(var l=0;l<n.roundPrecision-t.length;l++)e.fractional+="0",""==e.decimal&&(e.decimal=".");w(e,n)}}],["uncertainty",function(e,n){if(e.uncertainty.length>0){e.uncertainty.forEach((function(e){if("pm"==e.type&&+(e.whole+e.decimal+e.fractional)<1){for(var n=0,t=0;t<e.fractional.length&&"0"==e.fractional[t];t++)n++;e.whole=e.fractional.slice(n,e.fractional.length),e.decimal="",e.fractional=""}}));var t=999;e.uncertainty.forEach((function(e){if(t=Math.min(e.whole.length,t),e.whole.length-n.roundPrecision>0){var r=+e.whole.slice(n.roundPrecision,n.roundPrecision+1);v(+e.whole.slice(n.roundPrecision-1,n.roundPrecision),r,"even"==n.roundHalf)?e.whole=b(e.whole,n.roundPrecision-1):e.whole=e.whole.slice(0,n.roundPrecision)}}));var r=t-n.roundPrecision;if(r>0){var i,o=e.whole+e.fractional,a=o.length-r,l=+o.slice(a,a+1);if((i=v(+o.slice(a-1,a),l,"even"==n.roundHalf)?b(o,a-1):o.slice(0,a)).length>=e.whole.length)e.fractional=i.slice(e.whole.length,i.length);else{e.fractional="",e.decimal="";var u=e.whole.length-i.length;e.whole=i;for(var c=0;c<u;c++)e.whole+="0"}}}}]]);var M={prefix:"",sign:"",whole:"",decimal:"",fractional:"",exponentMarker:"",exponentSign:"",exponent:"",uncertainty:null},S=Object.assign(Object.assign({},M),{type:"pm",completed:!1});function k(){var e=Object.assign({},M);return e.uncertainty=new Array,e}function A(e,n){var t;""!=(t=n.uncertainty.length>0?n.uncertainty[n.uncertainty.length-1]:n).exponentMarker?t.exponent+=e:""!=t.decimal?t.fractional+=e:t.whole+=e}function P(e,n){(n.uncertainty.length>0?n.uncertainty[n.uncertainty.length-1]:n).decimal+=e}function D(e,n){(n.uncertainty.length>0?n.uncertainty[n.uncertainty.length-1]:n).prefix+=e}function O(e,n){n.exponentMarker+=e}function C(e,n){var t;""!=(t=n.uncertainty.length>0?n.uncertainty[n.uncertainty.length-1]:n).exponentMarker?t.exponentSign+=e:t.sign+=e}function E(e,n){var t=Object.assign(Object.assign({},S),{type:"bracket"});n.uncertainty.push(t)}function z(e,n){if(0==n.uncertainty.length)throw new o.Z("50","No uncertainty parsed to close.");var t=n.uncertainty[n.uncertainty.length-1];if(t.completed)throw new o.Z("51","Uncertainty was already closed.");t.completed=!0}function G(e,n){var t=Object.assign(Object.assign({},S),{type:"pm"});n.uncertainty.push(t)}function U(e,n){}function j(e){for(var n,t=new Map,r=/[^\\\s]|(?:\\[^\\]*(?=\s|\\|$))/g;null!==(n=r.exec(e.inputComparators));)t.set(n[0],D);for(;null!==(n=r.exec(e.inputSigns));)t.set(n[0],C);for(;null!==(n=r.exec(e.inputDigits));)t.set(n[0],A);for(;null!==(n=r.exec(e.inputDecimalMarkers));)t.set(n[0],P);for(;null!==(n=r.exec(e.inputOpenUncertainty));)t.set(n[0],E);for(;null!==(n=r.exec(e.inputCloseUncertainty));)t.set(n[0],z);for(;null!==(n=r.exec(e.inputUncertaintySigns));)if(t.has(n[0])){var i=t.get(n[0]),o=new Map;o.set("inputSigns",i),o.set("inputUncertaintySigns",G),t.set(n[0],o)}else t.set(n[0],G);for(;null!==(n=r.exec(e.inputExponentMarkers));)t.set(n[0],O);for(;null!==(n=r.exec(e.inputIgnore));)t.set(n[0],U);return t}function H(e,n,t){var r=j(t);n=(n=(n=(n=(n=n.replace("<<","\\ll")).replace(">>","\\gg")).replace("<=","\\le")).replace(">=","\\ge")).replace("+-","\\pm");var o=k(),a=new i.Z(n,e.stack.env,e.configuration);for(a.i=0;a.i<a.string.length;){var l=a.string.charAt(a.i);if(a.i++,"\\"!=l){if(r.has(l)){var u=r.get(l);"function"==typeof u?r.get(l)(l,o):""==o.whole&&""==o.decimal?u.get("inputSigns")(l,o):u.get("inputUncertaintySigns")(l,o)}}else{var c=l;for(l="";a.i<a.string.length&&"\\"!=l&&" "!=l;)"\\"!=(l=a.string.charAt(a.i))&&" "!=l&&(c+=l),a.i++;if(r.has(c)){var s=r.get(c);"function"==typeof s?r.get(c)(c,o):""==o.whole&&""==o.decimal?s.get("inputSigns")(c,o):s.get("inputUncertaintySigns")(c,o)}}}if(t.retainExplicitDecimalMarker||""==o.decimal||""!=o.fractional||(o.decimal=""),t.retainExplicitPlus||"+"!=o.sign||(o.sign=""),0!=+(o.whole+(""!=o.decimal?".":"")+o.fractional)||t.retainNegativeZero||"-"!=o.sign||(o.sign=""),!t.retainZeroUncertainty)for(var p=o.uncertainty.length-1;p>=0;p--){0==+(o.uncertainty[p].whole+(""!=o.uncertainty[p].decimal?".":"")+o.uncertainty[p].fractional)&&o.uncertainty.splice(p,1)}return o}function Z(e,n,t){if(t.parseNumbers){t.evaluateExpression;var r=H(e,n,t);!function(e,n){if(n.dropUncertainty&&e.uncertainty.splice(0,e.uncertainty.length),n.dropExponent&&(e.exponentMarker="",e.exponentSign="",e.exponent=""),x.get(n.roundMode)(e,n),n.dropZeroDecimal&&0==+e.fractional&&(e.fractional="",e.decimal=""),n.minimumIntegerDigits>0){var t=n.minimumIntegerDigits-e.whole.length;if(t>0)for(var r=0;r<t;r++)e.whole="0"+e.whole}if(n.minimumDecimalDigits>0){var i=n.minimumDecimalDigits-e.fractional.length;if(i>0)for(var o=0;o<i;o++)e.fractional+="0"}y.get(n.exponentMode)(e,n),"+"==e.exponentSign&&(e.exponentSign="")}(r,t);var o=function(e,n){var t="";return t+=e.prefix,t+m(e,n)}(r,t);return new i.Z(o,e.stack.env,e.configuration).mml()}return new i.Z(n,e.stack.env,e.configuration).mml()}function V(e,n,t){var r={degrees:k()},o=r.degrees,a=j(t),l=new i.Z(n,e.stack.env,e.configuration);for(l.i=0;l.i<l.string.length;){var c=l.string.charAt(l.i);if(l.i++,";"!=c)if("\\"!=c){if(a.has(c)){var s=a.get(c);"function"==typeof s?a.get(c)(c,o):""==o.whole&&""==o.decimal?s.get("inputSigns")(c,o):s.get("inputUncertaintySigns")(c,o)}}else{var p=c;for(c="";l.i<l.string.length&&"\\"!=c&&" "!=c;)"\\"!=(c=l.string.charAt(l.i))&&" "!=c&&(p+=c),l.i++;if(a.has(p)){var f=a.get(p);"function"==typeof f?a.get(p)(p,o):""==o.whole&&""==o.decimal?f.get("inputSigns")(p,o):f.get("inputUncertaintySigns")(p,o)}}else if(null==r.minutes)r.minutes=k(),o=r.minutes;else{if(null!=r.seconds)throw u.TooManySemicolonsInAngle;r.seconds=k(),o=r.seconds}}return r}var J=new Map([["input",function(e,n){}],["arc",function(e,n){if(null==e.minutes&&null==e.seconds&&""!=e.degrees.decimal){var t=+("0."+e.degrees.fractional);if(e.degrees.fractional="",e.degrees.decimal="",0!=t){var r=60*t;e.minutes=k(),e.minutes.whole=Math.floor(r).toString();var i=(r+"").split(".");if(i.length>1){var o=60*+("."+i[1]);e.seconds=k(),e.seconds.whole=Math.floor(o).toString();var a=(o+"").split(".");a.length>1&&(e.seconds.decimal=".",e.seconds.fractional=a[1])}}}}],["decimal",function(e,n){var t=0;null!=e.seconds&&(t=+e.seconds.whole/60,e.seconds=null),null!=e.minutes&&(t=(+e.minutes.whole+t)/60,e.minutes=null);var r=((t=+e.degrees.whole+t)+"").split(".");e.degrees.whole=r[0],r.length>1&&(e.degrees.decimal=".",e.degrees.fractional=r[1])}]]);function N(e,n,t){var r=V(e,n,t);J.get(t.angleMode)(r,t);var o=function(e,n){var t="";if(0!=+(e.degrees.whole+(""!=e.degrees.decimal?".":"")+e.degrees.fractional)&&!n.fillAngleDegrees)if(n.angleSymbolOverDecimal){var r=m(e.degrees,n),i=r.split(n.outputDecimalMarker);i.length>1?(t+=i[0],t+="\\rlap{"+n.outputDecimalMarker+"}{"+n.angleSymbolDegree+"}",t+=i[1]):(t+=r,t+=n.numberAngleProduct,t+=n.angleSymbolDegree)}else t+=m(e.degrees,n),t+=n.numberAngleProduct,t+=n.angleSymbolDegree;if(""!=t&&""!=n.angleSeparator&&(t+=n.angleSeparator),(null!=e.minutes||n.fillAngleMinutes)&&(null==e.minutes&&(e.minutes=k(),e.minutes.whole="0"),0!=+(e.minutes.whole+(""!=e.minutes.decimal?".":"")+e.minutes.fractional)&&!n.fillAngleDegrees))if(n.angleSymbolOverDecimal){var o=m(e.minutes,n),a=o.split(n.outputDecimalMarker);a.length>1?(t+=a[0],t+="\\rlap{"+n.outputDecimalMarker+"}{"+n.angleSymbolMinute+"}",t+=a[1]):(t+=o,t+=n.numberAngleProduct,t+=n.angleSymbolMinute)}else t+=m(e.minutes,n),t+=n.numberAngleProduct,t+=n.angleSymbolMinute;if(""==t||""==n.angleSeparator||t.endsWith(n.angleSeparator)||(t+=n.angleSeparator),(null!=e.seconds||n.fillAngleMinutes)&&(null==e.seconds&&(e.seconds=k(),e.seconds.whole="0"),0!=+(e.seconds.whole+(""!=e.seconds.decimal?".":"")+e.seconds.fractional)&&!n.fillAngleDegrees))if(n.angleSymbolOverDecimal){var l=m(e.seconds,n),u=l.split(n.outputDecimalMarker);u.length>1?(t+=u[0],t+="\\rlap{"+n.outputDecimalMarker+"}{"+n.angleSymbolSecond+"}",t+=u[1]):(t+=l,t+=n.numberAngleProduct,t+=n.angleSymbolSecond)}else t+=m(e.seconds,n),t+=n.numberAngleProduct,t+=n.angleSymbolSecond;return t}(r,t);return new i.Z(o,e.stack.env,e.configuration).mml()}function T(e,n){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"==typeof e)return W(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return W(e,n)}(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,l=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return a=e.done,e},e:function(e){l=!0,o=e},f:function(){try{a||null==t.return||t.return()}finally{if(l)throw o}}}}function W(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var q=Object.assign(Object.assign(Object.assign({},{evaluateExpression:!1,expression:"#1",inputCloseUncertainty:")",inputComparators:"<=>\\approx\\ge\\geq\\gg\\le\\leq\\ll\\sim",inputDecimalMarkers:".,",inputDigits:"0123456789",inputExponentMarkers:"dDeE",inputIgnore:"",inputOpenUncertainty:"(",inputSigns:"+-\\pm\\mp",inputUncertaintySigns:"\\pm\\mp",parseNumbers:!0,retainExplicitDecimalMarker:!1,retainExplicitPlus:!1,retainNegativeZero:!1,retainZeroUncertainty:!1}),{dropExponent:!1,dropUncertainty:!1,dropZeroDecimal:!1,exponentMode:"input",fixedExponent:0,minimumIntegerDigits:0,minimumDecimalDigits:0,roundHalf:"up",roundMinimum:"0",roundMode:"none",roundPad:!0,roundPrecision:2,roundZeroPositive:!0}),{bracketNegativeNumbers:!1,digitGroupSize:3,digitGroupFirstSize:-1,digitGroupOtherSize:-1,exponentBase:"10",exponentProduct:"\\times",groupDigits:"all",groupMinimumDigits:5,groupSeparator:"\\,",negativeColor:"",outputCloseUncertainty:")",outputDecimalMarker:".",outputExponentMarker:"",outputOpenUncertainty:"(",printImplicitPlus:!1,printUnityMantissa:!0,printZeroExponent:!1,printZeroInteger:!0,tightSpacing:!1,uncertaintyDescriptorMode:"bracket-separator",uncertaintyDescriptorSeparator:"\\",uncertaintyDescriptors:"",uncertaintyMode:"compact",uncertaintySeparator:"",zeroDecimalAsSymbol:!1,zeroSymbol:"\\mbox{---}"}),I=Object.assign(Object.assign({},q),{angleMode:"input",angleSymbolDegree:"\\degree",angleSymbolMinute:"'",angleSymbolOverDecimal:!1,angleSymbolSecond:"''",angleSeparator:"",fillAngleDegrees:!1,fillAngleMinutes:!1,fillAngleSeconds:!1,numberAngleProduct:""});function F(e){return e.toLowerCase().replace(/-(.)/g,(function(e,n){return n.toUpperCase()}))}function L(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var _,B=new Map([["yotta","Y"],["zetta","Z"],["exa","E"],["peta","P"],["tera","T"],["giga","G"],["mega","M"],["kilo","k"],["hecto","h"],["deka","da"],["deca","da"],["deci","d"],["centi","c"],["milli","m"],["micro","u"],["nano","n"],["pico","p"],["femto","f"],["atto","a"],["zepto","z"],["yocto","y"],["kibi","Ki"],["mebi","Mi"],["gibi","Gi"],["tebi","Ti"],["pebi","Pi"],["exbi","Ei"],["zebi","Zi"],["yobi","Yi"]]),K=new Map([["meter","m"],["metre","m"],["gram","g"],["second","s"],["ampere","A"],["candela","cd"],["kelvin","K"],["kilogram","kg"],["mole","mol"],["becquerel","Bq"],["degreeCelsius","\\degree C"],["farad","F"],["gray","Gy"],["hertz","Hz"],["henry","H"],["joule","J"],["lumen","lm"],["katal","kat"],["lux","lx"],["newton","N"],["ohm","\\ohm"],["pascal","Pa"],["radian","rad"],["siemens","S"],["sievert","Sv"],["steradian","sr"],["tesla","T"],["volt","V"],["watt","W"],["weber","Wb"],["astronomicalunit","au"],["bel","B"],["dalton","Da"],["day","d"],["decibel","dB"],["degree","\\degree"],["electronvolt","eV"],["hectare","ha"],["hour","h"],["litre","L"],["liter","L"],["arcminute","'"],["minute","min"],["arcsecond","''"],["neper","Np"],["tonne","t"]]),Q=new Map([].concat(function(e){if(Array.isArray(e))return L(e)}(_=K)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(_)||function(e,n){if(e){if("string"==typeof e)return L(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?L(e,n):void 0}}(_)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[["fg","fg"],["pg","pg"],["ng","ng"],["ug","\\micro g"],["mg","mg"],["g","g"],["kg","kg"],["pm","pm"],["nm","nm"],["um","\\micro m"],["mm","mm"],["cm","cm"],["dm","dm"],["m","m"],["km","km"],["as","as"],["fs","fs"],["ps","ps"],["ns","ns"],["us","\\micro s"],["ms","ms"],["s","s"],["fmol","fmol"],["pmol","pmol"],["nmol","nmol"],["umol","\\micro mol"],["mmol","mmol"],["mol","mol"],["kmol","kmol"],["pA","pA"],["nA","nA"],["uA","\\micro A"],["mA","mA"],["A","A"],["kA","kA"],["ul","\\micro L"],["ml","mL"],["l","L"],["hl","hL"],["uL","\\micro L"],["mL","mL"],["L","L"],["hL","hL"],["mHz","mHz"],["Hz","Hz"],["kHz","kHz"],["MHz","MHz"],["GHz","GHz"],["THz","THz"],["mN","mN"],["N","N"],["kN","kN"],["MN","MN"],["Pa","Pa"],["kPa","kPa"],["MPa","MPa"],["GPa","GPa"],["mohm","m\\ohm"],["kohm","k\\ohm"],["Mohm","M\\ohm"],["pV","pV"],["nV","nV"],["uV","\\micro V"],["mV","mV"],["V","V"],["kV","kV"],["W","W"],["nW","nW"],["uW","\\micro W"],["mW","mW"],["kW","kW"],["MW","MW"],["GW","GW"],["J","J"],["uJ","\\micro J"],["mJ","mJ"],["kJ","kJ"],["eV","eV"],["meV","meV"],["keV","keV"],["MeV","MeV"],["GeV","GeV"],["TeV","TeV"],["kWh","kW\\, h"],["F","F"],["fF","fF"],["pF","pF"],["nF","nF"],["uF","\\micro F"],["H","H"],["fH","fH"],["pH","pH"],["nH","nH"],["uH","\\micro H"],["mH","mH"],["C","C"],["nC","nC"],["mC","mC"],["uC","\\micro C"],["K","K"],["dB","dB"],["bit","b"],["byte","B"]]));function $(e){return function(e){if(Array.isArray(e))return R(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return R(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return R(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function R(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var Y=new Array("square","cubic","squared","cubed","tothe","raiseto","per","of","cancel","highlight");function X(e,n){return e=e.substring(1),Y.includes(e)?function(e,n){return ee.get(e)(e,n)}(e,n):B.has(e)?{type:"prefix",result:{prefix:B.get(e)}}:Q.has(e)?{type:"unit",result:{symbol:Q.get(e),prefix:""}}:{type:"unit",result:{symbol:"X",prefix:""}}}var ee=new Map([["square",function(e,n){return{type:"next",result:{power:2}}}],["cubic",function(e,n){return{type:"next",result:{power:3}}}],["squared",function(e,n){return{type:"previous",result:{power:2}}}],["cubed",function(e,n){return{type:"previous",result:{power:3}}}],["tothe",function(e,n){return{type:"previous",result:{power:+n.GetArgument("tothe",!0)}}}],["raiseto",function(e,n){return{type:"next",result:{power:+n.GetArgument("raiseto")}}}],["per",function(e,n){return{type:"next",result:{position:"denominator"}}}],["of",function(e,n){return{type:"previous",result:{qualifier:n.GetArgument("of")}}}],["cancel",function(e,n){return{type:"next",result:{cancel:!0}}}],["highlight",function(e,n){return{type:"next",result:{highlight:n.GetArgument("highlight")}}}]]);var ne=new Map([["subscript",function(e,n){return"_{"+e+"}"}],["bracket",function(e,n){return"("+e+")"}],["combine",function(e,n){return e}],["phrase",function(e,n){return n+e}]]);function te(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r="";e.cancel&&(r+="\\cancel{"),e.highlight&&(r+="{\\color{"+e.highlight+"}"),r+=n.unitFontCommand+"{",r+="\\class{MathML-Unit}{"+e.prefix+e.symbol+"}",e.qualifier&&(r+=ne.get(n.qualifierMode)(e.qualifier,n.qualifierPhrase)),r+="}";var i=null!=e.power?t?Math.abs(e.power*("denominator"==e.position?-1:1)):e.power*("denominator"==e.position?-1:1):1*("denominator"==e.position?-1:1);return null!=i&&1!=i&&(r+="^{"+i+"}"),e.cancel&&(r+="}"),e.highlight&&(r+="}"),{latex:r,superscriptPresent:1!=i}}function re(e,n,t){var r=new Array;if(-1!=n.indexOf("\\")){var a=new i.Z(n,e.stack.env,e.configuration);a.i=0;for(var l=null;a.i<a.string.length;){var u=a.GetArgument(null),c=X(u,a);switch(c.type){case"next":case"prefix":l=null!=l?Object.assign(l,c.result):c.result;break;case"previous":if(0==r.length)throw new o.Z("MissingPreviousMacro","There is no previous macro for %1 to modify.",u);var s=r[r.length-1];s=Object.assign(s,c.result);break;case"unit":if(null!=l)if(c.result=Object.assign(c.result,l),"repeated-symbol"==t.perMode){var p="denominator"==l.position;l=null,p&&(l={position:"denominator"})}else l=null;r.push(c.result)}}}else r.push.apply(r,$(function(e,n){var t=new Array,r=new i.Z(n,e.stack.env,e.configuration);r.i=0;var o={position:"numerator"},a=!1,l="";for(;r.i<r.string.length;){switch(r.string.charAt(r.i)){case"~":case".":oe(l,o),t.push(o),l="",o={position:a?"denominator":"numerator"};break;case"/":oe(l,o),t.push(o),l="",o={position:(a=!0)?"denominator":"numerator"};break;case"^":var u=r.string.charAt(++r.i),c="";if("{"==u)for(;"}"!=(u=r.string.charAt(++r.i));)c+=u;else c=u;o.power=+c;break;case"_":var s="";if("{"==(u=r.string.charAt(++r.i)))for(;"}"!=(u=r.string.charAt(++r.i));)s+=u;else s=u;o.qualifier=s;break;default:l+=r.string.charAt(r.i)}r.i++}return oe(l,o),t.push(o),t}(e,n)));var f=function(e,n,t){var r,o;if(n.length>=2&&1==n.filter((function(e){var n=null!=e.power?e.power*("denominator"==e.position?-1:1):1;return-1==Math.sign(n)})).length&&"single-symbol"==t.perMode&&(o=!0),"fraction"==t.perMode||"symbol"==t.perMode||"repeated-symbol"==t.perMode||o){var a="",l="",u=!1;n.forEach((function(e,n,r){var i;"denominator"==e.position||null!=e.power&&e.power<0?(i=te(e,t,"fraction"==t.perMode||"symbol"==t.perMode||"repeated-symbol"==t.perMode||"single-symbol"==t.perMode||o),""!=l&&("repeated-symbol"==t.perMode?(i.superscriptPresent&&(l+=t.perSymbolScriptCorrection),l+=t.perSymbol):l+=t.interUnitProduct),l+=i.latex):(i=te(e,t,"fraction"==t.perMode||"symbol"==t.perMode||"repeated-symbol"==t.perMode||"single-symbol"==t.perMode||o),u=i.superscriptPresent,""!=a&&(a+=t.interUnitProduct),a+=i.latex)})),""==a&&""!=l&&(a="1"),""!=l?"fraction"==t.perMode?r=t.fractionCommand+"{"+a+"}{"+l+"}":"repeated-symbol"==t.perMode||"symbol"==t.perMode||o?r=a+(u?t.perSymbolScriptCorrection:"")+t.perSymbol+l:console.log("shouldn't be here"):r=a}else{"power-positive-first"==t.perMode&&(n=n.sort((function(e,n){var t=null!=e.power?e:1;"denominator"==e.position&&(t=-t);var r=null!=n.power?n:1;return"denominator"==n.position&&(r=-r),t>r?1:t<r?-1:0})));var c="";n.forEach((function(e,n,r){var i=te(e,t);i.superscriptPresent,""!=c&&(c+=t.interUnitProduct),c+=i.latex})),r=c}return new i.Z(r,e.stack.env,e.configuration).mml()}(e,r,t);return f}function ie(e,n){return Array.from(e).filter((function(e,n,t){return n===t.indexOf(e)})).sort((function(e,n){return e.length-n.length})).join(n)}function oe(e,n){var t=ie(B.values(),"|"),r=ie(K.values(),"|"),i=new RegExp("("+t+")?("+r+")").exec(e);void 0!==i[1]?n.prefix=i[1]:n.prefix="",n.symbol=i[2]}var ae,le=new Map([["\\num",function(e,n,t){return Z(e,e.GetArgument(n),t)}],["\\ang",function(e,n,t){return N(e,e.GetArgument(n),t)}],["\\unit",function(e,n,t){var r=e.GetArgument(n);return re(e,r,t)}],["\\qty",function(e,n,t){var r=Z(e,e.GetArgument(n),t);e.Push(r);var i=e.GetArgument(n);return re(e,i,t)}]]);new n.QQ("siunitxMap",{num:["siunitxToken","num"],ang:["siunitxToken","ang"],unit:["siunitxToken","unit"],qty:["siunitxToken","qty"]},{siunitxToken:function(e,n,t){ae=e;var r=function(e,n){var t=Object.assign({},e);if(null!=n){for(;n.startsWith("{")&&n.endsWith("}");)n=n.slice(1,n.length-1);var r,i="",o=!1,a=0,l=!1,u="",c=T(n);try{for(c.s();!(r=c.n()).done;){var s=r.value;"{"==s?(o?u+=s:i+=s,a++):"}"==s?(a--,o?u+=s:i+=s):"\\"==s?(l=!0,o?u+=s:i+=s):","!=s||0!=a||l?"="==s&&0==a?o=!0:o?u+=s:i+=s:(i=F(i.trim()),""==u?t[i]=!0:"number"==typeof t[i]?t[i]=+u.trim():"boolean"==typeof t[i]?t[i]="true"===u.trim():t[i]=u.trim(),i="",u="",o=!1)}}catch(e){c.e(e)}finally{c.f()}i=F(i.trim()),""==u?t[i]=!0:"number"==typeof t[i]?t[i]=+u.trim():"boolean"==typeof t[i]?t[i]="true"===u.trim():t[i]=u.trim()}return t}(e.options,function(e){if("["===e.GetNext()){for(var n=++e.i,t=0;e.i<e.string.length;){if("{"==e.string.charAt(e.i))t++;else if("}"==e.string.charAt(e.i))t--;else if("]"==e.string.charAt(e.i)&&0==t){var r=e.string.slice(n,e.i);return e.i++,r}e.i++}throw new o.Z("MissingCloseBracket","Could not find closing ']' for argument to %1",e.currentCS)}}(e)),i=le.get(n)(e,n,r);e.Push(i)}});e.VK.create("siunitx",{handler:{macro:["siunitxMap"]},options:Object.assign(Object.assign(Object.assign({},{bracketUnitDenominator:!0,forbidLiteralUnits:!1,fractionCommand:"\\frac",interUnitProduct:"\\,",parseUnits:!0,perMode:"power",displayPerMode:"perMode",inlinePerMode:"perMode",perSymbolScriptCorrection:"\\!",perSymbol:"/",powerHalfAsSqrt:!1,qualifierMode:"subscript",qualifierPhrase:"",stickyPer:!1,unitFontCommand:"\\mathrm"}),q),I)})}()}();