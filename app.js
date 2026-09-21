(()=>{"use strict";
const app=document.getElementById("app"),topbar=document.getElementById("topbar"),nav=document.getElementById("bottom-nav"),toast=document.getElementById("toast"),alerts={};
const S=()=>window.PorPertoStore,load=()=>S().load(),esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c])),photo=m=>m.photo||"";
let screen="home",selectedId=null,sosTimer=null;
const now=()=>new Date(),today=()=>S().localDateKey(now()),mins=()=>now().getHours()*60+now().getMinutes();
function msg(t){toast.textContent=t;toast.classList.add("show");clearTimeout(msg.timer);msg.timer=setTimeout(()=>toast.classList.remove("show"),3200)}
function elder(){return S().activeElder(load())}
function meds(){const s=load();return S().medicines(s,elder().id)}
function apts(){const s=load();return S().appointments(s,elder().id)}
function responsible(){return S().responsible(load(),elder().id)}
function contacts(){return S().contacts(load(),elder().id)}
function isTaken(m,t){return S().taken(m.id,t,now(),elder().id)==="taken"}
function active(m){return S().active(m,now())}
function doseList(){
  const n=mins(),out=[];
  meds().forEach(m=>{if(!active(m)||m.frequency?.type==="as_needed")return;S().scheduleFor(m).forEach(t=>{const d=S().mins(t),taken=isTaken(m,t);if(!taken)out.push({m,t,d,delta:d-n})})});
  return out.sort((a,b)=>{const ap=a.delta<0?Math.abs(a.delta):a.delta+10000,bp=b.delta<0?Math.abs(b.delta):b.delta+10000;return ap-bp})
}
function nextDose(){return doseList()[0]||null}
function fmtDate(date){return new Date(date+"T12:00:00").toLocaleDateString("pt-BR",{weekday:"long",day:"2-digit",month:"long"})}
function fmtDateShort(date){const d=new Date(date+"T12:00:00");return {day:String(d.getDate()).padStart(2,"0"),month:d.toLocaleDateString("pt-BR",{month:"short"}).replace(".","")}}
function fmtApt(a){return new Date(a.date+"T"+a.time).toLocaleDateString("pt-BR",{day:"2-digit",month:"long"})+" às "+a.time}
function initials(name){return String(name||"?").split(" ").filter(Boolean).slice(0,2).map(x=>x[0]).join("").toUpperCase()}
function status(){const z=S().status(now(),elder().id);return z}
function statusHtml(z){return z==="green"?'<span class="status-pill green">● Tudo certo</span>':z==="yellow"?'<span class="status-pill yellow">● Há uma pendência</span>':'<span class="status-pill red">● SOS acionado</span>'}
function shellTop(){
  const e=elder();
  topbar.innerHTML=`<a class="brand" href="#home" data-action="home"><span class="brand-mark">P</span><span class="brand-text">Por Perto</span></a><a class="top-action" href="#perfil" data-action="profile" aria-label="Abrir perfil">Familia</a>`;
  const items=[["home","⌂","Início"],["meds","○","Remédios"],["apts","□","Consultas"],["help","!","Ajuda"]];
  nav.innerHTML=items.map(x=>`<button class="nav-item ${screen===x[0]?"active":""}" data-action="${x[0]}"><span class="nav-icon">${x[1]}</span><span>${x[2]}</span></button>`).join("");
}
function renderHome(){
 const s=load(),e=elder(),d=nextDose(),a=apts().filter(x=>new Date(x.date+"T"+x.time)>=now()).sort((x,y)=>new Date(x.date+"T"+x.time)-new Date(y.date+"T"+y.time))[0],z=status(),todayD=S().day(S().ensure(s,now(),e.id),now(),e.id),all=[];
 meds().forEach(m=>{if(!active(m))return;S().scheduleFor(m).forEach(t=>all.push({m,t,taken:isTaken(m,t)}))});
 all.sort((a,b)=>S().mins(a.t)-S().mins(b.t));
 app.innerHTML=`<div class="screen">
  <section class="greeting"><p class="eyebrow">Bom ter você por perto</p><h1>Olá, ${esc(e.name)}.</h1><div class="status-line">${statusHtml(z)}<span class="subtle">${fmtDate(today())}</span></div></section>
  <section class="welcome"><strong>Seu dia, sem complicação.</strong><p>Aqui aparecem somente as coisas importantes para agora.</p></section>
  <section class="section"><div class="section-title"><h2>Agora</h2><a class="text-link" href="#meds" data-action="meds">Ver todos</a></div>
  ${d?`<article class="card next-card ${d.delta<0?"notice yellow":""}"><img class="med-icon" src="${photo(d.m)}" alt=""><div class="next-info"><span class="eyebrow">${d.delta<0?"REMÉDIO PENDENTE":"PRÓXIMO REMÉDIO"}</span><h3>${esc(d.m.name)}</h3><span class="big-dose">${esc(d.m.dose||"Conforme orientação")}</span><span class="big-time">${d.t}</span><span class="subtle">${d.delta<0?"Esse horário já passou. Confirme quando tomar.":"Hoje"}</span><button class="primary-btn btn-xl full" data-action="take" data-id="${d.m.id}" data-time="${d.t}">TOMEI</button></div></article>`:`<article class="card success-card"><span class="success-icon">✓</span><h3>Tudo certo por aqui</h3><p class="subtle">As doses de hoje já foram registradas.</p><a class="secondary-btn" href="#meds" data-action="meds">VER REMÉDIOS</a></article>`}
  </section>
  <section class="section"><div class="section-title"><h2>Hoje</h2></div><article class="card"><div class="timeline">${all.length?all.map(x=>`<div class="timeline-row ${x.taken?"taken":""}"><div class="timeline-time">${x.t}</div><div class="timeline-track"><span class="timeline-dot"></span></div><div class="timeline-content"><strong>${esc(x.m.name)}</strong><span>${x.taken?"Tomado":"Pendente"} · ${esc(x.m.dose||"")}</span></div></div>`).join(""):'<div class="empty">Nenhum horário de remédio para hoje.</div>'}</div></article></section>
  <section class="section"><div class="section-title"><h2>Próxima consulta</h2><a class="text-link" href="#apts" data-action="apts">Ver consultas</a></div>
  ${a?`<article class="card appointment-card"><div class="date-box"><strong>${fmtDateShort(a.date).day}</strong><span>${fmtDateShort(a.date).month}</span></div><div><p class="eyebrow">${esc(a.specialty)}</p><h3>${esc(a.doctor)}</h3><p class="subtle">${esc(a.location)} · ${a.time}</p><button class="secondary-btn" data-action="apt" data-id="${a.id}">VER DETALHES</button></div></article>`:'<article class="empty">Nenhuma consulta agendada no momento.</article>'}
  </section>
  <section class="sos-banner"><h3>Precisa de ajuda?</h3><p>Um toque avisa sua família e mostra os contatos para ligar.</p><button class="sos-button" data-action="help">PRECISO DE AJUDA</button></section>
  <section class="card family-link"><div><p class="eyebrow">Sua família</p><strong>${esc(responsible()?.name||"Responsável não cadastrado")}</strong><div class="subtle">${responsible()?.phone?esc(responsible().phone):"Peça para a família configurar."}</div></div><a class="secondary-btn" href="#perfil" data-action="profile">VER</a></section>
 </div>`;
}
function renderMeds(){
 const groups=[],regular=[],needed=[];
 meds().forEach(m=>m.frequency?.type==="as_needed"?needed.push(m):regular.push(m));
 regular.forEach(m=>S().scheduleFor(m).forEach(t=>groups.push({m,t,taken:isTaken(m,t)})));
 groups.sort((a,b)=>S().mins(a.t)-S().mins(b.t));
 app.innerHTML=`<div class="screen"><div class="screen-head"><div><p class="eyebrow">Remédio na Hora</p><h1>Seus remédios</h1><p>Confirme cada horário com o botão TOMEI.</p></div></div>
 <article class="card"><div class="timeline">${groups.length?groups.map(x=>`<div class="timeline-row ${x.taken?"taken":""}"><div class="timeline-time">${x.t}</div><div class="timeline-track"><span class="timeline-dot"></span></div><div class="timeline-content"><strong>${esc(x.m.name)}</strong><span>${esc(x.m.dose||"")} · ${x.taken?"Tomado":"Pendente"}</span><div class="actions" style="margin-top:8px"><button class="secondary-btn" data-action="med" data-id="${x.m.id}">VER</button>${!x.taken?'<button class="primary-btn" data-action="take" data-id="'+x.m.id+'" data-time="'+x.t+'">TOMEI</button>':""}</div></div></div>`).join(""):'<div class="empty">Nenhum remédio cadastrado.</div>'}</div></article>
 ${needed.length?`<section class="section"><div class="section-title"><h2>Quando necessário</h2></div><div class="grid grid-2">${needed.map(m=>`<article class="card"><p class="eyebrow">USO CONFORME ORIENTAÇÃO</p><h3>${esc(m.name)}</h3><p>${esc(m.dose||"")}</p><button class="secondary-btn" data-action="med" data-id="${m.id}">VER ORIENTAÇÕES</button></article>`).join("")}</div></section>`:""}</div>`;
}
function renderMed(id){
 const m=meds().find(x=>x.id===id);if(!m)return renderMeds();
 const schedules=S().scheduleFor(m),pending=schedules.filter(t=>!isTaken(m,t));
 app.innerHTML=`<div class="screen"><div class="back-row"><button class="back-btn" data-action="meds">← Voltar</button></div><article class="card detail-hero"><img src="${photo(m)}" alt=""><div><p class="eyebrow">${esc(m.format||"MEDICAMENTO")}</p><h1>${esc(m.name)}</h1><p class="big-dose">${esc(m.dose||"Conforme orientação")}</p></div><div class="instruction"><strong>Orientação</strong><p>${esc(m.notes||"Siga a orientação da sua família e do profissional de saúde.")}</p></div><div class="section"><div class="section-title"><h2>Horários de hoje</h2></div>${schedules.map(t=>`<div class="list-row"><div class="list-main"><strong>${t}</strong><span>${isTaken(m,t)?"Dose registrada":"Ainda não registrada"}</span></div>${isTaken(m,t)?'<span class="status-pill green">✓ Tomado</span>':'<button class="primary-btn" data-action="take" data-id="'+m.id+'" data-time="'+t+'">TOMEI</button>'}</div>`).join("")}</div></article></div>`;
}
function renderApts(){
 const list=apts().sort((a,b)=>new Date(a.date+"T"+a.time)-new Date(b.date+"T"+b.time));
 app.innerHTML=`<div class="screen"><div class="screen-head"><div><p class="eyebrow">Consulta Fácil</p><h1>Suas consultas</h1><p>Datas, médicos e locais em um só lugar.</p></div></div><div class="list">${list.length?list.map(a=>{const dt=fmtDateShort(a.date);return`<article class="card appointment-card"><div class="date-box"><strong>${dt.day}</strong><span>${dt.month}</span></div><div><p class="eyebrow">${esc(a.specialty)}</p><h3>${esc(a.doctor)}</h3><p class="subtle">${esc(a.location)} · ${a.time}</p><button class="secondary-btn" data-action="apt" data-id="${a.id}">VER DETALHES</button></div></article>`}).join(""):'<div class="empty">Nenhuma consulta cadastrada.</div>'}</div></div>`;
}
function renderApt(id){
 const a=apts().find(x=>x.id===id);if(!a)return renderApts();
 app.innerHTML=`<div class="screen"><div class="back-row"><button class="back-btn" data-action="apts">← Voltar</button></div><article class="card detail-hero"><div class="date-box" style="margin:auto"><strong>${fmtDateShort(a.date).day}</strong><span>${fmtDateShort(a.date).month}</span></div><div><p class="eyebrow">${esc(a.specialty)}</p><h1>${esc(a.doctor)}</h1><p class="big-dose">${a.time}</p><p class="subtle">${esc(a.location)}</p></div><div class="instruction"><strong>Data</strong><p>${fmtDate(a.date)}</p>${a.returnDate?'<strong>Retorno</strong><p>'+new Date(a.returnDate+"T12:00:00").toLocaleDateString("pt-BR")+"</p>":""}${a.notes?'<strong>Observações</strong><p>'+esc(a.notes)+"</p>":""}</div><button class="primary-btn btn-xl full" data-action="understand" data-id="${a.id}">ENTENDI</button></article></div>`;
}
function renderHelp(){
 const r=responsible(),c=contacts();
 app.innerHTML=`<div class="screen"><div class="screen-head"><div><p class="eyebrow">SOS Familiar</p><h1>Precisa de ajuda?</h1><p>Use o botão abaixo se precisar chamar alguém da família.</p></div></div><section class="sos-banner"><h3>Ajuda imediata</h3><p>Ao acionar, o sistema registra o pedido e mostra quem pode ser chamado.</p><button class="sos-button" data-action="sos">SIM, PRECISO DE AJUDA</button></section><section class="section"><div class="section-title"><h2>Quem pode ajudar</h2></div><div class="list">${r?`<div class="card profile-card"><div class="avatar">${initials(r.name)}</div><div><strong>${esc(r.name)}</strong><div class="subtle">Responsável principal</div><a class="primary-btn" style="margin-top:8px" href="tel:${esc(r.phone)}">LIGAR</a></div></div>`:""}${c.map(x=>`<div class="card profile-card"><div class="avatar">${initials(x.name)}</div><div><strong>${esc(x.name)}</strong><div class="subtle">${esc(x.relation||"Contato de emergência")}</div><a class="secondary-btn" style="margin-top:8px" href="tel:${esc(x.phone)}">LIGAR</a></div></div>`).join("")}</div></section><p class="sos-help">O SOS desta versão é uma simulação. Nenhuma localização real é enviada.</p></div>`;
}
function renderProfile(){
 const s=load(),e=elder(),r=responsible();
 app.innerHTML=`<div class="screen"><div class="screen-head"><div><p class="eyebrow">Por Perto</p><h1>Sobre você</h1><p>Estas informações são configuradas pela família.</p></div></div><article class="card profile-card"><div class="avatar">${initials(e.name)}</div><div><strong>${esc(e.name)}</strong><div class="subtle">Nascida(o) em ${e.birthYear}</div><div class="subtle">${esc(e.city||"")}</div></div></article><article class="card"><p class="eyebrow">Responsável</p><h3>${esc(r?.name||"Ainda não cadastrado")}</h3><p class="subtle">${r?.phone?esc(r.phone):"A família ainda não informou um telefone."}</p></article><article class="card family-link"><div><strong>Configurações da família</strong><p class="subtle">Medicamentos, consultas e contatos são organizados por quem cuida de você.</p></div><a class="primary-btn" href="painel.html">ABRIR PAINEL</a></article><article class="notice"><strong>Por Perto</strong><p>Feito para deixar o cuidado mais simples, sem exigir que você aprenda a usar tecnologia.</p></article></div>`;
}
function renderSos(step=1){
 const r=responsible(),c=contacts();
 app.innerHTML=`<div class="screen"><div class="back-row"><button class="back-btn" data-action="help">← Voltar</button></div><article class="card success-card"><span class="success-icon" style="background:#f8e7e7;color:var(--red)">!</span><h1>${step===1?"Enviando pedido de ajuda":step===2?"Avisando sua família":"Pedido registrado"}</h1><p>${step===1?"Aguarde um instante.":step===2?"Estamos avisando os contatos configurados.":"Sua família foi avisada nesta simulação."}</p>${step===3?`<div class="choice-grid"><a class="primary-btn btn-xl full" href="tel:${esc(r?.phone||"")}">LIGAR PARA ${esc(r?.name||"FAMÍLIA")}</a>${c.map(x=>`<a class="secondary-btn full" href="tel:${esc(x.phone)}">LIGAR PARA ${esc(x.name)}</a>`).join("")}</div><button class="ghost-btn full" data-action="home">VOLTAR AO INÍCIO</button>`:""}</article></div>`;
}
function render(){
 clearTimeout(sosTimer);shellTop();
 if(screen==="home")renderHome();
 else if(screen==="meds")renderMeds();
 else if(screen==="med")renderMed(selectedId);
 else if(screen==="apts")renderApts();
 else if(screen==="apt")renderApt(selectedId);
 else if(screen==="help")renderHelp();
 else if(screen==="sos")renderSos(1);
 else if(screen==="profile")renderProfile();
}
function go(next,id=null){screen=next;selectedId=id;location.hash=next==="home"?"home":next;window.scrollTo({top:0,behavior:"smooth"});render()}
function startSos(){
 S().sos(now(),elder().id);screen="sos";renderSos(1);
 sosTimer=setTimeout(()=>{renderSos(2);sosTimer=setTimeout(()=>renderSos(3),1200)},1100);
}
function take(id,t){S().markTaken(id,t,now(),elder().id);delete alerts[today()+"|"+elder().id+"|"+id+"|"+t];msg("Dose registrada. Muito bem.");render()}
function check(){
 const s=load(),e=elder(),n=mins(),repeat=Number(s.settings?.reminderRepeatMinutes||10),pending=doseList().filter(x=>x.delta>=0||x.delta>=-30);
 if(!pending.length)return;
 const d=pending[0],k=today()+"|"+e.id+"|"+d.m.id+"|"+d.t;
 if(n>=d.d&&!alerts[k]||n>=d.d&&Date.now()-alerts[k]>=repeat*60000){
   alerts[k]=Date.now();
   try{const C=window.AudioContext||window.webkitAudioContext;if(C){const c=new C,o=c.createOscillator(),g=c.createGain();o.frequency.value=660;g.gain.value=.08;o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+.45)}}catch{}
   if(document.hidden&&"Notification"in window&&Notification.permission==="granted")try{new Notification("Hora do remédio",{body:d.m.name+" — "+d.m.dose,tag:"por-perto-"+k,requireInteraction:false})}catch{}
   msg("Hora do remédio: "+d.m.name);
 }
}
document.addEventListener("click",e=>{
 const x=e.target.closest("[data-action]");if(!x)return;const a=x.dataset.action;
 if("Notification"in window&&Notification.permission==="default")Notification.requestPermission().catch(()=>{});
 if(a==="home")go("home");else if(a==="meds")go("meds");else if(a==="apts")go("apts");else if(a==="help")go("help");else if(a==="profile")go("profile");else if(a==="med")go("med",x.dataset.id);else if(a==="apt")go("apt",x.dataset.id);else if(a==="take")take(x.dataset.id,x.dataset.time);else if(a==="understand"){S().markApt(x.dataset.id,now(),elder().id);msg("Consulta registrada.");go("apts")}else if(a==="sos")startSos();
});
window.addEventListener("hashchange",()=>{const h=location.hash.replace("#","");if(h==="home"||!h)go("home");else if(h==="meds")go("meds");else if(h==="apts")go("apts");else if(h==="help")go("help");else if(h==="profile")go("profile")});
window.addEventListener("storage",e=>{if(e.key===S().STORAGE_KEY)render()});window.addEventListener("por-perto-change",()=>render());
if(location.hash==="#meds")screen="meds";else if(location.hash==="#apts")screen="apts";else if(location.hash==="#help")screen="help";else if(location.hash==="#profile")screen="profile";render();check();setInterval(check,15000);
})();