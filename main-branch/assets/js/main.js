// overview carousel start
$('.owl-overview').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 3
        },
        1000: {
            items: 5
        }
    }
})
// overview carousel end

// amenities carousel start
const nextIcon = '<img src="assets/img/banner/next-arrow.png">';
const prevIcon = '<img src="assets/img/banner/prev-arrow.png">';
$('.amenities-top-carousel').owlCarousel({
    loop: true,
    margin: 10,
    dots: false,
    nav: true,
    navText: [
        prevIcon,
        nextIcon
    ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})

const nextaIcon = '<img src="assets/img/banner/next-arrow.png">';
const prevaIcon = '<img src="assets/img/banner/prev-arrow.png">';

$('.amenities-bottom-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
        prevaIcon,
        nextaIcon
    ],
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
})
// amendments carousel end

// connectivity carousel start
const nextcIcon = '<img src="assets/img/banner/next-arrow.png">';
const prevcIcon = '<img src="assets/img/banner/prev-arrow.png">';
$('.connectivity-carousel').owlCarousel({
    loop: true,
    // margin:100,
    nav: true,
    dots: false,
    navText: [
        prevaIcon,
        nextaIcon
    ],
    responsive: {
        0: {
            items: 1,
            margin: 100
        },
        600: {
            items: 1,
            margin: 100
        },
        1000: {
            items: 3,
            margin: 30
        },
        1400: {
            items: 3,
            margin: 30
        },
        1450: {
            items: 3,
            margin: 100
        }
    }
})
// connectivity carousel end

// lightgallery medium zoom
lightGallery(document.getElementById('animated-thumbnails'), {
    thumbnail: false,
    zoomFromOrigin: true,
    selector: '.blog-images'
});

// header animation starts

let prevScrollpos = window.pageYOffset;

window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (currentScrollPos <= 150) {
        document.getElementById("menu").classList.add("show");
        document.getElementById("menu").classList.remove("cust");
        document.getElementById("top-nav").classList.remove("cust-pad");
    } else if (currentScrollPos > 150 || prevScrollpos < currentScrollPos) {
        document.getElementById("menu").classList.add("cust");
        document.getElementById("menu").classList.remove("show");
        document.getElementById("top-nav").classList.add("cust-pad");
    }
    prevScrollpos = currentScrollPos;
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

window.addEventListener("scroll", () => {
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

// navbar close on tap
$('.navbar-nav>li>a').on('click', function () {
    $('.navbar-collapse').collapse('hide');

});

// hand animation start

document.getElementById("lobby-mover").addEventListener("mouseenter", mouseEnter);
document.getElementById("lobby-mover").addEventListener("mouseleave", mouseLeave);

function mouseEnter() {
    document.getElementById("hand").style.opacity = "0";
}

function mouseLeave() {
    document.getElementById("hand").style.opacity = "1";
}
// hand animation end