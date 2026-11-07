const g=$('#grid');
if(g){let st={cat:'All',pr:'',sz:null,co:null,stock:false,sort:'f',q:new URLSearchParams(location.search).get('q')||''};
const draw=()=>{let l=PRODUCTS.filter(p=>(st.cat=='All'||p.cat==st.cat)&&(!st.pr||(p.price>=+st.pr.split('-')[0]&&p.price<+st.pr.split('-')[1]))&&(!st.sz||p.sizes.includes(st.sz))&&(!st.co||p.color==st.co)&&(!st.stock||p.stock)&&p.name.toLowerCase().includes(st.q.toLowerCase()));
const s={p:(a,b)=>b.pop-a.pop,n:(a,b)=>b.id-a.id,l:(a,b)=>a.price-b.price,h:(a,b)=>b.price-a.price,f:(a,b)=>a.id-b.id}[st.sort];l.sort(s);g.innerHTML=l.map(card).join('');$('#none').hidden=l.length>0};
$$('#tabs button').forEach(b=>b.onclick=()=>{$$('#tabs button').forEach(x=>x.classList.remove('on'));b.classList.add('on');st.cat=b.textContent;$$('[name=cat]').forEach(c=>c.checked=false);draw()});
$$('[name=cat]').forEach(c=>c.onchange=()=>{const v=$$('[name=cat]:checked');st.cat=v.length?v[v.length-1].value:'All';$$('[name=cat]').forEach(x=>x.checked=x==v[v.length-1]);$$('#tabs button').forEach(x=>x.classList.toggle('on',x.textContent==st.cat));draw()});
$$('[name=pr]').forEach(r=>r.onchange=()=>{st.pr=r.value;draw()});
const tog=(sel,k,at)=>$$(sel+' button').forEach(b=>b.onclick=()=>{const v=at?b.dataset[at]:b.textContent;st[k]=st[k]==v?null:v;$$(sel+' button').forEach(x=>x.classList.toggle('on',x==b&&st[k]));draw()});
tog('#fs','sz');tog('#fc','co','c');$('#stock').onchange=e=>{st.stock=e.target.checked;draw()};$('#sort').onchange=e=>{st.sort=e.target.value;draw()};
$('#sbar input').value=st.q;$('#sbar input').oninput=e=>{st.q=e.target.value;draw()};$('#sbar').onsubmit=e=>e.preventDefault();draw()}
