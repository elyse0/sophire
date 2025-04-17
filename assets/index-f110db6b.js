import{E as o,O as l}from"./result-0017155e.js";function m(s){let n=s.replace(/\r+/g,"");n=n.replace(/^\s+|\s+$/g,"");const t=n.split(`

`);let r="";if(t.length>0){r+=`WEBVTT

`;for(let e=0;e<t.length;e=e+1)r+=a(t[e])}return r}function a(s){let n="";const t=s.split(/\n/);for(;t.length>3;){for(let e=3;e<t.length;e++)t[2]+=`
`+t[e];t.splice(3,t.length-3)}let r=0;if(!t[0].match(/\d+:\d+:\d+/)&&t[1].match(/\d+:\d+:\d+/)&&(n+=t[0].match(/\w+/)+`
`,r+=1),t[r].match(/\d+:\d+:\d+/)){const e=t[1].match(/(\d+):(\d+):(\d+)(?:,(\d+))?\s*--?>\s*(\d+):(\d+):(\d+)(?:,(\d+))?/);if(e)n+=e[1]+":"+e[2]+":"+e[3]+"."+e[4]+" --> "+e[5]+":"+e[6]+":"+e[7]+"."+e[8]+`
`,r+=1;else return""}else return"";return t[r]&&(n+=t[r]+`

`),n}const i=s=>{const n=s.match(/^(\d{2}):(\d{2}):(\d{2})\.(\d{3})$/);return n?(Number(n[1])*3600+Number(n[2])*60+Number(n[3]))*1e3+Number(n[4]):0},f=s=>{s.startsWith("WEBVTT")||(s=m(s));const n=s.split(`
`),t=[];let r;for(let e of n){const d=e.trim(),c=d.match(/^(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/);if(c){r={text:"",start:i(c[1]),end:i(c[2])};continue}r&&(d?r.text+=`${r.text} ${d}`.trim():(t.push(r),r=void 0))}return t.length?l(t):o({message:"Couldn't convert captions"})};export{f as s};
