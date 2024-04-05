// export const charString = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲ0123456789+-*/$%&';
// export const charArray = charString.split('');
// export const charStep = 16;
// export const fontColor = '#7cfc00';
// export const fontSize = '14';
// export const canvasColor = 'rgba(0,0,0,0.2)';
// export const refreshRate = 1000 / 18;
// export const maxChars = 100;
// export let canvas: HTMLCanvasElement;
// export let ctx: CanvasRenderingContext2D;
// export let height: number;
// export let width: number;
// export let delta: number;
// export let now: number;
// export let then: number;
// export let xCoords: number[] = [];
// export let chars: any[] = [];
// export let startAnimChars: any[] = [];
// export let startAnimCounter = 0;

// export function randomChar(): string {
//   return charArray[Math.floor(Math.random() * charArray.length)];
// }

// export function initCoords(): void {
//   const numCoords = width / charStep;
//   for (let i = 0; i < numCoords; i++) {
//     xCoords[i] = (i * charStep) - 14;
//   }
// }

// export function update(): void {
//   for (let i = 0; i < chars.length; i++) {
//     chars[i].update();
//     if (chars[i].posY > height) {
//       chars.splice(i, 1);
//     }
//   }
//   if (chars.length < maxChars) {
//     const delay = Math.ceil(Math.random() * 20);
//     window.setTimeout(() => {
//       const c = new CharObj();
//       chars.push(c);
//     }, delay);
//   }
// }

// export function draw(): void {
//   ctx.fillStyle = canvasColor;
//   ctx.fillRect(0, 0, width, height);
//   ctx.save();
//   ctx.fillStyle = fontColor;
//   ctx.shadowColor = 'white';
//   ctx.shadowBlur = 5;
//   for (let i = 0; i < chars.length; i++) {
//     ctx.fillText(chars[i].char, chars[i].posX, chars[i].posY);
//   }
//   ctx.restore();
//   update();
// }

// export function animate(): void {
//   window.requestAnimationFrame(animate);
//   now = Date.now();
//   delta = now - then;
//   if (delta > refreshRate) {
//     then = now - (delta % refreshRate);
//     draw();
//   }
// }

// export function startAnimation(): void {
//   const textIndeces = [
//     [1, 5, 8, 9, 10, 13, 17, 19, 20, 21, 22, 23, 25, 26, 27, 28, 31],
//     [1, 5, 7, 11, 13, 17, 19, 25, 29, 31],
//     [1, 2, 3, 4, 5, 7, 11, 13, 17, 19, 20, 21, 22, 25, 26, 27, 28, 31],
//     [1, 5, 7, 11, 14, 16, 19, 25, 28],
//     [1, 5, 8, 9, 10, 15, 19, 20, 21, 22, 23, 25, 29, 31]
//   ];
//   for (let i = 0; i < textIndeces.length; i++) {
//     for (let j = 0; j < textIndeces[i].length; j++) {
//       const c = new CharObj();
//       c.posX = (textIndeces[i][j] + 1) * charStep;
//       c.posY = (i + 2) * charStep;
//       startAnimChars.push(c);
//     }
//   }
//   const anim = setInterval(() => {
//     startAnimCounter++;
//     ctx.save();
//     ctx.fillStyle = fontColor;
//     ctx.shadowColor = 'white';
//     ctx.shadowBlur = 5;
//     for (let i = 0; i < startAnimChars.length; i++) {
//       ctx.fillText(startAnimChars[i].char, startAnimChars[i].posX, startAnimChars[i].posY);
//       startAnimChars[i].char = randomChar();
//     }
//     ctx.restore();
//     if (startAnimCounter > 30) {
//       for (let i = 0; i < startAnimChars.length; i++) {
//         const c = startAnimChars[i];
//         chars.push(c);
//         startAnimChars.splice(startAnimChars[i], 1);
//       }
//       window.clearInterval(anim);
//     }
//   }, 200);
// }

// export function hover(e: MouseEvent): void {
//   const c = new CharObj();
//   const x = Math.ceil(e.clientX / charStep) * charStep;
//   const y = Math.ceil(e.clientY / charStep) * charStep;
//   c.posX = x;
//   c.posY = y;
//   chars.push(c);
// }

// export class CharObj {
//   char: string;
//   posX: number;
//   posY: number;

//   constructor() {
//     this.char = randomChar();
//     this.posX = 0; // You may initialize posX to a default value here if needed
//     this.posY = charStep;
//   }

//   update(): void {
//     this.char = randomChar();
//     this.posY += charStep;
//   }
// }

export function initBubbleCursor() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let cursor = { x: width / 2, y: width / 2 };
  let particles: any[] = [];

  function init() {
    bindEvents();
    loop();
  }

  // Bind events that are needed
  function bindEvents() {
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize(e: Event) {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  function onMouseMove(e: MouseEvent) {
    cursor.x = e.clientX;
    cursor.y = e.clientY;

    addParticle(cursor.x, cursor.y);
  }

  function addParticle(x: number, y: number) {
    let particle = new Particle();
    particle.init(x, y);
    particles.push(particle);
  }

  function updateParticles() {
    // Update
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }

    // Remove dead particles
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].lifeSpan < 0) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }
  }

  function loop() {
    requestAnimationFrame(loop);
    updateParticles();
  }

  /**
   * Particles
   */

  function Particle() {
    this.lifeSpan = 250; //ms
    this.initialStyles = {
      position: 'absolute',
      display: 'block',
      pointerEvents: 'none',
      zIndex: '10000000',
      width: '5px',
      height: '5px',
      willChange: 'transform',
      background: '#e6f1f7',
      boxShadow: '-1px 0px #6badd3, 0px -1px #6badd3, 1px 0px #3a92c5, 0px 1px #3a92c5',
      borderRadius: '3px',
      overflow: 'hidden',
    };

    // Init, and set properties
    this.init = function (x: number, y: number) {
      this.velocity = {
        x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
        y: -0.4 + Math.random() * -1,
      };

      this.position = { x: x - 10, y: y - 10 };

      this.element = document.createElement('span');
      applyProperties(this.element, this.initialStyles);
      this.update();

      document.body.appendChild(this.element);
    };

    this.update = function () {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      // Update velocities
      this.velocity.x += (Math.random() < 0.5 ? -1 : 1) * 2 / 75;
      this.velocity.y -= Math.random() / 600;
      this.lifeSpan--;

      this.element.style.transform = `translate3d(${this.position.x}px, ${this.position.y}px, 0) scale(${0.2 + (250 - this.lifeSpan) / 250})`;
    };

    this.die = function () {
      this.element.parentNode.removeChild(this.element);
    };
  }

  /**
   * Utils
   */

  // Applies css `properties` to an element.
  function applyProperties(target: HTMLElement, properties: { [key: string]: string }) {
    for (let key in properties) {
      target.style[key] = properties[key];
    }
  }

  init();
}
