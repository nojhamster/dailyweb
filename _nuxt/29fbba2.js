(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{355:function(e,r,t){"use strict";t.r(r);t(20),t(56),t(45),t(72),t(35),t(24),t(57),t(147),t(75);var n=t(14),o={props:{boardId:{type:String,default:function(){return""}},apiKey:{type:String,default:function(){return""}},accessToken:{type:String,default:function(){return""}}},data:function(){return{search:"",board:null,loading:!1,error:null}},computed:{boardName:function(){var e;return null===(e=this.board)||void 0===e?void 0:e.name},hasError:function(){return!!this.error},errorMessage:function(){var e;return null===(e=this.error)||void 0===e?void 0:e.message},cards:function(){var e,r=Array.isArray(null===(e=this.board)||void 0===e?void 0:e.cards)?this.board.cards:[],t=this.search.toLowerCase();return r.sort((function(a,b){return a.dateLastActivity<b.dateLastActivity?1:-1})).filter((function(e){return!t||e.name.toLowerCase().includes(t)})).slice(0,25)}},mounted:function(){this.boardId&&this.fetchCards()},methods:{fetchCards:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var t,n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.loading=!0,e.error=null,t={},e.apiKey&&e.accessToken&&(t.Authorization='OAuth oauth_consumer_key="'.concat(e.apiKey,'", oauth_token="').concat(e.accessToken,'"')),r.prev=4,r.next=7,e.$axios.get("https://api.trello.com/1/boards/".concat(e.boardId),{headers:t,params:{cards:"visible",card_fields:"name,desc,url,dateLastActivity"}});case 7:n=r.sent,e.board=n.data,r.next=14;break;case 11:r.prev=11,r.t0=r.catch(4),e.error=r.t0;case 14:e.loading=!1;case 15:case"end":return r.stop()}}),r,null,[[4,11]])})))()}}},c=t(66),l=t(89),d=t.n(l),v=t(447),h=t(318),f=t(360),m=t(330),_=t(328),y=t(433),k=t(438),x=t(439),T=t(33),w=t(146),component=Object(c.a)(o,(function(){var e=this,r=e.$createElement,t=e._self._c||r;return e.boardId?t("v-card",[t("v-toolbar",{attrs:{flat:""}},[t("v-toolbar-title",[e._v("\n      "+e._s(e.boardName)+"\n    ")]),e._v(" "),t("v-spacer"),e._v(" "),t("v-text-field",{staticClass:"mr-3",staticStyle:{"max-width":"200px"},attrs:{name:"search",label:"Recherche",solo:"",dense:"","hide-details":""},model:{value:e.search,callback:function(r){e.search=r},expression:"search"}}),e._v(" "),t("v-btn",{attrs:{color:"primary",loading:e.loading},on:{click:e.fetchCards}},[e._v("\n      Actualiser\n    ")])],1),e._v(" "),t("v-card-title",[e._v("\n    Activité\n  ")]),e._v(" "),t("v-card-text",[t("v-alert",{attrs:{type:"error",outlined:"",value:e.hasError}},[e._v("\n      Le chargement de l'activité Trello a échoué.\n      "),t("pre",[e._v(e._s(e.errorMessage))])]),e._v(" "),e.cards.length>0?t("v-timeline",{attrs:{dense:""}},e._l(e.cards,(function(r){return t("v-timeline-item",{key:r.id,attrs:{small:""}},[t("a",{attrs:{href:r.url,target:"_blank"}},[e._v(e._s(r.name))])])})),1):e._e()],1)],1):e._e()}),[],!1,null,null,null);r.default=component.exports;d()(component,{VAlert:v.a,VBtn:h.a,VCard:f.a,VCardText:m.b,VCardTitle:m.c,VSpacer:_.a,VTextField:y.a,VTimeline:k.a,VTimelineItem:x.a,VToolbar:T.a,VToolbarTitle:w.a})}}]);