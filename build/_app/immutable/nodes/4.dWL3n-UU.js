import{c as A,a as p,t as b}from"../chunks/0jAoUWee.js";import"../chunks/BeYzX27F.js";import{p as G,s as u,q as I,t as M,o as U,v as j,w as T,g as r,x as l,y as t,z as y,A as d}from"../chunks/l0YyKlY9.js";import{s as C}from"../chunks/B1NwtjCx.js";import{p as B,i as E,s as H,a as $}from"../chunks/DYxqfdHp.js";import{f as J,s as K,a as L,S as P,e as Q,i as R}from"../chunks/B3sBh0BJ.js";import{i as V}from"../chunks/CQbDCWo8.js";import{w as W}from"../chunks/BDI4V7ai.js";import{C as X}from"../chunks/DxCLeJBx.js";var Y=b('<p class="error"> </p>'),Z=b('<div class="set-details svelte-9p1x76"><div class="head svelte-9p1x76"><a href="./sets/"><img src="/images/logo.png" alt="Digimon Card Game"></a></div> <div class="header svelte-9p1x76"><h1>Favorites</h1></div> <!> <h2> </h2> <div class="card-grid svelte-9p1x76"></div></div>');function da(w,m){var g;G(m,!1);const[v,S]=H(),f=()=>$(L,"$searchTerm",v),n=()=>$(K,"$searchType",v),h=T();let o=((g=B(m,"data",8)())==null?void 0:g.cards)||[],i=T(null);o.length<1&&u(i,"404 NOT FOUND");const F=W(new Map);I(()=>(f(),n()),()=>{u(h,J(o,f(),n()))}),M(),V();var _=A(),D=U(_);{var N=e=>{var a=Y(),s=l(a,!0);t(a),y(()=>C(s,r(i))),p(e,a)},O=e=>{var a=Z(),s=d(l(a),4);P(s,{searchTypes:["name","card_no"],placeholder:"Search cards..."});var c=d(s,2),k=l(c);t(c);var x=d(c,2);Q(x,5,()=>r(h),R,(q,z)=>{X(q,{get card(){return r(z)},activeStates:F})}),t(x),t(a),y(()=>C(k,`Favorite Cards (${o.length??""})`)),p(e,a)};E(D,e=>{r(i)?e(N):e(O,!1)})}p(w,_),j(),S()}export{da as component};
