"use strict";(self["webpackChunktaiwan_tour"]=self["webpackChunktaiwan_tour"]||[]).push([[61],{179:function(e,i,t){var o=t(6163);i["Z"]={getActivity({area:e,select:i,filter:t,orderby:s,top:n,skip:a}){return o.l.get(`/Activity/${e}?${i}${t}${s}${n}${a}%24format=JSON`)},getAllActivity({filter:e,top:i,skip:t}){return o.l.get(`/Activity?${e}${i}${t}%24format=JSON`)}}},2061:function(e,i,t){t.r(i),t.d(i,{default:function(){return g}});var o=t(6252),s=t(9963);const n={class:"container"},a={key:0},r={key:0},c={key:1},l=(0,o._)("h2",null,"更多活動 :",-1);function u(e,i,t,u,p,d){const v=(0,o.up)("InfoSection"),m=(0,o.up)("MoreSection");return(0,o.wg)(),(0,o.iD)("div",n,[(0,o.Wm)(s.uT,{name:"info"},{default:(0,o.w5)((()=>[u.isLoading?((0,o.wg)(),(0,o.iD)("div",a)):((0,o.wg)(),(0,o.j4)(v,{key:1,initial_info:u.activity},null,8,["initial_info"]))])),_:1}),(0,o.Wm)(s.uT,{name:"more-info"},{default:(0,o.w5)((()=>[u.isMoreLoading?((0,o.wg)(),(0,o.iD)("div",r)):((0,o.wg)(),(0,o.iD)("div",c,[(0,o.Wm)(m,{more_spot:u.moreActivity},{moretitle:(0,o.w5)((()=>[l])),_:1},8,["more_spot"])]))])),_:1})])}var p=t(9829),d=t(6394),v=t(179),m=t(2262),y=t(2201),$={components:{InfoSection:p.Z,MoreSection:d.Z},setup(){const e=(0,m.iH)(1),i=(0,m.iH)(0),t=(0,m.iH)({}),s=(0,m.iH)([]),n=(0,m.iH)(!1),a=(0,m.iH)(!1),r=(0,y.yj)(),c=(0,m.iH)(r.params.id),l=async()=>{n.value=!0;const{data:o,statusText:s}=await v.Z.getAllActivity({filter:`${encodeURIComponent("$")}filter=${encodeURIComponent(`contains(ActivityID, '${c.value}')`)}&`,top:`${encodeURIComponent("$")}top=${e.value}&`,skip:`${encodeURIComponent("$")}skip=${i.value}&`});"OK"===s&&console.log("串接成功!!!"),t.value={id:o[0].ActivityID,address:o[0].Address?o[0].Address:"",class1:o[0].Class1?o[0].Class1:"",class2:o[0].Class2?o[0].Class2:"",class3:o[0].Class3?o[0].Class3:"",description:o[0].Description,openTime:o[0].Cycle,phone:o[0].Phone,picture:o[0].Picture?o[0].Picture:{},position:o[0].Position,name:o[0].ActivityName,location:o[0].Location?o[0].Location:"",organizer:o[0].Organizer?o[0].Organizer:"",start:o[0].StartTime?o[0].StartTime:"",end:o[0].EndTime?o[0].EndTime:"",website:o[0].WebsiteUrl?o[0].WebsiteUrl:""},n.value=!1},u=async()=>{a.value=!0;const{data:e,statusText:t}=await v.Z.getAllActivity({filter:"",top:`${encodeURIComponent("$")}top=10&`,skip:`${encodeURIComponent("$")}skip=${i.value}&`});"OK"===t&&console.log("串接成功!!!"),s.value=e.map((e=>({id:e.ActivityID,address:e.Address?e.Address:"",class1:e.Class1?e.Class1:"",class2:e.Class2?e.Class2:"",class3:e.Class3?e.Class3:"",description:e.Description,openTime:e.OpenTime,phone:e.Phone,picture:e.Picture?e.Picture:{},position:e.Position,name:e.ActivityName}))),s.value=s.value.filter((e=>e.id!==c.value)),a.value=!1};return(0,o.wF)(l),(0,o.wF)(u),{top:e,skip:i,activity:t,isLoading:n,moreActivity:s,isMoreLoading:a}}},f=t(3744);const C=(0,f.Z)($,[["render",u]]);var g=C}}]);
//# sourceMappingURL=61.d5d17e2b.js.map