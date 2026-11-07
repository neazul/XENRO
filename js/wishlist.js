function onWish(){setTimeout(drawW,250)}
function drawW(){const l=PRODUCTS.filter(p=>wish.includes(p.id));$('#wgrid').innerHTML=l.map(card).join('');$('#empty').hidden=l.length>0}drawW();
