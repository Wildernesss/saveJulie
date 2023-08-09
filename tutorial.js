var stageData;
var tutoTitle;
var tutoSlideName;
var tutoExplain;
var previousArrow, nextArrow;
var tutoButton;
var tutoActiveIcon;
var tutorialFolder;
var slidesTotal;

var paragraphElement;
var imgElement;
var videoPlayer;


function initializeTutoParam(){

  tutoActiveIcon = $("#tutoIcon");
  
  activeTutorial = localStorage.getItem('activeTutorial');

  if(activeTutorial){ 
  
     activeTutorial = activeTutorial === 'true';

  } else {

    activeTutorial = true;
    localStorage.setItem('activeTutorial', activeTutorial);
    
  }


  if(! activeTutorial){

    tutoActiveIcon.attr('src', imgFolder + 'no_note128x128.png');
    
    
  } else {

     tutoActiveIcon.attr('src', imgFolder + 'notes128x128.png');
    
  }
  
}


function initializeTuto(){

  tutoTitle = select("#tutoTitle");
  tutoSlideName = select("#tutoSlideName");
  tutoExplain = select("#tutoExplain");
  tutoNavigate = select("#tutorialNavigate");
  tutoButton = $("#tutoImg");


  previousArrow = createImg('images/previous-arrow128x128.png', 'previous');
  previousArrow.id('previousArrow');
  previousArrow.mouseClicked(displayPreviousSlide);
  previousArrow.style('display', 'none');
  tutoNavigate.child(previousArrow);

  nextArrow = createImg('images/next-arrow128x128.png', 'next');
  nextArrow.id('nextArrow');
  nextArrow.mouseClicked(displayNextSlide);
  tutoNavigate.child(nextArrow);

  initializeTutoParam();

}

function getTutoStage(nb){

  for(let i = 0; i < tutorial.content.stage.length; i++){

    if(tutorial.content.stage[i].number == nb){

      return tutorial.content.stage[i];

    }

  }

  return null;

}

function displayStageSlide(stageNb, slideNb){

  var slide;
  var imgUrl, videoUrl;

  stageData = getTutoStage(stageNb);
  slide = stageData.slide[slideNb];
  slidesTotal = tutorial.content.stage[info.currentItem].slide.length;


  if(stageData){

    tutoTitle.html(stageData.title);

    if(slide){

      if(slide.name){

        tutoSlideName.html(slide.name);

      }

      if(slide.text){

        paragraphElement = createP(slide.text);
        paragraphElement.id('tutoText');

        tutoExplain.child(paragraphElement);

      }

      if(slide.image){

        imgUrl = tutorialUrl + '/images/' + slide.image.src;

        imgElement = createImg(imgUrl, '');
        imgElement.id('tutoSlideImage');      
        // imgElement.style('max-width', '100%');
        // imgElement.style('max-height', '100%');
        // imgElement.style('object-fit', 'countain');

        if(slide.image.size){

          imgElement.style('width', slide.image.size);
    

        }

        imgElement.style('opacity', '1');
        tutoExplain.child(imgElement);

      }

      if(slide.video){

        videoUrl = tutorialUrl + '/videos/' + slide.video;

        videoPlayer = document.createElement('video');
        videoPlayer.id = 'videoPlayer';
        videoPlayer.src = videoUrl;
        videoPlayer.controls = true;

        videoPlayer.onplay = (event) => {

          videoPlayer.requestFullscreen();

        };

        document.getElementById('tutoExplain')
        .appendChild(videoPlayer);


       }

      if(tutorial.currentSlideNb == slidesTotal - 1){

        nextArrow.attribute('src', 'images/play128x128.png');      
      
      }

    }

  }

}

function clearSlideArea(){

  tutoTitle.html("");
  tutoSlideName.html("");
  tutoExplain.html("");

}


function toggleTuto(event){

   var currentItem = 0;
   var tutoArea = $("#tutorialArea");
   var tutoExplain = select("#tutoExplain");
   var tutorialAreaStatus = tutoArea.css("display");
   var stage;

   info.currentItem = worldNb;

   if(! info.tutorialLoaded) return;

   stage = getTutoStage(worldNb);

   if(stage){

     if(stage.visible != true && event != 'tutoButtonClicked') return;
   
   }

   if(tutorialAreaStatus != 'none'){

      tutoArea.fadeOut();
      tutoArea.fadeOut("slow");
      tutoArea.fadeOut(3000);
      clearSlideArea();

    } else {

      if(getTutoStage(info.currentItem)){

        tutoArea.fadeIn();
        tutoArea.fadeIn("slow");
        tutoArea.fadeIn(3000);

        displayStageSlide(info.currentItem, tutorial.currentSlideNb);

      }

    }

}

function displayNextSlide(){

   if(tutorial.currentSlideNb < slidesTotal - 1){

     tutorial.currentSlideNb++;
     clearSlideArea();
     previousArrow.style('display', 'inline-block');
     nextArrow.attribute('src', 'images/next-arrow128x128.png');

     displayStageSlide(info.currentItem, tutorial.currentSlideNb);

   } else {

      toggleTuto();
     
   }

}

function displayPreviousSlide(){

  if(tutorial.currentSlideNb > 0){

    tutorial.currentSlideNb--;
    clearSlideArea();
    
    nextArrow.attribute('src', 'images/next-arrow128x128.png');
    nextArrow.style('display', 'inline-block');

    if(tutorial.currentSlideNb == 0){

      previousArrow.style('display', 'none');

     }

     displayStageSlide(info.currentItem, tutorial.currentSlideNb);

   }

}

function resetSlide(){

  if(getTutoStage(worldNb)){

    tutoButton.show();
    tutoActiveIcon.show();

  } else {

    tutoButton.hide();
    tutoActiveIcon.hide();

  }

  // tutoButton.show();

  tutorial.currentSlideNb = 0;
  nextArrow.attribute('src', 'images/next-arrow128x128.png');
  nextArrow.style('display', 'inline-block');
  previousArrow.style('display', 'none');


}


function reactiveAllTutoSlides(){

  for(let stage of tutorial.content.stage){

    stage.viewed = false;
    
  }
  
}


function toggleActiveTuto(){

  activeTutorial = !activeTutorial;

  localStorage.setItem('activeTutorial', activeTutorial);

  if(activeTutorial){

    reactiveAllTutoSlides();
    tutoActiveIcon.attr('src', imgFolder + 'notes128x128.png');

  } else {

    tutoActiveIcon.attr('src', imgFolder + 'no_note128x128.png');
  
  }
   
}
