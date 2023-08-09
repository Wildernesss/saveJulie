var editorWorkspace;
var fileInput = document.getElementById("file-input");

function initBlocklyWorkspace(){

  options['toolbox'] = document.getElementById("toolbox");

  editorWorkspace = Blockly.inject('blockly-editor', options);

}


function download(filename, text) {

  var element = document.createElement('a');

  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);

  codeChangesSaved = true;
  
}


function formatArrayJson(jsonTxt){

  var formatedTxt;
  var codes = ['o', 'x', 'p', 't', 'f', 'c'];

  formatedTxt = jsonTxt.replace(/\[\n.*\[/g, "[[");
  formatedTxt = formatedTxt.replace(/\[\n\s*\"/g, '["');

  for(let i = 0; i < codes.length; i++){

     let pattern = new RegExp(',\\n\\s+\\"' + codes[i] + '"', 'g');
     formatedTxt = formatedTxt.replace(pattern, ', "' + codes[i] + '"');

  }

  formatedTxt = formatedTxt.replace(/"\n\s*/g, '"');
  formatedTxt = formatedTxt.replace(/\]\,\n\s*\[/g, '],\n                [');
  formatedTxt = formatedTxt.replace(/\]\n\s*\]/g, ']\n               ]');

  return formatedTxt;

}


function saveWorkspace(){

  var txt;

  saveCode();

  universe.info.currentItem = worldNb;

  txt = JSON.stringify(universe, undefined, 2);
  txt = formatArrayJson(txt);

  if(!filename) filename = 'universe.json';

  filename = filename.replaceAll('%20', ' ');
  
  download(filename, txt);

}


function loadWorkspace(){

  var fileToLoad = document.getElementById("fileUpload").files[0];
  var fileReader = new FileReader();
  var w;

  
  localStorage.setItem('filename', fileToLoad.name);

  fileReader.onload = function(fileLoadedEvent){

     var txt = fileLoadedEvent.target.result;
    
     localStorage.setItem('universe', JSON.stringify(universe));

     universe = JSON.parse(txt);

     w = universe.info.currentItem;

     // resetInterface();
     // loadData();
     goToWorld(w);

     fileReloadNb = -1;

     localStorage.setItem('manualWorkspaceLoaded', 'true');
     localStorage.setItem('fileReloadNb', fileReloadNb);

     window.location = window.location.href.split("?")[0];

   };

  fileReader.readAsText(fileToLoad, "UTF-8");

}


function generateCode(){

   switch(language){

    case "javascript":
       
       code[worldNb] = Blockly
                       .JavaScript
                       .workspaceToCode(editorWorkspace);
       break;

    case "python":
       
       code[worldNb] = Blockly
                       .Python
                       .workspaceToCode(editorWorkspace);
       break;

    case "java":
       
       code[worldNb] = Blockly
                       .Java
                       .workspaceToCode(editorWorkspace);
       break;

    case "pseudo" :
       
       code[worldNb] = Blockly
                       .Pseudo
                       .workspaceToCode(editorWorkspace);
       
   }

   codeEditor.setValue("");

   if(language != 'pseudo'){

     codeEditor.getSession().setMode("ace/mode/" + language);
     
   } else {


     codeEditor.getSession().setMode("ace/mode/pseudo");

     
   }

   codeEditor.session.insert(editorCursorPosition, code[worldNb]);  

  
}

function renderSimple(workspace) {

  aleph = workspace.svgBlockCanvas_.cloneNode(true);
  aleph.removeAttribute("width");
  aleph.removeAttribute("height");

  if (aleph.children[0] !== undefined) {

    aleph.removeAttribute("transform");
    aleph.children[0].removeAttribute("transform");
    aleph.children[0].children[0].removeAttribute("transform");
    var linkElm = document.createElementNS("http://www.w3.org/1999/xhtml", "style");
    linkElm.textContent = Blockly.Css.CONTENT.join('') + '\n\n';
    aleph.insertBefore(linkElm, aleph.firstChild);
    //$(aleph).find('rect').remove();
    var bbox = document.getElementsByClassName("blocklyBlockCanvas")[0].getBBox();
    var xml = new XMLSerializer().serializeToString(aleph);
    xml = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+bbox.width+'" height="'+bbox.height+'" viewBox="0 0 '+bbox.width+' '+bbox.height+'"><rect width="100%" height="100%" fill="white"></rect>'+xml+'</svg>';
    var data = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(xml)));
    var img  = document.createElement("img");
    console.log(xml);
    img.setAttribute('src', data);
    document.body.appendChild(img);
    

  }
}

   function blockToSvg(){

       renderSimple(editorWorkspace);


   }


