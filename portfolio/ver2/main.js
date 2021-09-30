// header
const menuBtn = document.querySelector(".menu_bar");
const menu = document.querySelector(".header_menu");

menuBtn.addEventListener("click", () => {
    menuBtn.classList.toggle("active");
    menu.classList.toggle("active");
});

// banner-typing
let typingText = document.querySelector(".typing-text").textContent;
typingText = typingText.split("");
let typingTarget = document.querySelector(".typing");
let typingIdx = 0;
let typingBool = false;
let typingSet;

if (typingBool == false) {
    typingBool = true;

    typingSet = setInterval(typing, 150);
}

function typing() {
    if(typingIdx < typingText.length) {        
        typingTarget.append(typingText[typingIdx]);
        typingIdx ++;
    } else {
        clearInterval(typingSet);
    }
}

// slide 
let radioList = document.querySelectorAll(".radioImage");
let myList = Array.from({length: 3}, (_, i) => i + 0);

for(let i = 0; i < radioList.length; i++) {
    radioList[i].addEventListener("click", () => {
        for (let j = 0; j < myList.length; j++) {
            if (i == j) {
                radioList[j].classList.add("active");
            } else {
                radioList[j].classList.remove("active");
            }
        }
    });
}

// topBtn
const topBtn = document.querySelector(".topBtn");

function Scroll() {
    window.scrollTo(0, 0);
}

window.addEventListener("scroll", () => {
    let scroll = this.scrollY;
    if (scroll > 300) {
        topBtn.classList.add("active");
    } else {
        topBtn.classList.remove("active");
    }
});


// modal
let project = document.querySelector(".projectImg");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector("#close");
const modalContent = document.querySelector(".modalContent");

project.addEventListener("click", () => {
    modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
});
