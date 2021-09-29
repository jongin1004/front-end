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

for(let i=0; i < radioList.length; i++) {
    radioList[i].addEventListener("click", () => {
        radioList[i].classList.toggle("active");
    });
}
