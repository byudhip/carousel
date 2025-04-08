import './styles.css';
import { carouselBuilder } from './carousel.js';

const body = document.querySelector('body');

const c = carouselBuilder();

c.carouselContainer(body);
c.applyListeners();
c.autoAdvance();

const allDots = [...document.querySelectorAll('.dot')];
allDots[0].classList.add('active');
