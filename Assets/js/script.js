var startButton = $('#start_button');
var Introduction = $('#page_0');
var fisrtQuestion = $('#page_1');
var secondQuestion = $('#page_2');
var thirdQuestion = $('#page_3');
var SaveScore = $('#saveScore');
var ScoresHistory = $('#scoresHistory');
var scoreDisplay = $('#ActualScore');
var scoreInitials = $('#Initials');
var timer = $('#timer');
var scores = [];
var scoreCount = 0;
var stopTimer = false;
var penalty= false;
var finalQuestion = false;

///Event on click start button
startButton.on('click', function(){
    scoreCount = 0;
    Introduction.hide();
    fisrtQuestion.show();
    timer.show();
    //timer initialize function
    TimeLeft();
})

///Event on click 1st question button
$('.FirstQuestionButton').on('click', function(){
    fisrtQuestion.hide();
    secondQuestion.show();
    var optionButton = $(this).attr('id');
    gradeFunction(optionButton);
    clearAnswer();
})

///Event on click 2nd question button
$('.SecondOptnButton').on('click', function(){
    secondQuestion.hide();
    thirdQuestion.show();
    var optionButton = $(this).attr('id');
    gradeFunction(optionButton);
    clearAnswer();
})

///Event on click 3rd question button
$('.ThirdOptnButton').on('click', function(){
    finalQuestion = true;
    thirdQuestion.hide();
    SaveScore.show();
    var optionButton = $(this).attr('id');
    gradeFunction(optionButton);
    scoreDisplay.text(scoreCount);
    timer.hide();
    clearAnswer();

})

///Event on click 4rd question button
///Event on click 5th and final question button

///Event on click submmit button
$('#submitBtn').on('click', function(event){
    event.preventDefault();
    var ScoreObj = new Object();
    ScoreObj.Name = scoreInitials.val();
    ScoreObj.Score = scoreCount;
    console.log(ScoreObj.Name);
    localStorage.setItem("score", JSON.stringify(ScoreObj));
    PrintScores(ScoreObj.Name, ScoreObj.Score);
    SaveScore.hide();
    ScoresHistory.show();
    scoreInitials.val('');
    $('table').show();
})


///Event on click "Clear Scores" button
$('#ClearScore').on('click', function(){
    localStorage.clear();
    $('tbody#ScoreTable tr').remove();
    $('table').hide();
})


///Event on click "Restart quiz" button
$('#RestartQuiz').on('click', function(){
    ScoresHistory.hide();
    Introduction.show();
})


///evaluates answer in order to sum a point if it is correct and substracts time if it is incorrect
function gradeFunction(value){
    if(value == 'OptnC'){
        console.log("correcto");
        scoreCount++;
        $('#grade').text("Correct!");
        console.log(scoreCount);
    }else if(finalQuestion){
        console.log("incorrecto");
        penalty= true
        $('#grade').text("Incorrect!");
    }else{
        console.log("incorrecto");
        penalty= true
        $('#grade').text("Incorrect! (-5 seconds)");
    }
}

// lets User see the "correct/incorrect" text for a limited time
function clearAnswer(){
    setTimeout(function(){
        $('#grade').text("");
    }, 1000);
}


// Print scores on a table
function PrintScores(name, score){
    var newScore = $('<tr><td>' + name + '</td><td>' + score + '</td></tr>');
    $('tbody').append(newScore);
}


// timer function
function TimeLeft(){
    var timeLeft = 10;
    $('#timeLeft').text(timeLeft);
    var timerInterval = setInterval(function(){
        timeLeft--;
        if(penalty){
            timeLeft = timeLeft - 5;
            penalty = false;
        }
        $('#timeLeft').text(timeLeft);
        if(timeLeft === 0 || finalQuestion){
            
            clearInterval(timerInterval);
            timer.hide();
            finalQuestion = false;
            $('#timeLeft').text("50");
            $('.question_section').hide();
            scoreDisplay.text(scoreCount);
            SaveScore.show();
        }
    }, 1000);
}