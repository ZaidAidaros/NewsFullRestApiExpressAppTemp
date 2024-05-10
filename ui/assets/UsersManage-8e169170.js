import{a as h}from"./adminController-666ea454.js";import{L as y}from"./LoadingAndErrorSc-89ea292e.js";import{W as w}from"./WritterComp-1a760c99.js";import{_ as L,R as W,r as S,o as d,c as m,w as r,a as t,b as a,t as i,V as D,bz as c,z as v,k as _,m as I,ak as R,ap as A,B as E,e as T,i as U,j as k,bA as B,f as C,g as p,d as M,F as V,n as b}from"./index-d76a5229.js";import{V as O,a as F,b as j,c as z}from"./VWindowItem-fda22427.js";import{V as P}from"./VVirtualScroll-a8d2a32e.js";import"./lazy-81edd6d9.js";const q={name:"UserComp",components:{ResMsg:W},props:["user"],emits:["onDelete","onStop"],data(){return{show:!1,loading:!1,error:!1,msg:null,uNotification:null}},methods:{userIsStopedToggel:async function(){this.loading=!0,this.error=!1,this.msg=null;const e={Id:this.user.Id,isStoped:!this.user.isStoped};this.uNotification&&(e.notification=this.uNotification);const s=await h.updateUser(e);this.loading=!1,this.error=!s.state,this.msg=s.message,s.state&&(this.user.isStoped=!this.user.isStoped,this.$emit("onStop",this.user)),setTimeout(()=>{this.msg=null},1e3)},deleteUser:async function(){this.loading=!0,this.error=!1,this.msg=null;const e=await h.deleteUser(this.user.Id);this.loading=!1,this.error=!e.state,this.msg=e.message,e.state&&this.$emit("onDelete",this.user.Id),setTimeout(()=>{this.msg=null},1e3)}}},G=c("strong",null,"Email: ",-1),H=c("strong",null,"Phone: ",-1);function J(e,s,o,N,l,u){const g=S("ResMsg");return d(),m(C,{class:"ma-2 pa-4"},{default:r(()=>[t(D,null,{default:r(()=>[a(i(o.user.name),1)]),_:1}),t(g,{msg:l.msg,error:l.error},null,8,["msg","error"]),t(v,null,{default:r(()=>[a(" Registered At: "),c("strong",null,i(new Date(o.user.createdAt).toLocaleString()),1)]),_:1}),t(v,null,{default:r(()=>[a(" Last Update At: "),c("strong",null,i(new Date(o.user.createdAt).toLocaleString()),1)]),_:1}),t(I,null,{default:r(()=>[t(_,{onClick:s[0]||(s[0]=f=>l.show=!l.show),color:"green"},{default:r(()=>[a(" Show Detials ")]),_:1})]),_:1}),t(B,null,{default:r(()=>[R(c("div",null,[t(E),t(T,null,{default:r(()=>[t(U,null,{default:r(()=>[G,a(" "+i(o.user.email)+" ",1),c("strong",null," - "+i(o.user.isEmailVerified?"Verified":"Not Verified"),1)]),_:1}),t(U,null,{default:r(()=>[H,a(" "+i(o.user.phone)+" ",1),c("strong",null," - "+i(o.user.isPVerified?"Verified":"Not Verified"),1)]),_:1})]),_:1}),t(I,null,{default:r(()=>[t(k,{modelValue:l.uNotification,"onUpdate:modelValue":s[1]||(s[1]=f=>l.uNotification=f),color:"primary",label:"Send Notification",variant:"underlined"},null,8,["modelValue"]),t(_,{onClick:u.userIsStopedToggel,color:"red"},{default:r(()=>[a(i(o.user.isStoped?"UnStop User":"Stop User"),1)]),_:1},8,["onClick"])]),_:1})],512),[[A,l.show]])]),_:1})]),_:1})}const K=L(q,[["render",J]]),Q={components:{LoadingAndErrorSc:y,WritterComp:w,UserComp:K},data(){return{currentWindow:"newWrittersRequests",currentIndex:0,sVal:null,windows:[{index:0,title:"Users",value:"users",isStoped:!1,count:0,page:0,users:[],fUsers:[],loading:!0,isLoaded:!1,error:!1,msg:null,scrollRef:null},{index:1,title:"Stoped Users",value:"stopedUsers",isStoped:!0,count:0,page:0,users:[],fUsers:[],loading:!0,isLoaded:!1,error:!1,msg:null,scrollRef:null}]}},async mounted(){await this.onTab(this.windows[0])},methods:{onTab:async function(e){this.currentWindow=e.value,this.currentIndex=e.index,e.users.length||await this.loadUsers(e)},contains:function(e,s){return e?e.includes(s):!1},onSChange:function(){this.sVal&&(this.windows[this.currentIndex].msg=null,this.windows[this.currentIndex].fUsers=this.windows[this.currentIndex].users.filter(e=>this.sVal.includes("@")?this.contains(e.email,this.sVal):this.contains(e.name,this.sVal)||this.contains(e.phone,this.sVal)))},onSearch:async function(){if(this.sVal){const e=this.windows[this.currentIndex];e.loading=!0,e.error=!1,e.msg=null,e.page=0;const s=await h.usersSearch(this.sVal,e.page,e.isStoped);e.loading=!1,console.log(s),s.state?s.count?(e.fUsers=s.users,e.count=s.count,e.isLoaded=!0):e.msg="There Is No Users":(e.msg=s.message,e.error=!0)}},updateUser:function(e){this.deleteUser(e.Id),e.isStoped?this.windows[1].isLoaded&&(this.windows[1].users.push(e),this.windows[1].count++):this.windows[0].isLoaded&&(this.windows[0].users.push(e),this.windows[0].count++)},deleteUser:function(e){const s=this.windows[this.currentIndex].users.filter(o=>o.Id!==e);this.windows[this.currentIndex].users=s,this.windows[this.currentIndex].count--},loadUsers:async function(e){e.loading=!0,e.error=!1,e.msg=null;const s=await h.getUsers(e.page,e.isStoped);e.loading=!1,s.state?s.count?(e.users.push(...s.users),e.count=s.count,e.page++,e.isLoaded=!0):e.msg="There Is No Users":(e.msg=s.message,e.error=!0)}}};function X(e,s,o,N,l,u){const g=S("UserComp"),f=S("LoadingAndErrorSc");return d(),p(V,null,[t(O,{modelValue:l.currentWindow,"onUpdate:modelValue":s[0]||(s[0]=n=>l.currentWindow=n),"fixed-tabs":""},{default:r(()=>[(d(!0),p(V,null,b(l.windows,n=>(d(),m(j,{key:n.value,value:n.value,onClick:x=>u.onTab(n)},{default:r(()=>[a(i(n.title)+" "+i(n.count),1)]),_:2},1032,["value","onClick"]))),128))]),_:1},8,["modelValue"]),e.$store.getters.isSearch?(d(),m(C,{key:0,class:"ma-2 pa-2"},{default:r(()=>[t(U,null,{default:r(()=>[t(T,{justify:"center"},{default:r(()=>[t(k,{modelValue:l.sVal,"onUpdate:modelValue":[s[1]||(s[1]=n=>l.sVal=n),u.onSChange],color:"blue",label:"Search",variant:"underlined",clearable:!0},null,8,["modelValue","onUpdate:modelValue"]),t(_,{onClick:u.onSearch,color:"blue",class:"ma-3"},{default:r(()=>[a("Search")]),_:1},8,["onClick"])]),_:1})]),_:1})]),_:1})):M("",!0),t(F,{modelValue:l.currentWindow,"onUpdate:modelValue":s[2]||(s[2]=n=>l.currentWindow=n)},{default:r(()=>[(d(!0),p(V,null,b(l.windows,n=>(d(),m(z,{key:n.value,value:n.value},{default:r(()=>[t(C,{flat:""},{default:r(()=>[t(P,{ref_for:!0,ref:n.scrollRef,items:l.sVal?n.fUsers:n.users,height:"700","item-height":"70"},{default:r(({item:x})=>[t(g,{user:x,onOnStop:u.updateUser,onOnDelete:u.deleteUser},null,8,["user","onOnStop","onOnDelete"])]),_:2},1032,["items"])]),_:2},1024),t(f,{isLoading:n.loading,msg:n.msg,error:n.error},null,8,["isLoading","msg","error"])]),_:2},1032,["value"]))),128))]),_:1},8,["modelValue"])],64)}const ne=L(Q,[["render",X]]);export{ne as default};
