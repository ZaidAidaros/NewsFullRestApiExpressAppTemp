import{E as n,G as s}from"./index-d76a5229.js";const o="/auth/signup",e="/auth/login",a="/auth/foregetpassword",i=async function(r){try{return await n.post(o,r)}catch(t){return s(t)}},u=async function(r){try{return await n.post(e,r)}catch(t){return s(t)}},p=async function(r){try{return await n.post(a,{emailPhone:r})}catch(t){return s(t)}},g=async function(r){try{return await n.post(a,r)}catch(t){return s(t)}};export{p as a,i as b,g as r,u as s};
