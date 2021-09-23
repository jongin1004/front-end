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
