const question = document.getElementById('question'), 
choices = Array.from(document.getElementsByClassName('options'));
scoreText = document.getElementById('score');


let currentQuestion = {}, acceptingAnswers = false, score = 0, questionCounter = 0, availableQuesions = [], 
questions = [], total = 0;


fetch('https://johnmeade-webdev.github.io/chingu_quiz_api/trial.json').then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        //const allquestionsText = document.getElementById('allquestions');
        //allquestionsText.innerText = questions.length;
        

        
        beginGameNow();
    })
    .catch((err) => {
        console.error(err);
    });
   // let numberOfQuestion = questions.length;
    //console.log(questions.length);
//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 10;

beginGameNow = () => {
    questionCounter = 0;
    score = 0;
    availableQuesions = [...questions];
    getNewQuestion();
};

incrementScore = (num) => {
    score += num;
   scoreText.innerText = score;

};



getNewQuestion = () => {
   document.getElementById('nextB').style.visibility = 'hidden';
   document.getElementById('scorecomment2').style.visibility ='hidden';
   document.getElementById('scorecomment1').style.visibility ='hidden';

   if (questionCounter == MAX_QUESTIONS) {
       alert('You have reached the Maximum, Reload!');
       location.reload()
    
    }
   
   
    
    questionCounter++;
    const currentText = document.getElementById('current');
    const currentRemark = document.getElementById('currentr');
    currentText.innerText = questionCounter;
    currentRemark.innerText = questionCounter - 1 ;

    //score
    currentText

  
    
   

    const questionIndex = Math.floor(Math.random() * availableQuesions.length);
    currentQuestion = availableQuesions[questionIndex];
    question.innerText = currentQuestion.question;
   // console.log(currentQuestion);

    choices.forEach((choice) => {
        const number = choice.dataset['option'];
        choice.innerText = (currentQuestion['choices'][number]);
        
    });

    availableQuesions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        //console.log(e.target);
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['option'];

       let manipulateClass  = 'incorrect';

       if(selectedAnswer == currentQuestion.answer){
        manipulateClass  = 'correct';
       }
       
        

        if (manipulateClass === 'correct') {
           incrementScore(CORRECT_BONUS);
            document.getElementById('scorecomment1').style.visibility = 'visible';
            document.getElementById('nextB').style.visibility = 'visible';
            
        }

        if (manipulateClass === 'incorrect') {
          
           
            document.getElementById('scorecomment2').style.visibility = 'visible';
            document.getElementById('nextB').style.visibility = 'visible';
        }
        
       

        selectedChoice.classList.add(manipulateClass);

      //  console.log(selectedChoice);
        setTimeout(() => {
            selectedChoice.classList.remove(manipulateClass);
            
        }, 900);
    });
});

