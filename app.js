/* Por Perto — experiência do idoso */
(function () {
  "use strict";

  const app = document.getElementById("app");
  const toast = document.getElementById("toast");
  const alertState = {};

  function esc(v) {
    return String(v ?? "").replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"
    }[c]));
  }

  function state() {
    return window.PorPertoState && PorPertoState.ensure
      ? PorPertoState.ensure()
      : null;
  }

  function save(s) {
    if (window.PorPertoState && PorPertoState.save) PorPertoState.save(s);
  }

  function toastMsg(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastMsg.timer);
    toastMsg.timer = setTimeout(() => toast.classList.remove("show"), 3500);
  }

  function localDateKey(date = new Date()) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + d;
  }

  function localDateTime(date = new Date()) {
    return date.getHours() * 60 + date.getMinutes();
  }

  function todayTaken(s, medicineId, time) {
    const key = localDateKey();
    return (s.taken || []).some(x =>
      x.date === key && x.medicineId === medicineId && x.time === time
    );
  }

  function scheduledToday(medicine) {
    if (medicine.frequency === "as_needed") return [];
    return Array.isArray(medicine.times) ? medicine.times : [];
  }

  function minutesForTime(t) {
    const [h, m] = String(t || "00:00").split(":").map(Number);
    return h * 60 + m;
  }

  function nextDose(s) {
    const now = localDateTime();
    const doses = [];
    (s.medicines || []).filter(m => m.active !== false).forEach(m => {
      scheduledToday(m).forEach(time => {
        const min = minutesForTime(time);
        if (min >= now && !todayTaken(s, m.id, time)) {
          doses.push({ medicine:m, time, min });
        }
      });
    });
    doses.sort((a,b) => a.min - b.min);
    return doses[0] || null;
  }

  function nextAppointment(s) {
    const now = Date.now();
    return (s.appointments || [])
      .filter(a => a.active !== false && new Date(a.dateTime).getTime() >= now)
      .sort((a,b) => new Date(a.dateTime) - new Date(b.dateTime))[0] || null;
  }

  function fmtDateTime(value) {
    const d = new Date(value);
    return d.toLocaleDateString("pt-BR", { day:"2-digit", month:"long" }) +
      " às " + d.toLocaleTimeString("pt-BR", { hour:"2-digit", minute:"2-digit" });
  }

  function imageFor(medicine) {
    return medicine.image || "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#eef3f0"/><circle cx="300" cy="190" r="90" fill="#fff"/><text x="300" y="205" text-anchor="middle" font-size="42" font-family="Arial" fill="#24513d">Remédio</text></svg>');
  }

  function renderHome() {
    const s = state();
    if (!s) {
      app.innerHTML = '<section class="empty-state"><h1>Por Perto</h1><p>Não foi possível carregar seus dados.</p></section>';
      return;
    }

    const elder = s.elder || { name:"Pessoa querida" };
    const dose = nextDose(s);
    const appointment = nextAppointment(s);

    app.innerHTML = `
      <header class="topbar">
        <div>
          <span class="eyebrow">POR PERTO</span>
          <h1>Olá, ${esc(elder.name)}.</h1>
        </div>
        <a class="header-link" href="painel.html">Família</a>
      </header>

      <section class="welcome-card">
        <strong>Estamos cuidando de você.</strong>
        <span>Veja só o que precisa de atenção agora.</span>
      </section>

      <section class="section-block" aria-labelledby="med-title">
        <div class="section-heading">
          <h2 id="med-title">Próximo remédio</h2>
        </div>
        ${dose ? `
          <article class="care-card medication-card">
            <img src="${imageFor(dose.medicine)}" alt="">
            <div class="care-content">
              <span class="status-badge">HORA DO REMÉDIO</span>
              <h3>${esc(dose.medicine.name)}</h3>
              <p class="big-detail">${esc(dose.medicine.dose || "Conforme orientação")}</p>
              <p class="time-detail">Hoje às <strong>${esc(dose.time)}</strong></p>
              ${dose.medicine.notes ? `<p>${esc(dose.medicine.notes)}</p>` : ""}
              <div class="action-row">
                <button class="primary-btn giant" data-action="take" data-id="${esc(dose.medicine.id)}" data-time="${esc(dose.time)}">TOMEI</button>
                <button class="secondary-btn" data-action="med" data-id="${esc(dose.medicine.id)}">VER REMÉDIO</button>
              </div>
            </div>
          </article>
        ` : `
          <article class="care-card success-card">
            <div class="big-icon" aria-hidden="true">✓</div>
            <div><h3>Nenhum remédio pendente</h3><p>Por enquanto está tudo certo.</p></div>
          </article>
        `}
      </section>

      <section class="section-block" aria-labelledby="apt-title">
        <h2 id="apt-title">Próxima consulta</h2>
        ${appointment ? `
          <article class="care-card">
            <div class="care-content">
              <span class="status-badge neutral">CONSULTA</span>
              <h3>${esc(appointment.specialty || "Consulta")}</h3>
              <p class="big-detail">${esc(appointment.doctor || "")}</p>
              <p>${esc(appointment.location || "")}</p>
              <p class="time-detail">${fmtDateTime(appointment.dateTime)}</p>
              <button class="secondary-btn full" data-action="appointment" data-id="${esc(appointment.id)}">VER CONSULTA</button>
            </div>
          </article>
        ` : `
          <article class="care-card"><h3>Nenhuma consulta próxima</h3><p>A família avisará quando houver uma nova consulta.</p></article>
        `}
      </section>

      <button class="sos-btn" data-action="sos">PRECISO DE AJUDA</button>
      <p class="footer-note">Se precisar, aperte o botão vermelho. Sua família será avisada.</p>
    `;
  }

  function renderMedicine(id) {
    const s = state();
    const m = (s.medicines || []).find(x => x.id === id);
    if (!m) return renderHome();

    app.innerHTML = `
      <header class="page-header">
        <button class="back-btn" data-action="home">← Voltar</button>
        <h1>Remédio</h1>
      </header>
      <article class="detail-card">
        <img class="detail-image" src="${imageFor(m)}" alt="">
        <span class="status-badge">REMÉDIO</span>
        <h2>${esc(m.name)}</h2>
        <p class="big-detail">${esc(m.dose || "Conforme orientação")}</p>
        ${m.times?.length ? `<p><strong>Horários:</strong> ${m.times.map(esc).join(", ")}</p>` : ""}
        ${m.notes ? `<p>${esc(m.notes)}</p>` : ""}
        <button class="primary-btn giant full" data-action="take" data-id="${esc(m.id)}" data-time="${esc(m.times?.[0] || "")}">TOMEI</button>
      </article>
    `;
  }

  function renderAppointment(id) {
    const s = state();
    const a = (s.appointments || []).find(x => x.id === id);
    if (!a) return renderHome();

    app.innerHTML = `
      <header class="page-header">
        <button class="back-btn" data-action="home">← Voltar</button>
        <h1>Consulta</h1>
      </header>
      <article class="detail-card">
        <span class="status-badge neutral">CONSULTA</span>
        <h2>${esc(a.specialty || "Consulta")}</h2>
        <p class="big-detail">${esc(a.doctor || "")}</p>
        <p>${esc(a.location || "")}</p>
        <p class="time-detail">${fmtDateTime(a.dateTime)}</p>
        ${a.returnDate ? `<p><strong>Retorno:</strong> ${new Date(a.returnDate + "T12:00:00").toLocaleDateString("pt-BR")}</p>` : ""}
        ${a.notes ? `<p>${esc(a.notes)}</p>` : ""}
        <button class="primary-btn giant full" data-action="understand" data-id="${esc(a.id)}">ENTENDI</button>
      </article>
    `;
  }

  function renderSos() {
    const s = state();
    const responsible = s.responsible || {};
    const contacts = s.emergencyContacts || [];
    app.innerHTML = `
      <header class="page-header">
        <button class="back-btn" data-action="home">← Voltar</button>
        <h1>Ajuda</h1>
      </header>
      <article class="sos-flow">
        <div class="big-icon danger" aria-hidden="true">!</div>
        <h2 id="sos-title">Enviando localização...</h2>
        <p id="sos-text">Aguarde um instante.</p>
      </article>
    `;

    setTimeout(() => {
      const title = document.getElementById("sos-title");
      const text = document.getElementById("sos-text");
      if (title) { title.textContent = "Avisando família..."; text.textContent = "Estamos avisando quem cuida de você."; }
    }, 1000);
    setTimeout(() => {
      const title = document.getElementById("sos-title");
      const text = document.getElementById("sos-text");
      if (title) {
        title.textContent = "Pronto!";
        text.textContent = "Sua família foi avisada.";
        document.querySelector(".sos-flow").insertAdjacentHTML("beforeend", `
          <a class="call-btn" href="tel:${esc(responsible.phone || "")}">LIGAR PARA ${esc(responsible.name || "FAMÍLIA")}</a>
          ${contacts.map(c => `<a class="secondary-btn full" href="tel:${esc(c.phone || "")}">LIGAR PARA ${esc(c.name || "CONTATO")}</a>`).join("")}
          <button class="secondary-btn full" data-action="home">VOLTAR AO INÍCIO</button>
        `);
      }
    }, 2200);
  }

  function playAlert() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 660;
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (_) {}
  }

  async function notify(title, body) {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      try { new Notification(title, { body }); } catch (_) {}
    }
  }

  async function requestNotifications() {
    if (!("Notification" in window) || Notification.permission !== "default") return;
    try { await Notification.requestPermission(); } catch (_) {}
  }

  function takeMedicine(id, time) {
    const s = state();
    if (!s) return;
    const m = (s.medicines || []).find(x => x.id === id);
    const actualTime = time || m?.times?.[0] || "";
    s.taken = s.taken || [];
    const key = localDateKey() + "|" + id + "|" + actualTime;
    if (!s.taken.some(x => x.date + "|" + x.medicineId + "|" + x.time === key)) {
      s.taken.push({ date: localDateKey(), medicineId:id, time:actualTime, at:new Date().toISOString() });
      s.history = s.history || [];
      s.history.unshift({ type:"medicine_taken", date:new Date().toISOString(), text:"Tomou " + (m?.name || "remédio") + " às " + actualTime });
      save(s);
    }
    delete alertState[key];
    toastMsg("Pronto. Registramos que você tomou o remédio.");
    renderHome();
  }

  function understandAppointment(id) {
    const s = state();
    const a = (s.appointments || []).find(x => x.id === id);
    if (a) {
      s.history = s.history || [];
      s.history.unshift({ type:"appointment_seen", date:new Date().toISOString(), text:"Consulta vista: " + (a.specialty || "consulta") });
      save(s);
    }
    toastMsg("Certo. A consulta foi registrada.");
    renderHome();
  }

  function checkReminders() {
    const s = state();
    if (!s) return;
    const now = new Date();
    const nowMin = localDateTime(now);
    const repeat = Math.max(1, Number(s.settings?.reminderRepeatMinutes || 10));

    (s.medicines || []).filter(m => m.active !== false).forEach(m => {
      scheduledToday(m).forEach(time => {
        const scheduled = minutesForTime(time);
        const key = localDateKey() + "|" + m.id + "|" + time;
        if (todayTaken(s, m.id, time)) {
          delete alertState[key];
          return;
        }
        if (nowMin >= scheduled) {
          const last = alertState[key] || 0;
          if (!last || Date.now() - last >= repeat * 60000) {
            alertState[key] = Date.now();
            playAlert();
            notify("Hora do remédio", m.name + " — " + (m.dose || "") + ". Toque em TOMEI quando terminar.");
            if (nowMin - scheduled >= Number(s.settings?.missedAfterMinutes || 20)) {
              toastMsg("Atenção: " + m.name + " ainda não foi confirmado.");
            } else {
              toastMsg("Hora do remédio: " + m.name);
            }
            if (!location.pathname.endsWith("index.html") && location.pathname !== "/") return;
            renderHome();
          }
        }
      });
    });
  }

  app.addEventListener("click", event => {
    const el = event.target.closest("[data-action]");
    if (!el) return;
    const action = el.dataset.action;
    requestNotifications();

    if (action === "home") renderHome();
    if (action === "take") takeMedicine(el.dataset.id, el.dataset.time);
    if (action === "med") renderMedicine(el.dataset.id);
    if (action === "appointment") renderAppointment(el.dataset.id);
    if (action === "understand") understandAppointment(el.dataset.id);
    if (action === "sos") { const s = state(); s.history = s.history || []; s.history.unshift({type:"sos",date:new Date().toISOString(),text:"Pedido de ajuda acionado"}); save(s); renderSos(); }
  });

  window.addEventListener("storage", e => {
    if (e.key === "porPertoState") renderHome();
  });

  document.addEventListener("pointerdown", requestNotifications, { once:true });
  renderHome();
  checkReminders();
  setInterval(checkReminders, 15000);
})();