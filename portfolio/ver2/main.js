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
                radioList[j].style.content = "url('./image/hand-solid.svg')";
            } else {
                radioList[j].classList.remove("active");
                radioList[j].style.content = "url('./image/hand-empty.svg')";
            }
        }
    });
}