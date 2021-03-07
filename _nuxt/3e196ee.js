(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{463:function(e,t,n){"use strict";n.r(t);n(21),n(46),n(34),n(40),n(14),n(381),n(448),n(41),n(49);var l={data:function(){var e,t,n,l,r,o,c,d;try{d=JSON.parse(localStorage.getItem("settings"))}catch(e){d={}}var v=null===(e=d)||void 0===e?void 0:e.dingVolume;return Number.isInteger(v)||(v=75),v>100&&(v=100),v<0&&(v=0),{name:"",dingFiles:["ding_01","ding_02","ding_03","ding_04"],participants:Array.isArray(null===(t=d)||void 0===t?void 0:t.participants)?d.participants:[],secondsPerPerson:Number.isInteger(null===(n=d)||void 0===n?void 0:n.secondsPerPerson)?d.secondsPerPerson:120,dingFile:(null===(l=d)||void 0===l?void 0:l.dingFile)||"ding_01",dingVolume:v,trelloBoardId:(null===(r=d)||void 0===r?void 0:r.trelloBoardId)||"",trelloApiKey:(null===(o=d)||void 0===o?void 0:o.trelloApiKey)||"",trelloAccessToken:(null===(c=d)||void 0===c?void 0:c.trelloAccessToken)||""}},computed:{hasParticipants:function(){return this.participants.length>0}},methods:{onNewParticipant:function(){var e=this.name.trim();if(e){for(var t=e,n=2;this.participants.includes(t);)t="".concat(e," (").concat(n,")"),n+=1;this.participants.push(e),this.name=""}},removeParticipant:function(e){this.participants=this.participants.filter((function(p){return p!==e}))},playDing:function(){if(this.dingFile&&this.dingVolume>0){var e=new Audio("/".concat(this.dingFile,".mp3"));e.volume=this.dingVolume/100,e.play()}},start:function(){localStorage.setItem("settings",JSON.stringify({participants:this.participants,secondsPerPerson:Number.parseInt(this.secondsPerPerson),dingFile:this.dingFile,dingVolume:this.dingVolume,trelloBoardId:this.trelloBoardId,trelloApiKey:this.trelloApiKey,trelloAccessToken:this.trelloAccessToken})),this.$router.push({name:"daily"})}}},r=n(70),o=n(103),c=n.n(o),d=n(361),v=n(161),m=n(134),f=n(385),h=n(455),_=n(411),y=n(459),P=n(162),k=n(456),V=n(88),A=n(461),x=n(460),I=n(452),component=Object(r.a)(l,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-row",{attrs:{justify:"center"}},[n("v-card",{staticClass:"ma-4",staticStyle:{"max-width":"1000px"}},[n("v-card-title",{staticClass:"headline"},[e._v("\n      Participants\n    ")]),e._v(" "),n("v-card-text",[n("v-form",{on:{submit:function(t){return t.preventDefault(),e.onNewParticipant(t)}}},[n("v-row",{attrs:{align:"center"}},[n("v-col",[n("v-text-field",{attrs:{name:"participant",label:"Nom",dense:"",outlined:"","hide-details":"",autofocus:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),e._v(" "),n("v-col",{staticClass:"shrink"},[n("v-btn",{attrs:{color:"primary",type:"submit"}},[e._v("\n              Ajouter\n            ")])],1)],1)],1)],1),e._v(" "),n("v-card-text",[n("v-scale-transition",{attrs:{group:"",origin:"center center"}},e._l(e.participants,(function(t){return n("v-chip",{key:t,staticClass:"mr-2 mb-2",attrs:{close:"",label:""},on:{"click:close":function(n){return e.removeParticipant(t)}}},[e._v("\n          "+e._s(t)+"\n        ")])})),1)],1),e._v(" "),n("v-divider"),e._v(" "),n("v-card-title",[e._v("\n      Chronométrage\n    ")]),e._v(" "),n("v-card-text",[n("v-row",[n("v-col",{attrs:{cols:"12",md:"6"}},[n("v-text-field",{attrs:{type:"number",outlined:"",name:"speakduration",label:"Temps par personne (en secondes)"},model:{value:e.secondsPerPerson,callback:function(t){e.secondsPerPerson=t},expression:"secondsPerPerson"}})],1),e._v(" "),n("v-col",{attrs:{cols:"12",md:"6"}},[n("v-select",{attrs:{items:e.dingFiles,outlined:"",label:"Alerte fin de tour"},on:{change:e.playDing},model:{value:e.dingFile,callback:function(t){e.dingFile=t},expression:"dingFile"}}),e._v(" "),n("v-slider",{attrs:{label:"Volume",step:"5",min:"0",max:"100"},on:{change:e.playDing},model:{value:e.dingVolume,callback:function(t){e.dingVolume=t},expression:"dingVolume"}})],1)],1)],1),e._v(" "),n("v-divider"),e._v(" "),n("v-card-title",[e._v("\n      Tableau Trello (optionel)\n    ")]),e._v(" "),n("v-card-text",[n("p",[e._v("\n        Permet d'afficher l'activité récente d'un tableau Trello.\n        Pour accéder à un tableau privé, une "),n("strong",[e._v("clé d'API")]),e._v(" et un "),n("strong",[e._v("token d'accès")]),e._v(" sont nécessaires.\n        Plus de détails "),n("a",{attrs:{href:"https://trello.com/app-key"}},[e._v("à cette adresse")]),e._v(".\n      ")]),e._v(" "),n("v-text-field",{attrs:{outlined:"",name:"trelloBoardId",label:"Identifiant du tableau"},model:{value:e.trelloBoardId,callback:function(t){e.trelloBoardId=t},expression:"trelloBoardId"}}),e._v(" "),n("v-text-field",{attrs:{type:"password",outlined:"",name:"trelloApiKey",label:"Clé d'API"},model:{value:e.trelloApiKey,callback:function(t){e.trelloApiKey=t},expression:"trelloApiKey"}}),e._v(" "),n("v-text-field",{attrs:{type:"password",outlined:"",name:"trelloAccessToken",label:"Token d'accès"},model:{value:e.trelloAccessToken,callback:function(t){e.trelloAccessToken=t},expression:"trelloAccessToken"}})],1),e._v(" "),n("v-card-actions",{staticClass:"justify-center"},[n("v-btn",{attrs:{large:"",color:"primary",disabled:!e.hasParticipants},on:{click:e.start}},[n("v-icon",{attrs:{left:""}},[e._v("\n          mdi-rocket-launch-outline\n        ")]),e._v("\n        Démarrer !\n      ")],1)],1)],1)],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VBtn:d.a,VCard:v.a,VCardActions:m.a,VCardText:m.c,VCardTitle:m.d,VChip:f.a,VCol:h.a,VDivider:_.a,VForm:y.a,VIcon:P.a,VRow:k.a,VScaleTransition:V.d,VSelect:A.a,VSlider:x.a,VTextField:I.a})}}]);