const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ls=(k,d)=>{try{return JSON.parse(localStorage[k])}catch{return d}};
let wish=ls('xw',[]),cart=ls('xc',[]);
function counts(){$('#wc').textContent=wish.length;$('#cc').textContent=cart.reduce((a,c)=>a+c.q,0)}
function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');setTimeout(()=>e.classList.remove('on'),1800)}
function toggleWish(id){wish=wish.includes(id)?wish.filter(x=>x!==id):[...wish,id];localStorage.xw=JSON.stringify(wish);counts();return wish.includes(id)}
function addCart(id,q=1,size='M',color=''){const l=cart.find(c=>c.id==id&&c.size==size);l?l.q+=q:cart.push({id,q,size,color});localStorage.xc=JSON.stringify(cart);counts();toast('Added to cart')}
const stars=r=>'★'.repeat(Math.round(r))+'☆'.repeat(5-Math.round(r));
function card(p){return `<div class="card"><button class="heart ${wish.includes(p.id)?'on':''}" data-w="${p.id}" aria-label="Wishlist">${wish.includes(p.id)?'♥':'♡'}</button><a href="product.html?id=${p.id}"><div class="im"><img src="assets/products/${p.img}.jpg" alt="${p.name}"></div><h3>${p.name}</h3></a><div class="row"><b>$${p.price.toFixed(2)}</b><span class="stars">${stars(p.rating)} ${p.rating}</span></div><button class="btn add" data-a="${p.id}">Add to Cart</button></div>`}
document.addEventListener('click',e=>{const h=e.target.closest('[data-w]');if(h){const on=toggleWish(+h.dataset.w);h.classList.toggle('on',on);h.textContent=on?'♥':'♡';if(window.onWish)onWish()}const a=e.target.closest('[data-a]');if(a)addCart(+a.dataset.a)});
$('#bg').onclick=()=>$('#menu').classList.toggle('open');$('#sb').onclick=()=>{$('#sbar').classList.toggle('open');$('#sbar input').focus()};
$$('[data-nl]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const m=f.parentElement.querySelector('.msg'),i=f.querySelector('input');m.textContent=/^\S+@\S+\.\S+$/.test(i.value)?'Thanks! (Demo: no email was sent.)':'Enter a valid email address.';});
const f=$('#feat');if(f)f.innerHTML=PRODUCTS.slice(0,4).map(card).join('');
const io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&x.target.classList.add('in')),{threshold:.1});$$('main section:not(.phero):not(.hero)').forEach(s=>{s.classList.add('sc');io.observe(s)});
counts();
