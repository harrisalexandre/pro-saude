import React from "react";

const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="m4 10 3.5 3.5L16 5" />
  </svg>
);

export default function Landing({ onLogin }) {
  return (
    <div className="landing">
      <header className="landing-nav">
        <a className="brand" href="#inicio" aria-label="Por Perto — início">
          <span className="brand-mark">P</span>
          <span className="brand-copy">
            <strong>Por Perto</strong>
            <small>Cuidado conectado</small>
          </span>
        </a>

        <nav aria-label="Navegação principal">
          <a href="#solucao">A solução</a>
          <a href="#para-quem">Para quem</a>
          <a href="#recursos">Recursos</a>
        </nav>

        <button className="nav-login" onClick={onLogin}>
          Entrar <Arrow />
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><span /> Cuidado mais simples, mais perto</div>
            <h1>Quem cuida,<br /><em>fica por perto.</em></h1>
            <p className="hero-lead">
              O Por Perto conecta idosos, família e profissionais de saúde
              em uma experiência simples, humana e feita para a rotina real.
            </p>

            <div className="hero-actions">
              <button className="primary-btn btn-xl" onClick={onLogin}>
                Acessar minha área <Arrow />
              </button>
              <a className="text-link" href="#solucao">
                Conhecer o Por Perto <Arrow />
              </a>
            </div>

            <div className="hero-proof">
              <span className="proof-check"><Check /></span>
              <span><strong>Feito para ser simples.</strong> Sem complicação para quem mais precisa.</span>
            </div>
          </div>

          <div className="hero-scene" aria-label="Exemplo da experiência Por Perto">
            <div className="scene-glow" />
            <div className="scene-card scene-main">
              <div className="scene-top">
                <div>
                  <small>Bom dia, Dona Ana</small>
                  <strong>Seu dia está tranquilo.</strong>
                </div>
                <span className="scene-avatar">A</span>
              </div>
              <div className="today-card">
                <span className="today-icon">✓</span>
                <div><small>Próximo remédio</small><strong>09:00 · Losartana</strong></div>
                <span className="today-status">Hoje</span>
              </div>
              <div className="scene-actions">
                <div><span>⌁</span><strong>Consulta</strong><small>14:30</small></div>
                <div><span>♡</span><strong>Família</strong><small>Conectada</small></div>
              </div>
              <div className="sos-mini"><span>!</span><div><strong>SOS Familiar</strong><small>Ajuda rápida quando precisar</small></div><Arrow /></div>
            </div>

            <div className="scene-note note-one">
              <span className="note-icon">✓</span>
              <div><strong>Remédio tomado</strong><small>09:02 · Tudo certo</small></div>
            </div>
            <div className="scene-note note-two">
              <span className="note-icon family">♡</span>
              <div><strong>Família conectada</strong><small>3 pessoas acompanham</small></div>
            </div>
            <span className="scene-dot dot-one" />
            <span className="scene-dot dot-two" />
          </div>
        </section>

        <section className="principle" id="solucao">
          <div>
            <span className="section-label">A ideia</span>
            <h2>Se ficou difícil,<br /><em>não está simples o suficiente.</em></h2>
          </div>
          <p>
            O Por Perto foi pensado primeiro para quem tem 65 anos ou mais.
            Menos caminhos, menos informação desnecessária e mais clareza
            em cada ação.
          </p>
        </section>

        <section className="audience-section" id="para-quem">
          <div className="section-heading">
            <div>
              <span className="section-label">Uma rede de cuidado</span>
              <h2>Cada pessoa vê<br />o que realmente precisa.</h2>
            </div>
            <p>Uma experiência única por trás dos bastidores, com interfaces diferentes para cada rotina.</p>
          </div>

          <div className="audience-grid">
            <article className="audience-card elder">
              <div className="card-top"><span className="card-index">01</span><span className="card-symbol">◎</span></div>
              <h3>Idoso</h3>
              <p>O essencial na tela, com letras grandes, ações claras e acesso rápido.</p>
              <span className="card-link">Experiência simplificada <Arrow /></span>
            </article>
            <article className="audience-card family">
              <div className="card-top"><span className="card-index">02</span><span className="card-symbol">♡</span></div>
              <h3>Família</h3>
              <p>Configura o cuidado, acompanha a rotina e permanece conectada.</p>
              <span className="card-link">Rede de apoio <Arrow /></span>
            </article>
            <article className="audience-card professional">
              <div className="card-top"><span className="card-index">03</span><span className="card-symbol">+</span></div>
              <h3>Profissionais</h3>
              <p>Pacientes e informações organizados para apoiar o atendimento.</p>
              <span className="card-link">Visão de cuidado <Arrow /></span>
            </article>
          </div>
        </section>

        <section className="features-section" id="recursos">
          <div className="feature-heading">
            <span className="section-label">No dia a dia</span>
            <h2>O cuidado em<br /><em>ações claras.</em></h2>
            <p>O que costuma ficar espalhado em mensagens, papéis e lembretes ganha um lugar simples para acompanhar.</p>
          </div>

          <div className="feature-list">
            <article className="feature-row">
              <span className="feature-number">01</span>
              <span className="feature-icon">◷</span>
              <div><h3>Remédio na Hora</h3><p>Horários e confirmações para acompanhar a rotina de medicamentos.</p></div>
              <Arrow />
            </article>
            <article className="feature-row">
              <span className="feature-number">02</span>
              <span className="feature-icon">□</span>
              <div><h3>Consulta Fácil</h3><p>Agenda, profissional, local e informações importantes em um só lugar.</p></div>
              <Arrow />
            </article>
            <article className="feature-row">
              <span className="feature-number">03</span>
              <span className="feature-icon sos">!</span>
              <div><h3>SOS Familiar</h3><p>Um caminho rápido para acionar a rede de apoio quando necessário.</p></div>
              <Arrow />
            </article>
          </div>
        </section>

        <section className="final-cta">
          <div>
            <span className="section-label">Por Perto</span>
            <h2>Mais cuidado.<br /><em>Menos preocupação.</em></h2>
          </div>
          <div className="final-cta-action">
            <p>Entre na sua área e continue de onde parou.</p>
            <button className="primary-btn btn-xl" onClick={onLogin}>Entrar na central <Arrow /></button>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-brand"><span className="brand-mark">P</span><strong>Por Perto</strong></div>
        <span>ProSaúde · Cuidado conectado</span>
      </footer>
    </div>
  );
}
