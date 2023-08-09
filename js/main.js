// Календарь

$('.header__calendar-link').on('mouseover', function(){
    $('.header__calendar').addClass('_active');
});

$('.header__calendar-link').on('mouseleave', function(){
    $('.header__calendar').removeClass('_active');
});
// Слайдер

$('.top__slider').slick({
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
});

// Поп-ап

const popupLinks = document.querySelectorAll('.popup__link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 500;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const currentPopup = document.getElementById(popupName);
            popupOpen(currentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll('.popup__close');
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup__inner')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnlock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');
    unlock - false;

    setTimeout(function () {
        unlock = true;
    }, timeout);
}

function bodyUnlock() {
    setTimeout(function () {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = '0px';
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}

document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

//Анимация

const animItems = document.querySelectorAll('._anim-items');

if (animItems.length > 0){
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll(params) {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 3;
            const scrollItem = document.querySelector('.scroll__item');

            let animItemPoint = window.innerHeight - animItemHeight / animStart;

            if(animItemHeight > window.innerHeight){
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
                animItem.classList.add('_active');
                scrollItem.classList.add('_active');
            }
            if(scrollItem.classList.contains('_active')){

                document.addEventListener('keydown', function (e) {
                    if (e.which === 27) {
                        document.querySelector('.scroll__item._active');
                        scrollItem.classList.remove('_active');
                    }
                });

                scrollItemCloseIcon = document.addEventListener('click', function (e) {
                    document.querySelector('.scroll__item._active');
                    animItem.classList.remove('_active');                
                });
            }
            else{
                if (!scrollItem.classList.contains('_anim-no-hide')){
                    scrollItem.classList.remove('_active');
                }
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    animOnScroll();
};