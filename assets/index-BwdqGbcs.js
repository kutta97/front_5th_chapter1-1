var g=Object.defineProperty;var v=(t,e,r)=>e in t?g(t,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[e]=r;var d=(t,e,r)=>v(t,typeof e!="symbol"?e+"":e,r);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}})();const w=()=>{const t=new Set;return{subscribe:s=>{t.add(s)},unsubscribe:s=>{t.delete(s)},notify:s=>{t.forEach(o=>o(s))}}},y=t=>{let e=t;const r=w();return{...r,setState:o=>{e={...o},r.notify(e)},getState:()=>e}},i=(()=>{const t=y({user:JSON.parse(localStorage.getItem("user"))});return{...t,isLoggedIn:()=>{const{user:r}=t.getState();return!!r}}})(),x=function(){function t({component:e}){document.getElementById("root").innerHTML=e}return{render:t}}();class p{constructor(e=[]){d(this,"routes",{});d(this,"middlewares",[]);e.forEach(({path:r,component:n,meta:s})=>{this.routes[r]={component:n,meta:s}})}use(e){return this.middlewares.push(e),this}render(e){const r=(this.routes[e]??this.routes["/*"]).component();return x.render({component:r}),r}push(){}replace(){}navigate({to:e,replace:r=!1}){var s;const n={path:e,meta:(s=this.routes[e])==null?void 0:s.meta,redirect:null};for(const o of this.middlewares)if(o(n)===!1&&n.redirect)return this.replace(n.redirect),this.render(n.redirect);return r?this.replace(n.redirect):this.push(e),this.render(e)}}const c="front_5th_chapter1-1",m=t=>{if(t.includes(c))return t;const e=t.replace(/^\//,"");return`/${c}/${e}`},f=t=>t.includes(c)?t.replace(/^\//,"").substring(c.length):t;class S extends p{init(){window.addEventListener("popstate",()=>{this.navigate({to:f(window.location.pathname)})}),this.navigate({to:f(window.location.pathname)})}push(e){window.history.pushState({},"",m(e))}replace(e){window.history.replaceState({},"",m(e))}}class $ extends p{init(){window.addEventListener("hashchange",()=>{this.navigate({to:window.location.hash.slice(1)??"/"})});const e=window.location.hash.slice(1)??"/";this.navigate({to:e})}push(e){const r=window.location.href.replace(/(#.*)?$/,`#${e}`);window.location.replace(r)}replace(e){window.location.hash=`#${e}`}}const L=t=>function(e){const{meta:r}=e;return(e==null?void 0:e.path)!=="login"&&(r!=null&&r.requiresAuth)&&!t.isLoggedIn()?(e.redirect="/login",!1):(e==null?void 0:e.path)!=="/"&&(r!=null&&r.guestOnly)&&t.isLoggedIn()?(e.redirect="/",!1):!0},O=[{href:"/",label:"홈",id:"home"},{href:"/profile",label:"프로필",id:"profile"},{href:"/login",label:"로그인",id:"login"},{href:"#",label:"로그아웃",id:"logout"}],P=({id:t,isLoggedIn:e})=>t==="home"?!0:t==="profile"?e:t==="login"?!e:t==="logout"?e:!1,E=({isLoggedIn:t,currentPathname:e})=>`
  <nav class="bg-white shadow-md p-2 sticky top-14">
    <ul class="flex justify-around">
      ${O.filter(({id:r})=>P({id:r,isLoggedIn:t})).map(({href:r,label:n,id:s})=>`
            <li>  
              <a
                id="${s}"
                href="${r}"
                class="${e.endsWith(r)?"text-blue-600 font-bold":"text-gray-600"}">
                ${n}
              </a>
            </li>
          `).join("")}
    </ul>
  </nav>
`,b=()=>`
  <header class="bg-blue-600 text-white p-4 sticky top-0">
    <h1 class="text-2xl font-bold">항해플러스</h1>
  </header>
  ${E({isLoggedIn:i.isLoggedIn(),currentPathname:location.pathname})}
`,h=()=>`
  <footer class="bg-gray-200 p-4 text-center">
    <p>&copy; 2024 항해플러스. All rights reserved.</p>
  </footer>
`,I=[{name:"홍길동",createdAt:"5분 전",contents:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!"},{name:"김철수",createdAt:"15분 전",contents:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!"},{name:"이영희",createdAt:"30분 전",contents:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?"},{name:"박민수",createdAt:"1시간 전",contents:"주말에 등산 가실 분 계신가요? 함께 가요!"},{name:"정수연",createdAt:"2시간 전",contents:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?"}],A=()=>`
  <div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
    ${b()}
      <main class="p-4">
        <div class="mb-4 bg-white rounded-lg shadow p-4">
          <textarea class="w-full p-2 border rounded" placeholder="무슨 생각을 하고 계신가요?"></textarea>
          <button class="mt-2 bg-blue-600 text-white px-4 py-2 rounded">게시</button>
        </div>

        <div class="space-y-4">
          ${I.map(({name:t,createdAt:e,contents:r})=>`
              <div class="bg-white rounded-lg shadow p-4">
                <div class="flex items-center mb-2">
                  <img src="https://placehold.co/40" alt="프로필" class="rounded-full mr-2">
                  <div>
                    <p class="font-bold">${t}</p>
                    <p class="text-sm text-gray-500">${e}</p>
                  </div>
                </div>
                <p>${r}</p>
                <div class="mt-2 flex justify-between text-gray-500">
                  <button>좋아요</button>
                  <button>댓글</button>
                  <button>공유</button>
                </div>
              </div>
            `).join("")}
        </div>
      </main>
      ${h()}
    </div>
  </div>
`;document.body.addEventListener("click",t=>{if(t.target.id==="logout"||t.target.closest("#logout")){t.preventDefault(),i.setState({user:null}),localStorage.removeItem("user"),u().navigate({to:"/login"});return}const e=t.target.closest("a");if(e){t.preventDefault();const r=e.href.replace(location.origin,"");u().navigate({to:r})}});const R=()=>{const{user:t}=i.getState();return`
    <div id="root">
      <div class="bg-gray-100 min-h-screen flex justify-center">
        <div class="max-w-md w-full">
          ${b()}
          <main class="p-4">
            <div class="bg-white p-8 rounded-lg shadow-md">
              <h2 class="text-2xl font-bold text-center text-blue-600 mb-8">
                내 프로필
              </h2>
              <form id="profile-form">
                <div class="mb-4">
                  <label
                    for="username"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >사용자 이름</label
                  >
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value="${t.username}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-4">
                  <label
                    for="email"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >이메일</label
                  >
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value="${t.email}"
                    class="w-full p-2 border rounded"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="bio"
                    class="block text-gray-700 text-sm font-bold mb-2"
                    >자기소개</label
                  >
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    class="w-full p-2 border rounded"
                  >${t.bio}</textarea>
                </div>
                <button
                  type="submit"
                  class="w-full bg-blue-600 text-white p-2 rounded font-bold"
                >
                  프로필 업데이트
                </button>
              </form>
            </div>
          </main>
          ${h()}
        </div>
      </div>
    </div>
  `};document.body.addEventListener("submit",t=>{if(t.preventDefault(),t.target.closest("form")&&location.pathname.endsWith("/profile")){const e=t.target,r=e.querySelector("#username").value,n=e.querySelector("#email").value,s=e.querySelector("#bio").value,o={username:r,email:n,bio:s};i.setState({user:o}),localStorage.setItem("user",JSON.stringify(o)),u().navigate({to:"/profile"})}});const j=()=>`
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h1 class="text-2xl font-bold text-center text-blue-600 mb-8">항해플러스</h1>
      <form id="login-form">
        <div class="mb-4">
          <input id="username" name="username" type="text" placeholder="사용자 이름" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <input name="email" type="text" placeholder="이메일 또는 전화번호" class="w-full p-2 border rounded">
        </div>
        <div class="mb-6">
          <input name="password" type="password" placeholder="비밀번호" class="w-full p-2 border rounded">
        </div>
        <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded font-bold">로그인</button>
      </form>
      <div class="mt-4 text-center">
        <a href="#" class="text-blue-600 text-sm">비밀번호를 잊으셨나요?</a>
      </div>
      <hr class="my-6">
      <div class="text-center">
        <button class="bg-green-500 text-white px-4 py-2 rounded font-bold">새 계정 만들기</button>
      </div>
    </div>
  </main>
`;document.body.addEventListener("submit",t=>{if(t.preventDefault(),t.target.closest("form")&&location.pathname.endsWith("/login")){const e=t.target,r=e.querySelector("input[name='username']").value,n=e.querySelector("input[name='email']").value;if(!r)return;const s={username:r,email:n,bio:""};i.setState({user:s}),localStorage.setItem("user",JSON.stringify(s)),u().navigate({to:"/"})}});const q=()=>`
  <main class="bg-gray-100 flex items-center justify-center min-h-screen">
    <div class="bg-white p-8 rounded-lg shadow-md w-full text-center" style="max-width: 480px">
      <h1 class="text-2xl font-bold text-blue-600 mb-4">항해플러스</h1>
      <p class="text-4xl font-bold text-gray-800 mb-4">404</p>
      <p class="text-xl text-gray-600 mb-8">페이지를 찾을 수 없습니다</p>
      <p class="text-gray-600 mb-8">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
      </p>
      <a href="/" class="bg-blue-600 text-white px-4 py-2 rounded font-bold">
        홈으로 돌아가기
      </a>
    </div>
  </main>
`;let a=null;const N=[{path:"/",component:A},{path:"/profile",component:R,meta:{requiresAuth:!0}},{path:"/login",component:j,meta:{guestOnly:!0}},{path:"/*",component:q}],M={history:S,hash:$},B=({type:t="history"})=>a||(a=new M[t](N),a.use(L(i)).init(),a),u=()=>{if(!a)throw new Error("Router is not initialized");return a};B({type:"history"});
