/**
 * Example store structure
 */
const STORE = {
  // 5 or more questions are required
  questions: [
    {
      question: 'The birthplace of Catherine is part of what country today?',
      answers: [
        'Austria',
        'Russia',
        'Poland',
        'Germany'
      ],
      correctAnswer: 'Poland',
      answerDetail: 'Catherine was born in Pomerania, Kingdom of Prussia, which is now part of Poland.'
    },
    {
      question: 'Catherine was a friend and fan of which of these philosphers?',
      answers: [
        'Voltaire',
        'Hobbes',
        'Rousseau',
        'Silly question. Women do not read!'
      ],
      correctAnswer: 'Voltaire',
      answerDetail: 'Catherine strived to be an enlightened despot and corresponded with Voltaire for 15 years.'
    }, {
      question: 'How many uprisings did Catherine squash during her reign?',
      answers: [
        'None, they loved her.',
        'More than a dozen.',
        'Just one. No one else dared to mess with her.',
        'One for every year of her reign.'
      ],
      correctAnswer: 'More than a dozen.',
      answerDetail: 'She faced more than a dozen, but none were successful in unseating her majesty.'
    }, {
      question: "How did Catherine die?",
      answers: [
        'Horse',
        'Cancer',
        'Stroke',
        'Measles'
      ],
      correctAnswer: 'Stroke',
      answerDetail: 'Though her life was grand and scandalous, her death was quite a bore. A simple stroke was her end.'
    },
    {
      question: 'Why is Catherine the Great so great?',
      answers: [
        'She expanded the Russian Empire.',
        'Her reign is considered the Golden Age of Russia.',
        'She supported the arts and the enlightenment.',
        'All of the above.'
      ],
      correctAnswer: 'All of the above.',
      answerDetail: 'Of course she did it all. One is not called "The Great" for nothing.'
    },
    
  ],
  view: "home",
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

function render() {
  let content; 
  if (STORE.view == "home") {
    content = `
      <section>
        <img src="imgs/start.gif" alt="Court feast and toast in great hall">
        <p>She was an outsider who would become the longest reigning female monarch in Russia's history. <br>Test your knowledge of Catherine the Great.</p>
        <h3>Let the festivities begin!</h3>
        <button id="start">Start Quiz</button>
      </section>
    `
  } else if(STORE.view == "question") {
    let item = STORE.questions[STORE.questionNumber];
    content = `
      <section>
        <form>
          <h4>Question ${STORE.questionNumber + 1} out of ${STORE.questions.length}</h4>
          <h3>${item.question}</h3>
          <label for="a"><input name="choice" type="radio" id="a" value="${item.answers[0]}"/ required>${item.answers[0]}</label><br>
          <label for="b"><input name="choice" type="radio" id="b" value="${item.answers[1]}"/ required>${item.answers[1]}</label><br>
          <label for="c"><input name="choice" type="radio" id="c" value="${item.answers[2]}"/ required>${item.answers[2]}</label><br>
          <label for="d"><input name="choice" type="radio" id="d" value="${item.answers[3]}"/ required>${item.answers[3]}</label><br>
          <button>Submit</button>
        <p>Score: ${STORE.score}</p>
        </form>
      </section>
    `
  } else if (STORE.view == "correct"){
    content = `
      <section>
        <img src="imgs/correct.gif" alt="Huzzah!">
        <h3>Huzzah! You shall live to see another day.<br>${STORE.questions[STORE.questionNumber].answerDetail}</h3>
        <button id="next">${STORE.questionNumber === STORE.questions.length -1 ? 'See Results': 'Next Question'}</button>
      </section>`
    
  } else if (STORE.view == "wrong"){
    content = `
      <section>
        <img src="imgs/wrong.gif" alt="What?! NO!">
        <h3>Your answer is <em>wrong.</em> ${STORE.questions[STORE.questionNumber].answerDetail}<br>Pray that I do not tire of you. </h3>
        <button id="next">${STORE.questionNumber === STORE.questions.length -1 ? 'See Results': 'Next Question'}</button>
      </section>`

  } else if (STORE.view == "results"){
    if (STORE.score > 2) {
    content = `
      <section>
        <img src="imgs/win.gif" alt="You have cheered me to no end. Bravo!">
        <h3>You've reached the end of the quiz. <br>Your final score is ${STORE.score} out of ${STORE.questions.length} and merits your stay at court.</h3>
        <button id="replay">Play Again</button>
      </section>
    `
    } else if (STORE.score < 3) {
      content = `
        <section>
          <img src="imgs/lose.gif" alt="You are slow of mind and wit.">
          <h3>You've reached the end of the quiz. Your abysmal score is ${STORE.score} out of ${STORE.questions.length} and you will be fed to the bears.</h3>
          <button id="replay">Play Again</button>
        </section>
    `
    }
  };

  $("main").html(content)
};

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

function eventListeners() {
  $("main").on("click", "#start", e => {
    STORE.view = "question";
    render()
  })

  $("main").on("submit", "form", e => {
    e.preventDefault();
    if ($('input[name="choice"]:checked').val() == STORE.questions[STORE.questionNumber].correctAnswer){
      STORE.score++;
      STORE.view = "correct";
    } else {
      STORE.view = "wrong";
    }
    render();
    STORE.questionNumber++;
  });

  $("main").on("click", "#next", e => {
    console.log('next button clicked')
    if (STORE.questionNumber >= STORE.questions.length) {
      STORE.view = "results";
    } else {
      STORE.view = "question";
    }
    render();
  });

  $("main").on("click", "#replay", e => {
    STORE.view = "home";
    STORE.quizStarted = false;
    STORE.questionNumber = 0;
    STORE.score = 0;
    render()
  })
  
};

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

function main () {
  eventListeners();
  render();
};

$(main);

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material and access support for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

// Template for Start Quiz
/*
Quiz Name
Hero Image
Start Button
*/

// Template for Questions
/*
Question
Answers with selectable radio buttons
Submit Button
*/

// Template for Correct Answer
/*
"Correct"
Display number of correct answers
Display numbers of questions left in the quiz
Next Question Button
*/

// Template for Wrong Answer
/*
"Wrong"
Display correct answer
Display number of correct answers
Display number of questions left in the quiz
Next Question Button
*/

// Template for Quiz Complete
/*
If number of correct responses >= 3 display win template
If number of correct answers < 3 display lose template
Play Again Button 
*/


/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)

/* On Start button click
prevent default
generate the questions template
populate with the first question and answers from store
*/

/* When Submit button is clicked
Prevent default
Check if answer selected matches correct answer of that question
If answer is correct add 1 to the score in store
And generate Correct Answer template
If answer is incorrect generate Wrong Answer Template
*/

/* When Next Question button is clicked
Prevent default
Add 1 to question number in store
If question number is equal to length of array, generate quiz complete template
If question number is < length of array, Generate the questions template
populate template with the next question and answers from store
*/


