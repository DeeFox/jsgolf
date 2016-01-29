$(document).ready(function() {
  // Create the engine and constraints

  var world = Physics({
    maxIPF: 5,
    timestep: 6
  });

  Physics.util.ticker.on(function( time ){
    world.step(  );
    bodies = world.getBodies();
    for(i = 0; i < bodies.length; i++) {
      b = bodies[i];
      if(b !== undefined) {
        b.state.vel.x *= 0.99;
        b.state.vel.y *= 0.99;
      }
    }

    if(Math.abs(ball.state.vel.x) <= 0.01 && Math.abs(ball.state.vel.y) <= 0.01) {
      ball.state.vel.x = 0;
      ball.state.vel.y = 0;
    }

    if(ball.asleep) {
      Physics.util.ticker.stop();
    }
    //console.log(ball.state.vel.x);

    $('#dbg').text(ball.state.pos.y);
  });

  world.on('step', function(){
    world.render();
  });

  /*for(i = 0; i < 10; i++) {
    var tball = Physics.body('circle', {
      x: 200 + Math.random() * 800,
      y: 100 + Math.random() * 475,
      vx: Math.random() * 5 - 1,
      vy: Math.random() * 5 - 1,
      radius: 10,
      cof: 0.0
    });
    world.add(tball);
  }*/

  var renderer = Physics.renderer('canvas', {
    el: 'golfcanvas',
    width: 1200,
    height: 600,
    meta: true,
    styles: {
        'circle' : {
            fillStyle: 'hsla(60, 37%, 57%, 0.8)',
            angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
        }
    }
  });

  // add the renderer
  world.add( renderer );

  var bounds = Physics.aabb(0, 0, 1200, 600);
  world.add( Physics.behavior('edge-collision-detection', {
    aabb: bounds,
    restitution: 1.0,
    cof: 0.0
  }) );
  world.add( Physics.behavior('body-impulse-response') );
  world.add( Physics.behavior('body-collision-detection') );
  world.add( Physics.behavior('sweep-prune') );

  world.on('collisions:detected', function(data, e) {
    var bodyA = data.collisions[0].bodyA,
        bodyB = data.collisions[0].bodyB;

    bodyA.sleep(true);
    bodyA.sleep(false);
    bodyA.state.angular.vel = 0;

    bodyB.sleep(true);
    bodyB.sleep(false);
    bodyB.state.angular.vel = 0;
  });

  // Fill it with life
  var ball = Physics.body('circle', {
    x: 100, // x-coordinate
    y: 210, // y-coordinate
    vx: 0.8, // velocity in x-direction
    vy: 0.01, // velocity in y-direction
    radius: 8,
    treatment: 'dynamic',
    cof: 0.0
  });
  // add the circle to the world
  world.add( ball );

/*var rect = Physics.body('rectangle', {
    x: 10,
    y: 300,
    width: 20,
    height: 600,
    treatment: 'static',
    cof: 0.0
  });
  world.add(rect);

  var rect3 = Physics.body('rectangle', {
    x: 300,
    y: 100,
    width: 20,
    height: 200,
    treatment: 'static',
    cof: 0.0
  });
  world.add(rect3);

  var rect4 = Physics.body('rectangle', {
    x: 300,
    y: 300,
    width: 20,
    height: 160,
    treatment: 'static',
    cof: 0.0
  });
  world.add(rect4);

  var rect5 = Physics.body('rectangle', {
    x: 100,
    y: 210,
    width: 20,
    height: 100,
    treatment: 'static',
    cof: 0.0
  });
  world.add(rect5);

  var rect6 = Physics.body('rectangle', {
    x: 500,
    y: 210,
    width: 20,
    height: 100,
    treatment: 'static',
    cof: 0.0
  });
  world.add(rect6);

  var rect7 = Physics.body('rectangle', {
    x: 520,
    y: 210.5,
    width: 20,
    height: 100,
    treatment: 'static',
    cof: 0.0
  });
  world.add(rect7);

  var rect8 = Physics.body('rectangle', {
    x: 540,
    y: 211,
    width: 20,
    height: 100,
    treatment: 'static',
    cof: 0.0
  });
  world.add(rect8);

  var rect2 = Physics.body('rectangle', {
    x: 200,
    y: 500,
    width: 300,
    height: 20,
    angle: Math.PI / 4,
    treatment: 'static',
    cof: 0.0
  });
  world.add(rect2);*/

  Physics.util.ticker.stop();

  $.getJSON( "levels/debug.json", function( data ) {
    for(var i = 0; i < data.length; i++) {
      var p = data[i];
      console.log(p);
      if(p['shape'] == "rect") {
        var item = Physics.body('rectangle', {
          x: p['pos'][0],
          y: p['pos'][1],
          width: p['size'][0],
          height: p['size'][1],
          angle: p['angle'],
          treatment: 'static',
          cof: 0.0
        });
        console.log(item);
        world.add(item);
      }
      console.log(p);
    }
    console.log(data[0]);
    Physics.util.ticker.start();
  });
});
