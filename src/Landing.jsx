import React from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight, Bell, CalendarDays, Check, ChevronRight, Heart,
  Pill, ShieldCheck, Siren, Sparkles, UsersRound
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1];

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export default function Landing({ onLogin }) {
  return (
    <div className="landing">
      <header className="landing-nav">
        <a className="brand" href="#inicio">
          <span className="brand-mark"><Heart size={17} strokeWidth={2.5} /></span>
          <span className="brand-copy"><strong>Por Perto</strong><small>cuidado conectado</small></span>
        </a>

        <nav>
          <a href="#manifesto">Nossa ideia</a>
          <a href="#rede">A rede</a>
          <a href="#recursos">Recursos</a>
        </nav>

        <button className="nav-login" onClick={onLogin}>
          Entrar <ArrowUpRight size={16} />
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <Reveal>
              <div className="eyebrow"><span /> tecnologia que cuida sem complicar</div>
              <h1>O cuidado<br /><em>mora perto.</em></h1>
              <p className="hero-lead">
                O Por Perto transforma medicamentos, consultas e apoio familiar
                em uma experiência simples para quem cuida e, principalmente,
                para quem é cuidado.
              </p>
              <div className="hero-actions">
                <button className="primary-btn btn-xl" onClick={onLogin}>
                  Acessar minha área <ArrowUpRight size={18} />
                </button>
                <a className="text-link" href="#manifesto">Conhecer o projeto <ChevronRight size={16} /></a>
              </div>
              <div className="hero-trust">
                <span><Check size={14} /></span>
                Pensado para pessoas 65+ · simples desde o primeiro toque
              </div>
            </Reveal>
          </div>

          <div className="hero-art">
            <motion.div className="art-blob" animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} />
            <motion.div className="phone-frame" initial={{ opacity: 0, scale: .92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, ease }}>
              <div className="phone-notch" />
              <div className="phone-head"><div><small>Bom dia, Ana</small><strong>Seu dia está tranquilo.</strong></div><span>A</span></div>
              <div className="phone-date">TERÇA · 26 SET</div>
              <div className="phone-card highlight">
                <span className="icon-box"><Pill size={19} /></span>
                <div><small>PRÓXIMO REMÉDIO</small><strong>09:00 · Losartana</strong></div>
                <b>Hoje</b>
              </div>
              <div className="phone-grid">
                <div><CalendarDays size={18} /><strong>Consulta</strong><small>14:30 hoje</small></div>
                <div><UsersRound size={18} /><strong>Família</strong><small>3 conectados</small></div>
              </div>
              <div className="phone-sos"><span><Siren size={17} /></span><div><strong>SOS Familiar</strong><small>Ajuda rápida quando precisar</small></div><ChevronRight size={16} /></div>
              <div className="phone-footer"><span>Início</span><span>Rotina</span><span>Família</span></div>
            </motion.div>

            <motion.div className="float-card float-remedy" animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
              <span className="float-icon success"><Check size={16} /></span>
              <div><strong>Remédio tomado</strong><small>09:02 · tudo certo</small></div>
            </motion.div>
            <motion.div className="float-card float-family" animate={{ y: [0, 7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <span className="float-icon purple"><Heart size={16} /></span>
              <div><strong>Família conectada</strong><small>3 pessoas acompanham</small></div>
            </motion.div>
            <div className="art-stamp"><Sparkles size={14} /> feito para simplificar</div>
          </div>
        </section>

        <Reveal>
          <section className="manifesto" id="manifesto">
            <div><span className="section-label">O nosso princípio</span><h2>Se precisa explicar,<br /><em>precisa simplificar.</em></h2></div>
            <p>O Por Perto começa pelo idoso. A tecnologia se adapta à rotina da pessoa — e não o contrário. Menos caminhos. Mais clareza. Mais autonomia.</p>
          </section>
        </Reveal>

        <section className="network" id="rede">
          <Reveal>
            <div className="section-heading">
              <div><span className="section-label">Uma rede, três experiências</span><h2>Todo mundo conectado.<br /><em>Cada um no seu ritmo.</em></h2></div>
              <p>O cuidado muda conforme quem está usando. A informação certa aparece para a pessoa certa.</p>
            </div>
          </Reveal>

          <div className="network-grid">
            <Reveal delay={.05}><article className="network-card elder"><div className="network-icon"><Heart /></div><span>01 · IDOSO</span><h3>“Só quero saber<br />o que fazer agora.”</h3><p>Remédios, consultas e SOS em uma interface direta, grande e sem ruído.</p><div className="card-line">Experiência simples <ArrowUpRight size={15} /></div></article></Reveal>
            <Reveal delay={.12}><article className="network-card family"><div className="network-icon"><UsersRound /></div><span>02 · FAMÍLIA</span><h3>“Quero cuidar,<br />mesmo estando longe.”</h3><p>Configure a rotina e acompanhe quem você ama sem transformar cuidado em cobrança.</p><div className="card-line">Rede de apoio <ArrowUpRight size={15} /></div></article></Reveal>
            <Reveal delay={.19}><article className="network-card professional"><div className="network-icon"><ShieldCheck /></div><span>03 · PROFISSIONAL</span><h3>“Preciso enxergar<br />o que importa.”</h3><p>Pacientes e informações organizados para apoiar o trabalho da rede de atendimento.</p><div className="card-line">Visão profissional <ArrowUpRight size={15} /></div></article></Reveal>
          </div>
        </section>

        <section className="feature-showcase" id="recursos">
          <Reveal><div className="feature-intro"><span className="section-label">Dentro do Por Perto</span><h2>Menos aplicativo.<br /><em>Mais tranquilidade.</em></h2><p>Três coisas importantes para o dia a dia, organizadas de um jeito que faz sentido.</p></div></Reveal>
          <div className="feature-list">
            <Reveal delay={.05}><div className="feature-item"><span className="feature-num">01</span><span className="feature-icon"><Pill /></span><div><small>ROTINA</small><h3>Remédio na Hora</h3><p>Horários, instruções e confirmação da rotina de medicamentos.</p></div><ArrowUpRight /></div></Reveal>
            <Reveal delay={.1}><div className="feature-item"><span className="feature-num">02</span><span className="feature-icon"><CalendarDays /></span><div><small>AGENDA</small><h3>Consulta Fácil</h3><p>Data, profissional, local e tudo que precisa estar à mão.</p></div><ArrowUpRight /></div></Reveal>
            <Reveal delay={.15}><div className="feature-item"><span className="feature-num">03</span><span className="feature-icon alert"><Siren /></span><div><small>APOIO</small><h3>SOS Familiar</h3><p>Um caminho rápido para acionar sua rede de apoio.</p></div><ArrowUpRight /></div></Reveal>
          </div>
        </section>

        <Reveal>
          <section className="closing">
            <div className="closing-orb" />
            <div><span className="section-label">Por Perto</span><h2>Porque cuidado<br /><em>não deveria esperar.</em></h2></div>
            <div className="closing-action"><p>Entre na sua área e continue de onde parou.</p><button className="primary-btn btn-xl" onClick={onLogin}>Entrar na central <ArrowUpRight size={18} /></button></div>
          </section>
        </Reveal>
      </main>

      <footer className="landing-footer"><div className="footer-brand"><span className="brand-mark"><Heart size={12} /></span><strong>Por Perto</strong></div><span>ProSaúde · cuidado conectado</span></footer>
    </div>
  );
}
