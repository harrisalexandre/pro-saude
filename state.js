(()=>{"use strict";
const K="por-perto-state-v2";
const oldK="por-perto-state-v1";
const uid=p=>p+"_"+Math.random().toString(36).slice(2,9);
const escText=v=>String(v??"");
const seedSvg=t=>`data:image/svg+xml;charset=UTF-8,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 360"><rect width="500" height="360" rx="36" fill="#e8e3d6"/><rect x="90" y="72" width="320" height="216" rx="26" fill="#fff"/><circle cx="250" cy="182" r="54" fill="#173b2a"/><text x="250" y="192" text-anchor="middle" font-family="Arial" font-size="28" fill="#fff">'+t+'</text></svg>')}`;
const sample={
  elders:[
    {id:"idoso_1",name:"Dona Maria",birthYear:1942,city:"Santiago",notes:"Prefere ser chamada de Dona Maria."},
    {id:"idoso_2",name:"Seu Antônio",birthYear:1939,city:"Santiago",notes:"Cadastro de demonstração."}
  ],
  activeElderId:"idoso_1",
  responsible:{id:"resp_1",elderId:"idoso_1",name:"Ana Maria",phone:"5555999999999",email:"ana@example.com"},
  medicines:[
    {id:"med_1",elderId:"idoso_1",name:"Losartana",photo:seedSvg("LOSARTANA"),format:"Comprimido",dose:"1 comprimido",schedule:["17:00"],frequency:{type:"daily"},notes:"Tomar com água."},
    {id:"med_2",elderId:"idoso_1",name:"Metformina",photo:seedSvg("METFORMINA"),format:"Comprimido",dose:"1 comprimido",schedule:["08:00","20:00"],frequency:{type:"daily"},notes:"Tomar após a refeição."},
    {id:"med_3",elderId:"idoso_2",name:"Vitamina D",photo:seedSvg("VITAMINA D"),format:"Cápsula",dose:"1 cápsula",schedule:["09:00"],frequency:{type:"daily"},notes:"Exemplo."}
  ],
  appointments:[
    {id:"apt_1",elderId:"idoso_1",doctor:"Dra. Helena Souza",specialty:"Cardiologia",location:"Clínica Vida, sala 3",date:"2026-09-24",time:"09:30",returnDate:"2026-10-20",notes:"Levar exames anteriores."},
    {id:"apt_2",elderId:"idoso_1",doctor:"Dr. Paulo Mendes",specialty:"Clínica geral",location:"UBS Central",date:"2026-10-02",time:"14:00",returnDate:"",notes:"Levar documento e cartão do SUS."}
  ],
  emergencyContacts:[
    {id:"em_1",elderId:"idoso_1",name:"João",phone:"5555991111111",priority:1,relation:"Filho"},
    {id:"em_2",elderId:"idoso_1",name:"Carla",phone:"5555992222222",priority:2,relation:"Filha"}
  ],
  settings:{reminderRepeatMinutes:10,missedAfterMinutes:20},
  day:{}
};
const clone=x=>JSON.parse(JSON.stringify(x));
function localDateKey(d=new Date()){return [d.getFullYear(),String(d.getMonth()+1).padStart(2,"0"),String(d.getDate()).padStart(2,"0")].join("-")}
function parseDate(k){const [y,m,d]=k.split("-").map(Number);return new Date(y,m-1,d)}
function migrate(raw){
  if(!raw||typeof raw!=="object")return clone(sample);
  if(raw.elders)return {...clone(sample),...raw};
  const s=clone(sample);
  if(raw.elder){s.elders=[{...s.elders[0],...raw.elder,id:raw.elder.id||s.elders[0].id}];s.activeElderId=s.elders[0].id}
  if(raw.medicines)s.medicines=raw.medicines.map(m=>({...m,elderId:m.elderId||s.activeElderId}));
  if(raw.appointments)s.appointments=raw.appointments.map(a=>({...a,elderId:a.elderId||s.activeElderId}));
  if(raw.responsible)s.responsible={...raw.responsible,elderId:raw.responsible.elderId||s.activeElderId};
  if(raw.emergencyContacts)s.emergencyContacts=raw.emergencyContacts.map(c=>({...c,elderId:c.elderId||s.activeElderId}));
  if(raw.settings)s.settings={...s.settings,...raw.settings};
  if(raw.day)s.day=raw.day;
  return s;
}
function load(){
  const raw=localStorage.getItem(K)||localStorage.getItem(oldK);
  if(!raw){const s=clone(sample);localStorage.setItem(K,JSON.stringify(s));return s}
  try{const s=migrate(JSON.parse(raw));if(!localStorage.getItem(K))localStorage.setItem(K,JSON.stringify(s));return s}catch{return clone(sample)}
}
function save(s){localStorage.setItem(K,JSON.stringify(s));window.dispatchEvent(new CustomEvent("por-perto-change",{detail:s}));try{window.dispatchEvent(new StorageEvent("storage",{key:K,newValue:JSON.stringify(s)}))}catch{}}
function activeElder(s){return s.elders.find(e=>e.id===s.activeElderId)||s.elders[0]}
function setActiveElder(id){const s=load();if(s.elders.some(e=>e.id===id)){s.activeElderId=id;save(s)}return s}
function forElder(s,id){return s.elders.find(e=>e.id===id)||activeElder(s)}
function medicines(s,id=activeElder(s)?.id){return (s.medicines||[]).filter(m=>m.elderId===id)}
function appointments(s,id=activeElder(s)?.id){return (s.appointments||[]).filter(a=>a.elderId===id)}
function responsible(s,id=activeElder(s)?.id){return s.responsible?.elderId===id?s.responsible:null}
function contacts(s,id=activeElder(s)?.id){return (s.emergencyContacts||[]).filter(c=>c.elderId===id).sort((a,b)=>(a.priority||0)-(b.priority||0))}
function scheduleFor(m){
  if(m.frequency?.type!=="interval")return m.schedule||[];
  if(m.schedule?.length)return m.schedule;
  const start=m.frequency.startTime||"08:00",hours=Math.max(1,Number(m.frequency.hours||8)),[h,mi]=start.split(":").map(Number),out=[];
  for(let n=h*60+mi;n<24*60;n+=hours*60)out.push(String(Math.floor(n/60)).padStart(2,"0")+":"+String(n%60).padStart(2,"0"));
  return out;
}
function active(m,d=new Date()){
  const f=m.frequency?.type;
  if(f==="as_needed")return false;
  if(f==="weekly")return (m.frequency.days||[]).includes(d.getDay());
  return true;
}
function day(s,d=new Date(),elderId=activeElder(s)?.id){
  const k=localDateKey(d)+"::"+elderId;
  s.day[k]??={date:localDateKey(d),elderId,medicines:{},appointments:{},sos:null};
  return s.day[k];
}
function mk(id,t){return id+"__"+t}
function ensure(s,d=new Date(),elderId=activeElder(s)?.id){
  const x=day(s,d,elderId);
  medicines(s,elderId).forEach(m=>scheduleFor(m).forEach(t=>x.medicines[mk(m.id,t)]??={medicineId:m.id,time:t,takenAt:null,status:"pending"}));
  return s;
}
function taken(id,t,d=new Date(),elderId=activeElder(load())?.id){const s=ensure(load(),d,elderId);return s.day[localDateKey(d)+"::"+elderId]?.medicines?.[mk(id,t)]?.takenAt?"taken":"pending"}
function markTaken(id,t,d=new Date(),elderId=activeElder(load())?.id){const s=ensure(load(),d,elderId),x=day(s,d,elderId),k=mk(id,t);x.medicines[k]={...(x.medicines[k]||{}),medicineId:id,time:t,takenAt:d.toISOString(),status:"taken"};save(s)}
function markApt(id,d=new Date(),elderId=activeElder(load())?.id){const s=ensure(load(),d,elderId);day(s,d,elderId).appointments[id]={appointmentId:id,understoodAt:d.toISOString()};save(s)}
function sos(d=new Date(),elderId=activeElder(load())?.id){const s=ensure(load(),d,elderId);day(s,d,elderId).sos={triggeredAt:d.toISOString(),status:"triggered"};save(s)}
function mins(t){const[a,b]=String(t).split(":").map(Number);return a*60+b}
function missed(d=new Date(),elderId=activeElder(load())?.id){
  const s=ensure(load(),d,elderId),x=day(s,d,elderId),now=d.getHours()*60+d.getMinutes(),th=Number(s.settings?.missedAfterMinutes||20),out=[];
  medicines(s,elderId).forEach(m=>{if(!active(m,d))return;scheduleFor(m).forEach(t=>{const e=x.medicines[mk(m.id,t)],n=mins(t);if(!e?.takenAt&&now>=n+th)out.push({medicineId:m.id,medicineName:m.name,time:t,lateMinutes:now-n})})});
  return out;
}
function status(d=new Date(),elderId=activeElder(load())?.id){const s=ensure(load(),d,elderId);return day(s,d,elderId).sos?.status==="triggered"?"red":missed(d,elderId).length?"yellow":"green"}
function history(elderId=null){
  const s=load(),o=[];
  Object.values(s.day||{}).forEach(x=>{if(elderId&&x.elderId!==elderId)return;Object.values(x.medicines||{}).forEach(e=>{if(e.takenAt)o.push({type:"Remédio",label:s.medicines.find(m=>m.id===e.medicineId)?.name||"Remédio",date:x.date,when:e.takenAt,details:e.time})});Object.values(x.appointments||{}).forEach(e=>{const a=s.appointments.find(a=>a.id===e.appointmentId);if(a)o.push({type:"Consulta",label:a.doctor,date:x.date,when:e.understoodAt,details:a.specialty})});if(x.sos?.triggeredAt)o.push({type:"SOS",label:"SOS Familiar",date:x.date,when:x.sos.triggeredAt,details:"Acionado"})});
  return o.sort((a,b)=>new Date(b.when)-new Date(a.when));
}
function missedHistory(elderId=null){
  const s=load(),o=[],th=Number(s.settings?.missedAfterMinutes||20);
  Object.values(s.day||{}).forEach(x=>{if(elderId&&x.elderId!==elderId)return;Object.values(x.medicines||{}).forEach(z=>{if(z.takenAt)return;const dt=parseDate(x.date);const [h,m]=z.time.split(":").map(Number);dt.setHours(h,m,0,0);const late=Math.floor((Date.now()-dt.getTime())/60000);if(late>th)o.push({date:x.date,time:z.time,late,medicineName:s.medicines.find(m=>m.id===z.medicineId)?.name||"Remédio"})})});
  return o.sort((a,b)=>b.date.localeCompare(a.date)||b.time.localeCompare(a.time));
}
function removeMedicine(id){const s=load();s.medicines=s.medicines.filter(m=>m.id!==id);Object.values(s.day).forEach(x=>Object.keys(x.medicines||{}).forEach(k=>{if(k.startsWith(id+"__"))delete x.medicines[k]}));save(s)}
function removeAppointment(id){const s=load();s.appointments=s.appointments.filter(a=>a.id!==id);Object.values(s.day).forEach(x=>{if(x.appointments)delete x.appointments[id]});save(s)}
function removeElder(id){const s=load();if(s.elders.length<=1)return false;s.elders=s.elders.filter(e=>e.id!==id);s.medicines=s.medicines.filter(m=>m.elderId!==id);s.appointments=s.appointments.filter(a=>a.elderId!==id);s.emergencyContacts=s.emergencyContacts.filter(c=>c.elderId!==id);if(s.responsible?.elderId===id)s.responsible=null;if(s.activeElderId===id)s.activeElderId=s.elders[0].id;save(s);return true}
window.PorPertoStore={STORAGE_KEY:K,uid,clone,load,save,localDateKey,parseDate,activeElder,setActiveElder,forElder,medicines,appointments,responsible,contacts,scheduleFor,active,day,ensure,mk,taken,markTaken,markApt,sos,mins,missed,status,history,missedHistory,removeMedicine,removeAppointment,removeElder};
})();