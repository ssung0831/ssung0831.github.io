var i = 0;
var txt = 'Welcome to my blog :) These are my current favorites.';
var speed = 70;

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("demo").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

typeWriter();



