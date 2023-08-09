while(! targetReached()){

  if(playerCodeLoopCount++ > maxplayerCodeLoop){
        
    neverendingLoopDetected();
    return;
    
  }

  if(isCrack("forward")){

    jump();

  } else {

    move();

  }

}


