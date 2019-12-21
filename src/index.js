import './styles.css'

let slider = document.getElementById('slider');
let sliderItems = document.getElementById('items');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

const slide = (wrapper, items, prev, next) => {
    let posX1 = 0;
    let posX2 = 0;
    let posInitial;
    let posFinal;
    let threshold = 100;
    let slides = items.getElementsByClassName('slide');
    let slidesLength = slides.length;
    let slideSize = items.getElementsByClassName('slide')[0].offsetWidth;
    let firstSlide = slides[0];
    let lastSlide = slides[slidesLength - 1];
    let cloneFirst = firstSlide.cloneNode(true);
    let cloneLast = lastSlide.cloneNode(true);
    let index = 0;
    let allowShift = true;

    const shiftSlide = (dir, action) => {
        items.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = items.offsetLeft; }

            if (dir === 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir === -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        }

        allowShift = false;
    };

    const dragAction = e => {
        if (e.type === 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    };

    const dragEnd = e => {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    };

    const dragStart = e => {
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type === 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    };

    const checkIndex = _ => {
        items.classList.remove('shifting');

        if (index === -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index === slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    };

    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');
    items.onmousedown = dragStart;

    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    items.addEventListener('transitionend', checkIndex);
};

slide(slider, sliderItems, prev, next);
