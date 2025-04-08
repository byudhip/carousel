import './styles.css';
import { carouselBuilder } from './carousel.js';

const body = document.querySelector('body');

const c = carouselBuilder();

c.carouselContainer(body);
c.applyListeners();
