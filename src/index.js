const inputSentence = document.getElementsByClassName('sentence-input')[0];
const display = document.getElementsByClassName('display-sentence')[0];
const displaySplitted = document.getElementsByClassName('display-splitted-sentence')[0];

let sentence = '';

inputSentence.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    sendSentence();
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

function treatSentence() {
  sentence = inputSentence.value.split(' ');
  return sentence.filter(word => word.length > 0);
}

function buildDisplay(sentence) {
  sentence.map((word, index) => {
      const span = document.createElement("span");
      span.className = "word";
      const text = document.createTextNode(word);

      if(index > 0) {
        const button = document.createElement("button");
        button.className = "btn-split"
        button.setAttribute("onClick", `splitSentence(${index})`);
        span.appendChild(button);
      }

      span.appendChild(text);
      display.appendChild(span);
    }, display);
}

function sendSentence() {
  resetDisplay();
  sentence = treatSentence();
  
  if(sentence.length) {
    // force width to avoid compressed words in long sentences     
    display.style.minWidth= `calc(${inputSentence.value.length}ch + ${inputSentence.value.length} * 5px)`;

    buildDisplay(sentence);

    showDisplay();
  }
}

function splitSentence(indexSentence) {
  displaySplitted.innerHTML = '';
  
  const before = document.createElement("div");
  before.className = "display before"
  const after = document.createElement("div");
  after.className = "display after"
  
  sentence.map((word, index) => { 
    const span = document.createElement("span");
    span.className = "word";
    const text = document.createTextNode(word);
    
    span.appendChild(text);
    
    if(index < indexSentence) {
      before.appendChild(span);
    } else {
      after.appendChild(span);
    }
    
  }, indexSentence, before, after);
 
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