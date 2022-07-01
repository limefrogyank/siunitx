!function(){"use strict";var e={80:function(e,t){t.VK=MathJax._.input.tex.Configuration.Configuration,MathJax._.input.tex.Configuration.ConfigurationHandler,MathJax._.input.tex.Configuration.ParserConfiguration},579:function(e,t){MathJax._.input.tex.SymbolMap.parseResult,MathJax._.input.tex.SymbolMap.AbstractSymbolMap,MathJax._.input.tex.SymbolMap.RegExpMap,MathJax._.input.tex.SymbolMap.AbstractParseMap,MathJax._.input.tex.SymbolMap.CharacterMap,MathJax._.input.tex.SymbolMap.DelimiterMap,MathJax._.input.tex.SymbolMap.MacroMap,t.QQ=MathJax._.input.tex.SymbolMap.CommandMap,MathJax._.input.tex.SymbolMap.EnvironmentMap},516:function(e,t){t.Z=MathJax._.input.tex.TexError.default},693:function(e,t){t.Z=MathJax._.input.tex.TexParser.default}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var o=t[r]={exports:{}};return e[r](o,o.exports,n),o.exports}n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};var r={};!function(){n.d(r,{Z:function(){return L}});var e=n(80),t=n(579),i=n(516),o=n(693);function a(e,t,n,r,i,o,a){if(e.length>=n){var u=e.split(""),l=0,c=-1!=o?o:t,p=c;if(i)for(var s=c;s<u.length;s+=p)e=e.slice(0,s+l)+r+e.slice(s+l,e.length+l),l+=r.length,p=-1!=a?a:t;else for(var f=u.length-c;f>=0;f-=p)e=e.slice(0,f)+r+e.slice(f,e.length+l),l+=r.length,p=-1!=a?a:t}return e}var u=new Map([["all",function(e,t){e.whole=a(e.whole,t.digitGroupSize,t.groupMinimumDigits,t.groupSeparator,!1,t.digitGroupFirstSize,t.digitGroupOtherSize),e.fractional=a(e.fractional,t.digitGroupSize,t.groupMinimumDigits,t.groupSeparator,!0,t.digitGroupFirstSize,t.digitGroupOtherSize)}],["decimal",function(e,t){e.fractional=a(e.fractional,t.digitGroupSize,t.groupMinimumDigits,t.groupSeparator,!0,t.digitGroupFirstSize,t.digitGroupOtherSize)}],["integer",function(e,t){e.whole=a(e.whole,t.digitGroupSize,t.groupMinimumDigits,t.groupSeparator,!1,t.digitGroupFirstSize,t.digitGroupOtherSize)}],["none",function(e,t){}]]);function l(e,t,n){if("bracket"==e.type){var r=e.whole.length-t.fractional.length;r>0&&"compact-marker"==n.uncertaintyMode&&(e.fractional=e.whole.slice(r,e.whole.length),e.whole=e.whole.slice(0,r),e.decimal=n.outputDecimalMarker)}else{if(+(e.whole+e.decimal+e.fractional)<1){for(var i=0,o=0;o<e.fractional.length&&"0"==e.fractional[o];o++)i++;e.whole=e.fractional.slice(i,e.fractional.length),e.decimal="",e.fractional=""}}}function c(e,t){var n=t.uncertaintySeparator;return n+=t.outputOpenUncertainty,n+=e.whole,n+="compact-marker"==t.uncertaintyMode&&""!=e.decimal?t.outputDecimalMarker:"",n+=e.fractional,n+=t.outputCloseUncertainty}var p=new Map([["separate",function(e,t,n){return function(e,t,n){if("pm"!=e.type&&""==e.decimal){var r=t.fractional.length-e.whole.length;if(r>=0){for(var i=0;i<r;i++)e.fractional+="0";e.fractional+=e.whole,e.whole="0",e.decimal=n.outputDecimalMarker}}}(e,t,n),function(e,t){return"\\pm"+s(e,t)}(e,n)}],["compact",function(e,t,n){return l(e,t,n),c(e,n)}],["full",function(e,t,n){return l(e,t,n),c(e,n)}],["compact-marker",function(e,t,n){return l(e,t,n),c(e,n)}]]);function s(e,t){var n,r="";return""!=t.negativeColor&&(r+="{\\color{"+t.negativeColor+"}"),t.bracketNegativeNumbers?"-"==e.sign&&(r+="("):!t.printImplicitPlus||"+"!=e.sign&&""!=e.sign?r+="+"==e.sign?"":e.sign:r+="+","1"!=e.whole||""!=e.fractional||t.printUnityMantissa?(""==e.whole&&e.fractional||"0"==e.whole?t.printZeroInteger&&(r+="0"):r+=e.whole,r+=""!=e.decimal?t.outputDecimalMarker:"",t.zeroDecimalAsSymbol&&0==+e.fractional?r+=t.zeroSymbol:r+=e.fractional):t.printZeroExponent||""!=e.exponent&&("1"!=e.exponent||"-"==e.exponentSign)||(r+="1"),null===(n=e.uncertainty)||void 0===n||n.forEach((function(n){r+=p.get(t.uncertaintyMode)(n,e,t)})),!t.printZeroExponent||""!=e.exponent&&"0"!=e.exponent?""!=e.exponent&&"0"!=e.exponent&&("1"!=e.whole||""!=e.fractional||t.printUnityMantissa?""!=e.exponentMarker&&(""!=t.outputExponentMarker?(r+=t.outputExponentMarker,r+=e.exponentSign+e.exponent):(r+=""!=e.whole||""!=e.fractional?t.exponentProduct:"",r+=t.exponentBase,r+="^{"+e.exponentSign+e.exponent+"}")):(r+=t.exponentBase,r+="^{"+e.exponentSign+e.exponent+"}")):""!=t.outputExponentMarker?(r+=t.outputExponentMarker,r+="0"):(r+=t.exponentProduct,r+=t.exponentBase,r+="^{0}"),t.bracketNegativeNumbers&&"-"==e.sign&&(r+=")"),""!=t.negativeColor&&(r+="}"),console.log(r),r}function f(e,t){var n=(+(e.sign+e.whole+e.decimal+e.fractional+(""!=e.exponent?"e"+e.exponentSign+e.exponent:""))).toExponential(),r=O(L,n,t),i=0;if(""!=e.fractional)for(var o=e.fractional.length-1;o>=0&&"0"==e.fractional[o];o--)i++;if(""!=e.whole&&e.fractional.length==i)for(var a=e.whole.length-1;a>=0&&"0"==e.whole[a];a--)i++;for(var u=0;u<i;u++)r.fractional+="0";for(var l in""==r.decimal&&i>0&&(r.decimal="."),e)e[l]=r[l]}function g(e,t,n){if(console.log("whole: "+e.whole),console.log("frac: "+e.fractional),console.log("exp: "+e.exponentSign+e.exponent),null!=e){for(var r=t-+(e.exponentSign+e.exponent),i=Math.sign(r),o=0;o<Math.abs(r);o++)i<0?e.fractional.length>0?(e.whole=e.whole+e.fractional.slice(0,1),e.fractional=e.fractional.slice(1,e.fractional.length)):e.whole=e.whole+"0":e.whole.length>0?(e.fractional=e.whole.slice(e.whole.length-1,e.whole.length)+e.fractional,e.whole=e.whole.slice(0,e.whole.length-1)):e.fractional="0"+e.fractional;""!=e.fractional&&""==e.decimal&&(e.decimal="."),e.exponent=Math.abs(t).toString(),e.exponentSign=Math.sign(t)<0?"-":"",console.log("whole: "+e.whole),console.log("frac: "+e.fractional),console.log("exp: "+e.exponentSign+e.exponent)}}var m=new Map([["input",function(e,t){}],["fixed",function(e,t){var n=t.fixedExponent;f(e,t),g(e,n)}],["engineering",function(e,t){f(e,t);for(var n=+(e.exponentSign+e.exponent);n%3!=0;)n--;g(e,n)}],["scientific",f]]);var h={prefix:"",sign:"",whole:"",decimal:"",fractional:"",exponentMarker:"",exponentSign:"",exponent:"",uncertainty:null},y=Object.assign(Object.assign({},h),{type:"pm",completed:!1});function d(e,t){var n;""!=(n=t.uncertainty.length>0?t.uncertainty[t.uncertainty.length-1]:t).exponentMarker?n.exponent+=e:""!=n.decimal?n.fractional+=e:n.whole+=e}function x(e,t){(t.uncertainty.length>0?t.uncertainty[t.uncertainty.length-1]:t).decimal+=e}function v(e,t){(t.uncertainty.length>0?t.uncertainty[t.uncertainty.length-1]:t).prefix+=e}function b(e,t){t.exponentMarker+=e}function M(e,t){var n;""!=(n=t.uncertainty.length>0?t.uncertainty[t.uncertainty.length-1]:t).exponentMarker?n.exponentSign+=e:n.sign+=e}function w(e,t){var n=Object.assign(Object.assign({},y),{type:"bracket"});t.uncertainty.push(n)}function S(e,t){if(0==t.uncertainty.length)throw new i.Z("50","No uncertainty parsed to close.");var n=t.uncertainty[t.uncertainty.length-1];if(n.completed)throw new i.Z("51","Uncertainty was already closed.");n.completed=!0}function k(e,t){var n=Object.assign(Object.assign({},y),{type:"pm"});t.uncertainty.push(n)}function A(e,t){}function O(e,t,n){var r=function(e){for(var t,n=new Map,r=/[^\\\s]|(?:\\[^\\]*(?=\s|\\|$))/g;null!==(t=r.exec(e.inputComparators));)n.set(t[0],v);for(;null!==(t=r.exec(e.inputSigns));)n.set(t[0],M);for(;null!==(t=r.exec(e.inputDigits));)n.set(t[0],d);for(;null!==(t=r.exec(e.inputDecimalMarkers));)n.set(t[0],x);for(;null!==(t=r.exec(e.inputOpenUncertainty));)n.set(t[0],w);for(;null!==(t=r.exec(e.inputCloseUncertainty));)n.set(t[0],S);for(;null!==(t=r.exec(e.inputUncertaintySigns));)if(n.has(t[0])){var i=n.get(t[0]),o=new Map;o.set("inputSigns",i),o.set("inputUncertaintySigns",k),n.set(t[0],o)}else n.set(t[0],k);for(;null!==(t=r.exec(e.inputExponentMarkers));)n.set(t[0],b);for(;null!==(t=r.exec(e.inputIgnore));)n.set(t[0],A);return n}(n);t=(t=(t=(t=(t=t.replace("<<","\\ll")).replace(">>","\\gg")).replace("<=","\\le")).replace(">=","\\ge")).replace("+-","\\pm");var i,a=((i=Object.assign({},h)).uncertainty=new Array,i),u=new o.Z(t,e.stack.env,e.configuration);for(u.i=0;u.i<u.string.length;){var l=u.string.charAt(u.i);if(u.i++,"\\"!=l){if(r.has(l)){var c=r.get(l);"function"==typeof c?r.get(l)(l,a):""==a.whole&&""==a.decimal?c.get("inputSigns")(l,a):c.get("inputUncertaintySigns")(l,a)}}else{var p=l;for(l="";u.i<u.string.length&&"\\"!=l&&" "!=l;)"\\"!=(l=u.string.charAt(u.i))&&" "!=l&&(p+=l),u.i++;if(r.has(p)){var s=r.get(p);"function"==typeof s?r.get(p)(p,a):""==a.whole&&""==a.decimal?s.get("inputSigns")(p,a):s.get("inputUncertaintySigns")(p,a)}}}return a}function C(e,t,n){if(n.parseNumbers){var r=O(e,t,n);!function(e,t){m.get(t.exponentMode)(e,t),"+"==e.exponentSign&&(e.exponentSign="")}(r,n);var i=function(e,t){u.get(t.groupDigits)(e,t);var n="";return n+=e.prefix,n+s(e,t)}(r,n);return new o.Z(i,e.stack.env,e.configuration).mml()}return new o.Z(t,e.stack.env,e.configuration).mml()}function E(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return P(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return P(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,u=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return a=e.done,e},e:function(e){u=!0,o=e},f:function(){try{a||null==n.return||n.return()}finally{if(u)throw o}}}}function P(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var U=Object.assign(Object.assign(Object.assign({},{evaluateExpression:!1,expression:"#1",inputCloseUncertainty:")",inputComparators:"<=>\\approx\\ge\\geq\\gg\\le\\leq\\ll\\sim",inputDecimalMarkers:".,",inputDigits:"0123456789",inputExponentMarkers:"dDeE",inputIgnore:"",inputOpenUncertainty:"(",inputSigns:"+-\\pm\\mp",inputUncertaintySigns:"\\pm\\mp",parseNumbers:!0,retainExplicitDecimalMarker:!1,retainExplicitPlus:!1,retainNegativeZero:!1,retainZeroUncertainty:!1}),{dropExponent:!1,dropUncertainty:!1,dropZeroDecimal:!1,exponentMode:"input",fixedExponent:0,minimumIntegerDigits:0,minimumDecimalDigits:0,roundHalf:"up",roundMinimum:0,roundMode:"none",roundPad:!0,roundPrecision:2,roundZeroPositive:!0}),{bracketNegativeNumbers:!1,digitGroupSize:3,digitGroupFirstSize:-1,digitGroupOtherSize:-1,exponentBase:"10",exponentProduct:"\\times",groupDigits:"all",groupMinimumDigits:5,groupSeparator:"\\,",negativeColor:"",outputCloseUncertainty:")",outputDecimalMarker:".",outputExponentMarker:"",outputOpenUncertainty:"(",printImplicitPlus:!1,printUnityMantissa:!0,printZeroExponent:!1,printZeroInteger:!0,tightSpacing:!1,uncertaintyDescriptorMode:"bracket-separator",uncertaintyDescriptorSeparator:"\\",uncertaintyDescriptors:"",uncertaintyMode:"compact",uncertaintySeparator:"",zeroDecimalAsSymbol:!1,zeroSymbol:"\\mbox{---}"});function j(e){return e.toLowerCase().replace(/-(.)/g,(function(e,t){return t.toUpperCase()}))}function D(e){return function(e){if(Array.isArray(e))return G(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return G(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return G(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function G(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function Z(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var z=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.map=t,this.reverseMap=new Map,t.forEach((function(e,t,r){n.reverseMap.has(e)||n.reverseMap.set(e,t)}))}var t,n,r;return t=e,(n=[{key:"has",value:function(e){return this.map.has(e)}},{key:"get",value:function(e){return this.map.get(e)}},{key:"revGet",value:function(e){return this.reverseMap.get(e)}},{key:"keys",value:function(){return this.map.keys()}},{key:"values",value:function(){return this.reverseMap.keys()}},{key:"forEach",value:function(e,t){return this.map.forEach(e)}},{key:"array",value:function(){return D(this.map)}},{key:"arrayReverse",value:function(){return D(this.reverseMap)}}])&&Z(t.prototype,n),r&&Z(t,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),q=new z(new Map([["meter","m"],["metre","m"],["gram","g"],["second","s"]])),I=new z(new Map([["yotta","Y"],["zetta","Z"],["exa","E"],["peta","P"],["tera","T"],["giga","G"],["mega","M"],["kilo","k"],["hecto","h"],["deka","da"],["deca","da"],["deci","d"],["centi","c"],["milli","m"],["micro","u"],["nano","n"],["pico","p"],["femto","f"],["atto","a"],["zepto","z"],["yocto","y"]]));function _(e){return function(e){if(Array.isArray(e))return J(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return J(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return J(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function J(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var T=new Array("square","cubic","squared","cubed","tothe","raiseto","per","of","cancel","highlight");function N(e,t){return e=e.substring(1),T.includes(e)?function(e,t){return F.get(e)(e,t)}(e,t):I.has(e)?{type:"prefix",result:{prefix:I.get(e)}}:q.has(e)?{type:"unit",result:{symbol:q.get(e),prefix:""}}:{type:"unit",result:{symbol:"X",prefix:""}}}var F=new Map([["square",function(e,t){return{type:"next",result:{power:2}}}],["cubic",function(e,t){return{type:"next",result:{power:3}}}],["squared",function(e,t){return{type:"previous",result:{power:2}}}],["cubed",function(e,t){return{type:"previous",result:{power:3}}}],["tothe",function(e,t){return{type:"previous",result:{power:+t.GetArgument("tothe",!0)}}}],["raiseto",function(e,t){return{type:"next",result:{power:+t.GetArgument("raiseto")}}}],["per",function(e,t){return{type:"next",result:{position:"denominator"}}}],["of",function(e,t){return{type:"previous",result:{qualifier:t.GetArgument("of")}}}],["cancel",function(e,t){return{type:"next",result:{cancel:!0}}}],["highlight",function(e,t){return{type:"next",result:{highlight:t.GetArgument("highlight")}}}]]);var B=new Map([["subscript",function(e,t){return"_{"+e+"}"}],["bracket",function(e,t){return"("+e+")"}],["combine",function(e,t){return e}],["phrase",function(e,t){return t+e}]]);function Q(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r="";e.cancel&&(r+="\\cancel{"),e.highlight&&(r+="{\\color{"+e.highlight+"}"),r+=t.unitFontCommand+"{",r+="\\class{MathML-Unit}{"+e.prefix+e.symbol+"}",e.qualifier&&(r+=B.get(t.qualifierMode)(e.qualifier,t.qualifierPhrase)),r+="}";var i=null!=e.power?n?Math.abs(e.power*("denominator"==e.position?-1:1)):e.power*("denominator"==e.position?-1:1):1*("denominator"==e.position?-1:1);return null!=i&&1!=i&&(r+="^{"+i+"}"),e.cancel&&(r+="}"),e.highlight&&(r+="}"),{latex:r,superscriptPresent:1!=i}}function R(e,t,n){var r=new Array;if(-1!=t.indexOf("\\")){var a=new o.Z(t,e.stack.env,e.configuration);a.i=0;for(var u=null;a.i<a.string.length;){var l=a.GetArgument(null),c=N(l,a);switch(c.type){case"next":case"prefix":u=null!=u?Object.assign(u,c.result):c.result;break;case"previous":if(0==r.length)throw new i.Z("MissingPreviousMacro","There is no previous macro for %1 to modify.",l);var p=r[r.length-1];p=Object.assign(p,c.result);break;case"unit":if(null!=u)if(c.result=Object.assign(c.result,u),"repeated-symbol"==n.perMode){var s="denominator"==u.position;u=null,s&&(u={position:"denominator"})}else u=null;r.push(c.result)}}}else r.push.apply(r,_(function(e,t){var n=new Array,r=new o.Z(t,e.stack.env,e.configuration);r.i=0;var i={position:"numerator"},a=!1,u="";for(;r.i<r.string.length;){switch(r.string.charAt(r.i)){case"~":case".":H(u,i),n.push(i),u="",i={position:a?"denominator":"numerator"};break;case"/":H(u,i),n.push(i),u="",i={position:(a=!0)?"denominator":"numerator"};break;case"^":var l=r.string.charAt(++r.i),c="";if("{"==l)for(;"}"!=(l=r.string.charAt(++r.i));)c+=l;else c=l;i.power=+c;break;case"_":var p="";if("{"==(l=r.string.charAt(++r.i)))for(;"}"!=(l=r.string.charAt(++r.i));)p+=l;else p=l;i.qualifier=p;break;default:u+=r.string.charAt(r.i)}r.i++}return H(u,i),n.push(i),n}(e,t)));var f=function(e,t,n){var r,i;if(t.length>=2&&1==t.filter((function(e){var t=null!=e.power?e.power*("denominator"==e.position?-1:1):1;return-1==Math.sign(t)})).length&&"single-symbol"==n.perMode&&(i=!0),"fraction"==n.perMode||"symbol"==n.perMode||"repeated-symbol"==n.perMode||i){var a="",u="",l=!1;t.forEach((function(e,t,r){var o;"denominator"==e.position||null!=e.power&&e.power<0?(o=Q(e,n,"fraction"==n.perMode||"symbol"==n.perMode||"repeated-symbol"==n.perMode||"single-symbol"==n.perMode||i),""!=u&&("repeated-symbol"==n.perMode?(o.superscriptPresent&&(u+=n.perSymbolScriptCorrection),u+=n.perSymbol):u+=n.interUnitProduct),u+=o.latex):(o=Q(e,n,"fraction"==n.perMode||"symbol"==n.perMode||"repeated-symbol"==n.perMode||"single-symbol"==n.perMode||i),l=o.superscriptPresent,""!=a&&(a+=n.interUnitProduct),a+=o.latex)})),""==a&&""!=u&&(a="1"),""!=u?"fraction"==n.perMode?r=n.fractionCommand+"{"+a+"}{"+u+"}":"repeated-symbol"==n.perMode||"symbol"==n.perMode||i?r=a+(l?n.perSymbolScriptCorrection:"")+n.perSymbol+u:console.log("shouldn't be here"):r=a}else{"power-positive-first"==n.perMode&&(t=t.sort((function(e,t){var n=null!=e.power?e:1;"denominator"==e.position&&(n=-n);var r=null!=t.power?t:1;return"denominator"==t.position&&(r=-r),n>r?1:n<r?-1:0})));var c="";t.forEach((function(e,t,r){var i=Q(e,n);i.superscriptPresent,""!=c&&(c+=n.interUnitProduct),c+=i.latex})),r=c}return new o.Z(r,e.stack.env,e.configuration).mml()}(e,r,n);return f}function $(e,t){return Array.from(e).filter((function(e,t,n){return t===n.indexOf(e)})).sort((function(e,t){return e.length-t.length})).join(t)}function H(e,t){var n=$(I.values(),"|"),r=$(q.values(),"|"),i=new RegExp("("+n+")?("+r+")").exec(e);void 0!==i[1]?t.prefix=i[1]:t.prefix="",t.symbol=i[2]}var L,K=new Map([["\\num",function(e,t,n){return C(e,e.GetArgument(t),n)}],["\\ang",function(e,t,n){return function(e,t){var n=e.create("node","mtext"),r=e.create("text",t+" testAngle");return n.appendChild(r),n}(e,e.GetArgument(t))}],["\\unit",function(e,t,n){var r=e.GetArgument(t);return R(e,r,n)}],["\\qty",function(e,t,n){var r=C(e,e.GetArgument(t),n);e.Push(r);var i=e.GetArgument(t);return R(e,i,n)}]]);new t.QQ("siunitxMap",{num:["siunitxToken","num"],ang:["siunitxToken","ang"],unit:["siunitxToken","unit"],qty:["siunitxToken","qty"]},{siunitxToken:function(e,t,n){L=e;var r=function(e,t){var n=Object.assign({},e);if(console.log(t),null!=t){for(;t.startsWith("{")&&t.endsWith("}");)t=t.slice(1,t.length-1);console.log(t);var r,i="",o=!1,a=0,u=!1,l="",c=E(t);try{for(c.s();!(r=c.n()).done;){var p=r.value;"{"==p?(o?l+=p:i+=p,a++):"}"==p?(a--,o?l+=p:i+=p):"\\"==p?(u=!0,o?l+=p:i+=p):","!=p||0!=a||u?"="==p&&0==a?o=!0:o?l+=p:i+=p:(i=j(i.trim()),console.log(i+": "+l),""==l?n[i]=!0:"number"==typeof n[i]?n[i]=+l.trim():"boolean"==typeof n[i]?n[i]="true"===l.trim():n[i]=l.trim(),i="",l="",o=!1)}}catch(e){c.e(e)}finally{c.f()}i=j(i.trim()),console.log(i+": "+l),""==l?n[i]=!0:"number"==typeof n[i]?n[i]=+l.trim():"boolean"==typeof n[i]?n[i]="true"===l.trim():n[i]=l.trim()}return console.log(n),n}(e.options,function(e){if("["===e.GetNext()){for(var t=++e.i,n=0;e.i<e.string.length;){if("{"==e.string.charAt(e.i))n++;else if("}"==e.string.charAt(e.i))n--;else if("]"==e.string.charAt(e.i)&&0==n){var r=e.string.slice(t,e.i);return e.i++,r}e.i++}throw new i.Z("MissingCloseBracket","Could not find closing ']' for argument to %1",e.currentCS)}}(e)),o=K.get(t)(e,t,r);e.Push(o)}});e.VK.create("siunitx",{handler:{macro:["siunitxMap"]},options:Object.assign(Object.assign({},{bracketUnitDenominator:!0,forbidLiteralUnits:!1,fractionCommand:"\\frac",interUnitProduct:"\\,",parseUnits:!0,perMode:"power",displayPerMode:"perMode",inlinePerMode:"perMode",perSymbolScriptCorrection:"\\!",perSymbol:"/",powerHalfAsSqrt:!1,qualifierMode:"subscript",qualifierPhrase:"",stickyPer:!1,unitFontCommand:"\\mathrm"}),U)})}()}();