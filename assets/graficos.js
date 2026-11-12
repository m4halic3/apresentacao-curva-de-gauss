/* =========================================================
   Gráficos interativos da apresentação de Distribuição Normal
   ---------------------------------------------------------
   Todos os números e gráficos são calculados aqui, a partir das notas
   em window.NOTAS (gerado pelo build.py a partir do CSV). As fórmulas
   são as mesmas do analise_distribuicao_normal.py.

   Elementos reconhecidos nos slides:
     [data-calc="chave"]        recebe um valor calculado (ex.: media, s, g)
     canvas.fundo-sino          curva animada da capa e do encerramento
     canvas.curva-parametros    curva que muda com os controles μ e σ
     canvas.curva-regra         normal padrão com as faixas 1σ, 2σ e 3σ
     canvas.hist-regra          histograma real com o intervalo x̄ ± k·s
     canvas.curva-z             posição de uma nota na curva e seu escore z
     canvas.hist-camadas        histograma com camadas ligadas por botões
   Teclas extras: T mostra ou esconde o cronômetro de 10 minutos e R o reinicia.
   ========================================================= */
(function () {
  "use strict";

  // Paleta: https://coolors.co/3c1642-086375-1dd3b0-affc41-b2ff9e (foco no roxo e no verde-limão)
  var COR = {
    barra: "#AFFC41", barraFraca: "rgba(175,252,65,0.35)", contornoBarra: "#3C1642", curva: "#3C1642",
    curvaClara: "#B2FF9E", media: "#086375", mediaClara: "#AFFC41", sigma: "#0E9F84", sigmaClara: "#FFFFFF",
    barraEscura: "#1DD3B0", barraFracaEscura: "rgba(29,211,176,0.28)",
    textoClaro: "#3C1642", textoEscuro: "#FFFFFF", suaveClaro: "#5C4A62", suaveEscuro: "#E9DDEC",
    gradeClara: "#3C1642", gradeEscura: "#6A3573", atipico: "#E4572E"
  };
  var FONTE = '"DM Sans", Arial, sans-serif';
  var FONTE_TITULO = '"Permanent Marker", Arial, sans-serif';

  /* ---------- Estatística (mesmas fórmulas do Python) ---------- */
  function calcular(notas) {
    var n = notas.length, ord = notas.slice().sort(function (a, b) { return a - b; });
    var soma = 0; notas.forEach(function (x) { soma += x; });
    var media = soma / n;
    var mediana = n % 2 ? ord[(n - 1) / 2] : (ord[n / 2 - 1] + ord[n / 2]) / 2;
    var freq = {}; notas.forEach(function (x) { freq[x] = (freq[x] || 0) + 1; });
    var maior = 0; Object.keys(freq).forEach(function (k) { if (freq[k] > maior) maior = freq[k]; });
    var modas = Object.keys(freq).filter(function (k) { return freq[k] === maior; }).map(Number).sort(function (a, b) { return a - b; });
    var sq = 0; notas.forEach(function (x) { sq += (x - media) * (x - media); });
    var variancia = sq / (n - 1), s = Math.sqrt(variancia);
    var cubos = 0; notas.forEach(function (x) { cubos += Math.pow((x - media) / s, 3); });
    var g = n / ((n - 1) * (n - 2)) * cubos;
    var regra = [1, 2, 3].map(function (k) {
      var inf = media - k * s, sup = media + k * s, q = 0;
      notas.forEach(function (x) { if (x >= inf && x <= sup) q++; });
      return { k: k, inf: inf, sup: sup, q: q, p: q / n * 100, esperado: [68, 95, 99.7][k - 1] };
    });
    var atipicos = ord.filter(function (x) { return Math.abs((x - media) / s) > 3; });
    return {
      n: n, ord: ord, freq: freq, min: ord[0], max: ord[n - 1], amp: ord[n - 1] - ord[0],
      media: media, mediana: mediana, modas: modas, freqModa: maior, variancia: variancia, s: s, g: g,
      regra: regra, atipicos: atipicos
    };
  }

  var E = calcular(window.NOTAS || []);

  function fmt(v, casas) {
    return Number(v).toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });
  }
  function z(x) { return (x - E.media) / E.s; }
  function densidade(x, m, s) { return Math.exp(-((x - m) * (x - m)) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI)); }

  function valorCalc(chave) {
    var r = E.regra;
    var mapa = {
      n: E.n, min: E.min, max: E.max, amp: E.amp, media: E.media, mediana: E.mediana,
      moda: E.modas.join(", "), freqModa: E.freqModa, variancia: E.variancia, s: E.s, g: E.g,
      natip: E.atipicos.length, atipicos: E.atipicos.join(", "),
      pmenos: E.media - E.s, pmais: E.media + E.s,
      zmin: z(E.min), zmax: z(E.max), z50: z(50), z75: z(75), z90: z(90)
    };
    r.forEach(function (it) {
      mapa["r" + it.k + "q"] = it.q; mapa["r" + it.k + "p"] = it.p;
      mapa["r" + it.k + "inf"] = it.inf; mapa["r" + it.k + "sup"] = it.sup;
      mapa["r" + it.k + "dif"] = it.p - it.esperado;
    });
    return mapa[chave];
  }

  function preencher() {
    document.querySelectorAll("[data-calc]").forEach(function (el) {
      var v = valorCalc(el.getAttribute("data-calc"));
      if (v === undefined) return;
      var casas = el.getAttribute("data-casas");
      if (typeof v === "number" && casas !== null) {
        var txt = fmt(v, Number(casas));
        if (el.hasAttribute("data-sinal") && v > 0) txt = "+" + txt;
        el.textContent = txt;
      } else {
        el.textContent = typeof v === "number" ? fmt(v, 0) : v;
      }
    });
  }

  /* ---------- Utilidades de desenho ---------- */
  function tema(canvas) {
    var sec = canvas.closest("section");
    var escuro = canvas.dataset.tema ? canvas.dataset.tema === "escuro" : (sec && sec.classList.contains("escuro"));
    return {
      escuro: escuro,
      texto: escuro ? COR.textoEscuro : COR.textoClaro,
      suave: escuro ? COR.suaveEscuro : COR.suaveClaro,
      grade: escuro ? COR.gradeEscura : COR.gradeClara,
      curva: escuro ? COR.curvaClara : COR.curva,
      media: escuro ? COR.mediaClara : COR.media,
      sigma: escuro ? COR.sigmaClara : COR.sigma,
      barra: escuro ? COR.barraEscura : COR.barra,
      barraFraca: escuro ? COR.barraFracaEscura : COR.barraFraca
    };
  }

  // Cria um sistema de coordenadas: x de xmin a xmax, y de 0 a ymax
  function plano(canvas, xmin, xmax, ymax, margem) {
    var m = margem || { e: 70, d: 30, t: 30, b: 70 };
    var W = canvas.width, H = canvas.height;
    return {
      ctx: canvas.getContext("2d"), W: W, H: H, m: m,
      X: function (x) { return m.e + (x - xmin) / (xmax - xmin) * (W - m.e - m.d); },
      Y: function (y) { return H - m.b - y / ymax * (H - m.t - m.b); },
      xmin: xmin, xmax: xmax, ymax: ymax
    };
  }

  function eixoX(P, t, passo, rotulo) {
    var c = P.ctx;
    c.strokeStyle = t.grade; c.lineWidth = 2;
    c.beginPath(); c.moveTo(P.m.e, P.Y(0)); c.lineTo(P.W - P.m.d, P.Y(0)); c.stroke();
    c.fillStyle = t.suave; c.font = "26px " + FONTE; c.textAlign = "center"; c.textBaseline = "top";
    for (var v = P.xmin; v <= P.xmax + 1e-9; v += passo) {
      c.fillText(rotulo ? rotulo(v) : fmt(v, 0), P.X(v), P.Y(0) + 12);
    }
  }

  function linhaV(P, x, cor, largura, tracejado, texto, ytexto) {
    var c = P.ctx;
    c.save(); c.strokeStyle = cor; c.lineWidth = largura;
    if (tracejado) c.setLineDash([12, 10]);
    c.beginPath(); c.moveTo(P.X(x), P.m.t); c.lineTo(P.X(x), P.Y(0)); c.stroke();
    c.restore();
    if (texto) {
      c.fillStyle = cor; c.font = "bold 22px " + FONTE; c.textAlign = "center"; c.textBaseline = "bottom";
      c.fillText(texto, P.X(x), ytexto || P.m.t + 2);
    }
  }

  function curva(P, m, s, cor, largura, preencher, tracejado) {
    var c = P.ctx, passo = (P.xmax - P.xmin) / 400;
    c.save(); c.beginPath();
    for (var x = P.xmin; x <= P.xmax + 1e-9; x += passo) {
      var y = densidade(x, m, s);
      if (x === P.xmin) c.moveTo(P.X(x), P.Y(y)); else c.lineTo(P.X(x), P.Y(y));
    }
    if (tracejado) c.setLineDash([10, 10]);
    c.strokeStyle = cor; c.lineWidth = largura; c.stroke();
    if (preencher) {
      c.lineTo(P.X(P.xmax), P.Y(0)); c.lineTo(P.X(P.xmin), P.Y(0)); c.closePath();
      c.globalAlpha = 0.12; c.fillStyle = cor; c.fill();
    }
    c.restore();
  }

  // Histograma com densidade (área total 1), como o density=True do matplotlib
  function barras(P, largura, corDe, t) {
    var c = P.ctx;
    for (var ini = 0; ini <= 100 - largura + 1e-9; ini += largura) {
      var fim = ini + largura, q = 0;
      E.ord.forEach(function (x) {
        if (x >= ini && (x < fim || (fim >= 100 && x <= fim))) q++;
      });
      var h = q / (E.n * largura);
      c.fillStyle = corDe ? corDe(ini, fim) : (t ? t.barra : COR.barra);
      c.fillRect(P.X(ini) + 1, P.Y(h), P.X(fim) - P.X(ini) - 2, P.Y(0) - P.Y(h));
      if (h > 0 && !corDe) { c.strokeStyle = COR.contornoBarra; c.lineWidth = 2; c.strokeRect(P.X(ini) + 1, P.Y(h), P.X(fim) - P.X(ini) - 2, P.Y(0) - P.Y(h)); }
    }
  }

  function limpar(P) { P.ctx.clearRect(0, 0, P.W, P.H); }

  /* ---------- Componentes ---------- */
  var desenhos = [];   // funções de redesenho por canvas
  var animacoes = [];  // { canvas, passo }

  // 1. Curva que muda com μ e σ
  function curvaParametros(canvas) {
    var sec = canvas.closest("section");
    var rMu = sec.querySelector('input[data-param="mu"]'), rSig = sec.querySelector('input[data-param="sigma"]');
    var oMu = sec.querySelector('[data-out="mu"]'), oSig = sec.querySelector('[data-out="sigma"]');
    function desenhar() {
      var mu = Number(rMu.value), sig = Number(rSig.value), t = tema(canvas);
      oMu.textContent = fmt(mu, 0); oSig.textContent = fmt(sig, 0);
      var P = plano(canvas, 0, 100, 0.052); limpar(P);
      eixoX(P, t, 10);
      curva(P, E.media, E.s, t.suave, 3, false, true);
      linhaV(P, mu, t.media, 3, false, "μ = " + fmt(mu, 0));
      linhaV(P, mu - sig, t.sigma, 3, true); linhaV(P, mu + sig, t.sigma, 3, true);
      curva(P, mu, sig, t.curva, 6, true);
    }
    [rMu, rSig].forEach(function (r) { r.addEventListener("input", desenhar); });
    var reset = sec.querySelector("[data-reset]");
    if (reset) reset.addEventListener("click", function () { rMu.value = Math.round(E.media); rSig.value = Math.round(E.s); desenhar(); });
    rMu.value = Math.round(E.media); rSig.value = Math.round(E.s);
    desenhos.push(desenhar);
  }

  // 2. Normal padrão com faixas de 1, 2 e 3 desvios
  function curvaRegra(canvas) {
    var sec = canvas.closest("section"), k = 1;
    var botoes = sec.querySelectorAll("button[data-k]");
    var rotulos = { "-3": "μ−3σ", "-2": "μ−2σ", "-1": "μ−σ", "0": "μ", "1": "μ+σ", "2": "μ+2σ", "3": "μ+3σ" };
    var pct = { 1: "68,27%", 2: "95,45%", 3: "99,73%" };
    function desenhar() {
      var t = tema(canvas), P = plano(canvas, -4, 4, 0.45); limpar(P);
      var c = P.ctx;
      // área sombreada
      c.save(); c.beginPath(); c.moveTo(P.X(-k), P.Y(0));
      for (var x = -k; x <= k + 1e-9; x += 0.02) c.lineTo(P.X(x), P.Y(densidade(x, 0, 1)));
      c.lineTo(P.X(k), P.Y(0)); c.closePath();
      c.fillStyle = t.curva; c.globalAlpha = 0.28; c.fill(); c.restore();
      curva(P, 0, 1, t.curva, 6);
      for (var j = -3; j <= 3; j++) if (j) linhaV(P, j, t.sigma, 2, true);
      linhaV(P, 0, t.media, 3);
      eixoX(P, t, 1, function (v) { return rotulos[String(v)] || ""; });
      c.fillStyle = t.texto; c.font = "bold 56px " + FONTE_TITULO; c.textAlign = "left"; c.textBaseline = "top";
      c.fillText(pct[k], P.m.e, P.m.t);
      c.font = "24px " + FONTE; c.fillStyle = t.suave;
      c.fillText("dos valores entre", P.m.e, P.m.t + 66);
      c.fillText("μ − " + (k > 1 ? k : "") + "σ e μ + " + (k > 1 ? k : "") + "σ", P.m.e, P.m.t + 96);
      botoes.forEach(function (b) { b.classList.toggle("ativo", Number(b.dataset.k) === k); });
    }
    botoes.forEach(function (b) { b.addEventListener("click", function () { k = Number(b.dataset.k); desenhar(); }); });
    desenhos.push(desenhar);
  }

  // 3. Histograma real com o intervalo x̄ ± k·s (uma barra por nota inteira)
  function histRegra(canvas) {
    var sec = canvas.closest("section"), k = 1;
    var botoes = sec.querySelectorAll("button[data-k]");
    var linhas = sec.querySelectorAll("tr[data-linha]");
    function desenhar() {
      var t = tema(canvas), r = E.regra[k - 1];
      var P = plano(canvas, 0, 101, 0.045); limpar(P);
      var c = P.ctx;
      for (var nota = 0; nota <= 100; nota++) {
        var h = (E.freq[nota] || 0) / E.n;
        var dentro = nota >= r.inf && nota <= r.sup;
        c.fillStyle = dentro ? t.barra : t.barraFraca;
        c.fillRect(P.X(nota) + 1, P.Y(h), P.X(nota + 1) - P.X(nota) - 2, P.Y(0) - P.Y(h));
      }
      curva(P, E.media + 0.5, E.s, t.curva, 4);
      linhaV(P, E.media + 0.5, t.media, 3);
      var inf = Math.max(r.inf, 0), sup = Math.min(r.sup, 101);
      linhaV(P, inf + 0.5, t.sigma, 3, true, fmt(r.inf, 2));
      linhaV(P, sup + 0.5 > 101 ? 101 : sup + 0.5, t.sigma, 3, true, r.sup > 101 ? fmt(r.sup, 2) + " →" : fmt(r.sup, 2));
      eixoX(P, t, 10);
      c.fillStyle = t.escuro ? "rgba(75,31,83,0.92)" : "rgba(255,255,255,0.92)";
      c.fillRect(P.X(1) - 14, P.m.t + 34, 330, 104);
      c.fillStyle = t.texto; c.font = "bold 40px " + FONTE_TITULO; c.textAlign = "left"; c.textBaseline = "top";
      c.fillText(fmt(r.p, 1) + "% das notas", P.X(1), P.m.t + 44);
      c.font = "24px " + FONTE; c.fillStyle = t.suave;
      c.fillText(r.q + " de " + E.n + " estudantes", P.X(1), P.m.t + 96);
      botoes.forEach(function (b) { b.classList.toggle("ativo", Number(b.dataset.k) === k); });
      linhas.forEach(function (l) { l.classList.toggle("marcada", Number(l.dataset.linha) === k); });
    }
    botoes.forEach(function (b) { b.addEventListener("click", function () { k = Number(b.dataset.k); desenhar(); }); });
    desenhos.push(desenhar);
  }

  // 4. Calculadora de escore z
  function curvaZ(canvas) {
    var sec = canvas.closest("section");
    var entrada = sec.querySelector("input[data-z]");
    var saida = sec.querySelector("[data-saida-z]");
    var botoes = sec.querySelectorAll("button[data-nota]");
    function desenhar() {
      var x = Number(String(entrada.value).replace(",", "."));
      if (isNaN(x)) x = 0;
      x = Math.max(0, Math.min(100, x));
      var zz = z(x), t = tema(canvas);
      var P = plano(canvas, 0, 100, 0.03); limpar(P);
      var c = P.ctx;
      // zona de |z| > 3
      var lim = E.media - 3 * E.s;
      c.fillStyle = "rgba(228,87,46,0.12)";
      c.fillRect(P.X(0), P.m.t, P.X(lim) - P.X(0), P.Y(0) - P.m.t);
      c.fillStyle = COR.atipico; c.font = "bold 20px " + FONTE; c.textAlign = "left"; c.textBaseline = "top";
      c.fillText("|z| > 3", P.X(0) + 8, P.m.t + 8);
      barras(P, 5, function () { return t.barraFraca; });
      curva(P, E.media, E.s, t.curva, 5);
      linhaV(P, E.media, t.media, 3, false, "média");
      for (var j = -2; j <= 2; j++) if (j) linhaV(P, E.media + j * E.s, t.sigma, 2, true, (j > 0 ? "+" : "") + j + "s");
      // notas atípicas
      E.atipicos.forEach(function (a) {
        c.beginPath(); c.arc(P.X(a), P.Y(0) - 10, 8, 0, Math.PI * 2); c.fillStyle = COR.atipico; c.fill();
      });
      // marcador da nota escolhida
      var cor = Math.abs(zz) > 3 ? COR.atipico : t.texto;
      c.save(); c.strokeStyle = cor; c.lineWidth = 5;
      c.beginPath(); c.moveTo(P.X(x), P.Y(0)); c.lineTo(P.X(x), P.Y(densidade(x, E.media, E.s)) - 30); c.stroke(); c.restore();
      c.beginPath(); c.arc(P.X(x), P.Y(densidade(x, E.media, E.s)), 12, 0, Math.PI * 2); c.fillStyle = cor; c.fill();
      c.fillStyle = cor; c.font = "bold 30px " + FONTE_TITULO; c.textAlign = x > 85 ? "right" : (x < 15 ? "left" : "center"); c.textBaseline = "bottom";
      c.fillText("z = " + fmt(zz, 2), P.X(x), P.Y(densidade(x, E.media, E.s)) - 36);
      eixoX(P, t, 10);
      var atip = Math.abs(zz) > 3;
      saida.innerHTML =
        '<span class="formula pequena"><i>z</i> = <span class="frac"><span>' + fmt(x, 0) + " − " + fmt(E.media, 4) +
        "</span><span>" + fmt(E.s, 4) + "</span></span> = <b>" + fmt(zz, 4) + "</b></span>" +
        '<span class="pill ' + (atip ? "vermelho" : "ok") + '">' + (atip ? "possível valor atípico" : "dentro do esperado") + "</span>";
      botoes.forEach(function (b) { b.classList.toggle("ativo", Number(b.dataset.nota) === x); });
    }
    entrada.addEventListener("input", desenhar);
    botoes.forEach(function (b) { b.addEventListener("click", function () { entrada.value = b.dataset.nota; desenhar(); }); });
    desenhos.push(desenhar);
  }

  // 5. Histograma com camadas (barras, curva, média, ±s)
  function histCamadas(canvas) {
    var sec = canvas.closest("section");
    var botoes = sec.querySelectorAll("button[data-camada]");
    var ligado = { barras: true, curva: false, media: false, sigma: false };
    function desenhar() {
      var t = tema(canvas), P = plano(canvas, 0, 100, 0.031); limpar(P);
      if (ligado.barras) barras(P, 5, null, t);
      if (ligado.curva) curva(P, E.media, E.s, t.curva, 6);
      if (ligado.media) linhaV(P, E.media, t.media, 4, false, "média = " + fmt(E.media, 2));
      if (ligado.sigma) {
        linhaV(P, E.media - E.s, t.sigma, 4, true, "média − s = " + fmt(E.media - E.s, 2), P.m.t + 72);
        linhaV(P, E.media + E.s, t.sigma, 4, true, "média + s = " + fmt(E.media + E.s, 2), P.m.t + 72);
      }
      eixoX(P, t, 10);
      var c = P.ctx; c.fillStyle = t.suave; c.font = "22px " + FONTE; c.textAlign = "center"; c.textBaseline = "bottom";
      c.fillText("Nota de matemática", P.X(50), P.H - 2);
      botoes.forEach(function (b) {
        var nome = b.dataset.camada;
        b.classList.toggle("ativo", nome === "tudo" ? (ligado.curva && ligado.media && ligado.sigma) : ligado[nome]);
      });
    }
    botoes.forEach(function (b) {
      b.addEventListener("click", function () {
        var nome = b.dataset.camada;
        if (nome === "tudo") { var todos = !(ligado.curva && ligado.media && ligado.sigma); ligado.barras = true; ligado.curva = ligado.media = ligado.sigma = todos; }
        else ligado[nome] = !ligado[nome];
        desenhar();
      });
    });
    desenhos.push(desenhar);
  }

  // 6. Curva de fundo da capa e do encerramento (histograma subindo e curva desenhando)
  function fundoSino(canvas) {
    var t0 = null;
    var P = plano(canvas, -10, 110, 0.032, { e: 640, d: 0, t: 330, b: 0 });
    var alturas = [];
    for (var ini = 0; ini < 100; ini += 5) {
      var q = 0; E.ord.forEach(function (x) { if (x >= ini && (x < ini + 5 || (ini === 95 && x === 100))) q++; });
      alturas.push(q / (E.n * 5));
    }
    animacoes.push({
      canvas: canvas,
      reiniciar: function () { t0 = null; },
      passo: function (agora, final) {
        if (t0 === null || final) t0 = final ? agora - 10000 : agora;
        var seg = (agora - t0) / 1000, c = P.ctx;
        limpar(P);
        alturas.forEach(function (h, i) {
          var prog = Math.min(1, Math.max(0, (seg - i * 0.05) / 0.9));
          prog = 1 - Math.pow(1 - prog, 3);
          var balanco = 1 + 0.03 * Math.sin(seg * 1.6 + i * 0.5);
          var hh = h * prog * balanco;
          c.fillStyle = "rgba(175,252,65,0.6)";
          c.fillRect(P.X(i * 5) + 3, P.Y(hh), P.X(i * 5 + 5) - P.X(i * 5) - 6, P.Y(0) - P.Y(hh));
        });
        var fim = Math.min(1, Math.max(0, (seg - 0.6) / 1.6));
        c.save(); c.beginPath();
        for (var x = -10; x <= -10 + 120 * fim; x += 0.5) {
          var y = densidade(x, E.media, E.s);
          if (x === -10) c.moveTo(P.X(x), P.Y(y)); else c.lineTo(P.X(x), P.Y(y));
        }
        c.strokeStyle = "#3C1642"; c.lineWidth = 7; c.globalAlpha = 0.9; c.stroke(); c.restore();
      }
    });
  }

  /* ---------- Cronômetro ---------- */
  var cron = { el: null, total: 300, inicio: null, pausado: 0, timer: null };
  function atualizarCron() {
    if (cron.inicio === null) { cron.el.textContent = "5:00"; return; }
    var resto = cron.total - Math.floor((Date.now() - cron.inicio) / 1000);
    var a = Math.abs(resto), txt = Math.floor(a / 60) + ":" + String(a % 60).padStart(2, "0");
    cron.el.textContent = resto < 0 ? "+" + txt : txt;
    cron.el.classList.toggle("alerta", resto <= 60 && resto >= 0);
    cron.el.classList.toggle("acabou", resto < 0);
  }
  function alternarCron() {
    cron.el.classList.toggle("oculto");
    if (cron.inicio === null) cron.inicio = Date.now();
    if (!cron.timer) cron.timer = setInterval(atualizarCron, 500);
    atualizarCron();
  }
  function reiniciarCron() { cron.inicio = Date.now(); atualizarCron(); }

  /* ---------- Inicialização ---------- */
  var mapa = [
    ["canvas.curva-parametros", curvaParametros],
    ["canvas.curva-regra", curvaRegra],
    ["canvas.hist-regra", histRegra],
    ["canvas.curva-z", curvaZ],
    ["canvas.hist-camadas", histCamadas],
    ["canvas.fundo-sino", fundoSino]
  ];

  function iniciar(Reveal) {
    if (!E.n) { console.warn("Sem notas em window.NOTAS. Rode python3 build.py."); return; }
    preencher();
    mapa.forEach(function (par) { document.querySelectorAll(par[0]).forEach(par[1]); });
    function redesenhar() { desenhos.forEach(function (d) { d(); }); }
    redesenhar();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(redesenhar);

    function quadro(agora) {
      var atual = Reveal.getCurrentSlide();
      animacoes.forEach(function (a) {
        if (Reveal.isPrintingPDF && Reveal.isPrintingPDF()) { a.passo(agora, true); return; }
        if (atual && atual.contains(a.canvas)) a.passo(agora);
      });
      requestAnimationFrame(quadro);
    }
    requestAnimationFrame(quadro);
    Reveal.on("slidechanged", function () { animacoes.forEach(function (a) { a.reiniciar(); }); });

    cron.el = document.getElementById("cronometro");
    if (cron.el) {
      Reveal.addKeyBinding({ keyCode: 84, key: "T", description: "Mostrar ou esconder o cronômetro" }, alternarCron);
      Reveal.addKeyBinding({ keyCode: 82, key: "R", description: "Reiniciar o cronômetro" }, reiniciarCron);
    }
  }

  window.Graficos = { iniciar: iniciar, estatisticas: E };
})();
