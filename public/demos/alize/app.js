/* =========================================================================
   Alizé — demo interactions
   Vanilla JS, no dependency, no inline script (CSP: script-src 'self').
   All user-facing strings live in the HTML (data-* attributes) so this
   file is shared as-is by the English and French pages.
   ========================================================================= */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------------
     1. Sticky header state
     --------------------------------------------------------------------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 12);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------------------------------------------------------------------
     2. Mobile navigation
     --------------------------------------------------------------------- */
  var burger = document.querySelector('[data-burger]');
  var drawer = document.querySelector('[data-mobile-nav]');

  if (burger && drawer) {
    var setDrawer = function (open) {
      drawer.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      burger.setAttribute(
        'aria-label',
        open ? burger.getAttribute('data-label-close') : burger.getAttribute('data-label-open')
      );
      var icons = burger.querySelectorAll('svg');
      if (icons.length === 2) {
        icons[0].style.display = open ? 'none' : 'block';
        icons[1].style.display = open ? 'block' : 'none';
      }
    };

    burger.addEventListener('click', function () {
      setDrawer(!drawer.classList.contains('is-open'));
    });

    drawer.addEventListener('click', function (event) {
      if (event.target.closest('a')) setDrawer(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && drawer.classList.contains('is-open')) {
        setDrawer(false);
        burger.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1023 && drawer.classList.contains('is-open')) setDrawer(false);
    });
  }

  /* ---------------------------------------------------------------------
     3. Reveal on scroll
     --------------------------------------------------------------------- */
  var revealables = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window) || reduceMotion) {
    Array.prototype.forEach.call(revealables, function (el) {
      el.classList.add('is-in');
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var delay = parseFloat(entry.target.getAttribute('data-delay') || '0');
          window.setTimeout(function () {
            entry.target.classList.add('is-in');
          }, delay * 1000);
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    Array.prototype.forEach.call(revealables, function (el) {
      revealObserver.observe(el);
    });
  }

  /* ---------------------------------------------------------------------
     4. Animated counters
     --------------------------------------------------------------------- */
  var counters = document.querySelectorAll('[data-count]');

  var formatNumber = function (value, decimals, locale) {
    return value.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  var runCounter = function (el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    var locale = document.documentElement.lang || 'en';
    var duration = 1600;
    var start = null;

    if (reduceMotion) {
      el.textContent = formatNumber(target, decimals, locale);
      return;
    }

    var step = function (timestamp) {
      if (start === null) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatNumber(target * eased, decimals, locale);
      if (progress < 1) window.requestAnimationFrame(step);
      else el.textContent = formatNumber(target, decimals, locale);
    };

    window.requestAnimationFrame(step);
  };

  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(counters, runCounter);
    } else {
      var counterObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.4 }
      );
      Array.prototype.forEach.call(counters, function (el) {
        counterObserver.observe(el);
      });
    }
  }

  /* ---------------------------------------------------------------------
     5. Active section in the navigation
     --------------------------------------------------------------------- */
  var navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

  if (navLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    var sections = [];

    Array.prototype.forEach.call(navLinks, function (link) {
      var id = link.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (!section) return;
      byId[id] = link;
      sections.push(section);
    });

    var sectionObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          Array.prototype.forEach.call(navLinks, function (link) {
            link.classList.remove('is-active');
          });
          var active = byId[entry.target.id];
          if (active) active.classList.add('is-active');
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  /* ---------------------------------------------------------------------
     6. Contact form (demo only — nothing is sent anywhere)
     --------------------------------------------------------------------- */
  var form = document.querySelector('[data-demo-form]');

  if (form) {
    var success = form.querySelector('[data-form-success]');
    var submit = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      if (submit) {
        submit.disabled = true;
        submit.style.opacity = '0.7';
      }
      // role="status" est deja dans le HTML : une live region doit exister avant
      // le changement de contenu pour etre annoncee par un lecteur d'ecran.
      if (success) success.classList.add('is-visible');
      form.reset();

      window.setTimeout(function () {
        if (submit) {
          submit.disabled = false;
          submit.style.opacity = '';
        }
      }, 1200);
    });
  }

  /* ---------------------------------------------------------------------
     7. Hero video — pause/play control (WCAG 2.2.2: the animation auto-starts
        and loops, so it must be stoppable), off-screen pause, reduced motion
     --------------------------------------------------------------------- */
  var video = document.querySelector('[data-hero-video]');
  var videoToggle = document.querySelector('[data-video-toggle]');

  if (video) {
    // Vrai des que l'utilisateur a demande l'arret : l'observer ne doit alors
    // plus relancer la lecture quand la section repasse a l'ecran.
    var stoppedByUser = reduceMotion;

    var safePlay = function () {
      var playing = video.play();
      if (playing && typeof playing.catch === 'function') playing.catch(function () {});
    };

    var paintToggle = function (paused) {
      if (!videoToggle) return;
      videoToggle.setAttribute(
        'aria-label',
        paused ? videoToggle.getAttribute('data-label-play') : videoToggle.getAttribute('data-label-pause')
      );
      var icons = videoToggle.querySelectorAll('svg');
      if (icons.length === 2) {
        icons[0].style.display = paused ? 'none' : 'block';
        icons[1].style.display = paused ? 'block' : 'none';
      }
    };

    if (reduceMotion) {
      video.pause();
      video.removeAttribute('autoplay');
    }
    paintToggle(reduceMotion);

    if (videoToggle) {
      videoToggle.addEventListener('click', function () {
        stoppedByUser = !video.paused;
        if (stoppedByUser) video.pause();
        else safePlay();
        paintToggle(stoppedByUser);
      });
    }

    if ('IntersectionObserver' in window) {
      var videoObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              if (!stoppedByUser) safePlay();
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.05 }
      );
      videoObserver.observe(video);
    }
  }

  /* ---------------------------------------------------------------------
     8. Simulateur de production solaire
        Modele simplifie mais coherent : autoconsommation + revente du surplus,
        moins l'exploitation, avec inflation de l'energie et perte de rendement
        des modules. Les libelles restent dans le HTML, seuls les nombres sont
        ecrits ici — le fichier sert donc les deux langues sans modification.
     --------------------------------------------------------------------- */
  var sim = document.querySelector('[data-sim]');

  if (sim) {
    var SVG_NS = 'http://www.w3.org/2000/svg';

    var M = {
      kwcPerM2: 0.17,
      buyPrice: 0.19, // €/kWh achete au reseau
      sellPrice: 0.078, // €/kWh du surplus revendu
      opexPerKwc: 12, // €/kWc/an
      inflation: 0.03,
      degradation: 0.004,
      co2PerKwh: 0.06, // kg CO2e evites (mix electrique francais)
      years: 25
    };

    // Cout degressif par TRANCHES successives, pas par palier applique a la puissance
    // totale : avec un tarif unique choisi sur le total, franchir 500 kWc faisait
    // BAISSER l'investissement estime (2 900 m² : 468 000 €, 3 000 m² : 418 000 €).
    var capexOf = function (kwc) {
      return 1100 * Math.min(kwc, 100)
        + 950 * Math.max(0, Math.min(kwc, 500) - 100)
        + 820 * Math.max(0, kwc - 500);
    };

    var locale = document.documentElement.lang || 'fr';
    var nf = function (opts) { return new Intl.NumberFormat(locale, opts); };
    var fInt = nf({ maximumFractionDigits: 0 });
    var fOne = nf({ minimumFractionDigits: 1, maximumFractionDigits: 1 });
    var fEur = nf({ style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
    var fPct = nf({ style: 'percent', maximumFractionDigits: 0 });
    // Notation compacte pour l'axe du graphe : « 1,5 M€ » tient, « 1 464 832 € » non.
    var fEurShort;
    try {
      fEurShort = nf({ style: 'currency', currency: 'EUR', notation: 'compact', maximumFractionDigits: 1 });
    } catch (e) {
      fEurShort = fEur;
    }

    var inputs = sim.querySelectorAll('[data-in]');
    var echoes = sim.querySelectorAll('[data-echo]');
    var chart = sim.querySelector('[data-sim-chart]');
    var live = sim.querySelector('[data-sim-live]');
    var firstPaint = true;
    var liveTimer = null;

    var readInputs = function () {
      var v = {};
      Array.prototype.forEach.call(inputs, function (el) {
        var key = el.getAttribute('data-in');
        if (el.type === 'radio') { if (el.checked) v[key] = parseFloat(el.value); }
        else v[key] = parseFloat(el.value);
      });
      return v;
    };

    var compute = function (v) {
      var power = v.surface * M.kwcPerM2;
      var prodKwh = power * v.zone;
      var consoKwh = v.conso * 1000;
      var selfKwh = Math.min(prodKwh * v.self, consoKwh);
      var surplusKwh = Math.max(0, prodKwh - selfKwh);
      var opex = power * M.opexPerKwc;
      var net = selfKwh * M.buyPrice + surplusKwh * M.sellPrice - opex;
      var capex = capexOf(power);

      // Cumul annuel : l'energie se valorise avec l'inflation, les modules perdent
      // un peu de rendement chaque annee, l'exploitation reste due tous les ans.
      var cum = [0];
      for (var y = 1; y <= M.years; y++) {
        var priceFactor = Math.pow(1 + M.inflation, y - 1);
        var yieldFactor = Math.pow(1 - M.degradation, y - 1);
        var gross = (selfKwh * M.buyPrice + surplusKwh * M.sellPrice) * priceFactor * yieldFactor;
        cum.push(cum[y - 1] + gross - opex);
      }

      // Annee de rentabilite, interpolee entre deux points du cumul
      var payback = null;
      for (var i = 1; i < cum.length; i++) {
        if (cum[i] >= capex) {
          var span = cum[i] - cum[i - 1];
          payback = i - 1 + (span > 0 ? (capex - cum[i - 1]) / span : 0);
          break;
        }
      }

      return {
        power: power,
        prodMwh: prodKwh / 1000,
        net: net,
        capex: capex,
        payback: payback,
        cover: consoKwh > 0 ? Math.min(1, selfKwh / consoKwh) : 0,
        co2: (prodKwh * M.co2PerKwh) / 1000,
        cum: cum
      };
    };

    var node = function (tag, attrs, text) {
      var n = document.createElementNS(SVG_NS, tag);
      for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) n.setAttribute(k, attrs[k]);
      if (text != null) n.textContent = text;
      return n;
    };

    var drawChart = function (r) {
      if (!chart) return;
      while (chart.firstChild) chart.removeChild(chart.firstChild);

      // Sur un ecran etroit le viewBox large ecrasait le texte a ~5px : on passe
      // a une geometrie compacte et on pose les montants au-dessus des lignes
      // plutot qu'a gauche, faute de place pour une colonne d'etiquettes.
      var narrow = (chart.clientWidth || 700) < 520;
      var W = narrow ? 340 : 720;
      var H = narrow ? 280 : 260;
      // Le SVG est mis a l'echelle par sa largeur CSS : un font-size exprime en unites
      // de viewBox ne vaut pas la meme chose a l'ecran. On vise 12px reels, ce qui
      // evite le texte a 9px du mode large.
      var fs = 12 * W / (chart.clientWidth || W);
      // La colonne des montants doit suivre la taille du texte, sinon « 500 k € »
      // deborde a gauche du viewBox et se retrouve rogne.
      var padL = narrow ? 8 : Math.round(fs * 5);
      var padR = narrow ? 10 : 14;
      var padT = narrow ? 20 : 16;
      var padB = narrow ? 30 : 34;
      chart.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

      // Echelle « ronde » : on choisit d'abord un pas lisible, le haut du graphe
      // en decoule. Sinon les graduations tombent sur des montants arbitraires
      // du genre 366 208 € au lieu de 400 k€.
      var raw = Math.max(r.cum[M.years], r.capex) || 1;
      var niceStep = function (x) {
        var exp = Math.floor(Math.log(x) / Math.LN10);
        var base = Math.pow(10, exp);
        var f = x / base;
        var mult = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
        return mult * base;
      };
      var step = niceStep(raw / 4);
      var top = step * 4;
      var x = function (year) { return padL + (year / M.years) * (W - padL - padR); };
      var y = function (val) { return H - padB - (val / top) * (H - padT - padB); };

      // Grille + echelle des montants
      for (var g = 0; g <= 4; g++) {
        var val = step * g;
        var gy = y(val);
        chart.appendChild(node('line', { x1: padL, x2: W - padR, y1: gy, y2: gy, stroke: '#e6e8e4', 'stroke-width': 1 }));
        chart.appendChild(node('text', narrow
          ? { x: padL + 2, y: gy - 5, 'text-anchor': 'start', 'font-size': fs, fill: '#626977', 'font-family': 'inherit' }
          : { x: padL - 10, y: gy + 4, 'text-anchor': 'end', 'font-size': fs, fill: '#626977', 'font-family': 'inherit' },
          fEurShort.format(val)));
      }

      // Annees en abscisse
      for (var t = 0; t <= M.years; t += 5) {
        chart.appendChild(node('text', {
          x: x(t), y: H - 10, 'text-anchor': t === 0 ? 'start' : t === M.years ? 'end' : 'middle',
          'font-size': fs, fill: '#626977', 'font-family': 'inherit'
        }, String(t)));
      }

      // Aire + courbe du cumul
      var line = '', area = 'M ' + x(0) + ' ' + y(0);
      for (var i = 0; i <= M.years; i++) {
        var px = x(i), py = y(Math.max(0, r.cum[i]));
        line += (i === 0 ? 'M ' : ' L ') + px + ' ' + py;
        area += ' L ' + px + ' ' + py;
      }
      area += ' L ' + x(M.years) + ' ' + y(0) + ' Z';

      chart.appendChild(node('path', { d: area, fill: 'rgba(92,125,82,0.13)' }));
      var path = node('path', {
        d: line, fill: 'none', stroke: '#5C7D52', 'stroke-width': 2.5,
        'stroke-linejoin': 'round', 'stroke-linecap': 'round'
      });
      chart.appendChild(path);

      // Investissement a rembourser
      chart.appendChild(node('line', {
        x1: padL, x2: W - padR, y1: y(r.capex), y2: y(r.capex),
        stroke: '#6B7280', 'stroke-width': 1.5, 'stroke-dasharray': '6 5'
      }));

      // Point de bascule
      if (r.payback != null && r.payback <= M.years) {
        var bx = x(r.payback), by = y(r.capex);
        // Vert vif reserve au remplissage : sur ce fond clair il ne fait que 2,4:1,
        // insuffisant pour un element graphique porteur de sens (WCAG 1.4.11).
        chart.appendChild(node('line', { x1: bx, x2: bx, y1: by, y2: H - padB, stroke: '#4a6541', 'stroke-width': 1.5, 'stroke-dasharray': '4 4' }));
        chart.appendChild(node('circle', { cx: bx, cy: by, r: 6, fill: '#74b72e', stroke: '#3f5837', 'stroke-width': 2 }));
        var suffix = sim.getAttribute('data-payback-suffix') || '';
        var label = fOne.format(r.payback) + (suffix ? ' ' + suffix : '');
        var labelX = Math.min(bx + 10, W - padR - fs * 0.62 * label.length);
        chart.appendChild(node('text', {
          x: Math.max(padL, labelX), y: by - 12, 'font-size': fs * 1.12, 'font-weight': 700,
          fill: '#3f5837', 'font-family': 'inherit'
        }, label));
      }

      // Trace anime au premier affichage seulement
      if (firstPaint && !reduceMotion && typeof path.getTotalLength === 'function') {
        var len = path.getTotalLength();
        if (len) {
          path.style.strokeDasharray = len;
          path.style.strokeDashoffset = len;
          path.getBoundingClientRect();
          path.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(.22,1,.36,1)';
          path.style.strokeDashoffset = '0';
        }
      }
    };

    var fill = function (key, value) {
      var el = sim.querySelector('[data-kpi="' + key + '"]');
      if (el) el.textContent = value;
    };

    var render = function (announce) {
      var v = readInputs();
      var r = compute(v);

      Array.prototype.forEach.call(echoes, function (el) {
        var key = el.getAttribute('data-echo');
        var unit = el.getAttribute('data-unit') || '';
        var text = fInt.format(v[key]) + ' ' + unit;
        el.textContent = text;
        // Sans aria-valuetext, un lecteur d'ecran annonce « 1200 » sans son unite.
        var slider = sim.querySelector('input[data-in="' + key + '"]');
        if (slider) slider.setAttribute('aria-valuetext', text);
      });

      var paybackText = r.payback == null ? '—' : fOne.format(r.payback);
      fill('power', fInt.format(r.power));
      fill('prod', fInt.format(r.prodMwh));
      fill('saving', fInt.format(Math.round(r.net / 100) * 100));
      fill('payback', paybackText);
      fill('cover', fPct.format(r.cover));
      fill('co2', fInt.format(r.co2) + ' t');
      fill('capex', fEur.format(Math.round(r.capex / 1000) * 1000));

      drawChart(r);

      var summary = (sim.getAttribute('data-summary') || '')
        .replace('{surface}', fInt.format(v.surface))
        .replace('{conso}', fInt.format(v.conso))
        .replace('{power}', fInt.format(r.power))
        .replace('{prod}', fInt.format(r.prodMwh))
        .replace('{saving}', fInt.format(Math.round(r.net / 100) * 100))
        .replace('{payback}', paybackText);

      if (chart) chart.setAttribute('aria-label', summary);
      // Au clavier, chaque appui sur une fleche emet un evenement « change » : sans
      // ce delai la region live recevrait une phrase entiere par appui et la file
      // d'annonces prendrait un retard permanent sur ce qui est affiche.
      if (announce && live) {
        window.clearTimeout(liveTimer);
        liveTimer = window.setTimeout(function () { live.textContent = summary; }, 700);
      }

      firstPaint = false;
    };

    Array.prototype.forEach.call(inputs, function (el) {
      el.addEventListener('input', function () { render(false); });
      el.addEventListener('change', function () { render(true); });
    });

    // Nom distinct de la variable `form` de la section 6 : tout ce fichier est une
    // seule IIFE, un `var form` ici reassignerait celui du formulaire de contact et
    // sa validation comme son reset viseraient le mauvais formulaire.
    var simForm = sim.querySelector('[data-sim-form]');
    if (simForm) simForm.addEventListener('submit', function (e) { e.preventDefault(); });

    // Trace sans consommer firstPaint : l'animation reste due au premier passage
    // reellement visible de la section, quel que soit le nombre de rendus
    // preparatoires (mise en route, redimensionnement avant d'y arriver).
    var renderKeepingIntro = function () {
      var pending = firstPaint;
      render(false);
      firstPaint = pending;
    };

    // La geometrie du graphe depend de la largeur disponible : on le retrace quand
    // elle change (rotation d'un telephone, redimensionnement d'une fenetre).
    var resizeTimer = null;
    var lastNarrow = null;
    window.addEventListener('resize', function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(function () {
        var isNarrow = (chart && chart.clientWidth ? chart.clientWidth : 700) < 520;
        if (isNarrow === lastNarrow) return;
        lastNarrow = isNarrow;
        renderKeepingIntro();
      }, 180);
    }, { passive: true });

    // Premier trace anime quand la section approche de l'ecran
    if ('IntersectionObserver' in window) {
      var simObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          render(false);
          simObserver.disconnect();
        });
      }, { threshold: 0.15 });
      simObserver.observe(sim);
      renderKeepingIntro(); // valeurs coherentes avant meme d'arriver a la section
    } else {
      render(false);
    }
  }

  /* ---------------------------------------------------------------------
     9. Year stamp
     --------------------------------------------------------------------- */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
