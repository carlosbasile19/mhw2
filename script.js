/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const choices = document.querySelectorAll('.choice-grid > div');

let selectedChoices = {
  one: null,
  two: null,
  three: null
};

function handleClick() {
  const choiceId = this.dataset.choiceId;
  const questionId = this.dataset.questionId;

  if (selectedChoices[questionId] === choiceId) {
    selectedChoices[questionId] = null;
    this.style.backgroundColor = 'inherit';
    this.style.opacity = 0.6;
    this.querySelector('.checkbox').src = 'images/unchecked.png';
  } else {

    if (selectedChoices[questionId] !== null) {
      const prevChoice = document.querySelector(`[data-choice-id='${selectedChoices[questionId]}'][data-question-id='${questionId}']`);
      prevChoice.style.backgroundColor = 'inherit';
      prevChoice.style.opacity = 0.6;
      prevChoice.querySelector('.checkbox').src = 'images/unchecked.png';
    }

    selectedChoices[questionId] = choiceId;
    this.style.backgroundColor = '#cfe3ff';
    this.style.opacity = 1;
    this.querySelector('.checkbox').src = 'images/checked.png';
  }
}

choices.forEach((choice) => {
  choice.addEventListener('click', handleClick);
});


const submitButton = document.querySelector('#submit-button');

submitButton.addEventListener('click', () => {

  if (selectedChoices.one !== null && selectedChoices.two !== null && selectedChoices.three !== null) {
 
    let answer;

    choices.forEach((choice) => {
      choice.removeEventListener('click', handleClick);
    });
    

    if(selectedChoices.two === selectedChoices.three){
      answer = selectedChoices.two;
    }else{
      answer = selectedChoices.one;
    }

    const result = RESULTS_MAP[answer].title;
    const resultContents = RESULTS_MAP[answer].contents;

    const resultTitle = document.createElement('h1');
    resultTitle.textContent = result;
    const resultContentsElem = document.createElement('p');
    resultContentsElem.textContent = resultContents;

    const restartButton = document.createElement('button');
    restartButton.textContent = 'Ricomincia il quiz';
    restartButton.id = 'submit-button';

    const resultContainer = document.querySelector('#result-container');
    resultContainer.className = 'result-container-styles';
    resultContainer.appendChild(resultTitle);
    resultContainer.appendChild(resultContentsElem);
    resultContainer.appendChild(restartButton);

    restartButton.addEventListener('click', () => {
      location.reload();
    });

    submitButton.style.display = 'none';
  } else {
    alert('Per completare il quiz, seleziona una risposta per ogni domanda.');
  }
});