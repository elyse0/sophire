import{g as h}from"./index-6431d40f.js";import{s as r}from"./index-f110db6b.js";import{g as C}from"./index-f2142197.js";import{A as z}from"./AppLayout-c6411a18.js";import{A as c}from"./AppSingleUpload-7db52d64.js";import{g as d,c as _}from"./files-4299d1e1.js";import{d as v,C as V,o as b,c as F,w,a,e as i,b as l,r as A}from"./index-789fd645.js";import"./result-0017155e.js";const J={class:"caption-vtt-to-s"},U={class:"upload-file"},x={class:"upload-file"},P=v({__name:"CaptionsVtt",setup(y){const e=V({en:null,hanzi:null}),u=n=>{e.hanzi=n},p=n=>{e.en=n},m=async()=>{if(!e.hanzi||!e.en){console.log("Files are missing");return}const n=await d(e.hanzi);if(!n){console.log("Could not read hanzi file contents");return}const o=r(n);if(o.err){console.log(o.val.message);return}const s=await d(e.en);if(!s){console.log("Could not read english file contents");return}const t=r(s);if(t.err){console.log(t.val.message);return}const g=C({languageId:"hanzi",captions:o.val}),f=h([{languageId:"en",captions:t.val},...g]);_(f,"subtitles.json")};return(n,o)=>{const s=A("o-button");return b(),F(z,null,{default:w(()=>[a("div",J,[i(" Subtitles To Json "),a("div",U,[i(" Hanzi subtitles file (vtt/srt) "),l(c,{modelValue:e.hanzi,"onUpdate:modelValue":[o[0]||(o[0]=t=>e.hanzi=t),u]},null,8,["modelValue"])]),a("div",x,[i(" English subtitles file (vtt/srt) "),l(c,{modelValue:e.en,"onUpdate:modelValue":[o[1]||(o[1]=t=>e.en=t),p]},null,8,["modelValue"])]),l(s,{onClick:m})])]),_:1})}}});export{P as default};