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
    container.classList.add('carousel');

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

    container.appendChild(leftBtn);
    container.appendChild(carouselImg);
    container.appendChild(rightBtn);
    parentElement.appendChild(container);
  }

  function applyListeners() {
    const leftBtn = document.querySelector('.left-button');
    const rightBtn = document.querySelector('.right-button');
    const carouselImg = document.querySelector('.carousel-image');
    document.addEventListener('click', (e) => {
      if (e.target === leftBtn) {
        if (carouselTracker === 0) return;
        rightBtn.removeAttribute('disabled');
        carouselTracker -= 1;
        carouselImg.src = imagesArray[carouselTracker];
        if (carouselTracker === 0) {
          leftBtn.setAttribute('disabled', true);
        }
      } else if (e.target === rightBtn) {
        if (carouselTracker === imagesLength) return;
        leftBtn.removeAttribute('disabled');
        carouselTracker += 1;
        carouselImg.src = imagesArray[carouselTracker];
        if (carouselTracker === imagesLength - 1) {
          rightBtn.setAttribute('disabled', true);
        }
      }
    });
  }
  return { carouselContainer, applyListeners };
}
