const title = document.querySelectorAll(".title");
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