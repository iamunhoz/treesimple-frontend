const inputPhrase = document.getElementsByClassName('phrase-input')[0];
const display = document.getElementsByClassName('display-phrase')[0];
const displaySplitted = document.getElementsByClassName('display-splitted-phrase')[0];

let phrase = '';

inputPhrase.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    sendPhrase();
  }
});

function resetDisplay() {
  display.innerHTML = '';
  displaySplitted.innerHTML = '';
  display.style.display = "none";
  display.style.opacity = "0";
}

function showDisplay() {
    display.style.display = "flex";
    setTimeout(() => display.style.opacity = "1", 1);
}

function treatPhrase() {
  phrase = inputPhrase.value.split(' ');
  return phrase.filter(word => word.length > 0);
}

function buildDisplay(phrase) {
  phrase.map((word, index) => {
      const span = document.createElement("span");
      span.className = "word";
      const text = document.createTextNode(word);

      if(index > 0) {
        const button = document.createElement("button");
        button.className = "btn-split"
        button.setAttribute("onClick", `splitPhrase(${index})`);
        span.appendChild(button);
      }

      span.appendChild(text);
      display.appendChild(span);
    }, display);
}

function sendPhrase() {
  resetDisplay();
  phrase = treatPhrase();
  
  if(phrase.length) {
    // force width to avoid compressed words in long phrases     
    display.style.minWidth= `calc(${inputPhrase.value.length}ch + ${inputPhrase.value.length} * 5px)`;

    buildDisplay(phrase);

    showDisplay();
  }
}

function splitPhrase(indexPhrase) {
  displaySplitted.innerHTML = '';
  
  const before = document.createElement("div");
  before.className = "display before"
  const after = document.createElement("div");
  after.className = "display after"
  
  phrase.map((word, index) => { 
    const span = document.createElement("span");
    span.className = "word";
    const text = document.createTextNode(word);
    
    span.appendChild(text);
    
    if(index < indexPhrase) {
      before.appendChild(span);
    } else {
      after.appendChild(span);
    }
    
  }, indexPhrase, before, after);
 
  displaySplitted.appendChild(before);
  displaySplitted.appendChild(after);
  
  displaySplitted.style.display = "flex";
  after.style.display = "flex";
  before.style.display = "flex";
  setTimeout(function() {
    after.style.opacity = "1";
    before.style.opacity = "1";
  }, 1); 
}