"use strict";(self["webpackChunktaiwan_tour"]=self["webpackChunktaiwan_tour"]||[]).push([[505],{5062:function(e,o,t){var i=t(6163);o["Z"]={getHotel({area:e,select:o,filter:t,top:n,skip:s}){return i.l.get(`/Hotel/${e}?${o}${t}${n}${s}%24format=JSON`)},getAllHotel({filter:e,top:o,skip:t}){return i.l.get(`/Hotel?${e}${o}${t}%24format=JSON`)}}},7505:function(e,o,t){t.r(o),t.d(o,{default:function(){return w}});var i=t(6252),n=t(9963);const s={class:"container"},a={key:0},l={key:0},r={key:1},c=(0,i._)("h2",null,"更多旅館",-1);function p(e,o,t,p,u,d){const m=(0,i.up)("InfoSection"),f=(0,i.up)("MoreSection");return(0,i.wg)(),(0,i.iD)("div",s,[(0,i.Wm)(n.uT,{name:"info"},{default:(0,i.w5)((()=>[p.isLoading?((0,i.wg)(),(0,i.iD)("div",a)):((0,i.wg)(),(0,i.j4)(m,{key:1,initial_info:p.hostel},null,8,["initial_info"]))])),_:1}),(0,i.Wm)(n.uT,{name:"more-info"},{default:(0,i.w5)((()=>[p.isMoreLoading?((0,i.wg)(),(0,i.iD)("div",l)):((0,i.wg)(),(0,i.iD)("div",r,[(0,i.Wm)(f,{more_spot:p.moreHostel},{moretitle:(0,i.w5)((()=>[c])),_:1},8,["more_spot"])]))])),_:1})])}var u=t(9829),d=t(6394),m=t(5062),f=t(2262),v=t(2201),$={components:{InfoSection:u.Z,MoreSection:d.Z},setup(){const e=(0,f.iH)(1),o=(0,f.iH)(0),t=(0,f.iH)({}),n=(0,f.iH)([]),s=(0,f.iH)(!1),a=(0,f.iH)(!1),l=(0,v.yj)(),r=(0,f.iH)(l.params.id),c=async()=>{s.value=!0;const{data:i,statusText:n}=await m.Z.getAllHotel({filter:`${encodeURIComponent("$")}filter=${encodeURIComponent(`contains(HotelID, '${r.value}')`)}&`,top:`${encodeURIComponent("$")}top=${e.value}&`,skip:`${encodeURIComponent("$")}skip=${o.value}&`});"OK"===n&&console.log("串接成功!!!"),t.value={id:i[0].HotelID,address:i[0].Address?i[0].Address:"",class1:i[0].Class?i[0].Class:"",class2:"",class3:"",description:i[0].Description,openTime:"",phone:i[0].Phone,picture:i[0].Picture?i[0].Picture:{},position:i[0].Position,name:i[0].HotelName,spec:i[0].Spec?i[0].Spec:"",service:i[0].ServiceInfo?i[0].ServiceInfo:"",website:i[0].WebsiteUrl?i[0].WebsiteUrl:""},s.value=!1},p=async()=>{a.value=!0;const{data:e,statusText:t}=await m.Z.getAllHotel({filter:"",top:`${encodeURIComponent("$")}top=10&`,skip:`${encodeURIComponent("$")}skip=${o.value}&`});"OK"===t&&console.log("串接成功!!!"),n.value=e.map((e=>({id:e.HotelID,address:e.Address?e.Address:"",class1:e.Class?e.Class:"",class2:"",class3:"",description:e.Description,openTime:e.OpenTime,phone:e.Phone,picture:e.Picture?e.Picture:{},position:e.Position,name:e.HotelName}))),n.value=n.value.filter((e=>e.id!==r.value)),a.value=!1};return(0,i.wF)(c),(0,i.wF)(p),{top:e,skip:o,hostel:t,isLoading:s,moreHostel:n,isMoreLoading:a}}},H=t(3744);const g=(0,H.Z)($,[["render",p]]);var w=g}}]);
//# sourceMappingURL=505.139f706c.js.map