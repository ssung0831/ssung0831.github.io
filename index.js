document.querySelectorAll('nav ul li a[href^="#experience"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.getElementById("name").addEventListener("click", function(event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

document.querySelectorAll('nav ul li a[href^="#projects"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});



var i = 0;
var txt = 'Welcome! My name is Samantha Sung.';
var speed = 70;

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

typeWriter();

var experienceSection = document.getElementById("experience");
var exdemo = document.getElementById("exdemo");
var txt2 = 'experience';
var speed = 70;

var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.intersectionRatio > 0.5) {
            typeWriter2();
            observer.unobserve(experienceSection);
        }
    });
}, options);

observer.observe(experienceSection);

function typeWriter2() {
    var j = 0;

    function type() {
        if (j < txt2.length) {
            exdemo.innerHTML += txt2.charAt(j);
            j++;
            setTimeout(type, speed);
        }
    }

    type();
}



var projSection = document.getElementById("projects");
var projdemo = document.getElementById("projdemo");
var txt3 = 'projects';
var speed = 70;

var options2 = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

var observer2 = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.intersectionRatio > 0.5) {
            typeWriter3();
            observer2.unobserve(projSection);
        }
    });
}, options);

observer2.observe(projSection);

function typeWriter3() {
    var k = 0;

    function type() {
        if (k < txt3.length) {
            projdemo.innerHTML += txt3.charAt(k);
            k++;
            setTimeout(type, speed);
        }
    }

    type();
}




let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


