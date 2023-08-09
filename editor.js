var canvas;
var universe, data, info;
var codeEditor;
var worldNbDiv;
var languageSelect;
var editorCursorPosition;
var canvasWidth;
var canvasHeight;
var mapScale;
var borderColor = "#bebebe"  // 190;
var squareSize;
var gridWidth, gridHeight;
var cellWidth, cellHeight;
var cellSize;
var marginLeft, marginTop, marginRight, marginBottom;
var borderWeight;
var playerImg;
var stoneImg;
var imgPad;
var genesis, world;
var player;
var code = [];
var counter = 0;
var delay = 500;
var started = false;
var language = "javascript";
var exerciseFile, exerciceFileJson;
var sampleCodeXMLElement;
var urlParams;
var worldNb = 0;
var filename;
var fileReloadNb = 0;
var executeCode;
var breakingCode;
var iconNb = 0;
var iconCodes = ['c', 'x', 'o', 'p', 't', 'f'];
var imgPathList = [];
var defaultWorldWidth = 11;
var defaultWorldHeight = 6;
var pageUrl;
var savingProcessId;

function preload() {

  var previousFilename;
  var manualWorkspaceLoading = false;

  imgPathList.push('images/crack128x128.png');
  imgPathList.push('images/track128x128.png');
  imgPathList.push('images/glacier128x128.png');
  // imgPathList.push('images/stone128x128.png');
  imgPathList.push('images/marc128x128.png');
  imgPathList.push('images/julie128x128.png');
  imgPathList.push('images/flag128x128.png');

  playerImg = loadImage(imgPathList[3]);
  targetImg = loadImage(imgPathList[4]);
  flagImg   = loadImage(imgPathList[5]);
  crackImg  = loadImage(imgPathList[0]);
  stoneImg  = loadImage('images/stone128x128.png');

}


function canvasClicked() {

  var col = Math.trunc((mouseX - marginLeft) / cellWidth);
  var row = Math.trunc((mouseY - marginTop) / cellHeight);

  if(col < 0) col = 0;

  if(iconCodes[iconNb] == "p" && world[row][col] == "p"){

    player.setOrientation(player.orientation + 1);
    player.img = rotateRight(player.img);

  }

  data[worldNb]["playerOrientation"] = player.orientation;
  world[row][col] = iconCodes[iconNb];

  drawWorld();

}


function addDOMListeners(){

   select("#universeTitleInput").changed(saveDisplayedTitles);
   select("#worldTitleInput").changed(saveDisplayedTitles);
   select("#columnsNb").changed(updateUniverseSize);
   select("#rowsNb").changed(updateUniverseSize);
   select("#iconImg").mouseClicked(switchIcon);
   select("#canvas-holder").mouseClicked(canvasClicked);

   select("#clearImg").mouseClicked(clearWorld);
   select("#addImg").mouseClicked(addNewWorldClick);
   select("#removeImg").mouseClicked(removeWorld);
   select("#moveLeftImg").mouseClicked(moveWorldLeftClick);
   select("#moveRightImg").mouseClicked(moveWorldRightClick);
   select("#restartImg").mouseClicked(resetUniverseClick);

   select("#loadImg").mouseClicked(function(){document.getElementById('fileUpload').click();});

   select("#fileUpload").changed(loadWorkspace);
   select("#saveImg").mouseClicked(saveWorkspace);

}


function loadWorkspace(){

  var fileToLoad = document.getElementById("fileUpload").files[0];
  var fileReader = new FileReader();
  var w;

  fileReader.onload = function(fileLoadedEvent){

     var txt = fileLoadedEvent.target.result;

     universe = JSON.parse(txt);

     info = universe["info"];
     data = universe["data"];
     itemNb = info.currentItem;

     w = universe.info.currentItem;

     goToWorld(w);

   };

fileReader.readAsText(fileToLoad, "UTF-8");

}



function containsChar(str, setOfChars){

   var regex = RegExp('[' + setOfChars + ']');

   return regex.test(str);

}


function drawWorld(){

  background(255);

  stroke(borderColor);
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

      if(containsChar(code, 'oc') || code.includes("cp")){

        fill(255, 255, 255);

      }


      if(containsChar(code, 'pstfx')){

        fill(156, 221, 243);

      }

      rect(x, y, cellWidth, cellHeight);

      if(code.includes("f")){

        image(flagImg, imgX, imgY, imgWidth, imgHeight);

      }

      if(code.includes("t")){

        image(targetImg, imgX, imgY, imgWidth, imgHeight);

      }

      if(code.includes("p")){

        image(player.img, imgX, imgY, imgWidth, imgHeight);

      }

      if(code.includes("c")){

        image(crackImg, imgX, imgY, imgWidth, imgHeight);

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


function newWorld(rowsNb, colNb){

    var w = [];
    var worldData =

    {
      "title": "item1",
      "succeed": false,
      "playerOrientation": 0,
      "world": [],
      "blocks": "<xml xmlns=\"http://www.w3.org/1999/xhtml\"></xml>",
      "javascript": ""};

    for(let r = 0; r < rowsNb; r++){

      let line = [];

      for(let c = 0; c < colNb; c++){

        line.push("o");

      }

      w.push(line);

    }

    worldData["world"] = w;

    return worldData;

}

function addNewWorld(rowsNb, colNb){

  data.push(newWorld(rowsNb, colNb));
  worldNb = data.length - 1;
  goToWorld(worldNb);

}

function addNewWorldClick(){

   addNewWorld(defaultWorldHeight, defaultWorldWidth);
   select("#columnsNb").value(defaultWorldWidth);
   select("#rowsNb").value(defaultWorldHeight);


}

function removeWorld(){

    if(data.length < 2) return;

    data.splice(worldNb, 1);

    if(worldNb <= 0){

      worldNb = 0;

    } else {

      worldNb -= 1;

    }

    goToWorld(worldNb);

}


function clearWorld(){

  for(let r = 0; r < world.length; r++){

    for(let c = 0; c < world[0].length; c++){

      world[r][c] = "o";

    }

  }

  initialize(world);
  drawWorld();

}

function deleteRowOfWorld(rowsNb){

  if(world.length - rowsNb < 1) return;

  for(let r = 0; r < rowsNb; r++){

    world.pop();

  }

}


function deleteColumnOfWorld(colNb){

  if(world[0].length - colNb < 1) return;

  for(let r = 0; r < world.length; r++){

    for(let c = 0; c < colNb; c++){

      world[r].pop();

    }

  }

}

function addRowToWorld(rowsNb){

  var line = [];

  for(let c = 0; c < world[0].length; c++){

    line.push("o");

  }

  for (let r = 0; r < rowsNb; r++){

    world.push(line);

  }

}


function addColumnToWorld(colNb){

  for(let r = 0; r < world.length; r++){

    let line = world[r];

    for(let c = 0; c < colNb; c++){

      line.push("o");

    }

  }

}

function moveWorldLeft(){

    var w;

    if(worldNb <= 0) return;

    w = data[worldNb - 1];

    data[worldNb - 1] = data[worldNb];
    data[worldNb] = w;
    worldNb--;

}

function moveWorldRight(){

    var w;

    if(worldNb >= data.length - 1) return;

    w = data[worldNb + 1];

    data[worldNb + 1] = data[worldNb];
    data[worldNb] = w;
    worldNb++;

}


function moveWorldLeftClick(){

   moveWorldLeft();
   goToWorld(worldNb);

}

function moveWorldRightClick(){

   moveWorldRight();
   goToWorld(worldNb);

}

function updateUniverseSize(){

   var rowsNb = select("#rowsNb").value();
   var columnsNb = select("#columnsNb").value();
   var dRow = rowsNb - world.length;
   var dCol = columnsNb - world[0].length;

   if(dRow > 0){

     addRowToWorld(dRow);

   } else if (dRow < 0){

     dRow = Math.abs(dRow);
     deleteRowOfWorld(dRow);

   }

   if(dCol > 0){

     addColumnToWorld(dCol);

   } else if (dCol < 0){

     dCol = Math.abs(dCol);
     deleteColumnOfWorld(dCol);

   }

   initialize(world);
   drawWorld();

}

function switchIcon(){

   var img = select("#iconImg");

   iconNb++;
   iconNb = iconNb % iconCodes.length;

   img.attribute('src', imgPathList[iconNb])

}

function resetUniverse(){

     universe = {

       "info": {
         "name": "Leçon 1 - défaut",
         "author": "Collège St-Michel",
         "currentItem": 0
       },
       "data": []
     }

     worldNb = 0;
     info = universe['info'];
     data = universe['data'];

     data.push(newWorld(defaultWorldHeight, defaultWorldWidth));

}

function resetUniverseClick(){

   resetUniverse();
   setup();

}


function getUrlVars() {

    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function resetInterface(){

   initialize(data[worldNb]["world"]);

}

function saveUniverse(){

  localStorage.setItem('universe', JSON.stringify(universe));

}

function saveCode(){

  data[worldNb]["blocks"] = "<xml xmlns=\"http://www.w3.org/1999/xhtml\"></xml>";
  data[worldNb]["javascript"] = "";
  // data[worldNb]["playerOrientation"] = player.orientation;

  localStorage.setItem('universe', JSON.stringify(universe));

}


function goToWorld(w){

   saveCode();
   worldNb = w;
   localStorage.setItem('worldNb', worldNb);
   world = data[worldNb]["world"];
   initializePlayerOrientation();
   resetInterface();
   drawBrowseWorldIcon();
   updateDisplayedTitle();
   redraw();

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


function drawBrowseWorldIcon(){

  var iconNb;
  var worldNbDiv = select("#worldNb");
  var itemBrowser = select("#itemBrowser");

  if(worldNbDiv){

     worldNbDiv.remove();
     worldNbDiv = createDiv("");
     worldNbDiv.id("worldNb");
     worldNbDiv.class("worldNb");
     itemBrowser.child(worldNbDiv);

  }

  // worldNbDiv = select("#worldNb");

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

  var universeTitleInput = select("#universeTitleInput");
  var worldTitleInput = select("#worldTitleInput");
  universeTitleInput.value(info["name"]);
  worldTitleInput.value(data[worldNb]['title']);

  select("#columnsNb").value(data[worldNb]["world"][0].length);
  select("#rowsNb").value(data[worldNb]["world"].length);

}

function saveDisplayedTitles(){

  var universeTitleInput = select("#universeTitleInput");
  var worldTitleInput = select("#worldTitleInput");
  info["name"] = universeTitleInput.value();
  data[worldNb]['title'] = worldTitleInput.value();

}


function loadData(){

  var worldNbStr;
  var dataStr;
  var itemNb = 0;
  var titleDiv;
  var previousPageUrl;

  pageUrl = location.pathname.substring(1);

  previousPageUrl = localStorage.getItem("pageUrl");

  if(previousPageUrl){

     if(pageUrl != previousPageUrl){

       localStorage.clear();

     }

  } else {localStorage.setItem("pageUrl", pageUrl);}


  // localStorage.clear();

  dataStr = localStorage.getItem('universe');

  if(dataStr){

    universe = JSON.parse(dataStr);

  } else {

    universe = exerciseFile;
    localStorage.setItem('universe', JSON.stringify(universe));

  }

  info = universe["info"];
  data = universe["data"];

  itemNb = info.currentItem;

  worldNbStr = localStorage.getItem('worldNb');

  if(worldNbStr){

    worldNb = parseInt(localStorage.getItem('worldNb'));

  } else {

    worldNbStr = getUrlVars()['worldNb'];

    if(worldNbStr){

      worldNb = parseInt(worldNbStr);
      localStorage.setItem('worldNb', worldNb);

    } else {worldNb = 0};

  }

  updateDisplayedTitle();

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


function initialize(w){

  world = w;

  languageSelect = select("#languageSelect");

  genesis = cloneWorld(world);
  mapScale = 1;

  gridWidth = world[0].length;
  gridHeight = world.length;
  cellWidth = 50 * mapScale;
  cellHeight = 50 * mapScale;
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

  player = new Player(playerImg, world);
  player.locate();

  initializePlayerOrientation();


  drawWorld();
  noLoop();

}


function setup() {

  window.onbeforeunload = function(e) {
    return true;
  };

  localStorage.clear();
  select("#colorPicker").value(borderColor);
  resetUniverse();
  updateDisplayedTitle();
  drawBrowseWorldIcon();
  addDOMListeners();
  initialize(data[worldNb]["world"]);

}

function draw() {


}


function Player(img, roadMap) {

  this.recording = true;
  this.playing = false;
  this.onTrack = true;
  this.fell = false;
  this.hit = false;
  this.statements = [];
  this.seqNb = 0;
  this.outSeqNb = -1;
  this.step = {x : 0, y : -1}; // default: north
  this.img = img.get();
  this.x = 0;
  this.y = 0;
  this.orientation = 0; // 0: north, 1:east, 2: south, 3: west
  this.routeX;
  this.routeY;
  this.routeOrientation = 0;
  this.outOfMapCount = 0;
  this.roadMap = roadMap;
  this.routeSuccess = false;
  this.missionSuccess = false;

  this.go = function(motion){

    var nextX, nextY;
    var nextLocationCode;
    var stepNb;
    var statementCode;


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

      let step;

      this.statements.push(statementCode);

      step = this.getStep(this.routeOrientation);

      if(this.routeX + step.x * stepNb < this.roadMap[0].length

        && this.routeX + step.x * stepNb >= 0

        && this.routeY + step.y * stepNb < this.roadMap.length

        && this.routeY + step.y * stepNb >= 0){

        this.routeX = this.routeX + step.x * stepNb;
        this.routeY = this.routeY + step.y * stepNb;
        nextLocationCode = roadMap[this.routeY][this.routeX];

      } else {

        nextLocationCode = "-";

      }


      if(nextLocationCode !== "x"){

        this.recording = false;
        return;

        if(this.outOfMapCount > 0){

          this.outOfMapCount++;
          this.recording = false;
          return;

        }

        this.outOfMapCount++;

      }

      if(nextLocationCode === "t" || nextLocationCode === "f"){

        this.routeSuccess = true;

      }

    }

    if(this.playing){

      wait(delay);

      if(this.onTrack){

        if( this.x + this.step.x * stepNb < this.roadMap[0].length

          && this.x + this.step.x * stepNb >= 0

          && this.y + this.step.y * stepNb < this.roadMap.length

          && this.y + this.step.y * stepNb >= 0){

          nextX = this.x + this.step.x * stepNb;
          nextY = this.y + this.step.y * stepNb;
          nextLocationCode = world[nextY][nextX];

        } else {

           if(! this.hit){

             switch(motion){

                case "move" : this.roadMap[this.y][this.x] = "s";
                              break;

                case "jump" : if(this.x + this.step.x > this.roadMap[0].length - 1
                                 || this.x + this.step.x < 0
                                 || this.y + this.step.y > this.roadMap.length - 1
                                 || this.y + this.step.y < 0){

                                  this.roadMap[this.y][this.x] = "s";

                              } else {

                                this.roadMap[this.y][this.x] = "x";
                                this.x = this.x + this.step.x;
                                this.y = this.y + this.step.y;
                                this.roadMap[this.y][this.x] = "s";

                              };

                              break;

             }
             this.hit = true;
             return;

           } else {

             this.playing = false;
             noLoop();
             return;

           }

           nextLocationCode = "-";

        }

      }


      if( (nextLocationCode !== "x" && nextLocationCode !== "t" && nextLocationCode !== "f")
          || !this.onTrack){

        if(this.onTrack){

          this.onTrack = false;
          this.outSeqNb = this.statements.length - 1;

          this.roadMap[this.y][this.x] = "x";

          this.x = nextX;
          this.y = nextY;

          this.roadMap[this.y][this.x] = "cp";
          this.seqNb--;
          return;

        } else {

           if(! this.fell){

             this.roadMap[this.y][this.x] = "c";
             this.fell = true;
             return;

           } else {

             noLoop();
             this.playing = false;
             return;

           }

        }

      }


      this.roadMap[this.y][this.x] = "x";

      this.x = nextX;
      this.y = nextY;

      this.roadMap[this.y][this.x] = "p";

      if(nextLocationCode === "t" || nextLocationCode === "f"){

         this.roadMap[this.y][this.x] += nextLocationCode;
         this.missionSuccess = true;
         data[worldNb]["succeed"] = true;
         paintWorldIcon(worldNb + 1, "#069137");

      }


      // snowStepSound.play();

    }

  }

  this.move = function(){

    this.go("move");

  }

  this.jump = function(){

    this.go("jump");
    return;

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

       wait(delay);
       this.setOrientation(this.orientation + 1);
       this.img = rotateRight(this.img);
       // snowStepSound.play();

     }

  }

  this.turnLeft = function(){

    if(this.recording){

      this.statements.push("l");
      if(this.routeOrientation == 0) this.routeOrientation = 4;
      this.routeOrientation = Math.abs(this.routeOrientation - 1 % 4);

    }

    if(this.playing){

      wait(delay);
      if(this.orientation == 0) this.orientation = 4;

      this.setOrientation(this.orientation - 1);
      this.img = rotateLeft(this.img);
      // snowStepSound.play();

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

         return true;

      } else {

        return    this.getWatchedCellCode(direction, 1) == "c"
               || this.getWatchedCellCode(direction, 1) == "o";

      }

  }

  this.isWall = function(direction){

      if(this.outOfMapCount > 1){

         return true;

      } else {

        return this.getWatchedCellCode(direction, 1) == "-";

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

  this.playNext = function(){

    var statement;

    if(this.missionSuccess){

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
      return false;

    }

  }


function breakCode(code){

  var enhancedCode = code;
  var indexNb = 0;
  var breakingPointCode;

  breakingPointCode = "\n\nif(! player.recording)return;\n";

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

function run(){

   if(language !== 'javascript'){

     alert("A cette heure, seul le code écrit en Javascript peut être exécuté dans cette application.");
     return;

   }

   noLoop();
   world = cloneWorld(genesis);
   player = new Player(playerImg, world);
   player.locate();
   redraw();

   data[worldNb]["javascript"] = codeEditor.getValue();

   breakingCode = breakCode(data[worldNb]["javascript"]);

   executeCode = new Function(breakingCode);

   try{

      executeCode();
  // eval(code);

} catch(e){

   alert(e);
   return;

}

   started = false;
   loop();

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

function targetReached(){

  return player.targetReached();

}

function crackWidth(direction){

   let crackW = player.getCrackWidth(direction)

   return player.getCrackWidth(direction);

 }


function changeLanguage(){

   language = languageSelect.value();
   generateCode();

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

}

function rotateRight(img){

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

  for (let i = 0; i < initialOrientation; i++){

    player.img = rotateRight(player.img);

  }

}

function setBorderColor(){

   borderColor = select("#colorPicker").value();
   drawWorld();

}
