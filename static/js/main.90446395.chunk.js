(this["webpackJsonpfinal-project-starter"]=this["webpackJsonpfinal-project-starter"]||[]).push([[0],{18:function(e){e.exports=JSON.parse('[{"year":"First Year","semester":"Fall","courses":[{"number":"CISC275","name":"Introduction to Software Engineering","credits":3},{"number":"CISC303","name":"DESCRIPTION","credits":3},{"number":"CISC361","name":"DESCRIPTION","credits":3},{"number":"CISC372","name":"DESCRIPTION","credits":3},{"number":"GEOL107","name":"DESCRIPTION","credits":4}]},{"year":"First Year","semester":"Spring","courses":[{"number":"AFRA110","name":"DESCRIPTION","credits":3},{"number":"CISC320","name":"DESCRIPTION","credits":3},{"number":"CISC361","name":"DESCRIPTION","credits":3},{"number":"GEOL110","name":"DESCRIPTION","credits":4},{"number":"MATH205","name":"DESCRIPTION","credits":4}]},{"year":"Second Year","semester":"Fall","courses":[{"number":"CISC275","name":"Introduction to Software Engineering","credits":3},{"number":"CISC303","name":"DESCRIPTION","credits":3},{"number":"CISC361","name":"DESCRIPTION","credits":3},{"number":"CISC372","name":"DESCRIPTION","credits":3},{"number":"GEOL107","name":"DESCRIPTION","credits":4}]}]')},28:function(e,t,s){},29:function(e,t,s){},33:function(e,t,s){"use strict";s.r(t);var n=s(1),c=s.n(n),r=s(7),a=s.n(r),i=(s(28),s(5)),l=(s(29),s(18)),d=s(37),j=s(0);function o(e){var t=e.visible,s=e.setVisible;return Object(j.jsxs)(d.a,{show:t,onHide:function(){return s(!1)},children:[Object(j.jsx)(d.a.Header,{closeButton:!0,children:Object(j.jsx)(d.a.Title,{children:"Welcome!"})}),Object(j.jsx)(d.a.Body,{children:Object(j.jsx)("p",{children:"This web app is designed to help you plan out your course schedule in order to complete your CIS Schedule."})})]})}var u=s(36);function b(e){var t=e.index,s=e.sem_index,n=e.plan,r=e.setPlan,i=e.visible,l=e.setVisible;var o=function(){return l(!1)};function u(){var e=document.getElementById("numberUpdate"),c=document.getElementById("nameUpdate"),a=document.getElementById("creditsUpdate");!function(e){var c=n[s];n[s].courses[t]=e;var a=n;a[s]=c,r(a)}({number:e.value,name:c.value,credits:Number(a.value)}),o()}return Object(j.jsxs)(d.a,{show:i,onHide:o,children:[Object(j.jsx)(d.a.Header,{closeButton:!0,children:Object(j.jsx)(d.a.Title,{children:"Edit Course Info"})}),Object(j.jsxs)(d.a.Body,{children:[Object(j.jsxs)("div",{className:"dataEditorLabel",children:[Object(j.jsx)("strong",{children:"Edit Course Number:"}),Object(j.jsx)("input",{className:"dataInput",id:"numberUpdate",type:"text",defaultValue:n[s].courses[t].number})]}),Object(j.jsxs)("div",{className:"dataEditorLabel",children:[Object(j.jsx)("strong",{children:"Edit Course Name:"}),Object(j.jsx)("input",{className:"dataInput",id:"nameUpdate",defaultValue:n[s].courses[t].name})]}),Object(j.jsxs)("div",{className:"dataEditorLabel",children:[Object(j.jsx)("strong",{children:"Edit Credits:"}),Object(j.jsx)("div",{children:Object(j.jsx)("input",{className:"dataInputCred",id:"creditsUpdate",type:"number",defaultValue:n[s].courses[t].credits})})]}),Object(j.jsx)("button",{className:"saveChanges",onClick:function(){return u()},children:"Save Changes"}),Object(j.jsx)("button",{className:"deleteCourse",onClick:function(){return function(){var e=n[s].courses;e.splice(t,1);var i=n[s];i.courses=e;var l=n;l[s]=i,r(l),o(),a.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(I,{})}),document.getElementById("root"))}()},children:"Delete Course"})]})]})}function m(e){var t=e.key,s=e.index,c=e.sem_index,r=e.plan,a=e.setPlan,l=Object(n.useState)({display:"none"}),d=Object(i.a)(l,2),o=d[0],u=d[1],m=Object(n.useState)(!1),O=Object(i.a)(m,2),x=O[0],h=O[1];return Object(j.jsxs)("tr",{onMouseEnter:function(){u({display:"block"})},onMouseLeave:function(){u({display:"none"})},children:[Object(j.jsx)("td",{className:"courseNum",children:r[c].courses[s].number}),Object(j.jsx)("td",{className:"courseName",children:r[c].courses[s].name}),Object(j.jsxs)("td",{className:"split",children:[Object(j.jsx)("div",{className:"credits",children:r[c].courses[s].credits}),Object(j.jsxs)("button",{className:"dotButton",style:o,onClick:function(){return h(!0)},children:[Object(j.jsx)("div",{className:"dot"}),Object(j.jsx)("div",{className:"dot"}),Object(j.jsx)("div",{className:"dot"})]})]}),Object(j.jsx)(b,{index:s,sem_index:c,plan:r,setPlan:a,visible:x,setVisible:h})]},t)}var O=s(14),x=s(2),h=s(35),p=s(15);function C(e){var t=e.sem_index,s=e.plan,n=e.setPlan,c=e.semMenuVis,r=e.setSemMenuVis;console.log(t),console.log(s),console.log(n);return Object(j.jsxs)(d.a,{show:c,onHide:function(){return r(!1)},children:[Object(j.jsx)(d.a.Header,{closeButton:!0,children:Object(j.jsx)(d.a.Title,{children:"Add Course to Semester"})}),Object(j.jsxs)(d.a.Body,{children:[Object(j.jsx)(h.a,{children:Object(j.jsx)(p.a,{variant:"success",onClick:function(){return n(s.map((function(e){return e===s[t]?Object(x.a)(Object(x.a)({},s[t]),{},{courses:[].concat(Object(O.a)(s[t].courses),[{number:"",name:"",credits:0}])}):Object(x.a)({},e)}))),void r(!1)},children:"Add a course"})}),Object(j.jsx)(h.a,{children:Object(j.jsx)(p.a,{variant:"danger",onClick:function(){return n(s.map((function(e){return e===s[t]?Object(x.a)(Object(x.a)({},e),{},{courses:[]}):Object(x.a)({},e)}))),void r(!1)},children:"Delete all courses from semester"})}),Object(j.jsx)(h.a,{children:Object(j.jsx)(p.a,{variant:"danger",children:"Delete semester"})})]})]})}function N(e){var t=e.sem_index,s=e.plan,c=e.setPlan,r=Object(n.useState)({display:"none"}),a=Object(i.a)(r,2),l=a[0],d=a[1],o=Object(n.useState)(!1),b=Object(i.a)(o,2),O=b[0],x=b[1];return Object(j.jsxs)("div",{className:"SemesterTable",children:[Object(j.jsxs)("table",{onMouseEnter:function(){d({display:"block"})},onMouseLeave:function(){d({display:"none"})},className:"SemesterHeader",children:[Object(j.jsx)("td",{className:"yearLabel",children:Object(j.jsx)("strong",{children:s[t].year})}),Object(j.jsxs)("td",{className:"split",children:[Object(j.jsx)("strong",{className:"semLabel",children:s[t].semester}),Object(j.jsxs)("button",{className:"dotButton",style:l,onClick:function(){return x(!0)},children:[Object(j.jsx)("div",{className:"dot"}),Object(j.jsx)("div",{className:"dot"}),Object(j.jsx)("div",{className:"dot"})]})]})]}),Object(j.jsx)(C,{sem_index:t,plan:s,setPlan:c,semMenuVis:O,setSemMenuVis:x}),Object(j.jsxs)(u.a,{striped:!0,bordered:!0,children:[Object(j.jsx)("thead",{children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("th",{children:"Course Number"}),Object(j.jsx)("th",{children:"Course Name"}),Object(j.jsx)("th",{children:"Credits"})]})}),Object(j.jsx)("tbody",{children:s[t].courses.map((function(e,n){return Object(j.jsx)(m,{index:n,sem_index:t,plan:s,setPlan:c},n)}))})]})]})}function v(e){var t=e.plan,s=e.setPlan;return Object(j.jsx)("div",{children:t.map((function(e,n){return n%2===0&&n!=t.length-1?Object(j.jsx)("div",{className:"YearTable",children:Object(j.jsx)("table",{className:"YearTable",children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{className:"Fall",children:Object(j.jsx)(N,{sem_index:n,plan:t,setPlan:s})}),Object(j.jsx)("td",{className:"Spring",children:Object(j.jsx)(N,{sem_index:n+1,plan:t,setPlan:s})})]})})},n):n%2===0&&n===t.length-1?Object(j.jsx)("div",{className:"YearTable",children:Object(j.jsx)("table",{className:"YearTable",children:Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{className:"Fall",children:Object(j.jsx)(N,{sem_index:n,plan:t,setPlan:s})}),Object(j.jsx)("td",{className:"Spring"})]})})},n):void 0}))})}var I=function(){var e=Object(n.useState)(l),t=Object(i.a)(e,2),s=t[0],c=t[1],r=Object(n.useState)(!0),a=Object(i.a)(r,2),d=a[0],u=a[1];return console.log(s[0].courses),Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)("p",{children:"UD CIS Scheduler"}),Object(j.jsx)(v,{plan:s,setPlan:c}),Object(j.jsx)(o,{visible:d,setVisible:u})]})},S=function(e){e&&e instanceof Function&&s.e(3).then(s.bind(null,38)).then((function(t){var s=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,a=t.getTTFB;s(e),n(e),c(e),r(e),a(e)}))};a.a.render(Object(j.jsx)(c.a.StrictMode,{children:Object(j.jsx)(I,{})}),document.getElementById("root")),S()}},[[33,1,2]]]);
//# sourceMappingURL=main.90446395.chunk.js.map