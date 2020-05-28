import React, {useEffect} from 'react';
import mojs from 'mo-js';
import logo from './logo.svg';
import './App.scss';

const App = () => {

  useEffect(() => {

const qs = document.querySelector.bind(document);
const easingHeart = mojs.easing.path('M0,100C2.9,86.7,33.6-7.3,46-7.3s15.2,22.7,26,22.7S89,0,100,0');

const el = {
  container: qs('.mo-container'),
  
  i: qs('.lttr--I'),
  l: qs('.lttr--L'),
  o: qs('.lttr--O'),
  v: qs('.lttr--V'),
  e: qs('.lttr--E'),
  y: qs('.lttr--Y'),
  o2: qs('.lttr--O2'),
  u: qs('.lttr--U'),
  
  lineLeft: qs('.line--left'),
  lineRight: qs('.line--rght'),
  
  colTxt: "#763c8c",
  colHeart: "#fa4843",
  
  blup: qs('.blup'),
  blop: qs('.blop'),
  sound: qs('.sound')
};

class Heart extends mojs.CustomShape {
  getShape() {
    return '<path d="M50,88.9C25.5,78.2,0.5,54.4,3.8,31.1S41.3,1.8,50,29.9c8.7-28.2,42.8-22.2,46.2,1.2S74.5,78.2,50,88.9z"/>';
  }
  getLength () { return 200; }
}
mojs.addShape('heart', Heart);

const crtBoom = (delay = 0, x = 0, rd = 46) => {
  let parent = el.container;
  const crcl = new mojs.Shape({
    shape:        'circle',
    fill:         'none',
    stroke:        el.colTxt,
    strokeWidth:  { 5 : 0 },
    radius:       { [rd] : [rd + 20] },
    easing:       'quint.out',
    duration:     500 / 3,
    parent,
    delay,
    x
  });
  
  const brst = new mojs.Burst({
    radius:       { [rd + 15] : 110 },
    angle:        'rand(60, 180)',
    count:        3,
    timeline:     { delay },
    parent,
    x,
    children: {
      radius:       [5, 3, 7],
      fill:         el.colTxt,
      scale:        { 1: 0, easing: 'quad.in' },
      pathScale:    [ .8, null ],
      degreeShift:  [ 'rand(13, 60)', null ],
      duration:     1000 / 3,
      easing:       'quint.out'
    }
  });
  
  return [crcl, brst];
};

const crtLoveTl = () => {
  const move        = 1000;
  const boom        = 200;
  const easing      = 'sin.inOut';
  const easingBoom  = 'sin.in';
  const easingOut   = 'sin.out';
  const opts        = { duration: move, easing, opacity: 1 };
  const delta       = 150;
  
  return (new mojs.Timeline).add([
    new mojs.Tween({
      duration: move,
      onStart: () => {
        [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
          el.style.opacity = 1;
          el.style = 'transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;'
        })
      },
      onComplete: () => {
        [el.l, el.o, el.v, el.e].forEach(el => el.style.opacity = 0);
        el.blop.play();
      }
    }),
    
    new mojs.Tween({
      duration: move * 2 + boom,
      onComplete: () => {
        [el.y, el.o2].forEach(el => el.style.opacity = 0);
        el.blop.play();
      }
    }),
  
    new mojs.Tween({
      duration: move * 3 + boom * 2 - delta,
      onComplete: () => { 
        el.i.style.opacity = 0;
        el.blop.play();
      }
    }),
  
    new mojs.Tween({
      duration: move * 3 + boom * 2,
      onComplete: () => { 
        el.u.style.opacity = 0; 
        el.blup.play();
      }
    }),
  
    new mojs.Tween({
      duration: 50,
      delay: 4050,
      onUpdate: (progress) => {
        [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
          el.style = `transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: ${1 * progress};`
        })
      },
      onComplete: () => {
        [el.i, el.l, el.o, el.v, el.e, el.y, el.o2, el.u].forEach(el => {
          el.style.opacity = 1;
          el.style = 'transform: translate(0px, 0px) rotate(0deg) skew(0deg, 0deg) scale(1, 1); opacity: 1;'
        })
      }
    }),
    
    new mojs.Html({
      ...opts,
      el: el.lineLeft,
      x: { 0 : 52 },
    }).then({
      duration: boom + move,
      easing,
      x: { to : 52 + 54 }
    }).then({
      duration: boom + move,
      easing,
      x: { to : 52 + 54 + 60 }
    }).then({
      duration: 150, // 3550
      easing,
      x: { to : 52 + 54 + 60 + 10 }
    }).then({
      duration: 300
    }).then({
      duration: 350,
      x: { to : 0 },
      easing: easingOut
    }),
    
    new mojs.Html({
      ...opts,
      el: el.lineRight,
      x: { 0 : -52 },
    }).then({
      duration: boom + move,
      easing,
      x: { to : -52 - 54 }
    }).then({
      duration: boom + move,
      easing,
      x: { to : -52 - 54 - 60 }
    }).then({
      duration: 150,
      easing,
      x: { to : -52 - 54 - 60 - 10 }
    }).then({
      duration: 300
    }).then({
      duration: 350,
      x: { to : 0 },
      easing: easingOut,
    }),
    
    new mojs.Html({ // [I] LOVE YOU
      ...opts,
      el: el.i,
      x: { 0 : 34 },
    }).then({
      duration: boom,
      easing: easingBoom,
      x: { to : 34 + 19 }
    }).then({
      duration: move,
      easing,
      x: { to : 34 + 19 + 40 }
    }).then({
      duration: boom,
      easing: easingBoom,
      x: { to : 34 + 19 + 40 + 30 }
    }).then({
      duration: move,
      easing,
      x: { to : 34 + 19 + 40 + 30 + 30 }
    }),
    
    new mojs.Html({ // I [L]OVE YOU
      ...opts,
      el: el.l,
      x: { 0 : 15 },
    }),
    
    new mojs.Html({ // I L[O]VE YOU
      ...opts,
      el: el.o,
      x: { 0 : 11 },
    }),
    
    new mojs.Html({ // I LO[V]E YOU
      ...opts,
      el: el.v,
      x: { 0 : 3 },
    }),
    
    new mojs.Html({ // I LOV[E] YOU
      ...opts,
      el: el.e,
      x: { 0 : -3 },
    }),
    
    new mojs.Html({ // I LOVE [Y]OU
      ...opts,
      el: el.y,
      x: { 0 : -20 },
    }).then({
      duration: boom,
      easing: easingBoom,
      x: { to : -20 - 33}
    }).then({
      duration: move,
      easing,
      x: { to : -20 - 33 - 24 }
    }),
    
    new mojs.Html({ // I LOVE Y[O]U
      ...opts,
      el: el.o2,
      x: { 0 : -27 },
    }).then({
      duration: boom,
      easing: easingBoom,
      x: { to : -27 - 27}
    }).then({
      duration: move,
      easing,
      x: { to : -27 - 27 - 30 }
    }),
    
    new mojs.Html({ // I LOVE YO[U]
      ...opts,
      el: el.u,
      x: { 0 : -32 },
    }).then({
      duration: boom,
      easing: easingBoom,
      x: { to : -32 - 21}
    }).then({
      duration: move,
      easing,
      x: { to : -32 - 21 - 36 }
    }).then({
      duration: boom,
      easing: easingBoom,
      x: { to : -32 - 21 - 36 - 31 }
    }).then({
      duration: move,
      easing,
      x: { to : -32 - 21 - 36 - 31 - 27 }
    }),
    
    new mojs.Shape({
      parent: el.container,
      shape: 'heart',
      delay: move,
      fill: el.colHeart,
      x: -64,
      scale: { 0 : 0.95, easing: easingHeart },
      duration: 500
    }).then({
      x: { to : -62, easing },
      scale: { to : 0.65, easing },
      duration: boom + move - 500,
    }).then({
      duration: boom - 50,
      x: { to: -62 + 48 },
      scale: { to : 0.90 },
      easing: easingBoom
    }).then({
      duration:  125,
      scale: { to : 0.8 },
      easing: easingOut
    }).then({
      duration:  125,
      scale: { to : 0.85 },
      easing: easingOut
    }).then({
      duration: move - 200,
      scale: { to : 0.45 },
      easing
    }).then({
      delay: -75,
      duration: 150,
      x: { to: 0 },
      scale: { to : 0.90 },
      easing: easingBoom
    }).then({
      duration:  125,
      scale: { to : 0.8 },
      easing: easingOut
    }).then({
      duration:  125, // 3725
      scale: { to : 0.85 },
      easing: easingOut
    }).then({
      duration: 125, // 3850
    }).then({
      duration: 350,
      scale: { to : 0 },
      easing: easingOut
    }),
    
    ...crtBoom(move, -64, 46),
    ...crtBoom(move * 2 + boom, 18, 34),
    ...crtBoom(move * 3 + boom * 2 - delta, -64, 34),
    ...crtBoom(move * 3 + boom * 2, 45, 34)
  ]);
};

const loveTl = crtLoveTl().play();
setInterval(() => { loveTl.replay() }, 4300);

const volume = 0.2;
el.blup.volume = volume;
el.blop.volume = volume;

const toggleSound = () => {
  let on = true;
  return () => {
    if (on) {
      el.blup.volume = 0.0;
      el.blop.volume = 0.0;
      el.sound.classList.add('sound--off')
    }
    else {
      el.blup.volume = volume;
      el.blop.volume = volume;
      el.sound.classList.remove('sound--off')
    }
    on = !on;
  }
}
el.sound.addEventListener('click', toggleSound());

  }, [])

  return (
    <>
 <div className="container">
        <svg className="svg-container" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 200">
          <line className="line line--left" x1={10} y1={17} x2={10} y2={183}> </line>
          <line className="line line--rght" x1={490} y1={17} x2={490} y2={183}> </line>
          <g>
            <path className="lttr lttr--I" d="M42.2,73.9h11.4v52.1H42.2V73.9z" />
            <path className="lttr lttr--L" d="M85.1,73.9h11.4v42.1h22.8v10H85.1V73.9z" />
            <path className="lttr lttr--O" d="M123.9,100c0-15.2,11.7-26.9,27.2-26.9s27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9S123.9,115.2,123.9,100zM166.9,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C160.1,116.5,166.9,109.2,166.9,100z"> </path>
            <path className="lttr lttr--V" d="M180.7,73.9H193l8.4,22.9c1.7,4.7,3.5,9.5,5,14.2h0.1c1.7-4.8,3.4-9.4,5.2-14.3l8.6-22.8h11.7l-19.9,52.1h-11.5L180.7,73.9z" />
            <path className="lttr lttr--E" d="M239.1,73.9h32.2v10h-20.7v10.2h17.9v9.5h-17.9v12.4H272v10h-33V73.9z" />
            <path className="lttr lttr--Y" d="M315.8,102.5l-20.1-28.6H309l6.3,9.4c2,3,4.2,6.4,6.3,9.6h0.1c2-3.2,4.1-6.4,6.3-9.6l6.3-9.4h12.9l-19.9,28.5v23.6h-11.4V102.5z" />
            <path className="lttr lttr--O2" d="M348.8,100c0-15.2,11.7-26.9,27.2-26.9c15.5,0,27.2,11.7,27.2,26.9s-11.7,26.9-27.2,26.9C360.5,126.9,348.8,115.2,348.8,100z M391.8,100c0-9.2-6.8-16.5-15.8-16.5c-9,0-15.8,7.3-15.8,16.5s6.8,16.5,15.8,16.5C385,116.5,391.8,109.2,391.8,100z" />
            <path className="lttr lttr--U" d="M412.4,101.1V73.9h11.4v26.7c0,10.9,2.4,15.9,11.5,15.9c8.4,0,11.4-4.6,11.4-15.8V73.9h11v26.9c0,7.8-1.1,13.5-4,17.7c-3.7,5.3-10.4,8.4-18.7,8.4c-8.4,0-15.1-3.1-18.8-8.5C413.4,114.2,412.4,108.5,412.4,101.1z" />
          </g>
        </svg>
   <svg width="484.839990234375px" height="224.439990234375px" xmlns="http://www.w3.org/2000/svg" viewBox="147.5800048828125 -20.780004882812499 204.839990234375 124.439990234375" style={{background: '' }} preserveAspectRatio="xMidYMid"><defs><linearGradient id="editing-glowing-gradient" x1="2.8146601955249186" x2="0.18533980447508142" y1="0.8885729807284856" y2="0.11142701927151444"><stop offset="0" stop-color="#763C8C"></stop><stop offset="1" stop-color="#763C8C"></stop></linearGradient><filter id="editing-glowing" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10"></feGaussianBlur><feMerge><feMergeNode in="blur"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs><g filter="url(#editing-glowing)"><g transform="translate(182.77000284194946, 99)"><path d="M6.21-31.17L6.21-31.17L6.21-31.17Q4.03-32.83 4.03-36.38L4.03-36.38L4.03-36.38Q4.03-39.94 6.37-41.79L6.37-41.79L6.37-41.79Q8.70-43.65 12.74-43.65L12.74-43.65L12.74-43.65Q15.30-43.65 21.38-42.75L21.38-42.75L25.73-42.11L25.73-42.11Q27.90-41.86 30.18-41.86L30.18-41.86L30.18-41.86Q32.45-41.86 33.98-42.82L33.98-42.82L33.98-42.82Q36.29-40.77 36.29-37.82L36.29-37.82L36.29-37.82Q36.29-34.88 33.66-32.77L33.66-32.77L33.66-32.77Q30.98-30.53 27.52-30.53L27.52-30.53L27.52-30.53Q25.86-30.53 23.17-30.98L23.17-30.98L23.17-30.98Q20.03-21.12 20.03-14.27L20.03-14.27L20.03-14.27Q20.03-7.42 23.49-3.84L23.49-3.84L23.49-3.84Q21.89-0.96 19.52 0.16L19.52 0.16L19.52 0.16Q17.15 1.28 13.60 1.28L13.60 1.28L13.60 1.28Q10.05 1.28 7.84-0.67L7.84-0.67L7.84-0.67Q5.63-2.62 5.63-6.66L5.63-6.66L5.63-6.66Q5.63-11.33 8.19-19.01L8.19-19.01L8.19-19.01Q10.75-26.62 14.59-32.45L14.59-32.45L14.59-32.45Q12.74-32.64 10.82-32.64L10.82-32.64L10.82-32.64Q6.85-32.64 6.21-31.17ZM49.60-3.52L49.60-3.52L49.60-3.52Q47.62 1.28 41.28 1.28L41.28 1.28L41.28 1.28Q38.02 1.28 35.97-0.96L35.97-0.96L35.97-0.96Q34.24-2.94 34.24-4.93L34.24-4.93L34.24-4.93Q34.24-10.11 36.61-20.22L36.61-20.22L38.98-32.64L51.97-33.92L48.06-13.70L48.06-13.70Q46.98-8.96 46.98-7.30L46.98-7.30L46.98-7.30Q46.98-3.65 49.60-3.52ZM40.13-41.54L40.13-41.54L40.13-41.54Q40.13-44.03 42.21-45.38L42.21-45.38L42.21-45.38Q44.29-46.72 47.30-46.72L47.30-46.72L47.30-46.72Q50.30-46.72 52.13-45.38L52.13-45.38L52.13-45.38Q53.95-44.03 53.95-41.54L53.95-41.54L53.95-41.54Q53.95-39.04 51.94-37.76L51.94-37.76L51.94-37.76Q49.92-36.48 46.91-36.48L46.91-36.48L46.91-36.48Q43.90-36.48 42.02-37.76L42.02-37.76L42.02-37.76Q40.13-39.04 40.13-41.54ZM71.55-30.34L71.55-30.34L71.55-30.34Q75.01-33.92 82.30-33.92L82.30-33.92L82.30-33.92Q86.34-33.92 88.54-31.78L88.54-31.78L88.54-31.78Q90.75-29.63 90.75-25.70L90.75-25.70L90.75-25.70Q90.75-21.76 88.54-18.98L88.54-18.98L88.54-18.98Q86.34-16.19 82.24-15.04L82.24-15.04L82.24-15.04Q82.56-13.76 83.01-12.42L83.01-12.42L83.90-9.86L83.90-9.86Q85.12-6.59 86.08-5.44L86.08-5.44L86.08-5.44Q87.04-4.29 88.32-3.90L88.32-3.90L88.32-3.90Q87.62-1.28 85.06 0.13L85.06 0.13L85.06 0.13Q83.01 1.28 80.19 1.28L80.19 1.28L80.19 1.28Q71.94 1.28 70.85-11.46L70.85-11.46L70.85-11.46Q70.66-13.25 70.66-15.04L70.66-15.04L70.66-15.04Q73.86-15.94 76.10-18.94L76.10-18.94L76.10-18.94Q78.34-21.95 78.34-25.47L78.34-25.47L78.34-25.47Q78.34-28.99 75.84-28.99L75.84-28.99L75.84-28.99Q74.05-28.99 72.64-27.01L72.64-27.01L72.64-27.01Q71.23-25.02 70.59-21.63L70.59-21.63L66.37 0L53.44 1.28L62.40-44.80L75.26-46.08L73.79-38.46L73.79-38.46Q72.83-33.09 71.55-30.34ZM96.48-1.92L96.48-1.92L96.48-1.92Q94.98-3.58 94.30-6.21L94.30-6.21L94.30-6.21Q93.63-8.83 93.63-13.12L93.63-13.12L93.63-13.12Q93.63-17.41 95.10-21.31L95.10-21.31L95.10-21.31Q96.58-25.22 99.26-28.03L99.26-28.03L99.26-28.03Q104.77-33.92 113.86-33.92L113.86-33.92L113.86-33.92Q117.12-33.92 119.49-32.83L119.49-32.83L130.43-33.92L125.70-8.96L125.70-8.96Q125.50-8.19 125.50-6.78L125.50-6.78L125.50-6.78Q125.50-5.38 126.37-4.48L126.37-4.48L126.37-4.48Q127.23-3.58 128.51-3.46L128.51-3.46L128.51-3.46Q127.87-1.28 125.54 0L125.54 0L125.54 0Q123.20 1.28 120.58 1.28L120.58 1.28L120.58 1.28Q117.95 1.28 116.19 0.29L116.19 0.29L116.19 0.29Q114.43-0.70 113.92-2.37L113.92-2.37L113.92-2.37Q112.90-0.77 110.72 0.26L110.72 0.26L110.72 0.26Q108.54 1.28 105.63 1.28L105.63 1.28L105.63 1.28Q102.72 1.28 100.35 0.51L100.35 0.51L100.35 0.51Q97.98-0.26 96.48-1.92ZM109.98-27.90L109.98-27.90L109.98-27.90Q109.25-26.75 108.61-24.80L108.61-24.80L108.61-24.80Q107.97-22.85 106.91-17.63L106.91-17.63L106.91-17.63Q105.86-12.42 105.86-8.70L105.86-8.70L105.86-8.70Q105.86-4.99 106.43-3.90L106.43-3.90L106.43-3.90Q107.01-2.82 108.03-2.82L108.03-2.82L108.03-2.82Q110.08-2.82 111.58-4.77L111.58-4.77L111.58-4.77Q113.09-6.72 113.66-10.18L113.66-10.18L117.06-28.93L117.06-28.93Q115.71-30.08 114.14-30.08L114.14-30.08L114.14-30.08Q112.58-30.08 111.65-29.57L111.65-29.57L111.65-29.57Q110.72-29.06 109.98-27.90Z" fill="url(#editing-glowing-gradient)"></path></g></g>
   </svg>

   <div>
   </div>
        <div className="mo-container"> </div>
 </div>
      <audio className="blup" style={{display: 'none'}}>
  <source src="https://www.freesound.org/data/previews/265/265115_4373976-lq.mp3" type="audio/ogg" />
</audio >
      <audio className="blop" style={{display: 'none'}}>
  <source src="https://www.freesound.org/data/previews/265/265115_4373976-lq.mp3" type="audio/ogg" />
</audio>
<div className="sound">sound</div>
</>
  );
}

export default App;
