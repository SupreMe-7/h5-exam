(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4cc2e36e"],{"25f0":function(t,e,n){"use strict";var a=n("6eeb"),o=n("825a"),s=n("d039"),i=n("ad6d"),c="toString",r=RegExp.prototype,l=r[c],u=s((function(){return"/a/b"!=l.call({source:"a",flags:"b"})})),d=l.name!=c;(u||d)&&a(RegExp.prototype,c,(function(){var t=o(this),e=String(t.source),n=t.flags,a=String(void 0===n&&t instanceof RegExp&&!("flags"in r)?i.call(t):n);return"/"+e+"/"+a}),{unsafe:!0})},"44e7":function(t,e,n){var a=n("861d"),o=n("c6b6"),s=n("b622"),i=s("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},"4d63":function(t,e,n){var a=n("83ab"),o=n("da84"),s=n("94ca"),i=n("7156"),c=n("9bf2").f,r=n("241c").f,l=n("44e7"),u=n("ad6d"),d=n("9f7f"),f=n("6eeb"),p=n("d039"),x=n("69f3").set,g=n("2626"),h=n("b622"),v=h("match"),b=o.RegExp,m=b.prototype,E=/a/g,R=/a/g,y=new b(E)!==E,I=d.UNSUPPORTED_Y,w=a&&s("RegExp",!y||I||p((function(){return R[v]=!1,b(E)!=E||b(R)==R||"/a/i"!=b(E,"i")})));if(w){var S=function(t,e){var n,a=this instanceof S,o=l(t),s=void 0===e;if(!a&&o&&t.constructor===S&&s)return t;y?o&&!s&&(t=t.source):t instanceof S&&(s&&(e=u.call(t)),t=t.source),I&&(n=!!e&&e.indexOf("y")>-1,n&&(e=e.replace(/y/g,"")));var c=i(y?new b(t,e):b(t,e),a?this:m,S);return I&&n&&x(c,{sticky:n}),c},k=function(t){t in S||c(S,t,{configurable:!0,get:function(){return b[t]},set:function(e){b[t]=e}})},C=r(b),T=0;while(C.length>T)k(C[T++]);m.constructor=S,S.prototype=m,f(o,"RegExp",S)}g("RegExp")},"5bb2":function(t,e,n){},7156:function(t,e,n){var a=n("861d"),o=n("d2bb");t.exports=function(t,e,n){var s,i;return o&&"function"==typeof(s=e.constructor)&&s!==n&&a(i=s.prototype)&&i!==n.prototype&&o(t,i),t}},9263:function(t,e,n){"use strict";var a=n("ad6d"),o=n("9f7f"),s=RegExp.prototype.exec,i=String.prototype.replace,c=s,r=function(){var t=/a/,e=/b*/g;return s.call(t,"a"),s.call(e,"a"),0!==t.lastIndex||0!==e.lastIndex}(),l=o.UNSUPPORTED_Y||o.BROKEN_CARET,u=void 0!==/()??/.exec("")[1],d=r||u||l;d&&(c=function(t){var e,n,o,c,d=this,f=l&&d.sticky,p=a.call(d),x=d.source,g=0,h=t;return f&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),h=String(t).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==t[d.lastIndex-1])&&(x="(?: "+x+")",h=" "+h,g++),n=new RegExp("^(?:"+x+")",p)),u&&(n=new RegExp("^"+x+"$(?!\\s)",p)),r&&(e=d.lastIndex),o=s.call(f?n:d,h),f?o?(o.input=o.input.slice(g),o[0]=o[0].slice(g),o.index=d.lastIndex,d.lastIndex+=o[0].length):d.lastIndex=0:r&&o&&(d.lastIndex=d.global?o.index+o[0].length:e),u&&o&&o.length>1&&i.call(o[0],n,(function(){for(c=1;c<arguments.length-2;c++)void 0===arguments[c]&&(o[c]=void 0)})),o}),t.exports=c},"9f7f":function(t,e,n){"use strict";var a=n("d039");function o(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=a((function(){var t=o("a","y");return t.lastIndex=2,null!=t.exec("abcd")})),e.BROKEN_CARET=a((function(){var t=o("^r","gy");return t.lastIndex=2,null!=t.exec("str")}))},a1f0:function(t,e,n){"use strict";var a=n("5bb2"),o=n.n(a);o.a},a55b:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"login"},[n("nut-textinput",{staticClass:"phone",attrs:{label:"手机号:",placeholder:"请输入手机号",clearBtn:!0,disabled:!1,hasBorder:!1},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}}),n("div",{staticClass:"code"},[n("nut-textinput",{staticClass:"code-input",attrs:{label:"验证码:",placeholder:"请输入验证码",clearBtn:!0,disabled:!1,hasBorder:!1},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),n("nut-button",{staticClass:"send-code",attrs:{small:"",disabled:t.sendDisable},on:{click:t.sendCode}},[t._v(" "+t._s(t.sendText)+" ")])],1),n("nut-button",{staticClass:"login-btn",attrs:{block:""},on:{click:t.login}},[t._v(" 登录 ")])],1)},o=[],s=(n("4d63"),n("ac1f"),n("25f0"),{data:function(){return{phone:null,code:null,sendText:"发送验证码",sendDisable:!1}},mounted:function(){document.title="短信登陆/注册"},methods:{sendCode:function(){var t=this,e=new RegExp(/^1\d{10}$/);e.test(this.phone)?this.$ajax.post("/hmu/user/sendsms?phone=".concat(this.phone)).then((function(e){0===e.result?(t.$toast.text("发送验证码成功"),t.changeSendText()):t.$toast.text(e.errMsg)})):this.$toast.text("手机号格式错误")},changeSendText:function(){var t=this,e=60;this.sendDisable=!0;var n=setInterval((function(){t.sendText=e--+"秒后重发",-1===e&&(t.sendText="发送验证码",t.sendDisable=!1,window.clearInterval(n))}),1e3)},login:function(){var t=this,e={phone:this.phone,code:this.code,mode:"sms"};e=JSON.stringify(e),this.$ajax.post("/hmu/user/login?param=".concat(encodeURIComponent(e))).then((function(e){if(0===e.result){if(e.data.isNew)return void t.$router.push({name:"resign",query:{phone:t.phone}});localStorage.setItem("TOKEN",e.data.token),localStorage.setItem("stuId",e.data.stuId),t.$router.push({name:"examlist"})}else t.$toast.text(e.errMsg)})).catch((function(e){t.$toast.text(e)}))}}}),i=s,c=(n("a1f0"),n("b95e"),n("2877")),r=Object(c["a"])(i,a,o,!1,null,"3696046f",null);e["default"]=r.exports},ac1f:function(t,e,n){"use strict";var a=n("23e7"),o=n("9263");a({target:"RegExp",proto:!0,forced:/./.exec!==o},{exec:o})},ad6d:function(t,e,n){"use strict";var a=n("825a");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},b95e:function(t,e,n){"use strict";var a=n("d149"),o=n.n(a);o.a},d149:function(t,e,n){}}]);
//# sourceMappingURL=chunk-4cc2e36e.4674c0ab.js.map