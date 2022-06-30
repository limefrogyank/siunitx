!function(){"use strict";var e={80:function(e,t){t.VK=MathJax._.input.tex.Configuration.Configuration,MathJax._.input.tex.Configuration.ConfigurationHandler,MathJax._.input.tex.Configuration.ParserConfiguration},579:function(e,t){MathJax._.input.tex.SymbolMap.parseResult,MathJax._.input.tex.SymbolMap.AbstractSymbolMap,MathJax._.input.tex.SymbolMap.RegExpMap,MathJax._.input.tex.SymbolMap.AbstractParseMap,MathJax._.input.tex.SymbolMap.CharacterMap,MathJax._.input.tex.SymbolMap.DelimiterMap,MathJax._.input.tex.SymbolMap.MacroMap,t.QQ=MathJax._.input.tex.SymbolMap.CommandMap,MathJax._.input.tex.SymbolMap.EnvironmentMap},516:function(e,t){t.Z=MathJax._.input.tex.TexError.default},693:function(e,t){t.Z=MathJax._.input.tex.TexParser.default}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}!function(){var e=n(80),t=n(579),r=n(516),i=n(693);function o(e,t,n,r,i,o,a){if(e.length>=n){var u=e.split(""),l=0,c=-1!=o?o:t,s=c;if(i)for(var p=c;p<u.length;p+=s)e=e.slice(0,p+l)+r+e.slice(p+l,e.length+l),l+=r.length,s=-1!=a?a:t;else for(var f=u.length-c;f>=0;f-=s)e=e.slice(0,f)+r+e.slice(f,e.length+l),l+=r.length,s=-1!=a?a:t}return e}var a=new Map([["all",function(e,t){console.log(t),e.whole=o(e.whole,t.digitGroupSize,t.groupMinimumDigits,t.groupSeparator,!1,t.digitGroupFirstSize,t.digitGroupOtherSize),e.fractional=o(e.fractional,t.digitGroupSize,t.groupMinimumDigits,t.groupSeparator,!0,t.digitGroupFirstSize,t.digitGroupOtherSize)}],["decimal",function(e,t){console.log(t),e.fractional=o(e.fractional,t.digitGroupSize,t.groupMinimumDigits,t.groupSeparator,!0,t.digitGroupFirstSize,t.digitGroupOtherSize)}],["integer",function(e,t){console.log(t),e.whole=o(e.whole,t.digitGroupSize,t.groupMinimumDigits,t.groupSeparator,!1,t.digitGroupFirstSize,t.digitGroupOtherSize)}],["none",function(e,t){}]]);function u(e,t,n){if("bracket"==e.type){var r=e.whole.length-t.fractional.length;r>0&&"compact-marker"==n.uncertaintyMode&&(e.fractional=e.whole.slice(r,e.whole.length),e.whole=e.whole.slice(0,r),e.decimal=n.outputDecimalMarker)}else{if(+(e.whole+e.decimal+e.fractional)<1){for(var i=0,o=0;o<e.fractional.length&&"0"==e.fractional[o];o++)i++;e.whole=e.fractional.slice(i,e.fractional.length),e.decimal="",e.fractional=""}}}function l(e,t){var n=t.uncertaintySeparator;return n+=t.outputOpenUncertainty,n+=e.whole,n+="compact-marker"==t.uncertaintyMode&&""!=e.decimal?t.outputDecimalMarker:"",n+=e.fractional,n+=t.outputCloseUncertainty}var c=new Map([["separate",function(e,t,n){return function(e,t,n){if("pm"!=e.type&&""==e.decimal){var r=t.fractional.length-e.whole.length;if(r>=0){for(var i=0;i<r;i++)e.fractional+="0";e.fractional+=e.whole,e.whole="0",e.decimal=n.outputDecimalMarker}}}(e,t,n),function(e,t){return"\\pm"+s(e,t)}(e,n)}],["compact",function(e,t,n){return u(e,t,n),l(e,n)}],["full",function(e,t,n){return u(e,t,n),l(e,n)}],["compact-marker",function(e,t,n){return u(e,t,n),l(e,n)}]]);function s(e,t){var n,r=e.sign;return r+=e.whole,r+=""!=e.decimal?t.outputDecimalMarker:"",r+=e.fractional,null==e.uncertainty&&console.log("uncertainty was NULL"),null===(n=e.uncertainty)||void 0===n||n.forEach((function(n){r+=c.get(t.uncertaintyMode)(n,e,t)})),""!=e.exponentMarker&&(""!=t.outputExponentMarker?(r+=t.outputExponentMarker,r+=e.exponentSign+e.exponent):(r+=""!=e.whole||""!=e.fractional?t.exponentProduct:"",r+=t.exponentBase,r+="^{"+e.exponentSign+e.exponent+"}")),r}function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}var f={prefix:"",sign:"",whole:"",decimal:"",fractional:"",exponentMarker:"",exponentSign:"",exponent:"",uncertainty:null},g=Object.assign(Object.assign({},f),{type:"pm",completed:!1});function m(e,t){var n;""!=(n=t.uncertainty.length>0?t.uncertainty[t.uncertainty.length-1]:t).exponentMarker?n.exponent+=e:""!=n.decimal?n.fractional+=e:n.whole+=e}function h(e,t){(t.uncertainty.length>0?t.uncertainty[t.uncertainty.length-1]:t).decimal+=e}function y(e,t){(t.uncertainty.length>0?t.uncertainty[t.uncertainty.length-1]:t).prefix+=e}function d(e,t){t.exponentMarker+=e}function v(e,t){var n;""!=(n=t.uncertainty.length>0?t.uncertainty[t.uncertainty.length-1]:t).exponentMarker?n.exponentSign+=e:n.sign+=e}function x(e,t){var n=Object.assign(Object.assign({},g),{type:"bracket"});t.uncertainty.push(n)}function M(e,t){if(0==t.uncertainty.length)throw new r.Z("50","No uncertainty parsed to close.");var n=t.uncertainty[t.uncertainty.length-1];if(n.completed)throw new r.Z("51","Uncertainty was already closed.");n.completed=!0}function b(e,t){var n=Object.assign(Object.assign({},g),{type:"pm"});t.uncertainty.push(n)}function w(e,t){}var S=new Map([["input",function(e,t){}],["fixed",function(e,t){var n=t.fixedExponent;if(null!=e){for(var r=n-+(e.exponentSign+e.exponent),i=Math.sign(r),o=0;o<Math.abs(r);o++)i>0?e.fractional.length>0?(e.whole=e.whole+e.fractional.slice(0,1),e.fractional=e.fractional.slice(0,e.fractional.length-1)):e.whole=e.whole+"0":e.whole.length>0?(e.fractional=e.whole.slice(e.whole.length-1,e.whole.length)+e.fractional,e.whole=e.whole.slice(0,e.whole.length-1)):e.fractional="0"+e.fractional;e.exponent=Math.abs(n).toString(),e.exponentSign=Math.sign(n)<0?"-":""}}],["engineering",function(e,t){}],["scientific",function(e,t){}]]);function k(e,t,n){if(n.parseNumbers){var r=function(e){for(var t,n=new Map,r=/[^\\\s]|(?:\\[^\\]*(?=\s|\\|$))/g;null!==(t=r.exec(e.inputComparators));)n.set(t[0],y);for(;null!==(t=r.exec(e.inputSigns));)n.set(t[0],v);for(;null!==(t=r.exec(e.inputDigits));)n.set(t[0],m);for(;null!==(t=r.exec(e.inputDecimalMarkers));)n.set(t[0],h);for(;null!==(t=r.exec(e.inputOpenUncertainty));)n.set(t[0],x);for(;null!==(t=r.exec(e.inputCloseUncertainty));)n.set(t[0],M);for(;null!==(t=r.exec(e.inputUncertaintySigns));)if(n.has(t[0])){var i=n.get(t[0]),o=new Map;o.set("inputSigns",i),o.set("inputUncertaintySigns",b),n.set(t[0],o)}else n.set(t[0],b);for(;null!==(t=r.exec(e.inputExponentMarkers));)n.set(t[0],d);for(;null!==(t=r.exec(e.inputIgnore));)n.set(t[0],w);return n}(n);t=(t=(t=(t=(t=t.replace("<<","\\ll")).replace(">>","\\gg")).replace("<=","\\le")).replace(">=","\\ge")).replace("+-","\\pm"),console.log(t);var o=((O=Object.assign({},f)).uncertainty=new Array,O),u=new i.Z(t,e.stack.env,e.configuration);for(u.i=0;u.i<u.string.length;){var l=u.string.charAt(u.i);if(u.i++,"\\"!=l){if(r.has(l)){var c=r.get(l);"function"==typeof c?r.get(l)(l,o):""==o.whole&&""==o.decimal?c.get("inputSigns")(l,o):c.get("inputUncertaintySigns")(l,o)}}else{var g=l;for(l="";u.i<u.string.length&&"\\"!=l&&" "!=l;)"\\"!=(l=u.string.charAt(u.i))&&" "!=l&&(g+=l),console.log(g),u.i++;if(console.log("tryeing to find:  "+g),r.has(g)){var k=r.get(g);"function"==typeof k?r.get(g)(g,o):(console.log(p(k)),""==o.whole&&""==o.decimal?k.get("inputSigns")(g,o):k.get("inputUncertaintySigns")(g,o))}}}console.log(o),function(e,t){S.get(t.exponentMode)(e,t)}(o,n);var A=function(e,t){a.get(t.groupDigits)(e,t),console.log(e);var n="";return n+=e.prefix,n+s(e,t)}(o,n);return new i.Z(A,e.stack.env,e.configuration).mml()}var O;return new i.Z(t,e.stack.env,e.configuration).mml()}var A=Object.assign(Object.assign(Object.assign({},{evaluateExpression:!1,expression:"#1",inputCloseUncertainty:")",inputComparators:"<=>\\approx\\ge\\geq\\gg\\le\\leq\\ll\\sim",inputDecimalMarkers:".,",inputDigits:"0123456789",inputExponentMarkers:"dDeE",inputIgnore:"",inputOpenUncertainty:"(",inputSigns:"+-\\pm\\mp",inputUncertaintySigns:"\\pm\\mp",parseNumbers:!0,retainExplicitDecimalMarker:!1,retainExplicitPlus:!1,retainNegativeZero:!1,retainZeroUncertainty:!1}),{dropExponent:!1,dropUncertainty:!1,dropZeroDecimal:!1,exponentMode:"input",fixedExponent:0,minimumIntegerDigits:0,minimumDecimalDigits:0,roundHalf:"up",roundMinimum:0,roundMode:"none",roundPad:!0,roundPrecision:2,roundZeroPositive:!0}),{bracketNegativeNumbers:!1,digitGroupSize:3,digitGroupFirstSize:-1,digitGroupOtherSize:-1,exponentBase:"10",exponentProduct:"\\times",groupDigits:"all",groupMinimumDigits:5,groupSeparator:"\\,",negativeColor:"",outputCloseUncertainty:")",outputDecimalMarker:".",outputExponentMarker:"",outputOpenUncertainty:"(",printImplicitPlus:!1,printUnityMantissa:!0,printZeroExponent:!1,printZeroInteger:!0,tightSpacing:!1,uncertaintyDescriptorMode:"bracket-separator",uncertaintyDescriptorSeparator:"\\",uncertaintyDescriptors:"",uncertaintyMode:"compact",uncertaintySeparator:"",zeroDecimalAsSymbol:!1,zeroSymbol:"\\mbox{---}"});function O(e){return function(e){if(Array.isArray(e))return C(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return C(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function P(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var U=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.map=t,this.reverseMap=new Map,t.forEach((function(e,t,r){n.reverseMap.has(e)||n.reverseMap.set(e,t)}))}var t,n,r;return t=e,(n=[{key:"has",value:function(e){return this.map.has(e)}},{key:"get",value:function(e){return this.map.get(e)}},{key:"revGet",value:function(e){return this.reverseMap.get(e)}},{key:"keys",value:function(){return this.map.keys()}},{key:"values",value:function(){return this.reverseMap.keys()}},{key:"forEach",value:function(e,t){return this.map.forEach(e)}},{key:"array",value:function(){return O(this.map)}},{key:"arrayReverse",value:function(){return O(this.reverseMap)}}])&&P(t.prototype,n),r&&P(t,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),D=new U(new Map([["meter","m"],["metre","m"],["gram","g"],["second","s"]])),E=new U(new Map([["yotta","Y"],["zetta","Z"],["exa","E"],["peta","P"],["tera","T"],["giga","G"],["mega","M"],["kilo","k"],["hecto","h"],["deka","da"],["deca","da"],["deci","d"],["centi","c"],["milli","m"],["micro","u"],["nano","n"],["pico","p"],["femto","f"],["atto","a"],["zepto","z"],["yocto","y"]]));function G(e){return function(e){if(Array.isArray(e))return j(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return j(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return j(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var z=new Array("square","cubic","squared","cubed","tothe","raiseto","per","of","cancel","highlight");function Z(e,t){return e=e.substring(1),z.includes(e)?function(e,t){return q.get(e)(e,t)}(e,t):E.has(e)?{type:"prefix",result:{prefix:E.get(e)}}:D.has(e)?{type:"unit",result:{symbol:D.get(e),prefix:""}}:{type:"unit",result:{symbol:"X",prefix:""}}}var q=new Map([["square",function(e,t){return{type:"next",result:{power:2}}}],["cubic",function(e,t){return{type:"next",result:{power:3}}}],["squared",function(e,t){return{type:"previous",result:{power:2}}}],["cubed",function(e,t){return{type:"previous",result:{power:3}}}],["tothe",function(e,t){return{type:"previous",result:{power:+t.GetArgument("tothe",!0)}}}],["raiseto",function(e,t){return{type:"next",result:{power:+t.GetArgument("raiseto")}}}],["per",function(e,t){return{type:"next",result:{position:"denominator"}}}],["of",function(e,t){return{type:"previous",result:{qualifier:t.GetArgument("of")}}}],["cancel",function(e,t){return{type:"next",result:{cancel:!0}}}],["highlight",function(e,t){return{type:"next",result:{highlight:t.GetArgument("highlight")}}}]]);var _=new Map([["subscript",function(e,t){return"_{"+e+"}"}],["bracket",function(e,t){return"("+e+")"}],["combine",function(e,t){return e}],["phrase",function(e,t){return t+e}]]);function J(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r="";e.cancel&&(r+="\\cancel{"),e.highlight&&(r+="{\\color{"+e.highlight+"}"),r+=t.unitFontCommand+"{",r+="\\class{MathML-Unit}{"+e.prefix+e.symbol+"}",e.qualifier&&(r+=_.get(t.qualifierMode)(e.qualifier,t.qualifierPhrase)),r+="}";var i=null!=e.power?n?Math.abs(e.power*("denominator"==e.position?-1:1)):e.power*("denominator"==e.position?-1:1):1*("denominator"==e.position?-1:1);return null!=i&&1!=i&&(r+="^{"+i+"}"),e.cancel&&(r+="}"),e.highlight&&(r+="}"),{latex:r,superscriptPresent:1!=i}}function T(e,t,n){var o=new Array;if(-1!=t.indexOf("\\")){var a=new i.Z(t,e.stack.env,e.configuration);a.i=0;for(var u=null;a.i<a.string.length;){var l=a.GetArgument(null),c=Z(l,a);switch(c.type){case"next":case"prefix":u=null!=u?Object.assign(u,c.result):c.result;break;case"previous":if(0==o.length)throw new r.Z("MissingPreviousMacro","There is no previous macro for %1 to modify.",l);var s=o[o.length-1];s=Object.assign(s,c.result);break;case"unit":if(null!=u)if(c.result=Object.assign(c.result,u),"repeated-symbol"==n.perMode){var p="denominator"==u.position;u=null,p&&(u={position:"denominator"})}else u=null;o.push(c.result)}}}else o.push.apply(o,G(function(e,t){var n=new Array,r=new i.Z(t,e.stack.env,e.configuration);r.i=0;var o={position:"numerator"},a=!1,u="";for(;r.i<r.string.length;){switch(r.string.charAt(r.i)){case"~":case".":N(u,o),n.push(o),u="",o={position:a?"denominator":"numerator"};break;case"/":N(u,o),n.push(o),u="",o={position:(a=!0)?"denominator":"numerator"};break;case"^":var l=r.string.charAt(++r.i),c="";if("{"==l)for(;"}"!=(l=r.string.charAt(++r.i));)c+=l;else c=l;o.power=+c;break;case"_":var s="";if("{"==(l=r.string.charAt(++r.i)))for(;"}"!=(l=r.string.charAt(++r.i));)s+=l;else s=l;o.qualifier=s;break;default:u+=r.string.charAt(r.i)}r.i++}return N(u,o),n.push(o),n}(e,t)));var f=function(e,t,n){var r,o;if(t.length>=2&&1==t.filter((function(e){var t=null!=e.power?e.power*("denominator"==e.position?-1:1):1;return-1==Math.sign(t)})).length&&"single-symbol"==n.perMode&&(o=!0),"fraction"==n.perMode||"symbol"==n.perMode||"repeated-symbol"==n.perMode||o){var a="",u="",l=!1;t.forEach((function(e,t,r){var i;"denominator"==e.position||null!=e.power&&e.power<0?(i=J(e,n,"fraction"==n.perMode||"symbol"==n.perMode||"repeated-symbol"==n.perMode||"single-symbol"==n.perMode||o),""!=u&&("repeated-symbol"==n.perMode?(i.superscriptPresent&&(u+=n.perSymbolScriptCorrection),u+=n.perSymbol):u+=n.interUnitProduct),u+=i.latex):(i=J(e,n,"fraction"==n.perMode||"symbol"==n.perMode||"repeated-symbol"==n.perMode||"single-symbol"==n.perMode||o),l=i.superscriptPresent,""!=a&&(a+=n.interUnitProduct),a+=i.latex)})),""==a&&""!=u&&(a="1"),""!=u?"fraction"==n.perMode?r=n.fractionCommand+"{"+a+"}{"+u+"}":"repeated-symbol"==n.perMode||"symbol"==n.perMode||o?r=a+(l?n.perSymbolScriptCorrection:"")+n.perSymbol+u:console.log("shouldn't be here"):r=a}else{"power-positive-first"==n.perMode&&(t=t.sort((function(e,t){var n=null!=e.power?e:1;"denominator"==e.position&&(n=-n);var r=null!=t.power?t:1;return"denominator"==t.position&&(r=-r),n>r?1:n<r?-1:0})));var c="";t.forEach((function(e,t,r){var i=J(e,n);i.superscriptPresent,""!=c&&(c+=n.interUnitProduct),c+=i.latex})),r=c}return new i.Z(r,e.stack.env,e.configuration).mml()}(e,o,n);return f}function I(e,t){return Array.from(e).filter((function(e,t,n){return t===n.indexOf(e)})).sort((function(e,t){return e.length-t.length})).join(t)}function N(e,t){var n=I(E.values(),"|"),r=I(D.values(),"|"),i=new RegExp("("+n+")?("+r+")").exec(e);void 0!==i[1]?t.prefix=i[1]:t.prefix="",t.symbol=i[2]}var F=new Map([["\\num",function(e,t,n){return k(e,e.GetArgument(t),n)}],["\\ang",function(e,t,n){return function(e,t){var n=e.create("node","mtext"),r=e.create("text",t+" testAngle");return n.appendChild(r),n}(e,e.GetArgument(t))}],["\\unit",function(e,t,n){var r=e.GetArgument(t);return T(e,r,n)}],["\\qty",function(e,t,n){var r=k(e,e.GetArgument(t),n);e.Push(r);var i=e.GetArgument(t);return T(e,i,n)}]]);new t.QQ("siunitxMap",{num:["siunitxToken","num"],ang:["siunitxToken","ang"],unit:["siunitxToken","unit"],qty:["siunitxToken","qty"]},{siunitxToken:function(e,t,n){var i=function(e,t){var n=Object.assign({},e);if(null!=t){console.log(t);var r=t.split(/,(?!\}|$)/g);console.log(r),r.forEach((function(e,t,r){var i=e.split("="),o=i[0].trim().toLowerCase().replace(/-(.)/g,(function(e,t){return t.toUpperCase()}));i.length>1?"number"==typeof n[o]?n[o]=+i[1].trim():n[o]=i[1].trim():n[o]=!0}))}return n}(e.options,function(e){if("["===e.GetNext()){for(var t=++e.i;e.i<e.string.length;)if("]"==e.string.charAt(e.i++))return e.string.slice(t,e.i-1);throw new r.Z("MissingCloseBracket","Could not find closing ']' for argument to %1",e.currentCS)}}(e)),o=F.get(t)(e,t,i);e.Push(o)}});e.VK.create("siunitx",{handler:{macro:["siunitxMap"]},options:Object.assign(Object.assign({},{bracketUnitDenominator:!0,forbidLiteralUnits:!1,fractionCommand:"\\frac",interUnitProduct:"\\,",parseUnits:!0,perMode:"power",displayPerMode:"perMode",inlinePerMode:"perMode",perSymbolScriptCorrection:"\\!",perSymbol:"/",powerHalfAsSqrt:!1,qualifierMode:"subscript",qualifierPhrase:"",stickyPer:!1,unitFontCommand:"\\mathrm"}),A)})}()}();