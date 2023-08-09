Blockly.Blocks['if_crack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Si crevasse")
        .appendField(new Blockly.FieldDropdown([["devant","forward"], ["à gauche","left"], ["à droite","right"], ["derrière","backward"]]), "orientation");
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(207);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['if_else_crack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Si crevasse")
        .appendField(new Blockly.FieldDropdown([["devant","forward"], ["à gauche","left"], ["à droite","right"], ["derrière","backward"]]), "orientation");
    this.appendStatementInput("statements_if")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("sinon");
    this.appendStatementInput("statements_else")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(207);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['if_something_in_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Si ")
        .appendField(new Blockly.FieldDropdown([[{"src":"images/crack_white_128x128.png","width":15,"height":15,"alt":"*"},"crack"],
                                                [{"src":"images/stone128x128.png","width":15,"height":15,"alt":"*"},"wall"],
                                                [{"src":"images/glacier32x32.png","width":15,"height":15,"alt":"*"},"glacier"],
                                                [{"src":"images/track32x32.png","width":15,"height":15,"alt":"*"},"track"]
                                               ]), "goalField")
        .appendField(" ")
        .appendField(new Blockly.FieldDropdown([["devant","forward"], ["à gauche","left"], ["à droite","right"]]), "orientation");
    this.appendStatementInput("statements_if")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(207);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['if_else_something_in_direction'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Si ")
        .appendField(new Blockly.FieldDropdown(
         
         [
            [{"src":"images/crack_white_128x128.png",
              "width":15,"height":15,"alt":"*"},"crack"],
          
            [{"src":"images/stone128x128.png",
              "width":15,"height":15,"alt":"*"},"wall"],
          
            [{"src":"images/glacier32x32.png","width":15,
              "height":15,"alt":"*"},"glacier"],
          
            [{"src":"images/track32x32.png",
              "width":15,"height":15,"alt":"*"},"track"]
         ]), "goalField")
     
        .appendField(" ")
        .appendField(new Blockly.FieldDropdown(
         
         [["devant","forward"], ["à gauche","left"], 
          ["à droite","right"]]), "orientation");
   
    this.appendStatementInput("statements_if")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("sinon");
    this.appendStatementInput("statements_else")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(207);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['repeat_n_times'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Répéter")
        .appendField(new Blockly.FieldTextInput("3"), "n")
        .appendField("fois");
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(322);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['if_crack_width'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Si")
        .appendField(new Blockly.FieldDropdown([[{"src":"images/crack_white_128x128.png","width":15,"height":15,"alt":"*"},"crack"],
                                                [{"src":"images/glacier32x32.png","width":15,"height":15,"alt":"*"},"glacier"],
                                              ]), "object")
        .appendField(new Blockly.FieldDropdown([["devant","forward"], ["à gauche","left"], ["à droite","right"], ["derrière","backward"]]), "orientation")
        .appendField(new Blockly.FieldDropdown([[">",">"], ["<","<"], ["=","=="], ["<=","<="], [">=",">="], ["<=","<="], ["<>","!="]]), "inequality")
        .appendField(new Blockly.FieldTextInput("2"), "width");
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(207);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['if_else_crack_width'] = {
  init: function() {
    this.appendDummyInput()
    .appendField("Si")
    .appendField(new Blockly.FieldDropdown([[{"src":"images/crack_white_128x128.png","width":15,"height":15,"alt":"*"},"crack"],
                                            [{"src":"images/glacier32x32.png","width":15,"height":15,"alt":"*"},"glacier"],
                                          ]), "object")
    .appendField(new Blockly.FieldDropdown([["devant","forward"], ["à gauche","left"], ["à droite","right"], ["derrière","backward"]]), "orientation")
    .appendField(new Blockly.FieldDropdown([[">",">"], ["<","<"], ["=","=="], ["<=","<="], [">=",">="], ["<=","<="], ["<>","!="]]), "inequality")
    .appendField(new Blockly.FieldTextInput("2"), "width");
    this.appendStatementInput("statements_if")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("sinon");
    this.appendStatementInput("statements_else")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(207);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};


Blockly.Blocks['move'] = {
 
  init: function() {
   
    this.appendDummyInput()
        .appendField("Avancer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(184);
    this.setTooltip("");
    this.setHelpUrl("");
   
  }
 
};



Blockly.Blocks['jump'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Sauter");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(184);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['turn'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Tourner à ")
        .appendField(new Blockly.FieldDropdown([["gauche","left"], ["droite","right"]]), "orientation");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(184);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['repeat_to_target'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Répéter jusqu'à ")
        .appendField(new Blockly.FieldImage("images/julie128x128.png", 15, 15, "*"));
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(322);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['repeat_until_crack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Répéter jusque devant")
        .appendField(new Blockly.FieldImage("images/crack_white_128x128.png", 15, 15, "*"));
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(322);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['repeat_until_something'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Répéter jusqu'à")
        .appendField(new Blockly.FieldDropdown([[{"src":"images/julie128x128.png","width":15,"height":15,"alt":"*"},"target"],
                                                [{"src":"images/crack_white_128x128.png","width":15,"height":15,"alt":"*"},"crack"],
                                                [{"src":"images/stone128x128.png","width":15,"height":15,"alt":"*"},"wall"],
                                                [{"src":"images/glacier32x32.png","width":15,"height":15,"alt":"*"},"glacier"],
                                                [{"src":"images/track32x32.png","width":15,"height":15,"alt":"*"},"track"]
                                               ]), "goalField");
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(322);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['definition:move_to_something'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Définir: Aller jusqu'à ")
        .appendField(new Blockly.FieldDropdown([[{"src":"images/julie128x128.png","width":15,"height":15,"alt":"*"},"target"],
                                                [{"src":"images/crack_white_128x128.png","width":15,"height":15,"alt":"*"},"crack"],
                                                [{"src":"images/stone128x128.png","width":15,"height":15,"alt":"*"},"wall"]
                                               ]), "goalField");
    this.setInputsInline(true);
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['definition:move_to_crack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Définir :  Aller jusque devant")
        .appendField(new Blockly.FieldImage("images/crack_white_128x128.png", 15, 15, "*"));
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['definition:move_in_front_of_crack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Définir : Aller jusque devant")
        .appendField(new Blockly.FieldImage("images/crack_white_128x128.png", 15, 15, "*"));
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['definition:move_in_front_of_wall'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Définir : Aller jusque devant")
        .appendField(new Blockly.FieldImage("images/stone128x128.png", 15, 15, "*"));
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['definition:tack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Définir : Louvoyer");
    this.setInputsInline(true);
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setNextStatement(false);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['definition:tack_to_crack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Définir : Louvoyer jusqu'à")
        .appendField(new Blockly.FieldImage("images/crack_white_128x128.png", 15, 15, "*"));
    this.setInputsInline(true);
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setNextStatement(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['definition:tack_to_something'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Définir: Louvoyer jusqu'à ")
        .appendField(new Blockly.FieldDropdown([[{"src":"images/julie128x128.png","width":15,"height":15,"alt":"*"},"target"],
                                                [{"src":"images/crack_white_128x128.png","width":15,"height":15,"alt":"*"},"crack"],
                                                [{"src":"images/stone128x128.png","width":15,"height":15,"alt":"*"},"wall"]
                                               ]), "goalField");
    this.setInputsInline(true);
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



Blockly.Blocks['definition:tack_params'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Définir :  Louvoyer")
        .appendField(new Blockly.FieldTextInput("n"), "n")
        .appendField("fois");
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput("v"), "v")
        .appendField("vertical")
        .appendField(new Blockly.FieldTextInput("h"), "h")
        .appendField("horizontal");
    this.setInputsInline(false);
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setNextStatement(false);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['definition:move_in_front_of_something'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Définir: Aller jusque devant ")
        .appendField(new Blockly.FieldDropdown([[{"src":"images/crack_white_128x128.png","width":15,"height":15,"alt":"*"},"crack"],
                                                [{"src":"images/stone128x128.png","width":15,"height":15,"alt":"*"},"wall"]
                                               ]), "goalField");
    this.setInputsInline(true);
    this.setPreviousStatement(false, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['definition:move_to_target'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Définir: Aller jusque à ")
        .appendField(new Blockly.FieldImage("images/julie128x128.png", 15, 15, "*"));
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setInputsInline(true);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};


Blockly.Blocks['tack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Louvoyer");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tack_to_crack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Louvoyer jusqu'à")
        .appendField(new Blockly.FieldImage("images/crack_white_128x128.png", 15, 15, "*"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tack_to_something'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Louvoyer jusque à ")
        .appendField(new Blockly.FieldDropdown([[{"src":"images/julie128x128.png","width":15,"height":15,"alt":"*"},"target"],
                                                [{"src":"images/crack_white_128x128.png","width":15,"height":15,"alt":"*"},"crack"],
                                                [{"src":"images/stone128x128.png","width":15,"height":15,"alt":"*"},"wall"]
                                               ]), "goalField");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['tack_params'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Louvoyer")
        .appendField(new Blockly.FieldNumber(1, 1, 100, 1), "n")
        .appendField("fois")
        .appendField(new Blockly.FieldNumber(1, 1, 100, 1), "v")
        .appendField("vertical")
        .appendField(new Blockly.FieldNumber(1, 1, 100, 1), "h")
        .appendField("horizontal");
    this.setInputsInline(true);
    this.setNextStatement(true);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_to_something'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Aller jusque à ")
        .appendField(new Blockly.FieldDropdown([[{"src":"images/julie128x128.png","width":15,"height":15,"alt":"*"},"target"],
                                                [{"src":"images/crack_white_128x128.png","width":15,"height":15,"alt":"*"},"crack"],
                                                [{"src":"images/stone128x128.png","width":15,"height":15,"alt":"*"},"wall"]
                                               ]), "goalField");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_to_target'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Aller jusqu'à")
        .appendField(new Blockly.FieldImage("images/julie128x128.png", 15, 15, "*"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_in_front_of_crack'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Aller jusque devant")
        .appendField(new Blockly.FieldImage("images/crack_white_128x128.png", 15, 15, "*"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['move_in_front_of_wall'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Aller jusque devant")
        .appendField(new Blockly.FieldImage("images/stone128x128.png", 15, 15, "*"));
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
