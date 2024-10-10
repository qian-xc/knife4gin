import{_ as F,d as R,a as S,b as N,c as H,f as M,u as l,r as D,o as g,s as h,w as t,l as o,k as i,t as c,q as E,j,p as x,bT as O,y as A,M as U,A as V,bU as W,z as q,T as L}from"./doc-9439ea18.js";import{C as I}from"./clipboard-b510bfa2.js";import{C as J}from"./CopyOutlined-b5ffbc08.js";const K={props:{api:{type:Object,required:!0},swaggerInstance:{type:Object,required:!0},debugSend:{type:Boolean,default:!1},responseHeaders:{type:Array},responseRawText:{type:String,default:""},responseCurlText:{type:String,default:""},responseStatus:{type:Object},responseContent:{type:Object},responseFieldDescriptionChecked:{type:Boolean,default:!0}},components:{CopyOutlined:J,EditorDebugShow:R(()=>S(()=>import("./EditorDebugShow-bdfdb935.js"),["./EditorDebugShow-bdfdb935.js","./doc-9439ea18.js","..\\css\\doc-9f76a0ba.css","./ext-language_tools-66adbdd7.js"],import.meta.url))},setup(){const s=N(),n=H(()=>s.language),{messages:e}=M();return{language:n,messages:e}},data(){return{pagination:!1,i18n:null,base64Image:!1,debugResponse:!0,responseHeaderColumn:[]}},watch:{language:function(s,n){this.initI18n()}},computed:{responseSizeText(){var s="0 B",n=this.responseStatus;if(n!=null&&n!=null){var e=n.size,d=(e/1024).toFixed(2),a=(e/1024/1024).toFixed(2);d>1?s=d+" KB":a>1?s=a+" MB":s=e+" B"}return s}},created(){this.initI18n(),this.copyRawText(),this.copyCurlText()},methods:{getCurrentI18nInstance(){return this.messages[this.language]},base64Init(){var s=l.getValue(this.responseContent,"base64","",!0);l.strNotBlank(s)&&(this.base64Image=!0)},initI18n(){this.i18n=this.getCurrentI18nInstance(),this.responseHeaderColumn=this.i18n.table.debugResponseHeaderColumns},copyRawText(){var s=this,n="btnDebugCopyRaw"+this.api.id,e=new I("#"+n,{text(){return s.responseRawText}}),d=this.i18n.message.copy.raw.success,a=this.i18n.message.copy.raw.fail;e.on("success",function(u){s.$message.info(d)}),e.on("error",function(u){s.$message.info(a)})},copyCurlText(){var s=this,n="btnDebugCopyCurl"+this.api.id,e=new I("#"+n,{text(){return s.responseCurlText}}),d=this.i18n.message.copy.curl.success,a=this.i18n.message.copy.curl.fail;e.on("success",function(u){s.$message.info(d)}),e.on("error",function(u){s.$message.info(a)})},resetResponseContent(){if(this.responseContent!=null&&this.responseContent.mode=="json"){const s=this.responseContent.text;this.responseContent.text=l.json5stringify(l.json5parse(s))}},showFieldDesChange(s){var n=s.target.checked;this.$emit("debugShowFieldDescriptionChange",n),this.toggleFieldDescription(n)},debugEditorChange(s){this.$emit("debugEditorChange",s)},toggleFieldDescription(s){var n="responseEditorContent"+this.api.id,e=document.getElementById(n),d=e.getElementsByClassName("knife4j-debug-editor-field-description");l.arrNotEmpty(d)?d.forEach(function(a){s?a.style.display="block":a.style.display="none"}):this.showEditorFieldAnyWay()},showEditorFieldDescription(s){var n=this;l.checkUndefined(s)&&parseInt(s)<=200&&setTimeout(()=>{n.showEditorFieldWait()},100)},showEditorFieldWait(){this.debugSend&&this.responseFieldDescriptionChecked&&this.responseContent.mode=="json"&&this.showEditorFieldAnyWay()},showEditorFieldAnyWay(){var s=this.swaggerInstance,n=this.api.getHttpSuccessCodeObject(),e="responseEditorContent"+this.api.id,d=document.getElementById(e),a=[],u=d.getElementsByClassName("ace_text-layer"),y=0,r=d.querySelector(".ace_print-margin");if(l.checkUndefined(r)&&l.checkUndefined(r.style)&&(y=r.style.left),u.length>0)for(var _=u[0].getElementsByClassName("ace_line"),m=0;m<_.length;m++){var p=_[m],C=p.getElementsByClassName("ace_variable"),f=null;if(l.arrNotEmpty(C)){f=l.toString(C[0].innerHTML,"").replace(/^"(.*)"$/g,"$1");var v=p.getElementsByClassName("knife4j-debug-editor-field-description");if(!l.arrNotEmpty(v)){var b=document.createElement("span");b.className="knife4j-debug-editor-field-description",b.innerHTML=n.responseDescriptionFind(a,f,s),b.style.left=y,p.appendChild(b)}}var k=p.getElementsByClassName("ace_paren");if(l.arrNotEmpty(k)){for(var B=[],w=0;w<k.length;w++)B.push(k[w].innerHTML);var T=B.join("");switch(T){case"[":case"{":a.push(f||0);break;case"}":case"]":a.pop();break}}}}}},z={slot:"tabBarExtraContent"},P={style:{color:"#919191"}},G={class:"key"},Q={class:"value"},X={class:"key"},Y={class:"value"},Z={class:"key"},$={class:"value"},ee={key:0},se=["src"],te={key:1},ne=["id"],oe={class:"knife4j-debug-response-curl"},ae=["src"];function re(s,n,e,d,a,u){const y=O,r=A,_=U,m=D("editor-debug-show"),p=V,C=D("CopyOutlined"),f=W,v=q,b=L;return g(),h(r,{class:"knife4j-debug-response"},{default:t(()=>[e.debugSend?(g(),h(r,{key:0},{default:t(()=>[o(b,{defaultActiveKey:"debugResponse"},{default:t(()=>[i("template",z,[e.responseStatus?(g(),h(r,{key:0,class:"knife4j-debug-status"},{default:t(()=>[i("span",null,[o(y,{defaultChecked:e.responseFieldDescriptionChecked,onChange:u.showFieldDesChange},{default:t(()=>[i("span",P,c(s.$t("debug.response.showDes")),1)]),_:1},8,["defaultChecked","onChange"])]),i("span",G,c(s.$t("debug.response.code")),1),i("span",Q,c(e.responseStatus.code),1),i("span",X,c(s.$t("debug.response.cost")),1),i("span",Y,c(e.responseStatus.cost),1),i("span",Z,c(s.$t("debug.response.size")),1),i("span",$,c(u.responseSizeText),1)]),_:1})):E("",!0)]),o(p,{tab:a.i18n.debug.response.content,key:"debugResponse"},{default:t(()=>[e.responseContent?(g(),h(r,{key:0},{default:t(()=>[e.responseContent.blobFlag?(g(),h(r,{key:0},{default:t(()=>[e.responseContent.imageFlag?(g(),j("div",ee,[i("img",{src:e.responseContent.blobUrl},null,8,se)])):(g(),j("div",te,[o(_,{type:"link",href:e.responseContent.blobUrl,download:e.responseContent.blobFileName},{default:t(()=>[x(c(s.$t("debug.response.download")),1)]),_:1},8,["href","download"])]))]),_:1})):(g(),j("div",{key:1,id:"responseEditorContent"+e.api.id},[o(m,{onShowDescription:u.showEditorFieldDescription,onDebugEditorChange:u.debugEditorChange,debugResponse:a.debugResponse,value:e.responseContent.text,mode:e.responseContent.mode},null,8,["onShowDescription","onDebugEditorChange","debugResponse","value","mode"])],8,ne))]),_:1})):E("",!0)]),_:1},8,["tab"]),o(p,{tab:"Raw",key:"debugRaw",forceRender:""},{default:t(()=>[o(r,{class:"knife4j-debug-response-mt"},{default:t(()=>[o(_,{id:"btnDebugCopyRaw"+e.api.id,type:"primary"},{default:t(()=>[o(C),x(),i("span",null,c(s.$t("debug.response.copy")),1)]),_:1},8,["id"])]),_:1}),o(r,{class:"knife4j-debug-response-mt"},{default:t(()=>[o(f,{rows:10,value:e.responseRawText},null,8,["value"])]),_:1})]),_:1}),o(p,{tab:"Headers",key:"debugHeaders"},{default:t(()=>[o(r,{class:"knife4j-debug-response-mt"},{default:t(()=>[o(v,{bordered:"",size:"small",columns:a.responseHeaderColumn,pagination:a.pagination,dataSource:e.responseHeaders,rowKey:"id"},null,8,["columns","pagination","dataSource"])]),_:1})]),_:1}),o(p,{tab:"Curl",key:"debugCurl"},{default:t(()=>[o(r,{class:"knife4j-debug-response-mt"},{default:t(()=>[o(_,{id:"btnDebugCopyCurl"+e.api.id,type:"primary"},{default:t(()=>[o(C),x(),i("span",null,c(s.$t("debug.response.copy")),1)]),_:1},8,["id"])]),_:1}),o(r,{class:"knife4j-debug-response-mt"},{default:t(()=>[i("pre",oe,c(e.responseCurlText),1)]),_:1})]),_:1}),e.responseContent!=null&&e.responseContent.base64!=null&&e.responseContent.base64!=""?(g(),h(p,{tab:"Base64Img",key:"debugBase64Img"},{default:t(()=>[o(r,{class:"knife4j-debug-response-mt"},{default:t(()=>[i("img",{src:e.responseContent.base64},null,8,ae)]),_:1})]),_:1})):E("",!0)]),_:1})]),_:1})):(g(),h(r,{key:1}))]),_:1})}const ue=F(K,[["render",re]]);export{ue as default};
