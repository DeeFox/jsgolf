require([ "engine",
          "renderer",
          "levelloader"], function(engine, renderer, levelloader){
  console.log("WTF is happening?!");
  engine.initialize();

  var begin2 = function() {
  engine.initBall();
  engine.hitBall(2, 0.5);

    var milliseconds = new Date().getTime();
    while(!engine.isBallAsleep()) {
      engine.calculateStep();
    }
    var milliseconds2 = new Date().getTime();
    console.log(milliseconds2 - milliseconds);

    console.log(engine.getBallPos());
  };
  var begin = function() {
    engine.initBall();
    engine.hitBall(2, 0.5);

    var myTime = -1;
    function repeatOften(time) {
      if(myTime != -1) {
        var ticks = Math.floor((time - myTime) / (1000/200));
        for(var i = 0; i < ticks; i++) {
          engine.calculateStep();
        }
      }
      myTime = time;

      engine.kickRenderer();
      if(!engine.isBallAsleep()) {
        requestAnimationFrame(repeatOften);
      } else {
        console.log(engine.getBallPos());
      }
    }
    requestAnimationFrame(repeatOften);
  }

  levelloader.loadLevel("debug", engine, begin);

  var myRenderer = renderer.getRenderer();
  engine.addItem(myRenderer);
});
