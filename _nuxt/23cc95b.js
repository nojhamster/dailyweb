(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{380:function(t,e,r){"use strict";r.r(e);r(21),r(26);var n={props:{size:{type:Number,default:function(){return 32}},color:{type:String,default:function(){return"primary"}},member:{type:Object,default:function(){return{}}}},computed:{avatarUrl:function(){var t,e;return(null===(t=this.member)||void 0===t?void 0:t.avatarUrl)&&"".concat(null===(e=this.member)||void 0===e?void 0:e.avatarUrl,"/50.png")},fullName:function(){var t;return null===(t=this.member)||void 0===t?void 0:t.fullName},username:function(){var t;return null===(t=this.member)||void 0===t?void 0:t.username},initials:function(){var t;return null===(t=this.member)||void 0===t?void 0:t.initials},combinedName:function(){return"".concat(this.fullName," (").concat(this.username,")")}}},l=r(80),o=r(112),c=r.n(o),m=r(171),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-avatar",{attrs:{size:t.size,color:t.color,title:t.combinedName}},[t.avatarUrl?r("img",{attrs:{src:t.avatarUrl,alt:t.fullName}}):r("span",{domProps:{textContent:t._s(t.initials)}})])}),[],!1,null,null,null);e.default=component.exports;c()(component,{VAvatar:m.a})}}]);