import React,{useEffect,useState}from"react";
import App from"./App.jsx";
import Landing from"./Landing.jsx";

function getView(){
  return location.pathname.endsWith("painel.html")||location.hash==="#login"?"app":"landing";
}

export default function Entry(){
  const[view,setView]=useState(getView);

  useEffect(()=>{
    const sync=()=>setView(getView());
    window.addEventListener("hashchange",sync);
    window.addEventListener("popstate",sync);
    return()=>{window.removeEventListener("hashchange",sync);window.removeEventListener("popstate",sync)};
  },[]);

  const openLogin=()=>{location.hash="login"};
  const backToLanding=()=>{
    if(location.pathname.endsWith("painel.html")){
      location.href="./";
      return;
    }
    history.pushState({}, "", location.pathname+location.search);
    setView("landing");
  };

  return view==="app"
    ? <App onBackToLanding={backToLanding}/>
    : <Landing onLogin={openLogin}/>;
}
