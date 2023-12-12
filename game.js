var comPatt=[];
var availColour=["red", "blue", "green", "yellow"];
var myPatt=[];


var level=0;
var start=false;



$(document).keypress(function () {
    
    if(start===false){
      
      start=true;
      
      nextSequence();
      
    }
  })


  function nextSequence(){
    // reset the userPatt
    myPatt=[];

    // setting updated level
    level++;
    $("h1").text("level "+ level);
    // generating and storing random colour
    var ranCol=availColour[Math.floor(Math.random()*3)+1];
    comPatt.push(ranCol);
    // adding animation
    $("#"+ranCol).fadeOut(100).fadeIn(100);
    // giving sound
    playSound(ranCol);
    
    
  }

  function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
  }

  // mimic the comp gen comPatt
  $("button").click(function(){
    
    if(start===false){
      $("body").addClass("useless_button_press");
      setTimeout(function() {
        $("body").removeClass("useless_button_press"); // Set the target background color
      }, 500);
    }
    // fetch the id of the button pressed
    var buttID=$(this).attr("id");
    // animation
    $("#"+buttID).fadeOut(100).fadeIn(100);
    // sound
    playSound(buttID);
    
    if(start===true){
      // store
    myPatt.push(buttID);
    // check
      checkPattern();
    }
  })

  function checkPattern(){
    var ans=true;
    if(start===true){
      for(var i=0;i<myPatt.length;i++){
        if(comPatt[i]!=myPatt[i]){
          playSound("wrong");
          startOver();
          $("h1").text("game over,press any key to restart");
          ans=false;
          break;
          
        }
      }
      if(comPatt.length===myPatt.length && ans===true){
        setTimeout(function(){
          nextSequence();
        },1000);
        
      }
    }
  }

function startOver(){
  comPatt=[];
  myPatt=[];
  start=false;
  level=0;
}


