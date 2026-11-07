$('#cf').onsubmit=e=>{e.preventDefault();const f=e.target,m=$('#cm');let ok=true;
[['n',v=>v.trim().length>1],['e',v=>/^\S+@\S+\.\S+$/.test(v)],['m',v=>v.trim().length>9]].forEach(([n,t])=>{const el=f.elements[n],good=t(el.value);el.classList.toggle('err',!good);ok=ok&&good});
m.textContent=ok?'Thanks! This is a demo form, so your message was not sent.':'Fix the highlighted fields: name, a valid email, and a message of 10+ characters.';if(ok)f.reset()};
