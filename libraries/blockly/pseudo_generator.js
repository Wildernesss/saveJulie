"use strict";

Blockly.Pseudo = new Blockly.Generator('Pseudo');

Blockly.Pseudo.ORDER_ATOMIC = 0;
Blockly.Pseudo.ORDER_NONE = 0;

Blockly.Pseudo.init = function (workspace) {};

Blockly.Pseudo.finish = function (code) {
  return code;
};

Blockly.Pseudo.scrub_ = function (block, code) {
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Pseudo.blockToCode(nextBlock);
  return code + nextCode;
};


function frenchOrientationName(orientation){

  switch(orientation){

    case 'forward':  return 'devant';
    case 'backward': return 'derrière';
    case 'left':     return 'à gauche';
    case 'right':    return 'à droite';
    case 'forward':  return 'devant';
      
  }
  
}


function frenchObjectName(obj){

  switch(obj){

    case 'crack':    return 'crevasse';
    case 'wall':     return 'paroie';
    case 'glacier':  return 'glacier';
    case 'track':    return 'piste';
    case 'target':   return 'Julie';
      
  }
  
}


Blockly.Pseudo['jump'] = function(block) {
  var code = 'sauter\n';
  return code;
};


Blockly.Pseudo['move'] = function(block) {
  var code = 'avancer\n';
  return code;
};


Blockly.Pseudo['turn'] = function(block) {
  
  var orientation = block.getFieldValue('orientation');
  var code = 'tourner '  + frenchOrientationName(orientation) + '\n';
  return code;
  
};


Blockly.Pseudo['repeat_n_times'] = function(block) {

  var n = block.getFieldValue('n');
  var nb;
  var statements = Blockly.Pseudo.statementToCode(block, 'statements');

  if(!isNaN(n)){

    nb = parseInt(n);

  } else {

    nb = n;

  }

  var code = '';

  code += 'répéter ' + nb + ' fois\n';
  code += '\n';
  code += statements;
  code += '\n\n';

  return code;
  
};


Blockly.Pseudo['repeat_until_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements = Blockly.Pseudo.statementToCode(block, 'statements');
  var code = '';

  code += "répéter jusqu'à " + frenchObjectName(goal) + '\n\n';
  code += statements;
  code += '\n\n';
  return code;

};



Blockly.Pseudo['if_something_in_direction'] = function(block) {
  var statements_if = Blockly.Pseudo.statementToCode(block, 'statements_if');
  var goal = block.getFieldValue('goalField');
  var orientation = block.getFieldValue('orientation');
  var code = '';

  code += 'si ' + frenchObjectName(goal) + ' ' + frenchOrientationName(orientation) + ' ';
  code += '\n\n';
  code += statements_if;
  code += '\n\n';
  return code;

};


Blockly.Pseudo['if_else_something_in_direction'] = function(block) {
  var statements_if = Blockly.Pseudo.statementToCode(block, 'statements_if');
  var statements_else = Blockly.Pseudo.statementToCode(block, 'statements_else');
  var goal = block.getFieldValue('goalField');
  var orientation = block.getFieldValue('orientation');
  var code = '';

  code += 'si ' + frenchObjectName(goal) + ' ' + frenchOrientationName(orientation) + ' ';
  code += '\n\n';
  code += statements_if;
  code += '\n';
  code += 'sinon' + '\n\n';
  code += statements_else;
  code += '\n\n';  
  return code;

};


Blockly.Pseudo['if_crack_width'] = function(block) {
  var statements = Blockly.Pseudo.statementToCode(block, 'statements');
  var obj = block.getFieldValue('object');
  var orientation = block.getFieldValue('orientation');
  var inequality = block.getFieldValue('inequality');
  var width = parseInt(block.getFieldValue('width'));
  var fctname = '';
  var code = '';

  switch(obj){

     case "crack": fctname = 'largeur crevasse';
           break;

     case "glacier": fctname = 'longueur glacier';
           break;
  }

  code += 'si ' + fctname + ' ' + frenchOrientationName(orientation) + ' ' +  inequality + ' ' + width + '\n';
  code += '\n';
  code += statements;
  code += '\n\n';

  return code;
};


Blockly.Pseudo['if_else_crack_width'] = function(block) {
  var statements_if = Blockly.Pseudo.statementToCode(block, 'statements_if');
  var statements_else = Blockly.Pseudo.statementToCode(block, 'statements_else');
  var obj = block.getFieldValue('object');
  var orientation = block.getFieldValue('orientation');
  var inequality = block.getFieldValue('inequality');
  var width = parseInt(block.getFieldValue('width'));
  var fctname = '';
  var code = '';

  switch(obj){

     case "crack": fctname = 'largeur crevasse';
           break;

     case "glacier": fctname = 'longueur glacier';
           break;
  }

  code += 'si ' + fctname + ' ' + frenchOrientationName(orientation) + ' ' +  inequality + ' ' + width + '\n';
  code += '\n';
  code += statements_if + '\n';
  code += 'sinon\n';
  code += '\n';
  code += statements_else;
  code += '\n\n';

  return code;
};


Blockly.Pseudo["if_crack"] = function (block) {

  var statements = Blockly.Pseudo.statementToCode(block, 'statements');
  var orientation = block.getFieldValue('orientation');
  var code = '';
  code += 'Si crevasse ' + frenchOrientationName(orientation);
  code += '\n\n';
  code += statements;
  code += '\n\n';
  return code;
  
};


Blockly.Pseudo["if_else_crack"] = function (block) {

  var statements_if = Blockly.Pseudo.statementToCode(block, 'statements_if');
  var statements_else = Blockly.Pseudo.statementToCode(block, 'statements_else');
  var orientation = block.getFieldValue('orientation');
  var code = '';
  code += 'Si crevasse ' + frenchOrientationName(orientation);
  code += '\n\n';
  code += statements_if;
  code += '\n';
  code += 'sinon\n';
  code += '\n';
  code += statements_else;
  code += '\n\n'; 
  return code;
};


Blockly.Pseudo['definition:move_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements = Blockly.Pseudo.statementToCode(block, 'statements');
  var code = '';

  code += "définir aller_jusqu'à " + frenchObjectName(goal);
  code += '\n\n';
  code += statements;
  code += '\n\n';

  return code;

};


Blockly.Pseudo['definition:tack'] = function(block) {
  var statements;
  var code = '';

  statements = Blockly.Pseudo.statementToCode(block, "statements");

  code += 'définir louvoyer';
  code += '\n\n';

  code += statements;
  code += '\n\n';

  return code;

};


Blockly.Pseudo['definition:tack_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements = Blockly.Pseudo.statementToCode(block, 'statements');
  var code = '';

  code += "définir louvoyer_jusqu'à " + frenchObjectName(goal);
  code += '\n\n';
  code += statements;
  code += '\n\n';

  return code;

};



Blockly.Pseudo['definition:tack_params'] = function(block) {
  var statements;
  var n = block.getFieldValue('n');
  var v = block.getFieldValue('v');
  var h = block.getFieldValue('h');
  var code = '';

  statements = Blockly.Pseudo.statementToCode(block, "statements");

  code += 'définir louvoyer(' + n + ', '+ h + ', ' + v + ')';
  code += '\n\n';

  code += statements;
  code += '\n\n';

  return code;

};


Blockly.Pseudo['move_to_something'] = function(block) {
  var code = '';
  var goal = block.getFieldValue('goalField');

  code += "aller_jusqu'à " + frenchObjectName(goal);
  code += '\n';

  return code;  

};


Blockly.Pseudo['tack'] = function(block) {
  var code;

  code = 'louvoyer\n';

  return code;

};


Blockly.Pseudo['tack_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var code = '';
  code += "louvoyer_jusqu'à " + frenchObjectName(goal) + '\n';

  return code;

};


Blockly.Pseudo['tack_params'] = function(block) {
  var n = block.getFieldValue('n');
  var v = block.getFieldValue('v');
  var h = block.getFieldValue('h');
  var code = '';

  code += 'louvoyer(' + n + ' fois, ' + h + ' horizontal, ' + v + ' vertical)';
  code += '\n';

  return code;

};