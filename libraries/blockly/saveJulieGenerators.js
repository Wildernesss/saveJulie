Blockly.JavaScript['move'] = function(block) {
  var code = 'move();\n';
  return code;
};

Blockly.JavaScript['jump'] = function(block) {
  var code = 'jump();\n';
  return code;
};

Blockly.JavaScript['turn'] = function(block) {
  let orientation = block.getFieldValue('orientation');
  let code = 'turn' + orientation.charAt(0).toUpperCase() + orientation.slice(1) + '();\n';

  return code;
};

Blockly.JavaScript['repeat_n_times'] = function(block) {
  var n = block.getFieldValue('n');
  var nb;
  var statements = Blockly.JavaScript.statementToCode(block, 'statements');

  if(!isNaN(n)){

    nb = parseInt(n);

  } else {

    nb = n;

  }

  var code = '\n';

  code += 'for(let i = 0; i < ' + nb + '; i++){\n';
  code += '\n';
  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};

Blockly.JavaScript['repeat_until_crack'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'statements');
  var code = '\n';
  code += 'while(! isCrack("forward")){\n';
  code += '\n';
  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};

Blockly.JavaScript['repeat_to_target'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'statements');
  var code = '\n';
  code += 'while(! targetReached()){\n';
  code += '\n';
  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};

Blockly.JavaScript['repeat_until_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements = Blockly.JavaScript.statementToCode(block, 'statements');
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

Blockly.JavaScript['if_crack'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'statements');
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


Blockly.JavaScript['if_else_crack'] = function(block) {
  var statements_if = Blockly.JavaScript.statementToCode(block, 'statements_if');
  var statements_else = Blockly.JavaScript.statementToCode(block, 'statements_else');
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


Blockly.JavaScript['if_something_in_direction'] = function(block) {
  var statements_if = Blockly.JavaScript.statementToCode(block, 'statements_if');
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

Blockly.JavaScript['if_else_something_in_direction']
  
  = function(block) {
    
  var statements_if = Blockly
                      .JavaScript
                      .statementToCode(block, 'statements_if');
    
  var statements_else = Blockly
                        .JavaScript
                        .statementToCode(block, 'statements_else');
    
  var goal = block.getFieldValue('goalField');
  var orientation = block.getFieldValue('orientation');
  var code = '\n';

  switch(goal){

    case "crack" :

      code += 'if(isCrack("' + orientation +'")){\n';
      break;

    case "wall" :

      code += 'if(isWall("' + orientation +'")){\n';
      break;

    case "glacier" :
  
      code += 'if(isGlacier("' + orientation +'")){\n';
      break;
  
    case "track" :
  
      code += 'if(isTrack("' + orientation +'")){\n';
      break;

  }

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

Blockly.JavaScript['repeat_to_target'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'statements');
  var code = '\n';
  code += 'while(! targetReached()){\n';
  code += '\n';
  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;
};

Blockly.JavaScript['if_crack_width'] = function(block) {
  var statements = Blockly.JavaScript.statementToCode(block, 'statements');
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

Blockly.JavaScript['if_else_crack_width'] = function(block) {
  var statements_if = Blockly.JavaScript.statementToCode(block, 'statements_if');
  var statements_else = Blockly.JavaScript.statementToCode(block, 'statements_else');
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

Blockly.JavaScript['move_to_something'] = function(block) {
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

Blockly.JavaScript['definition:move_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements = Blockly.JavaScript.statementToCode(block, 'statements');
  var code = '\n';

  switch(goal){

    case "target" :

       code += 'function moveToTarget(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';

       break;


    case "crack" :

       code += 'function moveToCrack(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';

       break;

    case "wall" :

       code += 'function moveToWall(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';
       break;

     }

     return code;

};

Blockly.JavaScript['definition:move_to_target'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.JavaScript.statementToCode(block, "statements");

  code += 'function moveToTarget(){\n';
  code += '\n';

  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;

};

Blockly.JavaScript['definition:move_in_front_of_crack'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.JavaScript.statementToCode(block, "statements");

  code += 'function moveToCrack(){\n';
  code += '\n';

  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;

};

Blockly.JavaScript['definition:move_in_front_of_wall'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.JavaScript.statementToCode(block, "statements");

  code += 'function moveToWall(){\n';
  code += '\n';

  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;

};

Blockly.JavaScript['definition:tack'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.JavaScript.statementToCode(block, "statements");

  code += 'function tack(){\n';
  code += '\n';

  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;

};

Blockly.JavaScript['definition:tack_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements = Blockly.JavaScript.statementToCode(block, 'statements');
  var code = '\n';

  switch(goal){

    case "target" :

       code += 'function tackToTarget(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';

       break;


    case "crack" :

       code += 'function tackToCrack(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';

       break;

    case "wall" :

       code += 'function tackToWall(){\n';
       code += '\n';
       code += statements;
       code += '\n';
       code += '}\n';
       code += '\n';
       break;

     }

     return code;

};

Blockly.JavaScript['move_to_target'] = function(block) {
  var code;

  code = 'moveToTarget();';
  code += '\n';

  return code;

};

Blockly.JavaScript['move_in_front_of_crack'] = function(block) {
  var code;

  code = 'moveToCrack();';
  code += '\n';

  return code;

};

Blockly.JavaScript['move_in_front_of_wall'] = function(block) {
  var code;

  code = 'moveToWall();\n';

  return code;

};


Blockly.JavaScript['tack'] = function(block) {
  var code;

  code = 'tack();\n';

  return code;

};

Blockly.JavaScript['tack_to_something'] = function(block) {
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

Blockly.JavaScript['definition:tack_to_crack'] = function(block) {
  var code;

  code = 'tackToCrack();\n';

  return code;

};


Blockly.JavaScript['definition:tack_params'] = function(block) {
  var statements;
  var n = block.getFieldValue('n');
  var v = block.getFieldValue('v');
  var h = block.getFieldValue('h');
  var code = '\n';

  statements = Blockly.JavaScript.statementToCode(block, "statements");

  code += 'function tack(' + n + ', ' + v + ', ' + h + '){\n';
  code += '\n';

  code += statements;
  code += '\n';
  code += '}\n';
  code += '\n';

  return code;

};

Blockly.JavaScript['tack_params'] = function(block) {
  var n = block.getFieldValue('n');
  var v = block.getFieldValue('v');
  var h = block.getFieldValue('h');
  var code = '';

  code += 'tack(' + n + ', ' + v + ', ' + h + ');\n';
  code += '\n';

  return code;

};




Blockly.Python['move'] = function(block) {
  var code = 'move()\n';
  return code;
};


Blockly.Python['jump'] = function(block) {
  var code = 'jump()\n';
  return code;
};

Blockly.Python['turn'] = function(block) {
  var orientation = block.getFieldValue('orientation');
  var code = 'turn' + orientation.charAt(0).toUpperCase() + orientation.slice(1) + '()\n';

  return code;
};

Blockly.Python['repeat_n_times'] = function(block) {
  var n = block.getFieldValue('n');
  var nb;
  var statements = Blockly.Python.statementToCode(block, 'statements');

  if(!isNaN(n)){

    nb = parseInt(n);

  } else {

    nb = n;

  }

  var code = '\n';
  var code = '\n';
  code += 'for i in range(1, ' + n + '):\n\n';
  code += statements;
  code += '\n';

  return code;
};

Blockly.Python['repeat_until_crack'] = function(block) {
  var statements = Blockly.Python.statementToCode(block, 'statements');
  var code = '\n';
  code += 'while ! isCrack("forward"):\n';
  code += statements;
  code += '\n';

  return code;
};

Blockly.Python['repeat_to_target'] = function(block) {
  var statements = Blockly.Python.statementToCode(block, 'statements');
  var code = '\n';
  code += 'while ! targetReached():\n';
  code += statements;
  code += '\n';

  return code;
};

Blockly.Python['repeat_until_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements = Blockly.Python.statementToCode(block, 'statements');
  var code = '\n';

  switch(goal){

    case "crack" :

       code += 'while ! isCrack("forward"):\n';
       code += '\n';
       code += statements;
       code += '\n';

       break;

     case "wall" :

         code += 'while ! wallReached():\n';
         code += '\n';
         code += statements;
         code += '\n';
         break;

     case "target" :

       code += 'while ! targetReached():\n';
       code += '\n';
       code += statements;
       code += '\n';
       break;

     case "glacier" :

      code += 'while ! isGlacier("forward"):\n';
      code += '\n';
      code += statements;
      code += '\n';
      code += '}\n';
      code += '\n';
      break;

     case "track" :

        code += 'while ! isTrack("forward"):\n';
        code += '\n';
        code += statements;
        code += '\n';
        code += '}\n';
        code += '\n';
        break;


  }

  return code;

};

Blockly.Python['if_crack'] = function(block) {
  var statements = Blockly.Python.statementToCode(block, 'statements');
  var orientation = block.getFieldValue('orientation');
  var code = '\n';
  code += 'if isCrack("' + orientation + '"):\n';
  code += '\n';
  code += statements;
  code += '\n';

  return code;
};

Blockly.Python['if_else_crack'] = function(block) {
  var statements_if = Blockly.Python.statementToCode(block, 'statements_if');
  var statements_else = Blockly.Python.statementToCode(block, 'statements_else');
  var orientation = block.getFieldValue('orientation');
  var code = '\n';
  code += 'if isCrack("' + orientation + '"):\n';
  code += '\n';
  code += statements_if;
  code += '\n';
  code += 'else:\n';
  code += '\n';
  code += statements_else;
  code += '\n';

  return code;

};

Blockly.Python['if_something_in_direction'] = function(block) {
  var statements_if = Blockly.Python.statementToCode(block, 'statements_if');
  var goal = block.getFieldValue('goalField');
  var orientation = block.getFieldValue('orientation');
  var code = '\n';

  switch(goal){

    case "crack" :

       code += 'if isCrack("' + orientation +'"):\n';
       code += '\n';
       code += statements_if;
       code += '\n';
       break;

    case "wall" :

      code += 'if isWall("' + orientation +'"):\n';
      code += '\n';
      code += statements_if;
      code += '\n';
      break;

  case "glacier" :

    code += 'if isGlacier("' + orientation +'"):\n';
    code += '\n';
    code += statements_if;
    code += '\n';
    break;

 case "track" :

   code += 'if isTrack("' + orientation +'"):\n';
   code += '\n';
   code += statements_if;
   code += '\n';
   break;

  }

    return code;

};

Blockly.Python['if_else_something_in_direction'] = function(block) {
  var statements_if = Blockly.Python.statementToCode(block, 'statements_if');
  var statements_else = Blockly.Python.statementToCode(block, 'statements_else');
  var goal = block.getFieldValue('goalField');
  var orientation = block.getFieldValue('orientation');
  var code = '\n';

  switch(goal){

    case "crack" :

       code += 'if isCrack("' + orientation +'"):\n';
       code += '\n';
       code += statements_if;
       code += '\n';
       code += 'else:\n';
       code += '\n';
       code += statements_else;
       code += '\n';
       break;

    case "wall" :

      code += 'if isWall("' + orientation +'"):\n';
      code += '\n';
      code += statements_if;
      code += '\n';
      code += 'else:\n';
      code += '\n';
      code += statements_else;
      code += '\n';
      break;

  case "glacier" :

    code += 'if isGlacier("' + orientation +'"):\n';
    code += '\n';
    code += statements_if;
    code += '\n';
    code += 'else:\n';
    code += '\n';
    code += statements_else;
    code += '\n';
    break;

 case "track" :

   code += 'if isTrack("' + orientation +'"):\n';
   code += '\n';
   code += statements_if;
   code += '\n';
   code += 'else:\n';
   code += '\n';
   code += statements_else;
   code += '\n';
   break;

  }

  return code;
};

Blockly.Python['if_crack_width'] = function(block) {
  var statements = Blockly.Python.statementToCode(block, 'statements');
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

  code += 'if ' + fctname + '("' + orientation + '") ' + inequality + ' ' + width + ':\n';
  code += '\n';
  code += statements;
  code += '\n';

  return code;

};

Blockly.Python['if_else_crack_width'] = function(block) {
  var statements_if = Blockly.Python.statementToCode(block, 'statements_if');
  var statements_else = Blockly.Python.statementToCode(block, 'statements_else');
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

  code += 'if ' + fctname + '("' + orientation + '") ' + inequality + ' ' + width + ':\n';
  code += '\n';
  code += statements_if;
  code += '\n';
  code += 'else:\n';
  code += '\n';
  code += statements_else;
  code += '\n';

  return code;
};

Blockly.Python['move_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var code = '';

  switch(goal){

    case "target" :

       code += 'moveToTarget()\n';

       break;

    case "crack" :

       code += 'moveToCrack()\n';

       break;

    case "wall" :

       code += 'moveToWall()\n';
       break;

     }

     return code;

};

Blockly.Python['tack_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var code = '';

  switch(goal){

    case "target" :

       code += 'tackToTarget()\n';

       break;

    case "crack" :

       code += 'tackToCrack()\n';

       break;

    case "wall" :

       code += 'tackToWall()\n';
       break;

     }

     return code;

};

Blockly.Python['definition:move_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var code = '\n';

  switch(goal){

    case "crack" :

       code += 'def moveToCrack():\n';
       code += '\n';

       break;

     case "target" :

       code += 'def moveToTarget():\n';
       code += '\n';
       break;

    case "wall" :

       code += 'def moveToWall():\n';
       code += '\n';
       break;

     }

     return code;

};

Blockly.Python['definition:move_to_target'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.Python.statementToCode(block, "statements");

  code += 'def moveToTarget():\n';
  code += '\n';

  code += statements;
  code += '\n';

  return code;

};

Blockly.Python['definition:move_in_front_of_crack'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.Python.statementToCode(block, "statements");

  code += 'def moveToCrack():\n';
  code += '\n';

  code += statements;
  code += '\n';

  return code;

};

Blockly.Python['definition:move_in_front_of_wall'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.Python.statementToCode(block, "statements");

  code += 'def moveToWall():\n';
  code += '\n';

  code += statements;
  code += '\n';

  return code;

};


Blockly.Python['definition:tack'] = function(block) {
  var statements;
  var code = '\n';

  statements = Blockly.Python.statementToCode(block, "statements");

  code += 'def tack():\n';
  code += '\n';

  code += statements;
  code += '\n';

  return code;

};


Blockly.Python['definition:tack_to_something'] = function(block) {
  var goal = block.getFieldValue('goalField');
  var statements;
  var code = '\n';

  statements = Blockly.Python.statementToCode(block, "statements");

  switch(goal){

    case "crack" :

       code += 'def tackToCrack():\n';
       code += '\n';

       break;

     case "target" :

       code += 'def tackToTarget():\n';
       code += '\n';
       break;

    case "wall" :

       code += 'def tackToWall():\n';
       code += '\n';
       break;

     }

     code += statements;
     code += '\n';

     return code;

};

Blockly.Python['move_to_target'] = function(block) {
  var code;

  code = 'moveToTarget()';

  return code;

};

Blockly.Python['move_in_front_of_crack'] = function(block) {
  var code;

  code = 'moveToCrack()\n';

  return code;

};

Blockly.Python['move_in_front_of_wall'] = function(block) {
  var code;

  code = 'moveToWall()\n';

  return code;

};

Blockly.Python['tack'] = function(block) {
  var code;

  code = 'tack()\n';

  return code;

};

Blockly.Python['definition:tack_to_crack'] = function(block) {
  var code;

  code = 'tackToCrack()\n';

  return code;

};

Blockly.Python['definition:tack_params'] = function(block) {
  var statements;
  var n = block.getFieldValue('n');
  var v = block.getFieldValue('v');
  var h = block.getFieldValue('h');
  var code = '\n';

  statements = Blockly.Python.statementToCode(block, "statements");

  code += 'def tack(' + n + ', ' + v + ', ' + h + '):\n';
  code += '\n';

  code += statements;
  code += '\n';

  return code;

};

Blockly.Python['tack_params'] = function(block) {
  var n = block.getFieldValue('n');
  var v = block.getFieldValue('v');
  var h = block.getFieldValue('h');
  var code = '';

  code += 'tack(' + n + ', ' + v + ', ' + h + ')\n';
  code += '\n';

  return code;

};



function addnewBlock(){

  Blockly.Blocks['moveIn'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Avance dans");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(184);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };



  Blockly.JavaScript['moveIn'] = function(block) {
    var code = 'moveIn();\n';
    return code;
  };

  var xmlBlock, xmlCategories, xmlCategory;

	xmlCategories = document.getElementsByTagName("category");
  xmlBlock = document.createElement("block");
  xmlBlock.setAttribute("type","moveIn");

  for(let i = 0; i< xmlCategories.length; i++){

      let xmlCategory = xmlCategories[i];
      if(xmlCategory.getAttribute("name") == "Actions" ){

      xmlCategory.appendChild(xmlBlock);

      };
  }

	// editorWorkspace.updateToolbox(document.getElementById('toolbox'));

}
