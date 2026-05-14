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

  gsap.defaults({ ease: 'power3.out', duration: 0.9 });
}
