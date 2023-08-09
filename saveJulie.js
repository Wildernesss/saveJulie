const tutorialsCommonFolder = "tutorials";
const imgFolder = "images/";
const mediaFilesNb = 13;

var canvas;                      // Processing drawing canvas
var universe, info, data, world; // current universe and its parts 
var genesis;                     // clone of current world
var player;

var codeEditor;                  // Ace editor API
var editorCursorPosition;        // cursor location in Ace editor

var body;                        // body element of the play.html
var worldNbDiv;                  // div element for worlds numbers bullets
var languageSelect;              // select element for programming language selection
var loadingScreen;               // div element loadingScreen
var progressbar;                 // div element progressbar

var canvasWidth;                 // width of canvas to build to draw world
var canvasHeight;                // height of canvas to build to draw world
var borderColor = 190;           // gray scale world border color
var mapScale = 0.7;              // view scale of world and canevas
var minScale = 0.4;              // canevas min view scale
var maxScale = 1;                // canevas max view scale
var maxCanvasHeight = 300;       // max pixel canvas height
var defaultCellWidth = 80;       // default cell width of topo grid
var defaultCellHeight = 80;      // default cell height of topo grid// 
// var squareSize;
var gridWidth, gridHeight;       // width and height of world grid
var cellWidth, cellHeight;       // current cell width and height
// var cellSize;
var marginLeft, marginTop;       // left and top margins of topogrid
var marginRight, marginBottom;   // right and bottom margins of topo grid
var borderWeight;                // border weight of topo grid

var playerImg, stoneImg;         // player and stone cell images
var targetImg, flagImg;          // target and flag cell images
var crackImg;                    // crack cell image
var imgPad;                      // cells padding
var autoScriptImg;               // auto scripting control icon
var volumeImg, runImg;           // volume control icon

var code = [];
var counter = 0;
var delay = 500;
var started = false;
var language = "javascript";
var exerciseFile, exerciceFileJson;
var sampleCodeXMLElement;
var urlParams;
var toposFolder = 'topos/'
var worldNb = 0;
var filename;
var fileReloadNb = 0;
var executeCode;
var breakingCode;
var pageUrl;
var savingProcessId;
var playerCodeLoopCount = 0;
var maxplayerCodeLoop = 60;
var tutorialName = '';
var tutorialUrl;
var tutorial;
var activeTutorial = true;
var framesRate = 1.5;
var audioVolume = 1;
var snowStepSound, jumpingSound, fallingBodySound;
var fallingRocksSound, succeedSound, endMissionSound;
var failedMission, backgroundSound;
var soundTracks = [];
var codeChangesSaved = true;
var autoScript = false;
var volumeOn = true;
var loadedFilesCount = 0;
var mediaFilesLoaded = false;
var runOn = true;


function initializePlay(){

  loadScreen = select("#loadingScreen");
  progressbar = select("#progressbar");
  body = select("body");
  runImg = select("#runImg");

}

function openFileApproval(){

  var msg = "Les dernières modifications n'ont pas été ";
  msg += "enregistrées.\n\nSi vous souhaitez les enregistrer, ";
  msg += "cliquez sur 'Annuler' et enregistrez-les.\n\n";
  msg += "Si vous ne souhaitez pas les enregistrer ";
  msg += "et ouvrir un autre fichier, cliquez sur OK ";
  msg += "puis cliquez à nouveau sur l'icône 'Ouvrir' ";
  msg += "afin d'ouvrir un autre fichier. Les ";
  msg += "modifications de cette série de topos ";
  msg += "seront alors perdues suite à l'ouverture ";
  msg += "du fichier.";

  if(! codeChangesSaved){

    if (window.confirm(msg)){
      
      codeChangesSaved = true;
      return true;
    
    } else return false;
    
  } else return true;
  
}
  
function onReaderLoad(event){
// process uploaded data file

  var url = window.location.pathname;
  var htmlFilename = url.substring(url.lastIndexOf('/') + 1);

  localStorage.setItem('loadedDataFile', event.target.result);

  if(htmlFilename == 'topos.html'){

    window.location.href = "play.html";

  } else if(htmlFilename == 'play.html') {

    location.reload();
    // setup();

  }

}


function uploadDataFile(event){
// upload data file

  var reader = new FileReader();

  filename = event.target.files[0].name; 

  localStorage.setItem('loadedFilename', filename);

  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);  

}


function countLoadedFiles(){

  var progressbarWidth;

  progressbar = select("#progressbar");
  
  loadedFilesCount++;

  progressbarWidth = round(loadedFilesCount / mediaFilesNb * 50);

  progressbar.style('width', progressbarWidth + '%');

  if(loadedFilesCount == mediaFilesNb){

    loadScreen.style('display', 'none');
    body.style('overflow', 'auto');
    mediaFilesLoaded = true;
    
  }
  
}



function loadImages(){
  // images references: https://iconarchive.com/

  progressbar = select("#progressbar");

  playerImg    = loadImage(imgFolder + 'marc128x128.png', countLoadedFiles);
  targetImg    = loadImage(imgFolder + 'julie128x128.png', countLoadedFiles);
  flagImg      = loadImage(imgFolder + 'flag128x128.png', countLoadedFiles);
  crackImg     = loadImage(imgFolder + 'crack128x128.png', countLoadedFiles);
  stoneImg     = loadImage(imgFolder + 'stone128x128.png', countLoadedFiles);
  
}

function done(){

  // alert("done");

}

function loadSounds(){

  // sounds references: https://pixabay.com/sound-effects/

  progressbar = select("#progressbar");

  snowStepSound = loadSound('sounds/crunchy-footsteps.mp3', countLoadedFiles);
  backgroundSound = loadSound('sounds/winter-wind-whistling.mp3', countLoadedFiles)
  jumpingSound = loadSound('sounds/human-impact-on-ground.mp3', countLoadedFiles);
  fallingBodySound = loadSound('sounds/body-falling.mp3', countLoadedFiles);
  fallingRocksSound = loadSound('sounds/stones-falling.mp3', countLoadedFiles);
  succeedSound = loadSound('sounds/success-mission.mp3', countLoadedFiles);
  endMissionSound = loadSound('sounds/hard-rock.mp3', countLoadedFiles);
  failedMission = loadSound('sounds/failed.mp3', countLoadedFiles);

  failedMission.playMode('restart');

  soundTracks.push(snowStepSound);
  soundTracks.push(jumpingSound);
  soundTracks.push(fallingBodySound);
  soundTracks.push(fallingRocksSound);
  soundTracks.push(succeedSound);
  soundTracks.push(endMissionSound);
  soundTracks.push(failedMission);
  soundTracks.push(backgroundSound);
  soundTracks.push(failedMission);
  
}



function preload() {

  var previousFilename;
  var manualWorkspaceLoading = false;

  loadImages();
  
  filename = getUrlVars()['filename'];

  if(! filename){

     if(localStorage.getItem('loadedFilename')){

      filename = localStorage.getItem('loadedFilename');

       if(localStorage.getItem('loadedDataFile')){

         exerciseFile = localStorage.getItem('loadedDataFile');
         
       }

     }

  } else {

    exerciseFile = loadJSON(toposFolder + filename + '?' + Math.random());
    
  }



}

function containsChar(str, setOfChars){

   var regex = RegExp('[' + setOfChars + ']');

   return regex.test(str);

}


function drawWorld(){

  background(255);

  stroke(borderColor, borderColor, borderColor);
  strokeWeight(borderWeight);

  for (var i = 0; i < gridHeight; i++) {

    for (var j = 0; j < gridWidth; j++) {

      let code = world[i][j];
      let imgWidth = cellWidth - borderWeight - imgPad;
      let imgHeight = cellHeight - borderWeight - imgPad;
      let x = marginLeft + j * cellWidth;
      let y = marginTop + i * cellHeight;
      let imgX = x + borderWeight + imgPad + (cellWidth - 2 * (borderWeight + imgPad) - imgWidth) / 2;
      let imgY = y + borderWeight + imgPad + (cellHeight - 2 * (borderWeight + imgPad) - imgHeight) / 2;

      if(containsChar(code, 'pstfx')){

        fill(156, 221, 243);

      }

      if(containsChar(code, 'oc') || code.includes("cp")){

        fill(255, 255, 255);

      }         

      rect(x, y, cellWidth, cellHeight);

      if(code.includes("f")){

        image(flagImg, imgX, imgY, imgWidth, imgHeight);

      }

      if(code.includes("t")){

        image(targetImg, imgX, imgY, imgWidth, imgHeight);

      }

      if(code.includes("c")){

        image(crackImg, imgX, imgY, imgWidth, imgHeight);

      }      

      if(code.includes("p")){

        image(player.img, imgX, imgY, imgWidth, imgHeight);

      }

      if(code.includes("s")){

        image(stoneImg, imgX, imgY, imgWidth, imgHeight);

      }
    }
  }


}

function wait(ms){

   var start = new Date().getTime();
   var end = start;

   while(end < start + ms) {

     end = new Date().getTime();

  }

}


function getUrlVars() {

    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function resetInterface(){

   editorWorkspace.clear();
   initialize();

}

function saveCode(){

  if(editorWorkspace){

    var xml = Blockly.Xml.workspaceToDom(editorWorkspace);
    var txt = Blockly.Xml.domToText(xml);
    data[worldNb]["blocks"] = txt;
    data[worldNb]["javascript"] = codeEditor.getValue();
  
    localStorage.setItem('universe', JSON.stringify(universe));
  
  }

}


function displayTutoStage(){

  if(tutorial.content.stage[worldNb]){

    if(! tutorial.content.stage[worldNb].viewed){

      if(activeTutorial)toggleTuto();

      tutorial.content.stage[worldNb].viewed = true;

    }

   }

}


function goToWorld(w){

   var stage;

   saveCode();
   worldNb = w;
   localStorage.setItem('worldNb', worldNb);
   world = data[worldNb]["world"];
   initializePlayerOrientation();
   resetInterface();
   paintWorldIcons();
   updateDisplayedTitle();
   redraw();

   // editorWorkspace.zoomCenter();
   editorWorkspace.zoomToFit();

  language = 'javascript';
  changeLanguage(language);
  
   if(backgroundSound) backgroundSound.play();

   if(tutorial){

     resetSlide();
     displayTutoStage();

   }

}

function paintWorldIcon(nb, color){

  var icon;

  icon = select("#worldIcon" + nb);

  icon.style("background", color);

}

function paintWorldIcons(){

  var icon;

  for(let i = 1; i <= data.length; i++){

    paintWorldIcon(i, "#5178D0");

    if(data[i - 1]["succeed"]){

      paintWorldIcon(i, "#069137");

    }

    if(worldNb === i - 1){

      paintWorldIcon(i, "#cc440e");

    }

  }

}


function clearBrowseWorldIcon(){

  worldNbDiv = document.getElementById('worldNb');
  worldNbDiv.innerHTML = '';

}


function drawBrowseWorldIcon(){

  var iconNb;

  clearBrowseWorldIcon();

  worldNbDiv = select("#worldNb");

  for(let i = 1; i <= data.length; i++){

    iconNb = createDiv(i);
    iconNb.class("iconNb");
    iconNb.attribute("onclick", "goToWorld(" + (i - 1) +")");
    iconNb.id("worldIcon" + i);
    worldNbDiv.child(iconNb);

  }

  paintWorldIcons();

}

function updateDisplayedTitle(){

  var universeTitleDiv = select("#universeTitle");
  var worldTitleDiv    = select("#worldTitle");
  universeTitleDiv.html(info["name"]);
  worldTitleDiv.html(data[worldNb]['title']);

}


async function fileExists(url){
  
  const response = await fetch(url, {
    method: "head",
    mode: "no-cors"
  });
  
  return response.status == 200;
  
}


function initializeAppsParams(){

  autoScriptImg = select("#autoScript");
  volumeImg = select("#volumeIcon");
  
  autoScript = localStorage.getItem('autoScript');
  volumeOn   = localStorage.getItem('volumeOn');

  
  if(autoScript){
    
    autoScript = autoScript === 'true';
  
  } else {
    
    autoScript = false; // default value
    localStorage.setItem('autoScript', autoScript);
  
  }

  if(! autoScript){

     autoScriptImg.attribute('src', imgFolder + 'script_off.png');

    
  } else {

     autoScriptImg.attribute('src', imgFolder + 'script_on.png');
    
  }


  if(volumeOn){
    
    volumeOn = volumeOn === 'true';
  
  } else {
    
    volumeOn = true; // default
    localStorage.setItem('volumeOn', volumeOn);
  
  }

  if(! volumeOn){

     volumeImg.attribute('src', imgFolder + 'volume_off.png');

    
  } else {

     volumeImg.attribute('src', imgFolder + 'volume_on.png');
    
  }

  
}

function loadData(){

  var worldNbStr;
  var dataStr;
  var itemNb = 0;
  var titleDiv;
  var previousPageUrl;
  var fileContent;

  initializeAppsParams();

  if(localStorage.getItem('loadedDataFile')){

    fileContent = localStorage.getItem('loadedDataFile');
    universe = JSON.parse(fileContent);

    if(filename = localStorage.getItem('loadedFilename')){

      filename = localStorage.getItem('loadedFilename');

    }

    // localStorage.removeItem('loadedDataFile');
    
  } else {

    universe = exerciseFile;

  }

  pageUrl = location.pathname.substring(1);

  // localStorage.clear();

  info = universe["info"];
  data = universe["data"];

  tutorialName = info.tutorial;

  if(tutorialName){

    tutorialUrl = tutorialsCommonFolder + '/' + tutorialName;

    tutorialDataUrl = tutorialUrl + '/' + tutorialName + '.json';

    // localStorage.setItem('tutorial', tutorialName);
    info.tutorialLoaded = false;

    
    if(tutorialName.length > 0){

      loadJSON(tutorialDataUrl + "?" + Math.random(), loadedTutorial);

    }

  }

  itemNb = info.currentItem;

  worldNbStr = getUrlVars()['worldnb'];

  if(worldNbStr){

    worldNb = parseInt(worldNbStr) % data.length;

  } else {worldNb = 0}

  updateDisplayedTitle();

  // activeTutorial = info.activeTutorial;
  
}


function loadedTutorial(tuto){

  info.tutorialLoaded = true;
  tutorial = tuto;

  tutorial.currentSlideNb = 0;

  if(activeTutorial){
    
    displayTutoStage();

  }

}

function cloneWorld(w){

   var clone = [];

   for(i = 0; i < w.length; i++){

     clone[i] = [];

     for(j = 0; j < w[0].length; j++){

       clone[i][j] = w[i][j];

     }

   }

   return clone;

}

function rescaleCanvas(scale){

  gridWidth = world[0].length;
  gridHeight = world.length;

  mapScale = scale;

  cellWidth = defaultCellWidth * mapScale;
  cellHeight = defaultCellHeight * mapScale;
  marginTop = 10;
  marginLeft = 10;
  marginRight = 10;
  marginBottom = 10;
  borderWeight = 2;
  imgPad = 20;

  canvasWidth = gridWidth * cellWidth;
  canvasHeight = gridHeight * cellHeight;

  resizeCanvas(canvasWidth + marginLeft + marginRight, canvasHeight + marginTop + marginBottom);

}


function makeCanvas(){

  gridWidth = world[0].length;
  gridHeight = world.length;

  if( (gridHeight * defaultCellHeight > maxCanvasHeight)){

    mapScale = maxCanvasHeight / (gridHeight * defaultCellHeight);

  };

  cellWidth = defaultCellWidth * mapScale;
  cellHeight = defaultCellHeight * mapScale;
  marginTop = 10;
  marginLeft = 10;
  marginRight = 10;
  marginBottom = 10;
  borderWeight = 2;
  imgPad = 20;

  canvasWidth = gridWidth * cellWidth;
  canvasHeight = gridHeight * cellHeight;

  canvas = createCanvas(canvasWidth + marginLeft + marginRight, canvasHeight + marginTop + marginBottom);
  canvas.parent('canvas-holder');

}


function initialize(){
  
  world = data[worldNb]["world"];

  languageSelect = select("#languageSelect");

  sampleCodeXMLElement = Blockly.Xml.textToDom(data[worldNb]["blocks"]);

  Blockly.Xml.domToWorkspace(sampleCodeXMLElement, editorWorkspace);

  editorWorkspace.addChangeListener(function(event){
    
     if (! event.isUiEvent && event.type != Blockly.Events.FINISHED_LOADING){

       codeChangesSaved = false;

       if(autoScript){

         generateCode();
         
       }

     }

    }

   );


  genesis = cloneWorld(world);

  makeCanvas();

  codeEditor.setTheme("ace/theme/monokai");
  codeEditor.setFontSize("16px");
  codeEditor.getSession().setMode("ace/mode/" + language);

  codeEditor.setValue(data[worldNb]["javascript"]);

  codeEditor.on("change", function(){

    codeChangesSaved = false;
    data[worldNb]["javascript"] = codeEditor.getValue();

  });


  editorCursorPosition = {
    row: 0,
    column: 0
    };

  player = new Player(playerImg, world);
  player.locate();

  initializePlayerOrientation();

  codeEditor.setValue(data[worldNb]["javascript"]);
    // codeEditor.session.insert(editorCursorPosition, code[worldNb]);

  drawWorld();
  noLoop();

}


function zoomIn(){

  var s = mapScale;

  if(mapScale + 0.05 <= maxScale){

    s = s + 0.05;

    rescaleCanvas(s);

  }

}

function zoomOut(){

   var s = mapScale;

   if(mapScale - 0.05 >= minScale){

     s = s - 0.05;

     rescaleCanvas(s);

   }

}

function setup() {

  // setupExercise();
  // addnewBlock();

  window.onbeforeunload = function(e) {

    if(! codeChangesSaved){

      return "Les dernières modifications apportées au code n'ont pas été enregistrées. Celles-ci seront perdues si vous n'annulez pas l'opération pour ensuite les enregistrer.";
      
    }
    
  };

  loadData();

  codeChangesSaved = true;

  worldNb = info.currentItem;

  drawBrowseWorldIcon();

  if(typeof editorWorkspace === 'undefined'){

    initBlocklyWorkspace();
    
  }

  // p = player safe; o = unsafe case; x = safe case; f = flag ;
  // c = crack; s = stone;

  codeEditor = ace.edit("codeEditor");

  initialize();

  loadSounds();

  savingProcessId = setInterval(saveCode, 5000);

}


function draw() {

  if(started){

    player.playNext();
    drawWorld();

  } else {

    started = true;
    frameRate(framesRate);

  }

}

function Player(img, roadMap) {

  this.initialRoadMap = roadMap;   // initial map of the player's world
  this.recording = true;           // recording route (staying)
  this.playing = false;            // following route (moving)
  this.onTrack = true;             // player is on track (safe area, blue cell)
  this.fell = false;               // player has fallen into a crack
  this.hit = false;                // player has overriden glacier (hit by falling rock)
  this.statements = [];            // array of sequential route statements
  this.seqNb = 0;                  // statement number
  this.step = {x : 0, y : -1};     // player nextion step (default: north)
  this.img = img.get();            // player's image
  this.x = 0;                      // current player x location
  this.y = 0;                      // current player y location
  this.orientation = 0;            // player orientation (0: north, 1:east, 2: south, 3: west)
  this.routeX;                     // next player x location after next step on roadmap
  this.routeY;                     // next player y location after next step  on roadmap
  this.routeOrientation = 0;       // player orientation on roadmap 
  this.outOfMapCount = 0;          // number of steps done out of roadmap when recording route
  this.roadMap = roadMap;          // player's roadmap
  this.routeSuccess = false;       // route reaches its target (virtually on roadmap)
  this.missionSuccess = false;     // player has reached target (after moving according to route statements)
  this.missionFailed = false;      // player has failed to reach target (after moving according to route statements)

  this.go = function(motion){
  // move guide (one step sequence) virtually (recording route)
  // or physically (playing animation)

    var nextX, nextY;     // next player cell coordinates
    var nextLocationCode; // next location ground code (safe, unsafe, crack, ...)
    var stepNb;           // step(s) number to be done with next motion
    var statementCode;    // statement code to added to statements list


    if(motion === "move"){

      stepNb = 1;
      statementCode = "m";

    } else if(motion === "jump") {

      stepNb = 2;
      statementCode = "j";

    } else {

      return;

    }

    if(this.recording){
    // A. move guide (one step sequence) virtually by recording route

      let step;

      this.statements.push(statementCode);
      // add statement code to statements list

      step = this.getStep(this.routeOrientation);
      // get next guide's step to do from his current location

      if(this.routeX + step.x * stepNb < this.roadMap[0].length
         // guide not moving out of map on right side

        && this.routeX + step.x * stepNb >= 0
        // guide not moving out of map on left side

        && this.routeY + step.y * stepNb < this.roadMap.length
        // guide not moving out of map on down side

        && this.routeY + step.y * stepNb >= 0){
        // guide not moving out of map on up  side

        this.routeX = this.routeX + step.x * stepNb;
        this.routeY = this.routeY + step.y * stepNb;
        // new guide route coordinates after step done

        nextLocationCode = roadMap[this.routeY][this.routeX];
        // get ground code of new guide location (safe, unsafe, crack)

      } else {
        // guide moves out of map borders

        nextLocationCode = "-";

      }


      if(nextLocationCode !== "x"){
        // next guide's location is not safe or target has been reached

        if(nextLocationCode === "t" || nextLocationCode === "f"){
          // guide has succeeded reaching target

          this.routeSuccess = true;

        }

        this.recording = false;

        return; // after this point -> no return -> to be checked 14.10.2022
        // end of recording future guide's route

        if(this.outOfMapCount > 0){   // statements after return
                                      // will never been executed
          this.outOfMapCount++;       // to check: 11.05.23
          this.recording = false;
          return;

        }

        this.outOfMapCount++;

      }

    }

    if(this.playing){
      // B. move guide (one step sequence) physically
      // on map (playing animation))

      if(this.onTrack){

        if( this.x + this.step.x * stepNb < this.roadMap[0].length
          // guide not moving out of map on right side

          && this.x + this.step.x * stepNb >= 0
          // guide not moving out of map on left side

          && this.y + this.step.y * stepNb < this.roadMap.length
          // guide not moving out of map on down side

          && this.y + this.step.y * stepNb >= 0){
          // guide not moving out of map on up  side

          nextX = this.x + this.step.x * stepNb;
          nextY = this.y + this.step.y * stepNb;
          // new guide route coordinates after step done

          nextLocationCode = world[nextY][nextX];
          // get ground code of new guide location (safe, unsafe, crack)

        } else {
          // guide moves out of map borders
          // process out map border motion in case of move and jump
        
             fallingRocksSound.play();
        
             switch(motion){
        
                case "move" : this.roadMap[this.y][this.x] = "s";
                              // replace guide by falling stone after moving
                              break;
        
                case "jump" : if(this.x + this.step.x > this.roadMap[0].length - 1
                                 || this.x + this.step.x < 0
                                 || this.y + this.step.y > this.roadMap.length - 1
                                 || this.y + this.step.y < 0){
                                 // guide jumping from a glacier border cell
        
                                  this.roadMap[this.y][this.x] = "s";
        
                              } else {
                                // guide jumping from 1 step away glacier border cell
        
                                this.roadMap[this.y][this.x] = "x";
                                this.x = this.x + this.step.x;
                                this.y = this.y + this.step.y;
                                this.roadMap[this.y][this.x] = "s";
        
                              };
        
                              break;
        
             }
          
             this.hit = true;
             this.missionFailed = true;
        
             return;
             // stone drawn on map, exit game
        
           nextLocationCode = "-";
        
        } // end of processing guide's moving out of border

      } // end of processing if this.onTrack


      if(nextLocationCode !== "x" 
         && nextLocationCode !== "t"
         && nextLocationCode !== "f"){
         // next guide's destination cell is not safe or target
    
        if(this.onTrack){
          // #1 opening guide falling into crack scene (1st sequence)
          // guide is still on safe cell before moving
          // so move guide on dangerous cell (crack or covered crack)
          //  on virtual map but guide not falling immediately into crack
    
          this.roadMap[this.y][this.x] = "x";
          // replace guide with empty safe blue area in future previous cell
    
          this.x = nextX;
          this.y = nextY;
          // move guide to new cell setting his new coordinates
    
          this.roadMap[this.y][this.x] = "cp";
          // set crack and guide code on destination cell
    
          this.onTrack = false;
          // guide is now on unsafe cell over a crack but is still fallen
    
          this.seqNb--;
          // previous safe sequence number
    
          fallingBodySound.play();
    
          return;
          // guide over crack codes marked on map for current cell
    
        } else {
          // guide falls into crack
    
           if(! this.fell){
           // #2 guide falling into crack scene (guide falling into crack)
           // guide fall into crack marked on map
           // guide code removed from current cell on map
           // and no more visible
    
             this.roadMap[this.y][this.x] = "c";
             this.fell = true;
    
             this.seqNb--;
             // previous safe sequence number
    
             return;
    
           } else {
             // #3 ending falling guide sequence
    
             noLoop();
             this.playing = false;
             this.missionFailed = true;
             setTimeout(reinitializeWorld, 3000);
    
             return;
             // cracked alone drawn on map, exit game
    
           }
    
        }
    
      }

      this.roadMap[this.y][this.x] = "x";
      // replace guide with empty safe blue area in future previous cell
    
      this.x = nextX;
      this.y = nextY;
      // move guide to new cell setting his new coordinates
    
      this.roadMap[this.y][this.x] = "p";
      // set guide code on destination cell

      if(nextLocationCode === "t" || nextLocationCode === "f"){
      // next cell is target cell (tourist)

         this.roadMap[this.y][this.x] += nextLocationCode;
         // add target cell code to guide code
         // to display both corresponding icons

         this.missionSuccess = true;
         data[worldNb]["succeed"] = true;
         // set success flags to true for this world

         paintWorldIcon(worldNb + 1, "#069137");
         // pain in green world icon number

         setTimeout(goToNextWorld, 4000);

      }

    }

  }


  this.move = function(){

    this.go("move");

    if(this.playing && ! this.fell){

      snowStepSound.play();

    }

  }


  this.jump = function(){

    this.go("jump");

    if(this.playing && ! this.fell){

      jumpingSound.play();

    }

  }

  this.getStep = function(orientation){

    var step = {x : 0, y : -1}; // default: north

    switch(orientation){

       case 0 : step.x = 0;
                step.y = -1;
                break;

       case 1 : step.x = 1;
                step.y = 0;
                break;

       case 2 : step.x = 0;
                step.y = 1;
                break;

       case 3 : step.x = -1;
                step.y = 0;
                break;
    }

    return step;

  }

  this.setOrientation = function(orientation){

     var newOrientation = Math.abs(orientation % 4);

     this.orientation = newOrientation;
     this.step = this.getStep(orientation);

  }

  this.turnRight = function(){

     if(this.recording){

       this.statements.push("r");
       this.routeOrientation = Math.abs((this.routeOrientation + 1) % 4);

     }

     if(this.playing){

       this.setOrientation(this.orientation + 1);
       this.img = rotateRight2(this.img);

       if(! this.hit){

         snowStepSound.play();

       }

     }

  }

  this.turnLeft = function(){

    if(this.recording){

      this.statements.push("l");
      if(this.routeOrientation == 0) this.routeOrientation = 4;
      this.routeOrientation = Math.abs(this.routeOrientation - 1 % 4);

    }

    if(this.playing){

      if(this.orientation == 0) this.orientation = 4;

      this.setOrientation(this.orientation - 1);
      this.img = rotateLeft(this.img);

      if(! this.hit){

        snowStepSound.play();

      }

    }

  }

  this.getWatchedCellCode = function(direction, cellNb){

     var watchedCellCode;
     var watchedCellCoord = {x : 0, y : 0};
     var step;

     switch(direction){

       case "forward" :  step = this.getStep(this.routeOrientation);
                         break;

       case "right" :    step = this.getStep((this.routeOrientation + 1) % 4);
                         break;

       case "backward" : step = this.getStep((this.routeOrientation + 2) % 4);
                         break;

       case "left"  :    step = this.getStep((this.routeOrientation + 3) % 4);
                         break;

     }

     watchedCellCoord.x = this.routeX + step.x * cellNb;
     watchedCellCoord.y = this.routeY + step.y * cellNb;

     if(watchedCellCoord.x >= 0 && watchedCellCoord.y >= 0
        && watchedCellCoord.x < world[0].length
        && watchedCellCoord.y < world.length){

       watchedCellCode = world[watchedCellCoord.y][watchedCellCoord.x];

     } else {

       watchedCellCode = "-";

     }

     // console.log("watchedCellCode[" + watchedCellCoord.y + ", " + watchedCellCoord.x + "] = "
     //             + watchedCellCode);

     return watchedCellCode;

  }


  this.isCrack = function(direction){

      if(this.outOfMapCount > 1){

         return false;

      } else {

        return this.getWatchedCellCode(direction, 1) == "c";

      }

  }

  this.isWall = function(direction){

      if(this.outOfMapCount > 1){

         return true;

      } else {

        return this.getWatchedCellCode(direction, 1) == "-";

      }

  }

  this.isGlacier = function(direction){

      if(this.outOfMapCount > 1){

         return false;

      } else {

        return this.getWatchedCellCode(direction, 1) == "o";

      }

  }

  this.isTrack = function(direction){

      if(this.outOfMapCount > 1){

         return false;

      } else {

        return (this.getWatchedCellCode(direction, 1) == "x")
               ||
               (this.getWatchedCellCode(direction, 1) == "t")
               ||
               (this.getWatchedCellCode(direction, 1) == "f");

      }

  }


  this.isSafe = function(direction){

    var cellCode;

    cellCode = this.getWatchedCellCode(direction, 1);

    return cellCode !== "c" && cellCode !== "o";

  }


  this.targetReached = function(){

    return this.routeSuccess;

  }


  this.getCrackWidth = function(direction){

     var crackNb = 0;

     while(this.getWatchedCellCode(direction, crackNb + 1) == "c"){

        crackNb++;

     }

    return crackNb;

  }

  this.getGlacierWidth = function(direction){

     var glacierNb = 0;

     while(this.getWatchedCellCode(direction, glacierNb + 1) == "o"){

        glacierNb++;

     }

    return glacierNb;

  }

  this.moveTo = function(goal){

     switch(goal){

       case "crack" :

          while(! isCrack("forward")){

             move();

          }
          break;

          case "target" :

             while(! targetReached()){

               move();

             }
             break;

          case "wall" :

             while(! isWall("forward")){

                move();

             }
             break;

     }

  }


  this.locate = function(){

    for (var i = 0; i < gridHeight; i++) {

      for (var j = 0; j < gridWidth; j++) {

        if(world[i][j] == "p"){

          this.x = j;
          this.y = i;
          this.routeX = j;
          this.routeY = i;
          break;

        }

      }

    }

  }

  this.playNext = function(){   // plays next motion animation sequence

    var statement;

    if(this.missionSuccess){

      succeedSound.play();

      noLoop();

      return;

    }

    if(this.seqNb < this.statements.length){

      statement = this.statements[this.seqNb];

      this.recording = false;
      this.playing = true;

      switch(statement){

        case "m" : this.move();
                   break;

        case "j" : this.jump();
                   break;

        case "l" : this.turnLeft();
                   break;

        case "r" : this.turnRight();
                   break;

      }

      this.seqNb++;

      return true;

    } else {

      noLoop();

      if(this.playing){

        this.missionFailed = true;
        allSoundsFadeOut(2);
        failedMission.play();
        setTimeout(reinitializeWorld, 3000);

      }


      return false;

    }

  }

  this.reinitialize = function(){

    roadMap = this.initialRoadMap;
    this.locate();
    playerCodeLoopCount = 0;
    initializePlayerOrientation();

  }

}


function rotateLeft(img){

  var w = img.width;
  var h = img.height;
  var index, indexr;
  var img2 = createImage(img.width, img.height);

  img.loadPixels();
  img2.loadPixels();

  indexr = 0;

  for (let x = w - 1; x >= 0; x--) {

    for(let y = 0; y < h; y++) {

      index = (x+y*w)*4;
      img2.pixels[indexr] = img.pixels[index];
      img2.pixels[indexr + 1] = img.pixels[index+1];
      img2.pixels[indexr + 2] = img.pixels[index+2];
      img2.pixels[indexr + 3] = img.pixels[index+3];

      indexr += 4;

    }
  }

  img.updatePixels();
  img2.updatePixels();

  return img2;

}


function breakCode(code){

  var enhancedCode = code;
  var indexNb = 0;
  var breakingPointCode;

  // breakingPointCode = "\n\nif(! player.recording)return;\n";

  breakingPointCode = "\n\nif(playerCodeLoopCount++ > maxplayerCodeLoop){neverendingLoopDetected();return;}\n";
  breakingPointCode += "if(! player.recording)return;\n";

  const maxplayerCodeLoop = 100;
  var playerCodeLoopCount = 0;

  while (indexNb >= 0) {

    indexNb = enhancedCode.indexOf("while", indexNb);

    if(indexNb >= 0){

      indexNb = enhancedCode.indexOf("{", indexNb);

      if(indexNb >= 0){

        enhancedCode = [enhancedCode.slice(0, indexNb + 1),
                        breakingPointCode, enhancedCode.slice(indexNb + 1)]
                        .join('');

      }

    }

  }

  return enhancedCode;

}

function neverendingLoopDetected(){

   alert("L'algorithme de ce programme semble contenir une boucle sans fin. Seules les "
         + maxplayerCodeLoop + " premières opérations de ce programme seront exécutées.");

    playerCodeLoopCount = 0;

}


 function run(){

   soundsReset();

   if(backgroundSound) backgroundSound.play();

   if(language !== 'javascript'){

     alert("A cette heure, seul le code écrit en Javascript peut être exécuté dans cette application.");
     return;

   }

   noLoop();
   world = cloneWorld(genesis);
   player = new Player(playerImg, world);
   player.locate();
   playerCodeLoopCount = 0;
   initializePlayerOrientation();

   redraw();

   data[worldNb]["javascript"] = codeEditor.getValue();

   breakingCode = breakCode(data[worldNb]["javascript"]);

   runScript(breakingCode);

   started = false;

   if(player){

     loop();
    
   }

 }

function move(){

  player.move();

}

function turnRight(){

   player.turnRight();

}

function turnLeft(){

  player.turnLeft();

}

function jump(){

  player.jump();

}

function isSafe(orientation){

  return player.isSafe(orientation);

}

function isCrack(orientation){

  return player.isCrack(orientation);

}

function isWall(orientation){

  return player.isWall(orientation);

}

function isGlacier(orientation){

  return player.isGlacier(orientation);

}

function isTrack(orientation){

  return player.isTrack(orientation);

}

function targetReached(){

  return player.targetReached();

}

function crackWidth(direction){

   return player.getCrackWidth(direction);

 }

function glacierWidth(direction){

    return player.getGlacierWidth(direction);

}


function rotateRight2(img){

  var w = img.width;
  var h = img.height;
  var index, indexr;
  var img2 = createImage(w, h);

  img.loadPixels();
  img2.loadPixels();

  indexr = 0;

  for (let x = 0; x < w; x++) {

    for(let y = h - 1; y >= 0; y--) {

      index = (x+y*w)*4;
      img2.pixels[indexr] = img.pixels[index];
      img2.pixels[indexr + 1] = img.pixels[index+1];
      img2.pixels[indexr + 2] = img.pixels[index+2];
      img2.pixels[indexr + 3] = img.pixels[index+3];

      indexr += 4;

    }
    
 }

 img.updatePixels();
 img2.updatePixels();

 return img2;
  
}


function initializePlayerOrientation(){

   var initialOrientation = data[worldNb]["playerOrientation"];
  
   if(!initialOrientation){
  
     initialOrientation = 0;
     data[worldNb]["playerOrientation"] = initialOrientation;
  
   }
  
   player.setOrientation(initialOrientation);
   player.routeOrientation = initialOrientation;
  
   for (let i = 0; i < initialOrientation; i++){
  
     player.img = rotateRight2(player.img);
  
   }

}


function selectLanguage(evt){

   language = languageSelect.value();
   setRunButtonStatus(language);
   generateCode();

}

function runScript(code){

  try{

    let execSourceCode = new Function(code);

    execSourceCode();
    
  } catch(e){

    alert(e.message);
    
  }
  
  
  /*

  var s = document.createElement("script");
  s.type = "text/javascript";
  s.language = "javascript";
  s.id = 'code';
  s.innerHTML = "function ex(){\n\n";
  s.innerHTML += code;
  s.innerHTML += "}\n";                      
  

  try{
  
    document.getElementsByTagName("head")[0].appendChild(s);

  } catch(e){

    alert(e.message);
    
  } finally{

    ex();
    
  }   
    
  s.remove();

  */
  
}


function soundsFullVolume(){

  for(let sound of soundTracks){

    sound.setVolume(1);
    
  }

}


function soundsMute(){

  for(let sound of soundTracks){

    sound.setVolume(0);
    
  }

}


function allSoundsFadeOut(rampTime){
  
  snowStepSound.setVolume(0, rampTime);
  jumpingSound.setVolume(0, rampTime);
  fallingBodySound.setVolume(0, rampTime);
  fallingRocksSound.setVolume(0, rampTime);
  succeedSound.setVolume(0, rampTime);
  backgroundSound.setVolume(0, rampTime);

  // failedMission.setVolume(0, rampTime);  

  setTimeout(soundsReset, rampTime * 1000);
  setTimeout(soundsFullVolume, rampTime * 1000);

}

function soundsReset(){

  snowStepSound.stop();
  jumpingSound.stop();
  fallingBodySound.stop();
  fallingRocksSound.stop();
  succeedSound.stop();
  backgroundSound.stop();

  // failedMission.stop();

}


function reinitializeWorld(){

  soundsReset();
  goToWorld(worldNb);

}

function blinkWorldIcons(counter, delay){

  for(let nb = 1; nb <= data.length; nb = nb + 1){

    if(counter % 2 == 0){

      paintWorldIcon(nb, "#01A3F2");
      
    } else {

      paintWorldIcon(nb, "#069137");

    }

  }

  counter += 1;

  setTimeout(function(){blinkWorldIcons(counter, delay);}, delay);

}

function getWorldSucceedNumber(){

  var successNb = 0;

  for(let i = 0; i < data.length; i++){

    if(data[i].succeed) successNb++;

  }

}


function getNextUnsolvedWorldNb(startWorldNb){

  var nxWNb;

  if(startWorldNb > data.length - 1){

    startWorldNb = 0;

  }

  nxWNb = startWorldNb;

  if(getWorldSucceedNumber() == data.length) return -1;

  for(nxWNb; nxWNb < data.length - 1 && data[nxWNb].succeed; nxWNb++){}

  if(nxWNb == data.length - 1){

    nxWNb = 0;

    for(nxWNb; nxWNb < data.length - 1 && data[nxWNb].succeed; nxWNb++){}

  }

  return nxWNb;

}


function goToNextWorld(){ 

  var nextWorldNb;

  allSoundsFadeOut(2);

  nextWorldNb = getNextUnsolvedWorldNb(worldNb + 1);

  if(nextWorldNb == -1){

    if(endMissionSound) endMissionSound.play();
    blinkWorldIcons(0, 500);

  } else {

      paintWorldIcon(nextWorldNb, "#069137");
      goToWorld(nextWorldNb);

  }
 
}



function toggleAutoScript(){

  autoScript = !autoScript;

  localStorage.setItem('autoScript', autoScript);

  if(autoScript){

    autoScriptImg.attribute('src', imgFolder + 'script_on.png')

  } else {

    autoScriptImg.attribute('src', imgFolder + 'script_off.png')

    
  }
   
}

function playBackgroundSound(){

  if(backgroundSound){

    if(backgroundSound.isLoaded() && !backgroundSound.isPlaying()){
  
      backgroundSound.play();
      backgroundSound.setLoop(true);

      volumeOn = !volumeOn;
      toggleVolume();
      
      body.removeAttribute('onmouseover');
      
    }
    
  }
  
}


function toggleVolume(){

  volumeOn = !volumeOn;
  localStorage.setItem('volumeOn', volumeOn);

  if(volumeOn){

    soundsFullVolume();
    volumeImg.attribute('src', imgFolder + 'volume_on.png')

  } else {

    soundsMute();
    volumeImg.attribute('src', imgFolder + 'volume_off.png');

  }
   
}


function setRunButtonStatus(langage){

  if(langage !== 'javascript'){

    runImg.attribute('src', 'images/runOff64x64.png');
    
  } else {

    runImg.attribute('src', 'images/run64x64.png');
    
  }
  
}


function desactivateLanguageTabs(){

  var languageTab;

  
  languageTab = document.getElementsByClassName("languageTab");
  
  for (i = 0; i < languageTab.length; i++) {
    
    languageTab[i].className = languageTab[i].className.replace(" active", "");
    languageTab[i].style.fontWeight = 'normal';
    
  }
  
}


function activageLanguageTab(lang){

  var clickedTab = select('#' + lang + 'Tab');
  clickedTab.class(clickedTab.class() + " active");
  clickedTab.style('fontWeight', 'bold');
  
}


function changeLanguage(lang){

  language = lang;
  
  desactivateLanguageTabs();
  activageLanguageTab(lang);
  setRunButtonStatus(lang);
  languageSelect.value(lang);

  if(autoScript){

    generateCode();
     
  }

  
  // evt.currentTarget.className += " active";
  // evt.currentTarget.style.fontWeight = 'bold';
  
}
