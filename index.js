var numberOfDrumButtons = document.querySelectorAll(".drum").length;
var volumeSlider = document.getElementById("volume");
var muteBtn = document.getElementById("mute-btn");
var themeToggle = document.getElementById("theme-toggle");
var body = document.body;

var isMuted = false;
var volume = 1;

themeToggle.addEventListener("click", function() {
  body.classList.toggle("light-theme");
  body.classList.toggle("dark-theme");
  themeToggle.textContent = body.classList.contains("light-theme") ? "☀️" : "🌙";
  localStorage.setItem("theme", body.classList.contains("light-theme") ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
  body.classList.add("light-theme");
  body.classList.remove("dark-theme");
  themeToggle.textContent = "☀️";
}

volumeSlider.addEventListener("input", function(event) {
  volume = event.target.value;
});

muteBtn.addEventListener("click", function() {
  isMuted = !isMuted;

  if (isMuted) {
  muteBtn.textContent = "🔇"; 
  muteBtn.classList.add("muted");
} else {
  muteBtn.textContent = "🔈"; 
  muteBtn.classList.remove("muted");
}
});

for (var i = 0; i < numberOfDrumButtons; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    buttonAnimation(buttonInnerHTML);
  });
}

document.addEventListener("keydown", function(event) {
  makeSound(event.key);
  buttonAnimation(event.key);
});

function makeSound(key) {
  var audio;

  switch (key) {
    case "w":
      audio = new Audio("sounds/tom-1.mp3");
      break;
    case "a":
      audio = new Audio("sounds/tom-2.mp3");
      break;
    case "s":
      audio = new Audio("sounds/tom-3.mp3");
      break;
    case "d":
      audio = new Audio("sounds/tom-4.mp3");
      break;
    case "j":
      audio = new Audio("sounds/snare.mp3");
      break;
    case "k":
      audio = new Audio("sounds/crash.mp3");
      break;
    case "l":
      audio = new Audio("sounds/kick-bass.mp3");
      break;

    default: console.log(key);
  }

  if (audio) {
    audio.volume = isMuted ? 0 : volume;
    audio.play();
  }
}

function buttonAnimation(currentKey) {
  var activeButton = document.querySelector("." + currentKey);

  if (!activeButton) return;

  activeButton.classList.add("pressed");

  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 150);
}
