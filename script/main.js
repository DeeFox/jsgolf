require([ "engine",
          "renderer",
          "levelloader"], function(engine, renderer, levelloader){
  console.log("WTF is happening?!");
  engine.initialize();

  levelloader.loadLevel("debug", engine);

  var myRenderer = renderer.getRenderer();
  engine.addItem(myRenderer);

  engine.initBall();
  engine.hitBall(2.0, 1.0);

  function repeatOften() {
    engine.calculateStep();
    engine.kickRenderer();
    if(!engine.isBallAsleep()) {
      requestAnimationFrame(repeatOften);
    }
  }
  requestAnimationFrame(repeatOften);
});
