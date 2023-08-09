Blockly.Java['move'] = function(block) {
  var code = 'move();\n';
  return code;
};

Blockly.Java['turn'] = function(block) {
  var orientation = block.getFieldValue('orientation');
  var code = 'turn' + orientation.charAt(0).toUpperCase() + orientation.slice(1) + '();\n';

  return code;
};

Blockly.Java['jump'] = function(block) {
  var code = 'jump();\n';
  return code;
};


Blockly.Java['repeat_n_times'] = function(block) {
  var n = block.getFieldValue('n');
  var nb;
  var statements = Blockly.Java.statementToCode(block, 'statements');

  if(!isNaN(n)){

    nb = parseInt(n);

  } else {

    nb = n;

  }

  var code = '\n';

  code += 'for(int i = 0; i < ' + nb + '; i++){\n';
  code += '\n';
  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};

Blockly.Java['repeat_until_crack'] = function(block) {
  var statements = Blockly.Java.statementToCode(block, 'statements');
  var code = '\n';
  code += 'while(! isCrack("forward")){\n';
  code += '\n';
  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};

Blockly.Java['repeat_to_target'] = function(block) {
  var statements = Blockly.Java.statementToCode(block, 'statements');
  var code = '\n';
  code += 'while(! targetReached()){\n';
  code += '\n';
  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};

Blockly.Java['repeat_until_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements = Blockly.Java.statementToCode(block, 'statements');
  var code = '\n';

  switch(goal){

    case "crack" :

       code += 'while(! isCrack("forward")){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';
       break;

     case "target" :

       code += 'while(! targetReached()){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';
       break;

    case "wall" :

      code += 'while(! isWall("forward")){\n';
      code += '\n';
      code += statements;
      code += '\n';
      code += '}\n';
      code += '\n';
      break;

  case "glacier" :

    code += 'while(! isGlacier("forward")){\n';
    code += '\n';
    code += statements;
    code += '\n';
    code += '}\n';
    code += '\n';
    break;

 case "track" :

   code += 'while(! isTrack("forward")){\n';
   code += '\n';
   code += statements;
   code += '\n';
   code += '}\n';
   code += '\n';
   break;


  }

  return code;

};

Blockly.Java['if_crack'] = function(block) {
  var statements = Blockly.Java.statementToCode(block, 'statements');
  var orientation = block.getFieldValue('orientation');
  var code = '\n';
  code += 'if(isCrack("' + orientation + '")){\n';
  code += '\n';
  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};


Blockly.Java['if_else_crack'] = function(block) {
  var statements_if = Blockly.Java.statementToCode(block, 'statements_if');
  var statements_else = Blockly.Java.statementToCode(block, 'statements_else');
  var orientation = block.getFieldValue('orientation');
  var code = '\n';
  code += 'if(isCrack("' + orientation + '")){\n';
  code += '\n';
  code += statements_if + '\n'; 
  code += '\n';
  code += '} else {\n';
  code += '\n';
  code += statements_else + '\n';  
  code += '\n';
  code += '}\n';

  return code;
};


Blockly.Java['if_something_in_direction'] = function(block) {
  var statements_if = Blockly.Java.statementToCode(block, 'statements_if');
  var goal = block.getFieldValue('goalField');
  var orientation = block.getFieldValue('orientation');
  var code = '\n';

  switch(goal){

    case "crack" :

       code += 'if(isCrack("' + orientation +'")){\n';
       code += '\n';
       code += statements_if;
       code += '\n';
       code += '}\n';
       code += '\n';
       break;

    case "wall" :

      code += 'if(isWall("' + orientation +'")){\n';
      code += '\n';
      code += statements_if;
      code += '\n';
      code += '}\n';
      code += '\n';
      break;

  case "glacier" :

    code += 'if(isGlacier("' + orientation +'")){\n';
    code += '\n';
    code += statements_if;
    code += '\n';
    code += '}\n';
    code += '\n';
    break;

 case "track" :

   code += 'if(isTrack("' + orientation +'")){\n';
   code += '\n';
   code += statements_if;
   code += '\n';
   code += '}\n';
   code += '\n';
   break;

  }

  return code;

};

Blockly.Java['if_else_something_in_direction'] = function(block) {
  var statements_if = Blockly.Java.statementToCode(block, 'statements_if');
  var statements_else = Blockly.Java.statementToCode(block, 'statements_else');
  var goal = block.getFieldValue('goalField');
  var orientation = block.getFieldValue('orientation');
  var code = '\n';

  switch(goal){

    case "crack" :

       code += 'if(isCrack("' + orientation +'")){\n';
       code += '\n';
       code += statements_if;
       code += '\n';
       code += '} else {\n';
       code += '\n';
       code += statements_else;
       code += '\n';
       code += '}\n';
       code += '\n';
       break;

    case "wall" :

      code += 'if(isWall("' + orientation +'")){\n';
      code += '\n';
      code += statements_if;
      code += '\n';
      code += '} else {\n';
      code += '\n';
      code += statements_else;
      code += '\n';
      code += '}\n';
      code += '\n';
      break;

  case "glacier" :

    code += 'if(isGlacier("' + orientation +'")){\n';
    code += '\n';
    code += statements_if;
    code += '\n';
    code += '} else {\n';
    code += '\n';
    code += statements_else;
    code += '\n';
    code += '}\n';
    code += '\n';
    break;

 case "track" :

   code += 'if(isTrack("' + orientation +'")){\n';
   code += '\n';
   code += statements_if;
   code += '\n';
   code += '} else {\n';
   code += '\n';
   code += statements_else;
   code += '\n';
   code += '}\n';
   code += '\n';
   break;


  }

  return code;
};

Blockly.Java['repeat_to_target'] = function(block) {
  var statements = Blockly.Java.statementToCode(block, 'statements');
  var code = '\n';
  code += 'while(! targetReached()){\n';
  code += '\n';
  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};

Blockly.Java['if_crack_width'] = function(block) {
  var statements = Blockly.Java.statementToCode(block, 'statements');
  var obj = block.getFieldValue('object');
  var orientation = block.getFieldValue('orientation');
  var inequality = block.getFieldValue('inequality');
  var width = parseInt(block.getFieldValue('width'));
  var fctname = '';
  var code = '\n';

  switch(obj){

     case "crack": fctname = 'crackWidth';
           break;

     case "glacier": fctname = 'glacierWidth';
           break;
  }

  code += 'if(' + fctname + '("' + orientation + '") ' + inequality + ' ' + width + '){\n';
  code += '\n';
  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};

Blockly.Java['if_else_crack_width'] = function(block) {
  var statements_if = Blockly.Java.statementToCode(block, 'statements_if');
  var statements_else = Blockly.Java.statementToCode(block, 'statements_else');
  var obj = block.getFieldValue('object');
  var orientation = block.getFieldValue('orientation');
  var inequality = block.getFieldValue('inequality');
  var width = parseInt(block.getFieldValue('width'));
  var fctname = '';
  var code = '\n';

  switch(obj){

     case "crack": fctname = 'crackWidth';
           break;

     case "glacier": fctname = 'glacierWidth';
           break;
  }

  code += 'if(' + fctname + '("' + orientation + '") ' + inequality + ' ' + width + '){\n';
  code += '\n';
  code += statements_if;
  code += '\n';
  code += '} else {\n';
  code += '\n';
  code += statements_else;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};

Blockly.Java['move_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var code = '';

  switch(goal){

    case "target" :

       code += 'moveToTarget();\n';

       break;

    case "crack" :

       code += 'moveToCrack();\n';

       break;

    case "wall" :

       code += 'moveToWall();\n';
       break;

     }

     return code;

};

Blockly.Java['definition:move_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements = Blockly.Java.statementToCode(block, 'statements');
  var code = '\n';

  switch(goal){

    case "target" :

       code += 'void moveToTarget(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';

       break;


    case "crack" :

       code += 'void moveToCrack(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';

       break;

    case "wall" :

       code += 'void moveToWall(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';
       break;

     }

     return code;

};

Blockly.Java['definition:move_to_target'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.Java.statementToCode(block, "statements");

  code += 'void moveToTarget(){\n';
  code += '\n';

  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;

};

Blockly.Java['definition:move_in_front_of_crack'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.Java.statementToCode(block, "statements");

  code += 'void moveToCrack(){\n';
  code += '\n';

  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;

};

Blockly.Java['definition:move_in_front_of_wall'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.Java.statementToCode(block, "statements");

  code += 'void moveToWall(){\n';
  code += '\n';

  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;

};

Blockly.Java['definition:tack'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.Java.statementToCode(block, "statements");

  code += 'void tack(){\n';
  code += '\n';

  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;

};

Blockly.Java['definition:tack_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements = Blockly.Java.statementToCode(block, 'statements');
  var code = '\n';

  switch(goal){

    case "target" :

       code += 'void tackToTarget(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';

       break;


    case "crack" :

       code += 'void tackToCrack(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';

       break;

    case "wall" :

       code += 'void tackToWall(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';
       break;

     }

     return code;

};

Blockly.Java['move_to_target'] = function(block) {
  var code;

  code = 'moveToTarget();';
  code += '\n';

  return code;

};

Blockly.Java['move_in_front_of_crack'] = function(block) {
  var code;

  code = 'moveToCrack();';
  code += '\n';

  return code;

};

Blockly.Java['move_in_front_of_wall'] = function(block) {
  var code;

  code = 'moveToWall();\n';

  return code;

};


Blockly.Java['tack'] = function(block) {
  var code;

  code = 'tack();\n';

  return code;

};

Blockly.Java['tack_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var code = '';

  switch(goal){

    case "target" :

       code += 'tackToTarget();\n';

       break;

    case "crack" :

       code += 'tackToCrack();\n';

       break;

    case "wall" :

       code += 'tackToWall();\n';
       break;

     }

     return code;

};

Blockly.Java['definition:tack_to_crack'] = function(block) {
  var code;

  code = 'tackToCrack();\n';

  return code;

};


Blockly.Java['definition:tack_params'] = function(block) {
  var statements;
  var n = block.getFieldValue('n');
  var v = block.getFieldValue('v');
  var h = block.getFieldValue('h');
  var code = '\n';

  statements = Blockly.Java.statementToCode(block, "statements");

  code += 'void tack(int ' + n + ', int ' + v + ', int ' + h + '){\n';
  code += '\n';

  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;

};

Blockly.Java['tack_params'] = function(block) {
  var n = block.getFieldValue('n');
  var v = block.getFieldValue('v');
  var h = block.getFieldValue('h');
  var code = '';

  code += 'tack(' + n + ', ' + v + ', ' + h + ');\n';
  code += '\n';

  return code;

};

