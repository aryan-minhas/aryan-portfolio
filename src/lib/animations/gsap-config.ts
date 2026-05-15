import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { TextPlugin } from 'gsap/TextPlugin';

let initialized = false;

export function initGSAP() {
  if (initialized) return;
  initialized = true;

  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, TextPlugin);

  CustomEase.create('cinematic', 'M0,0 C0.16,0 0.3,1 1,1');
  CustomEase.create('reveal',    'M0,0 C0,0 0.14,1 1,1');
  CustomEase.create('cipher',    'M0,0 C0.05,0 0.133,0.142 0.166,0.21 0.208,0.29 0.258,0.434 0.321,0.562 0.449,0.82 0.557,0.958 1,1');

  gsap.defaults({ ease: 'cipher', duration: 1.0 });
}
