const title = document.querySelectorAll(".title");
const con = document.querySelectorAll(".con");

for(let i = 0; i < title.length; i ++) {
    title[i].addEventListener("click", () => {
        con[i].classList.toggle("active");
    });
}

