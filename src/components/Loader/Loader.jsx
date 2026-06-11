/**
 * Loader.jsx
 *
 * Composant d'animation de chargement construit avec :
 *  - React (hooks : useEffect, useRef)
 *  - GSAP 3 (gsap core + DrawSVGPlugin)
 *
 * Principe visuel :
 *  Un arc SVG simule un objet qui « saute » d'un point à un autre.
 *  Deux ellipses jouent le rôle d'ondes de choc (ripples) à chaque atterrissage.
 *  Un reflet semi-transparent de l'arc est calculé automatiquement.
 *  Un filtre SVG de glow cyan est appliqué sur l'arc principal et son reflet.
 */

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

// On enregistre le plugin DrawSVGPlugin une seule fois au niveau du module.
// Sans ça, GSAP ignore la propriété `drawSVG`.
gsap.registerPlugin(DrawSVGPlugin);

// ─── Constantes de design ───────────────────────────────────────────────────
const COLOR_ACCENT  = '#33FFFF'; // cyan néon — couleur principale de l'arc
const BG_COLOR      = 'hsl(150, 2%, 16%)'; // gris-vert sombre de fond
const ANIM_SPEED    = 3;          // facteur de vitesse global (timeScale)
const BASE_DUR      = 0.4;        // durée de base d'une phase en secondes (avant timeScale)

// ─── Composant ─────────────────────────────────────────────────────────────
export default function Loader() {
  // Refs vers les nœuds SVG que GSAP doit animer.
  // useRef évite de recourir à querySelector et garde le code React-friendly.
  const arcRef         = useRef(null); // arc principal (le « saut »)
  const arcReflectRef  = useRef(null); // reflet de l'arc (dupliqué)
  const circleLeftRef  = useRef(null); // ellipse gauche (point de départ)
  const circleRightRef = useRef(null); // ellipse droite (point d'arrivée)
  const svgRef         = useRef(null); // SVG racine (utile si besoin d'extension)

  useEffect(() => {
    // ── Raccourcis vers les éléments DOM ──────────────────────────────────
    const arc        = arcRef.current;
    const arcReflect = arcReflectRef.current;
    const circleL   = circleLeftRef.current;
    const circleR   = circleRightRef.current;

    // Sécurité : on ne lance pas l'animation si un élément est absent.
    if (!arc || !arcReflect || !circleL || !circleR) return;

    // ── Application du filtre glow sur l'arc et son reflet ─────────────────
    // Le filtre est déclaré dans le bloc <defs> du SVG masqué.
    // On l'applique en JS pour garder le JSX propre.
    const glowUrl = 'url(#strokeGlow)';
    gsap.set([arc, arcReflect], { filter: glowUrl });

    // ── Durées de chaque phase (en secondes, avant timeScale) ─────────────
    // On travaille avec des positions absolues sur la timeline (paramètre `t`)
    // pour éviter tout décalage entre cycles. Les positions "<" ou "-=x" sont
    // évitées ici car elles se cumulent mal avec repeat: -1.
    //
    // Schéma temporel du cycle complet :
    //
    //  t=0.00  reset  (set instantané)
    //  t=0.00  arc   : drawSVG 0%→30%   (0.40 s) → tête de l'arc apparaît
    //  t=0.00  rippleL: rx 0→30, fade   (1.00 s) → onde de choc gauche
    //  t=0.40  arc   : drawSVG 70%→100% (0.70 s) → queue de l'arc disparaît
    //  t=0.80  rippleR: rx 0→30, fade   (1.00 s) → onde de choc droite
    //  t=1.10  fin du cycle → GSAP repart à t=0 proprement

    const T_ARC_HEAD   = 0;    // début du dessin de la tête
    const D_ARC_HEAD   = 0.40; // durée dessin tête
    const T_ARC_TAIL   = 0.40; // début effacement de la queue
    const D_ARC_TAIL   = 0.70; // durée effacement queue
    const T_RIPPLE_L   = 0;    // onde gauche démarre en même temps que l'arc
    const D_RIPPLE     = 1.00; // durée des deux ripples
    const T_RIPPLE_R   = 0.80; // onde droite — légèrement après l'atterrissage

    // ── Timeline principale : repeat: -1 + onRepeat pour le reset ─────────
    //
    // Le reset est fait dans `onRepeat` (et `onStart` pour la 1ʳᵉ itération).
    // C'est la seule façon fiable de réinitialiser les valeurs AVANT chaque
    // nouveau cycle quand on utilise repeat: -1 sans sous-timeline.
    const resetAll = () => {
      gsap.set([arc, arcReflect], { drawSVG: '0% 0%' });
      gsap.set([circleL, circleR], { attr: { rx: 0, ry: 0 }, opacity: 1 });
    };

    const master = gsap.timeline({
      repeat: -1,
      onStart:  resetAll, // 1ʳᵉ lecture
      onRepeat: resetAll, // chaque répétition suivante
    });

    master
      // ── Phase 1 : la tête de l'arc apparaît (départ du saut) ─────────────
      // drawSVG '0% 0%' → '0% 30%' : on dessine les 30 premiers % du chemin
      .to(
        [arc, arcReflect],
        { drawSVG: '0% 30%', duration: D_ARC_HEAD, ease: 'none' },
        T_ARC_HEAD
      )

      // ── Phase 2 : onde de choc gauche (décollage) ─────────────────────────
      // L'ellipse gonfle et s'évanouit pendant que l'arc est déjà en vol
      .to(
        circleL,
        { attr: { rx: 30, ry: 10 }, opacity: 0, duration: D_RIPPLE, ease: 'power2.out' },
        T_RIPPLE_L
      )

      // ── Phase 3 : la queue de l'arc quitte le point de départ ─────────────
      // drawSVG '0% 30%' → '100% 100%' : le segment de 30 % glisse jusqu'à
      // la fin du chemin, puis disparaît complètement
      .to(
        [arc, arcReflect],
        { drawSVG: '100% 100%', duration: D_ARC_TAIL, ease: 'none' },
        T_ARC_TAIL
      )

      // ── Phase 4 : onde de choc droite (atterrissage) ──────────────────────
      .to(
        circleR,
        { attr: { rx: 30, ry: 10 }, opacity: 0, duration: D_RIPPLE, ease: 'power2.out' },
        T_RIPPLE_R
      );

    // Accélération globale — on accélère APRÈS avoir défini toutes les durées
    // pour que les positions absolues restent lisibles en « temps réel ».
    master.timeScale(ANIM_SPEED);

    // ── Nettoyage React ───────────────────────────────────────────────────
    // Appelé quand le composant est démonté pour éviter les fuites mémoire.
    return () => {
      master.kill();
    };
  }, []); // tableau vide = on n'exécute l'effet qu'une seule fois au montage

  // ── Rendu ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/*
       * SVG masqué contenant uniquement les <defs>.
       * Il est invisible (width/height = 0) mais doit être dans le DOM
       * pour que le filtre #strokeGlow soit résolu par le navigateur.
       */}
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
      >
        <defs>
          {/*
           * Filtre de glow « stroke » :
           * Principe — on floute le tracé à 3 niveaux d'intensité différents,
           * puis on les superpose avec feMerge pour simuler un halo lumineux.
           * La source In="StrokePaint" cible uniquement le contour,
           * ce qui donne un effet néon très propre.
           */}
          <filter id="strokeGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feOffset in="StrokePaint" dx="0" dy="0" result="centered" />

            {/* Flou fin (halo serré) */}
            <feGaussianBlur in="centered" stdDeviation="2"  result="blur1" />
            {/* Flou moyen */}
            <feGaussianBlur in="centered" stdDeviation="5"  result="blur2" />
            {/* Flou large (lueur diffuse) */}
            <feGaussianBlur in="centered" stdDeviation="15" result="blur3" />

            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="blur3" />
              {/* On superpose la source d'origine pour garder un trait net au centre */}
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ── Conteneur plein écran ── */}
      <div style={styles.page}>

        {/* ── Scène de l'animation ── */}
        <div style={styles.scene}>
          <svg
            ref={svgRef}
            id="loader"
            xmlns="http://www.w3.org/2000/svg"
            width="260"
            height="200"
            viewBox="0 0 260 200"
            aria-label="Chargement en cours"
            role="img"
          >
            {/*
             * Groupe avec overflow visible pour que le glow
             * ne soit pas rogné par le viewBox.
             */}
            <g style={{ overflow: 'visible' }}>

              {/*
               * Arc principal — représente l'objet en vol.
               * drawSVG part de 0% et sera animé par GSAP.
               * strokeLinecap="round" adoucit les extrémités.
               */}
              <path
                ref={arcRef}
                id="jump"
                fill="none"
                stroke={COLOR_ACCENT}
                strokeWidth="10"
                strokeLinecap="round"
                strokeMiterlimit="10"
                d="M55.5 98.5 c0-35.3 31.3-64 70-64 s70 28.7 70 64"
              />

              {/*
               * Reflet de l'arc — même chemin, pivoté sur l'axe horizontal.
               * La transformation `scaleY(-1)` avec transform-origin centré
               * simule un reflet sur le sol.
               * opacity 0.09 → très discret, juste un hint de profondeur.
               */}
              <path
                ref={arcReflectRef}
                fill="none"
                stroke={COLOR_ACCENT}
                strokeWidth="10"
                strokeLinecap="round"
                strokeMiterlimit="10"
                d="M55.5 98.5 c0-35.3 31.3-64 70-64 s70 28.7 70 64"
                style={{
                  transformOrigin: '50% 110%',
                  transform: 'scaleY(-1)',
                  opacity: 0.09,
                }}
              />
            </g>

            {/*
             * Ellipses d'impact (ripples).
             * Elles partent de rx=0, ry=0 et sont agrandies par GSAP.
             * stroke fin pour un aspect onde sonore / splash.
             */}
            <g
              fill="none"
              strokeWidth="1.5"
              stroke={COLOR_ACCENT}
              strokeLinecap="round"
              strokeMiterlimit="10"
            >
              {/* Ripple gauche — point de départ du saut */}
              <ellipse
                ref={circleLeftRef}
                id="circleL"
                cx="55.5"
                cy="102.5"
                rx="0"
                ry="0"
              />
              {/* Ripple droite — point d'atterrissage */}
              <ellipse
                ref={circleRightRef}
                id="circleR"
                cx="195.5"
                cy="102.5"
                rx="0"
                ry="0"
              />
            </g>
          </svg>
          <p>Chargement en cours !</p>
        </div>

      </div>
    </>
  );
}

// ─── Styles inline (objet JS) ────────────────────────────────────────────────
// Utiliser des styles inline évite toute dépendance à un fichier CSS externe
// et rend le composant totalement autonome (copy-paste ready).
const styles = {
  /** Fond plein écran centré */
  page: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    backgroundColor: BG_COLOR,
    // Subtil grain de texture via un dégradé radial — évite le fond "plat"
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(150, 6%, 20%) 0%, hsl(150, 2%, 13%) 100%)',
  },

  /** Conteneur de la scène SVG — isole l'overflow du glow */
  scene: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
};