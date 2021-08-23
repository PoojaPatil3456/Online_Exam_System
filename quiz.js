(function() 
 {
  var allQuestions = [{
    question: "Which of the following is not a Java features?",
    options: ["Dynamic","Architecture Neutral","Use of pointers","Object-oriented"],
    answer: 2
  },{question:"_____ is used to find and fix bugs in the Java programs.",options:["JVM","JRE","JDK","JDB"],
  answer:3},
  {question:"What is the return type of the hashCode() method in the Object class?",
  options:["Object","int","long","void"],answer:1},
  {question:"What does the expression float a = 35 / 0 return?",options:["0","Not a Number","Infinity","Run time exception"],
  answer:2},
  {question:"Which of the following is true about the anonymous inner class?",
  options:["It has only methods","Objects can't be created","It has a fixed class name","It has no class name"],
  answer:3}];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1 )
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0 || quesCounter===allQuestions.length-1)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        var proceed = confirm("Do you want to submit the quizz?");
        if (proceed) {
          score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        }
        return score;
  }
})();