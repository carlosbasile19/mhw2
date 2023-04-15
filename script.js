/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const choices = document.querySelectorAll('.choice-grid > div');

let selectedChoices = {
  one: null,
  two: null,
  three: null
};

choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    const choiceId = choice.dataset.choiceId;
    const questionId = choice.dataset.questionId;
  
    if (selectedChoices[questionId] === choiceId) {
      selectedChoices[questionId] = null;
      choice.style.backgroundColor = 'inherit';
      choice.style.opacity = 0.6;
      choice.querySelector('.checkbox').src = 'images/unchecked.png';
    } else {
  
      if (selectedChoices[questionId] !== null) {
        const prevChoice = document.querySelector(`[data-choice-id='${selectedChoices[questionId]}'][data-question-id='${questionId}']`);
        prevChoice.style.backgroundColor = 'inherit';
        prevChoice.style.opacity = 0.6;
        prevChoice.querySelector('.checkbox').src = 'images/unchecked.png';
      }
  
      selectedChoices[questionId] = choiceId;
      choice.style.backgroundColor = '#cfe3ff';
      choice.style.opacity = 1;
      choice.querySelector('.checkbox').src = 'images/checked.png';
    }
  });
});


const submitButton = document.querySelector('#submit-button');

submitButton.addEventListener('click', () => {


  if (selectedChoices.one !== null && selectedChoices.two !== null && selectedChoices.three !== null) {
 
    let answer;

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