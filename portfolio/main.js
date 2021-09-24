let typingText = document.querySelector(".typing-text").textContent;
const typingTarget = document.querySelector(".typing");
typingText=typingText.split(""); 
let TextIdx = 0;
let TextBool = false;
let typingInterval;

if (TextBool == false) {
    TextBool = true;

    typingInterval = setInterval(typing, 150);

}

function typing() {
    if (TextIdx < typingText.length) {
        typingTarget.append(typingText[TextIdx]);

        TextIdx ++;
    } else {
        clearInterval(typingInterval);
    }
}

// Get the modal
let project1 = document.querySelector(".project1");
let project2 = document.querySelector(".project2");
let project3 = document.querySelector(".project3");
let modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];
// let modalText = document.querySelector(".modal-info3").textContent;

project1.addEventListener("click", () => {
    document.querySelector(".modal-info-target").innerHTML = document.querySelector(".modal-info1").textContent;;
    modal.style.display = "block";
});

project2.addEventListener("click", () => {
    document.querySelector(".modal-info-target").innerHTML = document.querySelector(".modal-info2").textContent;;
    modal.style.display = "block";
});

project3.addEventListener("click", () => {
    document.querySelector(".modal-info-target").innerHTML = document.querySelector(".modal-info3").textContent;;
    modal.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}