let imgs = [{
    url: "images/slider_img1.png",
    city: "Rostov-on-Don LCD admiral",
    area: "81 m2",
    time: "3.5 months",
    cost: "Upon request",
    alt: "Picture of Rostov-on-Don LCD admiral project"
}, {
    url: "images/slider_img2.png",
    city: "Sochi Thieves",
    area: "105 m2",
    time: "4 months",
    cost: "Upon request",
    alt: "Picture of Sochi Thieves project"
}, {
    url: "images/slider_img3.png",
    city: "Rostov-on-Don Patriotic",
    area: "93 m2",
    time: "3 months",
    cost: "Upon request",
    alt: "Picture of Rostov-on-Don Patriotic project"
}];

let details = document.querySelectorAll(".block2__text-wrapper__blocks-text");
let imgContainer = document.querySelector(".block2__img-wrapper__img");
let arrows = document.querySelector(".block2__slider");
let dots = document.querySelector(".block2__slider-dots");
let menu = document.querySelector(".block2__img-wrapper__menu");

let mobileDetails = document.querySelectorAll(".block2__text-wrapper__blocks-text");
let mobileImgContainer = document.querySelector(".mobile-slider__imgs");
let mobileArrows = document.querySelector(".mobile-slider__buttons");


function initSlider() {
    if (!imgs || !imgs.length) return;
    const mediaQuery = window.matchMedia("(max-width: 800px)");

    function leftArrowClick(container) {
        let currentNum = +container.querySelector(".isActive").dataset.index;
        let nextNum;
        if (currentNum === 0) {
            nextNum = imgs.length - 1;
        } else {
            nextNum = currentNum - 1;
        }
        if (!mediaQuery.matches) {
            moveSlider(nextNum);
        } else moveMobileSlider(nextNum);
    }

    function rightArrowClick(container) {
        let currentNum = +container.querySelector(".isActive").dataset.index;
        let nextNum;
        if (currentNum === imgs.length - 1) {
            nextNum = 0;
        } else {
            nextNum = currentNum + 1;
        }
        if (!mediaQuery.matches) {
            moveSlider(nextNum);
        } else moveMobileSlider(nextNum);
    }

    function initImages() {
        imgs.forEach((image, index) => {
            let newImg = `<img class="img n${index} ${index === 0 ? "isActive" : ""}" src=${imgs[index].url} 
                                alt="${imgs[index].alt}" data-index="${index}">`;
            imgContainer.innerHTML += newImg;
        });
    }

    function initDesktopArrows() {
        arrows.querySelector(".block2__slider-arrow.icon-arrow-left").addEventListener("click", () => leftArrowClick(imgContainer));
        arrows.querySelector(".block2__slider-arrow.icon-arrow-right").addEventListener("click", () => rightArrowClick(imgContainer));
    }

    function moveSlider(num) {
        imgContainer.querySelector(".isActive").classList.remove("isActive");
        imgContainer.querySelector(`.n${num}`).classList.add("isActive");
        dots.querySelector(".isActive").classList.remove("isActive");
        dots.querySelector(".n" + num).classList.add("isActive");
        menu.querySelector(".isActive").classList.remove("isActive");
        menu.querySelector(".n" + num).classList.add("isActive");
        details[0].innerHTML = imgs[num].city;
        details[1].innerHTML = imgs[num].area;
        details[2].innerHTML = imgs[num].time;
    }

    function initDots() {
        imgs.forEach((image, index) => {
            let dot = `<span class="block2__slider-item n${index} ${index === 0 ? "isActive" : ""}" data-index="${index}"></span>`;
            dots.innerHTML += dot;
        });
        dots.querySelectorAll(".block2__slider-item").forEach(dot => {
            dot.addEventListener("click", () => {
                moveSlider(dot.dataset.index);
            })
        })
    }

    function initMenu() {
        menu.querySelectorAll(".block2__img-wrapper__menu-item").forEach(link => {
            link.addEventListener("click", () => {
                moveSlider(link.dataset.index);
            })
        })
    }

    function initMobileImages() {
        imgs.forEach((image, index) => {
            let newImg = `<img class="mobile-slider n${index} ${index === 0 ? "isActive" : ""}" src=${imgs[index].url}
                                alt="${imgs[index].alt}" data-index="${index}">`;
            mobileImgContainer.innerHTML += newImg;
        });
    }

    function initMobileArrows() {
        mobileArrows.querySelector(".mobile-slider__buttons-item.slide-left").addEventListener("click", () => leftArrowClick(mobileImgContainer));
        mobileArrows.querySelector(".mobile-slider__buttons-item.slide-right").addEventListener("click", () => rightArrowClick(mobileImgContainer));
    }

    function moveMobileSlider(num) {
        mobileImgContainer.querySelector(".isActive").classList.remove("isActive");
        mobileImgContainer.querySelector(`.n${num}`).classList.add("isActive");
        mobileDetails[0].innerHTML = imgs[num].city;
        mobileDetails[1].innerHTML = imgs[num].area;
        mobileDetails[2].innerHTML = imgs[num].time;
    }


    if (!mediaQuery.matches) {
        initImages();
        initDesktopArrows();
        initDots();
        initMenu();
    } else {
        initMobileImages();
        initMobileArrows();
}
}

document.addEventListener("DOMContentLoaded", initSlider);