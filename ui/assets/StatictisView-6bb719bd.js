import{L as g}from"./LoadingAndErrorSc-89ea292e.js";import{_ as u,o,c as r,w as n,bz as C,t as l,f as m,r as c,e as h,a as e,d as v}from"./index-d76a5229.js";import{a as S}from"./adminController-666ea454.js";const w={name:"StatictisComp",props:["title","value"]};function x(s,p,a,d,t,f){return o(),r(m,{"min-height":"150px","min-width":"150px",class:"ma-4 pa-8"},{default:n(()=>[C("strong",null,l(a.title)+": "+l(a.value),1)]),_:1})}const L=u(w,[["render",x]]),V={name:"StatictisView",data(){return{loading:!0,error:!1,msg:null,statictis:null}},async mounted(){this.loading=!0,this.error=!1,this.msg=null;const s=await S.getStatictis();this.loading=!1,this.error=!s.state,this.msg=s.message,s.state&&(this.statictis=s.statictisInfo)},components:{LoadingAndErrorSc:g,StatictisComp:L}};function k(s,p,a,d,t,f){const i=c("StatictisComp"),_=c("LoadingAndErrorSc");return o(),r(m,{flat:"",class:"pa-8"},{default:n(()=>[t.statictis?(o(),r(h,{key:0,class:"d-flex flex-row pa-4"},{default:n(()=>[e(i,{title:"Users",value:t.statictis.usersCount},null,8,["value"]),e(i,{title:"Writters",value:t.statictis.writtersCount},null,8,["value"]),e(i,{title:"Articles",value:t.statictis.articlesCount},null,8,["value"]),e(i,{title:"Likes",value:t.statictis.likesCount},null,8,["value"]),e(i,{title:"Comments",value:t.statictis.commentsCount},null,8,["value"])]),_:1})):v("",!0),e(_,{isLoading:t.loading,msg:t.msg,error:t.error},null,8,["isLoading","msg","error"])]),_:1})}const E=u(V,[["render",k]]);export{E as default};
