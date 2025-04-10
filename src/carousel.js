export function carouselBuilder() {
  function getImages(r) {
    let images = {};
    r.keys().forEach((key) => {
      images[key.replace('./', '')] = r(key);
    });
    return images;
  }
  const imagesObj = getImages(
    require.context('./images', false, /\.(png|jpe?g|svg)$/) //this is an object
  );

  const imagesArray = Object.values(imagesObj);
  const imagesLength = imagesArray.length;
  let carouselTracker = 0;

  function carouselContainer(parentElement) {
    const container = document.createElement('div');
    container.classList.add('carousel-main');

    const upperCarousel = document.createElement('div');
    upperCarousel.classList.add('carousel-upper');

    const leftBtn = document.createElement('button');
    leftBtn.classList.add('left-button');
    leftBtn.textContent = '<';
    leftBtn.setAttribute('disabled', true);

    const carouselImg = document.createElement('img');
    carouselImg.classList.add('carousel-image');
    carouselImg.src = imagesArray[carouselTracker];

    const rightBtn = document.createElement('button');
    rightBtn.textContent = '>';
    rightBtn.classList.add('right-button');

    upperCarousel.appendChild(leftBtn);
    upperCarousel.appendChild(carouselImg);
    upperCarousel.appendChild(rightBtn);

    const lowerCarousel = document.createElement('div');
    lowerCarousel.classList.add('carousel-lower');

    for (let i = 0; i < imagesLength; i++) {
      const dot = document.createElement('button');
      dot.classList.add('dot');
      dot.setAttribute('data-index', `${i}`); //to be used in event listener
      dot.textContent = '•';
      lowerCarousel.appendChild(dot);
    }
    container.appendChild(upperCarousel);
    container.appendChild(lowerCarousel);
    parentElement.appendChild(container);
  }

  function applyListeners() {
    const leftBtn = document.querySelector('.left-button');
    const rightBtn = document.querySelector('.right-button');
    const carouselImg = document.querySelector('.carousel-image');
    const allDots = document.querySelectorAll('.dot');
    document.addEventListener('click', (e) => {
      if (e.target === leftBtn) {
        if (carouselTracker === 0) return;
        rightBtn.removeAttribute('disabled');
        allDots.forEach((dot) => {
          dot.classList.remove('active');
        });
        carouselTracker -= 1;
        carouselImg.src = imagesArray[carouselTracker];
        allDots[carouselTracker].classList.add('active');
        if (carouselTracker === 0) {
          leftBtn.setAttribute('disabled', true);
        }
      } else if (e.target === rightBtn) {
        if (carouselTracker === imagesLength) return;
        leftBtn.removeAttribute('disabled');
        allDots.forEach((dot) => {
          dot.classList.remove('active');
        });
        carouselTracker += 1;
        carouselImg.src = imagesArray[carouselTracker];
        allDots[carouselTracker].classList.add('active');
        if (carouselTracker === imagesLength - 1) {
          rightBtn.setAttribute('disabled', true);
        }
      } else if (e.target.closest('.dot')) {
        leftBtn.removeAttribute('disabled');
        rightBtn.removeAttribute('disabled');
        allDots.forEach((dot) => {
          dot.classList.remove('active');
        });
        const clickedDot = e.target.closest('.dot');

        const index = Number(clickedDot.dataset.index);
        clickedDot.classList.add('active');
        console.log(index);
        carouselImg.src = imagesArray[index];
        if (index === imagesLength - 1) {
          rightBtn.setAttribute('disabled', true);
        }
        if (index === 0) {
          leftBtn.setAttribute('disabled', true);
        }
      }
    });
  }

  function autoAdvance() {
    const leftBtn = document.querySelector('.left-button');
    const rightBtn = document.querySelector('.right-button');
    const allDots = document.querySelectorAll('.dot');
    const carouselImg = document.querySelector('.carousel-image');

    setInterval(() => {
      if (carouselTracker < imagesLength - 1) {
        leftBtn.removeAttribute('disabled');
        allDots.forEach((dot) => {
          dot.classList.remove('active');
        });
        carouselTracker += 1;
        carouselImg.src = imagesArray[carouselTracker];
        allDots[carouselTracker].classList.add('active');
        if (carouselTracker === imagesLength - 1) {
          rightBtn.setAttribute('disabled', true);
        }
      }
    }, 5000); // Every 5 seconds
  }

  return { carouselContainer, applyListeners, autoAdvance };
}
