(window.webpackJsonp=window.webpackJsonp||[]).push([[10,7,9],{380:function(e,t,r){"use strict";r.r(t);r(21),r(26);var l={props:{size:{type:Number,default:function(){return 32}},color:{type:String,default:function(){return"primary"}},member:{type:Object,default:function(){return{}}}},computed:{avatarUrl:function(){var e,t;return(null===(e=this.member)||void 0===e?void 0:e.avatarUrl)&&"".concat(null===(t=this.member)||void 0===t?void 0:t.avatarUrl,"/50.png")},fullName:function(){var e;return null===(e=this.member)||void 0===e?void 0:e.fullName},username:function(){var e;return null===(e=this.member)||void 0===e?void 0:e.username},initials:function(){var e;return null===(e=this.member)||void 0===e?void 0:e.initials},combinedName:function(){return"".concat(this.fullName," (").concat(this.username,")")}}},n=r(80),o=r(112),c=r.n(o),d=r(171),component=Object(n.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-avatar",{attrs:{size:e.size,color:e.color,title:e.combinedName}},[e.avatarUrl?r("img",{attrs:{src:e.avatarUrl,alt:e.fullName}}):r("span",{domProps:{textContent:e._s(e.initials)}})])}),[],!1,null,null,null);t.default=component.exports;c()(component,{VAvatar:d.a})},383:function(e,t,r){"use strict";r.r(t);r(81),r(8);var l=r(388),n=r.n(l),o=r(389),c=r.n(o),d={components:{TrelloAvatar:r(380).default},props:{lists:{type:Array,default:function(){return[]}},members:{type:Array,default:function(){return[]}},labels:{type:Array,default:function(){return[]}}},data:function(){return{show:!1,card:null}},computed:{list:function(){var e=this;return Array.isArray(this.lists)&&this.card?this.lists.find((function(t){return t.id===e.card.idList})):null},cardMembers:function(){var e,t=this;return Array.isArray(this.members)&&Array.isArray(null===(e=this.card)||void 0===e?void 0:e.idMembers)?this.members.filter((function(e){return t.card.idMembers.find((function(t){return t===e.id}))})):null},cardLabels:function(){var e,t=this;return Array.isArray(this.labels)&&Array.isArray(null===(e=this.card)||void 0===e?void 0:e.idLabels)?this.labels.filter((function(label){return t.card.idLabels.find((function(e){return e===label.id}))})):null},htmlDesc:function(){return c.a.sanitize(n()(this.card.desc))}},methods:{showCard:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.card=e,this.show=!0}}},m=r(80),v=r(112),f=r.n(v),h=r(167),_=r(141),y=r(390),A=r(464),C=r(378),L=r(465),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-dialog",{attrs:{width:"900"},model:{value:e.show,callback:function(t){e.show=t},expression:"show"}},[e.card?r("v-card",[r("v-card-title",[e._v("\n      "+e._s(e.card.name)+"\n    ")]),e._v(" "),e.list?r("v-card-subtitle",[e._v("\n      Dans la liste "+e._s(e.list.name)+"\n    ")]):e._e(),e._v(" "),r("v-card-text",[r("v-row",[r("v-col",[r("div",{staticClass:"subtitle-1"},[e._v("\n            Membres\n          ")]),e._v(" "),e._l(e.cardMembers,(function(e){return r("TrelloAvatar",{key:e.id,staticClass:"mr-1 my-1",attrs:{member:e,size:32,color:"primary"}})}))],2),e._v(" "),r("v-col",[r("div",{staticClass:"subtitle-1"},[e._v("\n            Étiquettes\n          ")]),e._v(" "),e._l(e.cardLabels,(function(label){return r("v-chip",{key:label.id,staticClass:"mr-1 my-1",attrs:{color:label.color,label:"",dark:""}},[e._v("\n            "+e._s(label.name)+"\n          ")])}))],2)],1)],1),e._v(" "),r("v-card-title",[e._v("\n      Description\n    ")]),e._v(" "),e.htmlDesc?r("v-card-text",{domProps:{innerHTML:e._s(e.htmlDesc)}}):r("v-card-text",[r("p",[e._v("Pas de description")])])],1):e._e()],1)}),[],!1,null,null,null);t.default=component.exports;f()(component,{TrelloAvatar:r(380).default}),f()(component,{VCard:h.a,VCardSubtitle:_.b,VCardText:_.c,VCardTitle:_.d,VChip:y.a,VCol:A.a,VDialog:C.a,VRow:L.a})},384:function(e,t,r){"use strict";r.r(t);r(81),r(8);var l={components:{TrelloAvatar:r(380).default},props:{lists:{type:Array,default:function(){return[]}},members:{type:Array,default:function(){return[]}},labels:{type:Array,default:function(){return[]}},card:{type:Object,default:function(){return{}}}},computed:{list:function(){var e=this;return Array.isArray(this.lists)&&this.card?this.lists.find((function(t){return t.id===e.card.idList})):null},cardMembers:function(){var e,t=this;return Array.isArray(this.members)&&Array.isArray(null===(e=this.card)||void 0===e?void 0:e.idMembers)?this.members.filter((function(e){return t.card.idMembers.find((function(t){return t===e.id}))})):null},cardLabels:function(){var e,t=this;return Array.isArray(this.labels)&&Array.isArray(null===(e=this.card)||void 0===e?void 0:e.idLabels)?this.labels.filter((function(label){return t.card.idLabels.find((function(e){return e===label.id}))})):null}},methods:{}},n=r(80),o=r(112),c=r.n(o),d=r(366),m=r(167),v=r(141),f=r(390),h=r(168),_=r(376),component=Object(n.a)(l,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-card",[r("v-card-title",[e._v("\n    "+e._s(e.card.name)+"\n  ")]),e._v(" "),e.list?r("v-card-subtitle",[e._v("\n    Dans la liste "+e._s(e.list.name)+"\n  ")]):e._e(),e._v(" "),e.cardLabels.length>0?r("v-card-text",e._l(e.cardLabels,(function(label){return r("v-chip",{key:label.id,staticClass:"mr-1 my-1",attrs:{color:label.color,small:"",label:"",dark:""}},[e._v("\n      "+e._s(label.name)+"\n    ")])})),1):e._e(),e._v(" "),r("v-card-actions",[r("v-btn",{attrs:{text:"",href:e.card.url,target:"_blank"}},[r("v-icon",{attrs:{left:""}},[e._v("\n        mdi-trello\n      ")]),e._v("\n      Voir sur Trello\n    ")],1),e._v(" "),r("v-btn",{attrs:{text:""},on:{click:function(t){return e.$emit("showDetails",e.card)}}},[r("v-icon",{attrs:{left:""}},[e._v("\n        mdi-eye-outline\n      ")]),e._v("\n      Détails\n    ")],1),e._v(" "),r("v-spacer"),e._v(" "),e._l(e.cardMembers,(function(e){return r("TrelloAvatar",{key:e.id,staticClass:"mr-1 my-1",attrs:{member:e,size:32,color:"primary"}})}))],2)],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{TrelloAvatar:r(380).default}),c()(component,{VBtn:d.a,VCard:m.a,VCardActions:v.a,VCardSubtitle:v.b,VCardText:v.c,VCardTitle:v.d,VChip:f.a,VIcon:h.a,VSpacer:_.a})},408:function(e,t,r){"use strict";r.r(t);var l=r(25),n=(r(96),r(27),r(178),r(31),r(43),r(8),r(41),r(50),r(26),r(383)),o=r(384),c=r(380),d={components:{TrelloCardDialog:n.default,TrelloCard:o.default,TrelloAvatar:c.default},props:{boardId:{type:String,default:function(){return""}},apiKey:{type:String,default:function(){return""}},accessToken:{type:String,default:function(){return""}}},data:function(){return{search:"",board:null,loading:!1,error:null,selectedMembers:[],selectedLists:[],selectedLabels:[]}},computed:{boardName:function(){var e;return null===(e=this.board)||void 0===e?void 0:e.name},hasError:function(){return!!this.error},errorMessage:function(){var e;return null===(e=this.error)||void 0===e?void 0:e.message},lists:function(){var e;return Array.isArray(null===(e=this.board)||void 0===e?void 0:e.lists)?this.board.lists:[]},labels:function(){var e;return Array.isArray(null===(e=this.board)||void 0===e?void 0:e.labels)?this.board.labels:[]},members:function(){var e;return Array.isArray(null===(e=this.board)||void 0===e?void 0:e.members)?this.board.members:[]},cards:function(){var e,t=this,r=Array.isArray(null===(e=this.board)||void 0===e?void 0:e.cards)?this.board.cards:[],l=this.search.toLowerCase();return r.sort((function(a,b){return a.dateLastActivity<b.dateLastActivity?1:-1})).filter((function(e){if(l&&!e.name.toLowerCase().includes(l))return!1;if(t.selectedLists.length>0&&!t.selectedLists.includes(e.idList))return!1;if(t.selectedMembers.length>0){if(!Array.isArray(e.idMembers))return!1;if(!t.selectedMembers.some((function(t){return e.idMembers.includes(t)})))return!1}if(t.selectedLabels.length>0){if(!Array.isArray(e.idLabels))return!1;if(!t.selectedLabels.some((function(t){return e.idLabels.includes(t)})))return!1}return!0})).slice(0,25)}},mounted:function(){this.boardId&&this.fetchCards()},methods:{showCard:function(e){this.$refs.cardViewer.showCard(e)},fetchCards:function(){var e=this;return Object(l.a)(regeneratorRuntime.mark((function t(){var r,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.loading=!0,e.error=null,r={},e.apiKey&&e.accessToken&&(r.Authorization='OAuth oauth_consumer_key="'.concat(e.apiKey,'", oauth_token="').concat(e.accessToken,'"')),t.prev=4,t.next=7,e.$axios.get("https://api.trello.com/1/boards/".concat(e.boardId),{headers:r,params:{cards:"visible",lists:"open",members:"all",labels:"all",label_fields:"name,color",member_fields:"username,avatarUrl,fullName,initials",card_fields:"name,desc,url,dateLastActivity,idList,idMembers,idLabels",list_fields:"name"}});case 7:l=t.sent,e.board=l.data,t.next=14;break;case 11:t.prev=11,t.t0=t.catch(4),e.error=t.t0;case 14:e.loading=!1;case 15:case"end":return t.stop()}}),t,null,[[4,11]])})))()}}},m=r(80),v=r(112),f=r.n(v),h=r(473),_=r(466),y=r(366),A=r(167),C=r(141),L=r(390),V=r(464),T=r(170),x=r(94),w=r(465),k=r(376),M=r(417),D=r(467),N=r(468),S=r(48),I=r(177),component=Object(m.a)(d,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.boardId?r("v-card",[r("v-toolbar",{attrs:{flat:""}},[r("v-toolbar-title",[e._v("\n      "+e._s(e.boardName)+"\n    ")]),e._v(" "),r("v-spacer"),e._v(" "),r("v-text-field",{staticClass:"mr-3",staticStyle:{"max-width":"200px"},attrs:{name:"search",label:"Recherche",solo:"",dense:"","hide-details":""},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}}),e._v(" "),r("v-btn",{attrs:{color:"primary",loading:e.loading},on:{click:e.fetchCards}},[e._v("\n      Actualiser\n    ")])],1),e._v(" "),r("v-card-text",[r("v-row",[r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-autocomplete",{attrs:{items:e.lists,"item-text":"name","item-value":"id",label:"Listes","hide-details":"",outlined:"",multiple:"",clearable:""},model:{value:e.selectedLists,callback:function(t){e.selectedLists=t},expression:"selectedLists"}})],1),e._v(" "),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-autocomplete",{attrs:{items:e.members,"item-text":"fullName","item-value":"id",label:"Membres","hide-details":"",outlined:"",multiple:"",clearable:""},scopedSlots:e._u([{key:"selection",fn:function(data){return[r("TrelloAvatar",{staticClass:"mr-1",attrs:{member:data.item}})]}},{key:"item",fn:function(data){return[r("v-list-item-avatar",[r("TrelloAvatar",{attrs:{member:data.item}})],1),e._v(" "),r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:e._s(data.item.fullName)}}),e._v(" "),r("v-list-item-subtitle",{domProps:{textContent:e._s(data.item.username)}})],1)]}}],null,!1,2222735841),model:{value:e.selectedMembers,callback:function(t){e.selectedMembers=t},expression:"selectedMembers"}})],1),e._v(" "),r("v-col",{attrs:{cols:"12",md:"4"}},[r("v-autocomplete",{attrs:{items:e.labels,"item-text":"name","item-value":"id",label:"Étiquettes","hide-details":"",outlined:"",multiple:"",clearable:""},scopedSlots:e._u([{key:"selection",fn:function(data){return[r("v-chip",{staticClass:"mr-1 my-1",attrs:{color:data.item.color,label:"",dark:""}},[e._v("\n              "+e._s(data.item.name)+"\n            ")])]}}],null,!1,1065837416),model:{value:e.selectedLabels,callback:function(t){e.selectedLabels=t},expression:"selectedLabels"}})],1)],1)],1),e._v(" "),r("v-card-title",[e._v("\n    Activité\n  ")]),e._v(" "),r("v-card-text",[r("v-alert",{attrs:{type:"error",outlined:"",value:e.hasError}},[e._v("\n      Le chargement de l'activité Trello a échoué.\n      "),r("pre",[e._v(e._s(e.errorMessage))])]),e._v(" "),e.cards.length>0?r("v-timeline",{attrs:{dense:""}},e._l(e.cards,(function(t){return r("v-timeline-item",{key:t.id,attrs:{small:""}},[r("TrelloCard",{attrs:{card:t,lists:e.lists,members:e.members,labels:e.labels},on:{showDetails:function(r){return e.showCard(t)}}})],1)})),1):e._e()],1),e._v(" "),r("TrelloCardDialog",{ref:"cardViewer",attrs:{lists:e.lists,members:e.members,labels:e.labels}})],1):e._e()}),[],!1,null,null,null);t.default=component.exports;f()(component,{TrelloAvatar:r(380).default,TrelloCard:r(384).default,TrelloCardDialog:r(383).default}),f()(component,{VAlert:h.a,VAutocomplete:_.a,VBtn:y.a,VCard:A.a,VCardText:C.c,VCardTitle:C.d,VChip:L.a,VCol:V.a,VListItemAvatar:T.a,VListItemContent:x.a,VListItemSubtitle:x.b,VListItemTitle:x.c,VRow:w.a,VSpacer:k.a,VTextField:M.a,VTimeline:D.a,VTimelineItem:N.a,VToolbar:S.a,VToolbarTitle:I.a})}}]);