import{E as e,G as a}from"./index-d76a5229.js";const i="/writter/profile",o="/writter/w-articles",c="/writter/article";async function u(){try{return await e.get(i)}catch(r){return a(r)}}async function l(r){try{return await e.get(r)}catch(t){return a(t)}}async function s(r,t){try{return await e.get(o,{params:{published:r,page:t}})}catch(n){return a(n)}}async function w(r,t){return t?await f(t,r):await y(r)}async function y(r){try{return await e.post(c,r,{headers:{"Content-Type":"multipart/form-data"}})}catch(t){return a(t)}}async function f(r,t){try{return await e.put(c+"/"+r,t)}catch(n){return a(n)}}async function p(r){try{return await e.delete(c+"/"+r)}catch(t){return a(t)}}const h={getWritterProfile:u,loadWritterArticles:s,loadArticleImage:l,submitArticleForm:w,deleteArticle:p};export{h as w};
