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
let projectList = document.querySelectorAll(".projectImg");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector("#close");
const modalContent = document.querySelectorAll(".modalContent");
const modalTarget = document.querySelector(".content_target");

for (let i = 0; i < 3; i ++) {
    projectList[i].addEventListener("click", () => {
        modalContent[i].classList.add("active");
        modal.classList.add("active");
    });
}


closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");

    setTimeout(() => {
        for (let i = 0; i < radioList.length; i ++) {
            modalContent[i].classList.remove("active");
        }
    }, 500);
});

window.onclick = function(event) {
  if (event.target == modal) {
    modal.classList.remove("active");

    setTimeout(() => {
        for (let i = 0; i < radioList.length; i ++) {
            modalContent[i].classList.remove("active");
        }
    }, 500);
  }
}


// mouseover
// var delay = function (elem, callback) {
//     var timeout = null;
//     elem.onmouseover = function() {
//         // Set timeout to be a timer which will invoke callback after 1s
//         timeout = setTimeout(callback, 1000);
//     };

//     elem.onmouseleave = function() {
//         // Clear any timers set to timeout
//         document.querySelector('.modalCaptin').classList.remove("active");
//         clearTimeout(timeout);  
        
//     }
// };


// delay(document.querySelector('.image_container'), function() {
//     document.querySelector('.modalCaptin').classList.add("active");
// });


// 아코디언
const title = document.querySelectorAll(".aco_title");
const con = document.querySelectorAll(".con");


for(let i = 0; i < title.length; i ++) {
    title[i].addEventListener("click", () => {   
        let bool = true;        
        if (con[i].className == "con active") {
            con[i].classList.remove("active");            
            bool = false;                     
        }        

        if (bool) {
            for(let j = 0; j < con.length; j ++) {
                if (i == j) {
                    con[j].classList.add("active");
                } else {
                    con[j].classList.remove("active");
                }
            }   
        }        
    });    
}
