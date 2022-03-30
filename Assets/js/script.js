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

startButton.on('click', function(){
    scoreCount = 0;
    Introduction.hide();
    fisrtQuestion.show();
    timer.show();
    //timer initialize function
    TimeLeft();
})

$('.FirstQuestionButton').on('click', function(){
    fisrtQuestion.hide();
    secondQuestion.show();
    var optionButton = $(this).attr('id');
    gradeFunction(optionButton);
    clearAnswer();
})

$('.SecondOptnButton').on('click', function(){
    secondQuestion.hide();
    thirdQuestion.show();
    var optionButton = $(this).attr('id');
    gradeFunction(optionButton);
    clearAnswer();
})

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

$('#ClearScore').on('click', function(){
    localStorage.clear();
    $('tbody#ScoreTable tr').remove();
    $('table').hide();
})

$('#RestartQuiz').on('click', function(){
    ScoresHistory.hide();
    Introduction.show();
})

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

function clearAnswer(){
    setTimeout(function(){
        $('#grade').text("");
    }, 1000);
}

function PrintScores(name, score){
    var newScore = $('<tr><td>' + name + '</td><td>' + score + '</td></tr>');
    $('tbody').append(newScore);
}

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

// 1. Timer
//     1. penalizacion
// 2. Mostrar scores
// 3. modificar contenido