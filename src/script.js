const carouselContainer = document.querySelector(".carousel-container");
const images = document.querySelectorAll(".carousel-container img");
let index = 1;
const imageWidth = images[0].clientWidth;

carouselContainer.style.transform = `translateX(${-index * imageWidth}px)`; // 初始化为第一张图片

let timer = null;

function startCarousel(type = "right") {
  clearTimeout(timer);
  if (type === "right") {
    index++;
  } else {
    if (index === 1) {
      // 在第一张的位置点了←箭头，
      index--;
      setTimeout(() => {
        carouselContainer.style.transition = "none"; // 取消动画过渡
        index = images.length - 2; // 跳到最后一张图片
        carouselContainer.style.transform = `translateX(${
          -index * imageWidth
        }px)`;
      }, 500); // 等待动画完成，取消动画过渡，瞬间跳到最后一张
    } else {
      index--;
    }
  }
  carouselContainer.style.transition = "transform 0.5s ease-in-out";
  carouselContainer.style.transform = `translateX(${-index * imageWidth}px)`;

  // 到达最后一张图片（第一张图片的副本）
  if (index === images.length - 1) {
    setTimeout(() => {
      carouselContainer.style.transition = "none"; // 取消动画过渡
      index = 1; // 跳回到第一张图片
      carouselContainer.style.transform = `translateX(${
        -index * imageWidth
      }px)`;
    }, 500); // 等待动画完成，取消动画过渡，瞬间跳到第一张
  }

  timer = setTimeout(startCarousel, 2000);
}

setTimeout(startCarousel, 2000);

const leftArrow = document.querySelector("#left-arrow");
const rightArrow = document.querySelector("#right-arrow");

leftArrow.addEventListener("click", clickLeft);
rightArrow.addEventListener("click", clickRight);

function clickLeft() {
  startCarousel("left");
}

function clickRight() {
  startCarousel("right");
}
