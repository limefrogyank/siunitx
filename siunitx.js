!function(){"use strict";var e={80:function(e,n){n.VK=MathJax._.input.tex.Configuration.Configuration,MathJax._.input.tex.Configuration.ConfigurationHandler,MathJax._.input.tex.Configuration.ParserConfiguration},579:function(e,n){MathJax._.input.tex.SymbolMap.parseResult,MathJax._.input.tex.SymbolMap.AbstractSymbolMap,MathJax._.input.tex.SymbolMap.RegExpMap,MathJax._.input.tex.SymbolMap.AbstractParseMap,MathJax._.input.tex.SymbolMap.CharacterMap,MathJax._.input.tex.SymbolMap.DelimiterMap,MathJax._.input.tex.SymbolMap.MacroMap,n.QQ=MathJax._.input.tex.SymbolMap.CommandMap,MathJax._.input.tex.SymbolMap.EnvironmentMap},516:function(e,n){n.Z=MathJax._.input.tex.TexError.default},693:function(e,n){n.Z=MathJax._.input.tex.TexParser.default}},n={};function t(r){var i=n[r];if(void 0!==i)return i.exports;var o=n[r]={exports:{}};return e[r](o,o.exports,t),o.exports}t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)};var r={};!function(){t.d(r,{ZE:function(){return ge},Hj:function(){return ye},HE:function(){return de}});var e=t(80),n=t(579),i=t(693),o=t(516);function a(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var l=function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,t,r;return n=e,r=[{key:"NoInterpretationForUnitMacro",value:function(e){return new o.Z("102","The unit macro, "+e+", has not been defined.")}}],(t=null)&&a(n.prototype,t),r&&a(n,r),Object.defineProperty(n,"prototype",{writable:!1}),e}();function u(e,n,t,r,i,o,a){if(e.length>=t){var l=e.split(""),u=0,c=-1!=o&&null!=o?o:n,s=c;if(i)for(var p=c;p<l.length;p+=s)e=e.slice(0,p+u)+r+e.slice(p+u,e.length+u),u+=r.length,s=-1!=a&&null!=a?a:n;else for(var f=l.length-c;f>=0;f-=s)e=e.slice(0,f)+r+e.slice(f,e.length+u),u+=r.length,s=-1!=a&&null!=a?a:n}return e}l.TooManySemicolonsInAngle=new o.Z("101","There are two many semi-colons.  Should only be two at most.");var c=new Map([["all",function(e,n){e.whole=u(e.whole,n.digitGroupSize,n.groupMinimumDigits,n.groupSeparator,!1,n.digitGroupFirstSize,n.digitGroupOtherSize),e.fractional=u(e.fractional,n.digitGroupSize,n.groupMinimumDigits,n.groupSeparator,!0,n.digitGroupFirstSize,n.digitGroupOtherSize)}],["decimal",function(e,n){e.fractional=u(e.fractional,n.digitGroupSize,n.groupMinimumDigits,n.groupSeparator,!0,n.digitGroupFirstSize,n.digitGroupOtherSize)}],["integer",function(e,n){e.whole=u(e.whole,n.digitGroupSize,n.groupMinimumDigits,n.groupSeparator,!1,n.digitGroupFirstSize,n.digitGroupOtherSize)}],["none",function(){}]]);function s(e,n,t){if("bracket"==e.type){var r=e.whole.length-n.fractional.length;r>0&&"compact-marker"==t.uncertaintyMode&&(e.fractional=e.whole.slice(r,e.whole.length),e.whole=e.whole.slice(0,r),e.decimal=t.outputDecimalMarker)}else{if(+(e.whole+e.decimal+e.fractional)<1){for(var i=0,o=0;o<e.fractional.length&&"0"==e.fractional[o];o++)i++;e.whole=e.fractional.slice(i,e.fractional.length),e.decimal="",e.fractional=""}}}function p(e,n){var t=n.uncertaintySeparator;return t+=n.outputOpenUncertainty,t+=e.whole,t+="compact-marker"==n.uncertaintyMode&&""!=e.decimal?n.outputDecimalMarker:"",t+=e.fractional,t+=n.outputCloseUncertainty}var f=new Map([["separate",function(e,n,t){return function(e,n,t){if("pm"!=e.type&&""==e.decimal){var r=n.fractional.length-e.whole.length;if(r>=0){for(var i=0;i<r;i++)e.fractional+="0";e.fractional+=e.whole,e.whole="0",e.decimal=t.outputDecimalMarker}}}(e,n,t),function(e,n){return"\\pm"+g(e,n)}(e,t)}],["compact",function(e,n,t){return s(e,n,t),p(e,t)}],["full",function(e,n,t){return s(e,n,t),p(e,t)}],["compact-marker",function(e,n,t){return s(e,n,t),p(e,t)}]]);function g(e,n){var t,r,i="";return null===(t=c.get(n.groupDigits))||void 0===t||t(e,n),""!=n.negativeColor&&(i+="{\\color{"+n.negativeColor+"}"),n.bracketNegativeNumbers?"-"==e.sign&&(i+="("):n.printImplicitPlus&&""==e.sign?i+="+":i+=e.sign,"1"!=e.whole||""!=e.fractional||n.printUnityMantissa?(""==e.whole&&e.fractional||"0"==e.whole?n.printZeroInteger&&(i+="0"):i+=e.whole,i+=""!=e.decimal?n.outputDecimalMarker:"",n.zeroDecimalAsSymbol&&0==+e.fractional?i+=n.zeroSymbol:i+=e.fractional):n.printZeroExponent||""!=e.exponent&&("1"!=e.exponent||"-"==e.exponentSign)||(i+="1"),null===(r=e.uncertainty)||void 0===r||r.forEach((function(t){var r;i+=null===(r=f.get(n.uncertaintyMode))||void 0===r?void 0:r(t,e,n)})),!n.printZeroExponent||""!=e.exponent&&"0"!=e.exponent?""!=e.exponent&&"0"!=e.exponent&&("1"!=e.whole||""!=e.fractional||n.printUnityMantissa?""!=e.exponentMarker&&(""!=n.outputExponentMarker?(i+=n.outputExponentMarker,i+=e.exponentSign+e.exponent):(i+=""!=e.whole||""!=e.fractional?n.exponentProduct:"",i+=n.exponentBase,i+="^{"+e.exponentSign+e.exponent+"}")):(i+=n.exponentBase,i+="^{"+e.exponentSign+e.exponent+"}")):""!=n.outputExponentMarker?(i+=n.outputExponentMarker,i+="0"):(i+=n.exponentProduct,i+=n.exponentBase,i+="^{0}"),n.bracketNegativeNumbers&&"-"==e.sign&&(i+=")"),""!=n.negativeColor&&(i+="}"),i}function m(e,n){var t="";return t+=e.prefix,t+=g(e,n)}function h(e,n){var t=(+(e.sign+e.whole+e.decimal+e.fractional+(""!=e.exponent?"e"+e.exponentSign+e.exponent:""))).toExponential(),r=L(ge,t,n),i=0;if(""!=e.fractional)for(var o=e.fractional.length-1;o>=0&&"0"==e.fractional[o];o--)i++;if(""!=e.whole&&e.fractional.length==i)for(var a=e.whole.length-1;a>=0&&"0"==e.whole[a];a--)i++;for(var l=0;l<i;l++)r.fractional+="0";for(var u in""==r.decimal&&i>0&&(r.decimal="."),e)e[u]=r[u]}function d(e,n){if(null!=e){for(var t=n-+(e.exponentSign+e.exponent),r=Math.sign(t),i=0;i<Math.abs(t);i++)r<0?e.fractional.length>0?(e.whole=e.whole+e.fractional.slice(0,1),e.fractional=e.fractional.slice(1,e.fractional.length)):e.whole=e.whole+"0":e.whole.length>0?(e.fractional=e.whole.slice(e.whole.length-1,e.whole.length)+e.fractional,e.whole=e.whole.slice(0,e.whole.length-1)):e.fractional="0"+e.fractional;""!=e.fractional&&""==e.decimal&&(e.decimal="."),e.exponent=Math.abs(n).toString(),e.exponentSign=Math.sign(n)<0?"-":""}}var y=new Map([["input",function(){}],["fixed",function(e,n){h(e,n),d(e,n.fixedExponent)}],["engineering",function(e,n){h(e,n);for(var t=+(e.exponentSign+e.exponent);t%3!=0;)t--;d(e,t)}],["scientific",h]]);function v(e,n,t){var r=!1;return n>5?r=!0:5==n&&(r=!t||e%2!=0),r}function b(e,n){var t="",r=new Array,i=+e[n]+1,o=0==i;r.push(i);for(var a=n-1;a>=0;a--)o?(o=0==(i=+e[a]+1),r.push(i)):(i=+e[a],r.push(i));return r.reverse(),r.forEach((function(e){return t+=e})),t}function w(e,n){if(0==Math.abs(+(e.whole+e.decimal+e.fractional+(""!=e.exponentMarker?"e":"")+e.exponentSign+e.exponent)))if("0"!=n.roundMinimum){e.prefix="\\lt";var t=L(ge,n.roundMinimum,n);e.sign=t.sign,e.whole=t.whole,e.decimal=t.decimal,e.fractional=t.fractional,e.exponentMarker=t.exponentMarker,e.exponentSign=t.exponentSign,e.exponent=t.exponent}else n.roundZeroPositive&&(e.sign="")}var x=new Map([["none",function(){}],["places",function(e,n){if(0==e.uncertainty.length){if(e.fractional.length>n.roundPrecision){var t=+e.fractional.slice(n.roundPrecision,n.roundPrecision+1);if(v(+e.fractional.slice(n.roundPrecision-1,n.roundPrecision),t,"even"==n.roundHalf)){var r=b(e.whole+e.fractional,e.whole.length+n.roundPrecision-1),i=e.whole.length;e.whole=r.slice(0,i),e.fractional=r.slice(i,r.length)}else e.fractional=e.fractional.slice(0,n.roundPrecision)}else if(e.fractional.length<n.roundPrecision&&n.roundPad)for(var o=0;o<n.roundPrecision-e.fractional.length;o++)e.fractional+="0";w(e,n)}}],["figures",function(e,n){if(0==e.uncertainty.length){var t=e.whole+e.fractional;if(t.length>n.roundPrecision){var r,i=+t.slice(n.roundPrecision,n.roundPrecision+1);if((r=v(+t.slice(n.roundPrecision-1,n.roundPrecision),i,"even"==n.roundHalf)?b(t,n.roundPrecision-1):t.slice(0,n.roundPrecision)).length>=e.whole.length)e.fractional=r.slice(e.whole.length,r.length);else{e.fractional="",e.decimal="";var o=e.whole.length-r.length;e.whole=r;for(var a=0;a<o;a++)e.whole+="0"}}else if(t.length<n.roundPrecision&&n.roundPad)for(var l=0;l<n.roundPrecision-t.length;l++)e.fractional+="0",""==e.decimal&&(e.decimal=".");w(e,n)}}],["uncertainty",function(e,n){if(e.uncertainty.length>0){e.uncertainty.forEach((function(e){if("pm"==e.type&&+(e.whole+e.decimal+e.fractional)<1){for(var n=0,t=0;t<e.fractional.length&&"0"==e.fractional[t];t++)n++;e.whole=e.fractional.slice(n,e.fractional.length),e.decimal="",e.fractional=""}}));var t=999;e.uncertainty.forEach((function(e){if(t=Math.min(e.whole.length,t),e.whole.length-n.roundPrecision>0){var r=+e.whole.slice(n.roundPrecision,n.roundPrecision+1);v(+e.whole.slice(n.roundPrecision-1,n.roundPrecision),r,"even"==n.roundHalf)?e.whole=b(e.whole,n.roundPrecision-1):e.whole=e.whole.slice(0,n.roundPrecision)}}));var r=t-n.roundPrecision;if(r>0){var i,o=e.whole+e.fractional,a=o.length-r,l=+o.slice(a,a+1);if((i=v(+o.slice(a-1,a),l,"even"==n.roundHalf)?b(o,a-1):o.slice(0,a)).length>=e.whole.length)e.fractional=i.slice(e.whole.length,i.length);else{e.fractional="",e.decimal="";var u=e.whole.length-i.length;e.whole=i;for(var c=0;c<u;c++)e.whole+="0"}}}}]]);function M(e,n){if(n.dropUncertainty&&e.uncertainty.splice(0,e.uncertainty.length),n.dropExponent&&(e.exponentMarker="",e.exponentSign="",e.exponent=""),x.get(n.roundMode)(e,n),n.dropZeroDecimal&&0==+e.fractional&&(e.fractional="",e.decimal=""),n.minimumIntegerDigits>0){var t=n.minimumIntegerDigits-e.whole.length;if(t>0)for(var r=0;r<t;r++)e.whole="0"+e.whole}if(n.minimumDecimalDigits>0){var i=n.minimumDecimalDigits-e.fractional.length;if(i>0)for(var o=0;o<i;o++)e.fractional+="0"}y.get(n.exponentMode)(e,n),"+"==e.exponentSign&&(e.exponentSign="")}function S(e,n){var t="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!t){if(Array.isArray(e)||(t=function(e,n){if(!e)return;if("string"==typeof e)return k(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return k(e,n)}(e))||n&&e&&"number"==typeof e.length){t&&(e=t);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,l=!1;return{s:function(){t=t.call(e)},n:function(){var e=t.next();return a=e.done,e},e:function(e){l=!0,o=e},f:function(){try{a||null==t.return||t.return()}finally{if(l)throw o}}}}function k(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var A={bracketUnitDenominator:!0,forbidLiteralUnits:!1,fractionCommand:"\\frac",interUnitProduct:"\\,",parseUnits:!0,perMode:"power",displayPerMode:"perMode",inlinePerMode:"perMode",perSymbolScriptCorrection:"\\!",perSymbol:"/",powerHalfAsSqrt:!1,qualifierMode:"subscript",qualifierPhrase:"",stickyPer:!1,unitFontCommand:"\\mathrm"},P=Object.assign(Object.assign(Object.assign({},{evaluateExpression:!1,expression:"#1",inputCloseUncertainty:")",inputComparators:"<=>\\approx\\ge\\geq\\gg\\le\\leq\\ll\\sim",inputDecimalMarkers:".,",inputDigits:"0123456789",inputExponentMarkers:"dDeE",inputIgnore:"",inputOpenUncertainty:"(",inputSigns:"+-\\pm\\mp",inputUncertaintySigns:"\\pm\\mp",parseNumbers:!0,retainExplicitDecimalMarker:!1,retainExplicitPlus:!1,retainNegativeZero:!1,retainZeroUncertainty:!1}),{dropExponent:!1,dropUncertainty:!1,dropZeroDecimal:!1,exponentMode:"input",fixedExponent:0,minimumIntegerDigits:0,minimumDecimalDigits:0,roundHalf:"up",roundMinimum:"0",roundMode:"none",roundPad:!0,roundPrecision:2,roundZeroPositive:!0}),{bracketNegativeNumbers:!1,digitGroupSize:3,digitGroupFirstSize:-1,digitGroupOtherSize:-1,exponentBase:"10",exponentProduct:"\\times",groupDigits:"all",groupMinimumDigits:5,groupSeparator:"\\,",negativeColor:"",outputCloseUncertainty:")",outputDecimalMarker:".",outputExponentMarker:"",outputOpenUncertainty:"(",printImplicitPlus:!1,printUnityMantissa:!0,printZeroExponent:!1,printZeroInteger:!0,tightSpacing:!1,uncertaintyDescriptorMode:"bracket-separator",uncertaintyDescriptorSeparator:"\\",uncertaintyDescriptors:"",uncertaintyMode:"compact",uncertaintySeparator:"",zeroDecimalAsSymbol:!1,zeroSymbol:"\\mbox{---}"}),D=Object.assign(Object.assign(Object.assign({},P),A),{allowQuantityBreaks:!1,extractMassInKilograms:!0,prefixMode:"input",quantityProduct:"\\,",separateUncertaintyUnits:"bracket"}),O=Object.assign(Object.assign({},P),{angleMode:"input",angleSymbolDegree:"\\degree",angleSymbolMinute:"'",angleSymbolOverDecimal:!1,angleSymbolSecond:"''",angleSeparator:"",fillAngleDegrees:!1,fillAngleMinutes:!1,fillAngleSeconds:!1,numberAngleProduct:""});function C(e){if("["!==e.GetNext())return"";for(var n=++e.i,t=0;e.i<e.string.length;){if("{"==e.string.charAt(e.i))t++;else if("}"==e.string.charAt(e.i))t--;else if("]"==e.string.charAt(e.i)&&0==t){var r=e.string.slice(n,e.i);return e.i++,r}e.i++}throw new o.Z("MissingCloseBracket","Could not find closing ']' for argument to %1",e.currentCS)}function U(e){return e.toLowerCase().replace(/-(.)/g,(function(e,n){return n.toUpperCase()}))}function j(e,n){if(null!=n){for(;n.startsWith("{")&&n.endsWith("}");)n=n.slice(1,n.length-1);var t,r="",i=!1,o=0,a=!1,l="",u=S(n);try{for(u.s();!(t=u.n()).done;){var c=t.value;"{"==c?(i?l+=c:r+=c,o++):"}"==c?(o--,i?l+=c:r+=c):"\\"==c?(a=!0,i?l+=c:r+=c):","!=c||0!=o||a?"="==c&&0==o?i=!0:i?l+=c:r+=c:(r=U(r.trim()),""==l?e[r]=!0:"number"==typeof e[r]?e[r]=+l.trim():"boolean"==typeof e[r]?e[r]="true"===l.trim():(-1==l.indexOf("\\")&&(l=l.trim()),e[r]=l),r="",l="",i=!1)}}catch(e){u.e(e)}finally{u.f()}r=U(r.trim()),""==l?e[r]=!0:"number"==typeof e[r]?e[r]=+l.trim():"boolean"==typeof e[r]?e[r]="true"===l.trim():(-1==l.indexOf("\\")&&(l=l.trim()),e[r]=l)}}var E={prefix:"",sign:"",whole:"",decimal:"",fractional:"",exponentMarker:"",exponentSign:"",exponent:"",uncertainty:[]},G=Object.assign(Object.assign({},E),{type:"pm",completed:!1});function z(){var e=Object.assign({},E);return e.uncertainty=new Array,e}function H(e,n){var t;""!=(t=n.uncertainty.length>0?n.uncertainty[n.uncertainty.length-1]:n).exponentMarker?t.exponent+=e:""!=t.decimal?t.fractional+=e:t.whole+=e}function Z(e,n){(n.uncertainty.length>0?n.uncertainty[n.uncertainty.length-1]:n).decimal+=e}function V(e,n){(n.uncertainty.length>0?n.uncertainty[n.uncertainty.length-1]:n).prefix+=e}function I(e,n){n.exponentMarker+=e}function N(e,n){var t;""!=(t=n.uncertainty.length>0?n.uncertainty[n.uncertainty.length-1]:n).exponentMarker?t.exponentSign+=e:t.sign+=e}function J(e,n){var t=Object.assign(Object.assign({},G),{type:"bracket"});n.uncertainty.push(t)}function T(e,n){if(0==n.uncertainty.length)throw new o.Z("50","No uncertainty parsed to close.");var t=n.uncertainty[n.uncertainty.length-1];if(t.completed)throw new o.Z("51","Uncertainty was already closed.");t.completed=!0}function q(e,n){var t=Object.assign(Object.assign({},G),{type:"pm"});n.uncertainty.push(t)}function W(){}function F(e){for(var n,t=new Map,r=/[^\\\s]|(?:\\[^\\]*(?=\s|\\|$))/g;null!==(n=r.exec(e.inputComparators));)t.set(n[0],V);for(;null!==(n=r.exec(e.inputSigns));)t.set(n[0],N);for(;null!==(n=r.exec(e.inputDigits));)t.set(n[0],H);for(;null!==(n=r.exec(e.inputDecimalMarkers));)t.set(n[0],Z);for(;null!==(n=r.exec(e.inputOpenUncertainty));)t.set(n[0],J);for(;null!==(n=r.exec(e.inputCloseUncertainty));)t.set(n[0],T);for(;null!==(n=r.exec(e.inputUncertaintySigns));)if(t.has(n[0])){var i=t.get(n[0]),o=new Map;o.set("inputSigns",i),o.set("inputUncertaintySigns",q),t.set(n[0],o)}else t.set(n[0],q);for(;null!==(n=r.exec(e.inputExponentMarkers));)t.set(n[0],I);for(;null!==(n=r.exec(e.inputIgnore));)t.set(n[0],W);return t}function L(e,n,t){var r,o,a,l,u=F(t);n=(n=(n=(n=(n=n.replace("<<","\\ll")).replace(">>","\\gg")).replace("<=","\\le")).replace(">=","\\ge")).replace("+-","\\pm");var c=z(),s=new i.Z(n,e.stack.env,e.configuration);for(s.i=0;s.i<s.string.length;){var p=s.string.charAt(s.i);if(s.i++,"\\"!=p){if(u.has(p)){var f=u.get(p);"function"==typeof f?u.get(p)(p,c):""==c.whole&&""==c.decimal?null===(r=f.get("inputSigns"))||void 0===r||r(p,c):null===(o=f.get("inputUncertaintySigns"))||void 0===o||o(p,c)}}else{var g=p;for(p="";s.i<s.string.length&&"\\"!=p&&" "!=p;)"\\"!=(p=s.string.charAt(s.i))&&" "!=p&&(g+=p),s.i++;if(u.has(g)){var m=u.get(g);"function"==typeof m?u.get(g)(g,c):""==c.whole&&""==c.decimal?null===(a=m.get("inputSigns"))||void 0===a||a(g,c):null===(l=m.get("inputUncertaintySigns"))||void 0===l||l(g,c)}}}if(t.retainExplicitDecimalMarker||""==c.decimal||""!=c.fractional||(c.decimal=""),t.retainExplicitPlus||"+"!=c.sign||(c.sign=""),0!=+(c.whole+(""!=c.decimal?".":"")+c.fractional)||t.retainNegativeZero||"-"!=c.sign||(c.sign=""),!t.retainZeroUncertainty)for(var h=c.uncertainty.length-1;h>=0;h--){0==+(c.uncertainty[h].whole+(""!=c.uncertainty[h].decimal?".":"")+c.uncertainty[h].fractional)&&c.uncertainty.splice(h,1)}return c}function _(e,n,t){var r={degrees:z()},o=r.degrees,a=F(t),u=new i.Z(n,e.stack.env,e.configuration);for(u.i=0;u.i<u.string.length;){var c=u.string.charAt(u.i);if(u.i++,";"!=c)if("\\"!=c){if(a.has(c)){var s=a.get(c);"function"==typeof s?a.get(c)(c,o):""==o.whole&&""==o.decimal?s.get("inputSigns")(c,o):s.get("inputUncertaintySigns")(c,o)}}else{var p=c;for(c="";u.i<u.string.length&&"\\"!=c&&" "!=c;)"\\"!=(c=u.string.charAt(u.i))&&" "!=c&&(p+=c),u.i++;if(a.has(p)){var f=a.get(p);"function"==typeof f?a.get(p)(p,o):""==o.whole&&""==o.decimal?f.get("inputSigns")(p,o):f.get("inputUncertaintySigns")(p,o)}}else if(null==r.minutes)r.minutes=z(),o=r.minutes;else{if(null!=r.seconds)throw l.TooManySemicolonsInAngle;r.seconds=z(),o=r.seconds}}return r}var B=new Map([["input",function(){}],["arc",function(e){if(null==e.minutes&&null==e.seconds&&""!=e.degrees.decimal){var n=+("0."+e.degrees.fractional);if(e.degrees.fractional="",e.degrees.decimal="",0!=n){var t=60*n;e.minutes=z(),e.minutes.whole=Math.floor(t).toString();var r=(t+"").split(".");if(r.length>1){var i=60*+("."+r[1]);e.seconds=z(),e.seconds.whole=Math.floor(i).toString();var o=(i+"").split(".");o.length>1&&(e.seconds.decimal=".",e.seconds.fractional=o[1])}}}}],["decimal",function(e){var n=0;null!=e.seconds&&(n=+e.seconds.whole/60,e.seconds=null),null!=e.minutes&&(n=(+e.minutes.whole+n)/60,e.minutes=null);var t=((n=+e.degrees.whole+n)+"").split(".");e.degrees.whole=t[0],t.length>1&&(e.degrees.decimal=".",e.degrees.fractional=t[1])}]]);function K(e){var n=Object.assign({},e.options),t=C(e);j(n,t);var r=e.GetArgument("ang");j(n,t);var o=_(e,r,n);B.get(n.angleMode)(o);var a=function(e,n){var t="";if(0!=+(e.degrees.whole+(""!=e.degrees.decimal?".":"")+e.degrees.fractional)&&!n.fillAngleDegrees)if(n.angleSymbolOverDecimal){var r=g(e.degrees,n),i=r.split(n.outputDecimalMarker);i.length>1?(t+=i[0],t+="\\rlap{"+n.outputDecimalMarker+"}{"+n.angleSymbolDegree+"}",t+=i[1]):(t+=r,t+=n.numberAngleProduct,t+=n.angleSymbolDegree)}else t+=g(e.degrees,n),t+=n.numberAngleProduct,t+=n.angleSymbolDegree;if(""!=t&&""!=n.angleSeparator&&(t+=n.angleSeparator),(null!=e.minutes||n.fillAngleMinutes)&&(null==e.minutes&&(e.minutes=z(),e.minutes.whole="0"),0!=+(e.minutes.whole+(""!=e.minutes.decimal?".":"")+e.minutes.fractional)&&!n.fillAngleDegrees))if(n.angleSymbolOverDecimal){var o=g(e.minutes,n),a=o.split(n.outputDecimalMarker);a.length>1?(t+=a[0],t+="\\rlap{"+n.outputDecimalMarker+"}{"+n.angleSymbolMinute+"}",t+=a[1]):(t+=o,t+=n.numberAngleProduct,t+=n.angleSymbolMinute)}else t+=g(e.minutes,n),t+=n.numberAngleProduct,t+=n.angleSymbolMinute;if(""==t||""==n.angleSeparator||t.endsWith(n.angleSeparator)||(t+=n.angleSeparator),(null!=e.seconds||n.fillAngleMinutes)&&(null==e.seconds&&(e.seconds=z(),e.seconds.whole="0"),0!=+(e.seconds.whole+(""!=e.seconds.decimal?".":"")+e.seconds.fractional)&&!n.fillAngleDegrees))if(n.angleSymbolOverDecimal){var l=g(e.seconds,n),u=l.split(n.outputDecimalMarker);u.length>1?(t+=u[0],t+="\\rlap{"+n.outputDecimalMarker+"}{"+n.angleSymbolSecond+"}",t+=u[1]):(t+=l,t+=n.numberAngleProduct,t+=n.angleSymbolSecond)}else t+=g(e.seconds,n),t+=n.numberAngleProduct,t+=n.angleSymbolSecond;return t}(o,n);return new i.Z(a,e.stack.env,e.configuration).mml()}function Q(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var $,R=new Map,Y=new Map,X=new Map([["yotta","Y"],["zetta","Z"],["exa","E"],["peta","P"],["tera","T"],["giga","G"],["mega","M"],["kilo","k"],["hecto","h"],["deka","da"],["deca","da"],["deci","d"],["centi","c"],["milli","m"],["micro","u"],["nano","n"],["pico","p"],["femto","f"],["atto","a"],["zepto","z"],["yocto","y"],["kibi","Ki"],["mebi","Mi"],["gibi","Gi"],["tebi","Ti"],["pebi","Pi"],["exbi","Ei"],["zebi","Zi"],["yobi","Yi"]]),ee=new Map([["meter","m"],["metre","m"],["gram","g"],["second","s"],["ampere","A"],["candela","cd"],["kelvin","K"],["kilogram","kg"],["mole","mol"],["becquerel","Bq"],["degreeCelsius","\\degree C"],["coulomb","C"],["farad","F"],["gray","Gy"],["hertz","Hz"],["henry","H"],["joule","J"],["lumen","lm"],["katal","kat"],["lux","lx"],["newton","N"],["ohm","\\ohm"],["pascal","Pa"],["radian","rad"],["siemens","S"],["sievert","Sv"],["steradian","sr"],["tesla","T"],["volt","V"],["watt","W"],["weber","Wb"],["astronomicalunit","au"],["bel","B"],["dalton","Da"],["day","d"],["decibel","dB"],["degree","\\degree"],["electronvolt","eV"],["hectare","ha"],["hour","h"],["litre","L"],["liter","L"],["arcminute","'"],["minute","min"],["arcsecond","''"],["neper","Np"],["tonne","t"]]),ne=new Map([].concat(function(e){if(Array.isArray(e))return Q(e)}($=ee)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}($)||function(e,n){if(e){if("string"==typeof e)return Q(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?Q(e,n):void 0}}($)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),[["fg","fg"],["pg","pg"],["ng","ng"],["ug","\\micro g"],["mg","mg"],["g","g"],["kg","kg"],["pm","pm"],["nm","nm"],["um","\\micro m"],["mm","mm"],["cm","cm"],["dm","dm"],["m","m"],["km","km"],["as","as"],["fs","fs"],["ps","ps"],["ns","ns"],["us","\\micro s"],["ms","ms"],["s","s"],["fmol","fmol"],["pmol","pmol"],["nmol","nmol"],["umol","\\micro mol"],["mmol","mmol"],["mol","mol"],["kmol","kmol"],["pA","pA"],["nA","nA"],["uA","\\micro A"],["mA","mA"],["A","A"],["kA","kA"],["ul","\\micro L"],["ml","mL"],["l","L"],["hl","hL"],["uL","\\micro L"],["mL","mL"],["L","L"],["hL","hL"],["mHz","mHz"],["Hz","Hz"],["kHz","kHz"],["MHz","MHz"],["GHz","GHz"],["THz","THz"],["mN","mN"],["N","N"],["kN","kN"],["MN","MN"],["Pa","Pa"],["kPa","kPa"],["MPa","MPa"],["GPa","GPa"],["mohm","m\\ohm"],["kohm","k\\ohm"],["Mohm","M\\ohm"],["pV","pV"],["nV","nV"],["uV","\\micro V"],["mV","mV"],["V","V"],["kV","kV"],["W","W"],["nW","nW"],["uW","\\micro W"],["mW","mW"],["kW","kW"],["MW","MW"],["GW","GW"],["J","J"],["uJ","\\micro J"],["mJ","mJ"],["kJ","kJ"],["eV","eV"],["meV","meV"],["keV","keV"],["MeV","MeV"],["GeV","GeV"],["TeV","TeV"],["kWh","kW\\, h"],["F","F"],["fF","fF"],["pF","pF"],["nF","nF"],["uF","\\micro F"],["H","H"],["fH","fH"],["pH","pH"],["nH","nH"],["uH","\\micro H"],["mH","mH"],["C","C"],["nC","nC"],["mC","mC"],["uC","\\micro C"],["K","K"],["dB","dB"],["bit","b"],["byte","B"]]));function te(e){return function(e){if(Array.isArray(e))return re(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,n){if(!e)return;if("string"==typeof e)return re(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);"Object"===t&&e.constructor&&(t=e.constructor.name);if("Map"===t||"Set"===t)return Array.from(e);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return re(e,n)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function re(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}var ie=new Array("square","cubic","squared","cubed","tothe","raiseto","per","of","cancel","highlight");function oe(e,n){if(e=e.substring(1),ie.includes(e))return ae.get(e)(e,n);if(X.has(e))return{type:"prefix",result:{prefix:X.get(e)}};var t=n.configuration.packageData.get(de);if(t.has("\\"+e))return{type:"unit",result:{symbol:t.get("\\"+e),prefix:""},options:n.configuration.packageData.get(ye).get("\\"+e)};if(ne.has(e))return{type:"unit",result:{symbol:ne.get(e),prefix:""}};throw l.NoInterpretationForUnitMacro("\\"+e)}var ae=new Map([["square",function(){return{type:"next",result:{power:2}}}],["cubic",function(){return{type:"next",result:{power:3}}}],["squared",function(){return{type:"previous",result:{power:2}}}],["cubed",function(){return{type:"previous",result:{power:3}}}],["tothe",function(e,n){return{type:"previous",result:{power:+n.GetArgument("tothe",!0)}}}],["raiseto",function(e,n){return{type:"next",result:{power:+n.GetArgument("raiseto")}}}],["per",function(){return{type:"next",result:{position:"denominator"}}}],["of",function(e,n){return{type:"previous",result:{qualifier:n.GetArgument("of")}}}],["cancel",function(){return{type:"next",result:{cancel:!0}}}],["highlight",function(e,n){return{type:"next",result:{highlight:n.GetArgument("highlight")}}}]]),le=new Map([["subscript",function(e){return"_{"+e+"}"}],["bracket",function(e){return"("+e+")"}],["combine",function(e){return e}],["phrase",function(e,n){return n+e}]]);function ue(e,n){var t,r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i="";e.cancel&&(i+="\\cancel{"),e.highlight&&(i+="{\\color{"+e.highlight+"}"),i+=n.unitFontCommand+"{",i+="\\class{MathML-Unit}{"+e.prefix+e.symbol+"}",e.qualifier&&(i+=null===(t=le.get(n.qualifierMode))||void 0===t?void 0:t(e.qualifier,n.qualifierPhrase)),i+="}";var o=null!=e.power?r?Math.abs(e.power*("denominator"==e.position?-1:1)):e.power*("denominator"==e.position?-1:1):r?Math.abs(1*("denominator"==e.position?-1:1)):1*("denominator"==e.position?-1:1);return null!=o&&1!=o&&(i+="^{"+o+"}"),e.cancel&&(i+="}"),e.highlight&&(i+="}"),{latex:i,superscriptPresent:1!=o}}function ce(e,n,t){var r="",i=!1;if(n.length>=2&&1==n.filter((function(e){var n=null!=e.power?e.power*("denominator"==e.position?-1:1):1;return-1==Math.sign(n)})).length&&"single-symbol"==t.perMode&&(i=!0),"fraction"==t.perMode||"symbol"==t.perMode||"repeated-symbol"==t.perMode||i){var o="",a="",l=!1;n.forEach((function(e){var n;"denominator"==e.position||null!=e.power&&e.power<0?(n=ue(e,t,"fraction"==t.perMode||"symbol"==t.perMode||"repeated-symbol"==t.perMode||"single-symbol"==t.perMode||i),""!=a&&("repeated-symbol"==t.perMode?(n.superscriptPresent&&(a+=t.perSymbolScriptCorrection),a+=t.perSymbol):a+=t.interUnitProduct),a+=n.latex):(n=ue(e,t,"fraction"==t.perMode||"symbol"==t.perMode||"repeated-symbol"==t.perMode||"single-symbol"==t.perMode||i),l=n.superscriptPresent,""!=o&&(o+=t.interUnitProduct),o+=n.latex)})),""==o&&""!=a&&(o="1"),""!=a?"fraction"==t.perMode?r=t.fractionCommand+"{"+o+"}{"+a+"}":"repeated-symbol"==t.perMode||"symbol"==t.perMode||i?r=o+(l?t.perSymbolScriptCorrection:"")+t.perSymbol+a:console.log("shouldn't be here"):r=o}else{"power-positive-first"==t.perMode&&(n=n.sort((function(e,n){var t=null!=e.power?e:1;"denominator"==e.position&&(t=-t);var r=null!=n.power?n:1;return"denominator"==n.position&&(r=-r),t>r?1:t<r?-1:0})));var u="";n.forEach((function(e){var n=ue(e,t);n.superscriptPresent,""!=u&&(u+=t.interUnitProduct),u+=n.latex})),r=u}return r}function se(e,n,t,r){var a=new Array;if(-1!=n.indexOf("\\")){var l=new i.Z(n,e.stack.env,e.configuration);l.i=0;for(var u=null;l.i<l.string.length;){var c=l.GetArgument("unit"),s=oe(c,l);switch(void 0!==s.options&&j(t,s.options),j(t,r),s.type){case"next":case"prefix":u=null!=u?Object.assign(u,s.result):s.result;break;case"previous":if(0==a.length)throw new o.Z("MissingPreviousMacro","There is no previous macro for %1 to modify.",c);var p=a[a.length-1];p=Object.assign(p,s.result);break;case"unit":if(null!=u)if(s.result=Object.assign(s.result,u),"repeated-symbol"==e.options.perMode){var f="denominator"==u.position;u=null,f&&(u={position:"denominator"})}else u=null;a.push(s.result)}}}else a.push.apply(a,te(function(e,n){var t=new Array,r=new i.Z(n,e.stack.env,e.configuration);r.i=0;var o={position:"numerator"},a=!1,l="";for(;r.i<r.string.length;){switch(r.string.charAt(r.i)){case"~":case".":fe(l,o),t.push(o),l="",o={position:a?"denominator":"numerator"};break;case"/":fe(l,o),t.push(o),l="",o={position:(a=!0)?"denominator":"numerator"};break;case"^":var u=r.string.charAt(++r.i),c="";if("{"==u)for(;"}"!=(u=r.string.charAt(++r.i));)c+=u;else c=u;o.power=+c;break;case"_":var s=r.string.charAt(++r.i),p="";if("{"==s)for(;"}"!=(s=r.string.charAt(++r.i));)p+=s;else p=s;o.qualifier=p;break;default:l+=r.string.charAt(r.i)}r.i++}return fe(l,o),t.push(o),t}(e,n)));return a}function pe(e,n){return Array.from(e).filter((function(e,n,t){return n===t.indexOf(e)})).sort((function(e,n){return e.length-n.length})).join(n)}function fe(e,n){var t=pe(X.values(),"|"),r=pe(ee.values(),"|"),i=new RegExp("("+t+")?("+r+")").exec(e);null!=i&&(void 0!==i[1]?n.prefix=i[1]:n.prefix="",n.symbol=i[2])}var ge,me=new Map([["\\num",function(e){var n=function(e){var n=Object.assign({},e.options);j(n,C(e));var t=e.GetArgument("num");if(n.parseNumbers){n.evaluateExpression;var r=L(e,t,n);M(r,n);var o=m(r,n);return new i.Z(o,e.stack.env,e.configuration).mml()}return new i.Z(t,e.stack.env,e.configuration).mml()}(e);e.Push(n)}],["\\ang",function(e){var n=K(e);e.Push(n)}],["\\unit",function(e){var n=function(e){var n=Object.assign({},e.options),t=C(e),r=e.GetArgument("unit"),o=ce(0,se(e,r,n,t),n);return new i.Z(o,e.stack.env,e.configuration).mml()}(e);e.Push(n)}],["\\qty",function(e){!function(e){var n=Object.assign({},e.options),t=C(e);j(n,t);var r=e.GetArgument("num"),o=e.GetArgument("unit");if(n.parseNumbers){n.evaluateExpression;var a=L(e,r,n);M(a,n);var l=m(a,n),u=new i.Z(l,e.stack.env,e.configuration).mml();e.Push(u)}else{var c=new i.Z(r,e.stack.env,e.configuration).mml();e.Push(c)}var s=ce(0,se(e,o,n=Object.assign({},e.options),t),n);s=n.quantityProduct+s;var p=new i.Z(s,e.stack.env,e.configuration).mml();e.Push(p)}(e)}]]),he=new Map([["\\DeclareSIUnit",function(e,n,t){var r=e.configuration.packageData.get(de),i=e.configuration.packageData.get(ye),o=e.GetArgument(n),a=e.GetArgument(n);r.set(o,a),void 0!==t&&i.set(o,t)}]]),de="siunitxUnits",ye="siunitxUnitOptions";new n.QQ("siunitxMap",{num:["siunitxToken","num"],ang:["siunitxToken","ang"],unit:["siunitxToken","unit"],qty:["siunitxToken","qty"],DeclareSIUnit:["siunitxGlobal","DeclareSIUnit"]},{siunitxToken:function(e,n){var t;ge=e,null===(t=me.get(n))||void 0===t||t(e)},siunitxGlobal:function(e,n){var t;ge=e;var r=C(e);null===(t=he.get(n))||void 0===t||t(e,n,r)}});e.VK.create("siunitx",{handler:{macro:["siunitxMap"]},options:Object.assign(Object.assign(Object.assign(Object.assign({},A),P),O),D),config:function(e,n){n.parseOptions.packageData.set(de,R),n.parseOptions.packageData.set(ye,Y)}})}()}();