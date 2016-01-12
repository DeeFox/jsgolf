$(document).ready(function() {
  var world = Physics({
    maxIPF: 5,
    timestep: 6
  });

  var ball = Physics.body('circle', {
    x: 100, // x-coordinate
    y: 200, // y-coordinate
    vx: 1, // velocity in x-direction
    vy: 0.0, // velocity in y-direction
    radius: 10,
    treatment: 'dynamic',
    cof: 0.0
  });
  // add the circle to the world
  world.add( ball );

  console.log(ball.__proto__.name);

  var b2 = Physics.body('circle', {
    x: 400,
    y: 200,
    radius: 10,
    treatment: 'dynamic',
    cof: 0.0
  });
  //world.add( b2 );

  Physics.util.ticker.on(function( time ){
    world.step( time );
    bodies = world.getBodies();
    for(i = 0; i < bodies.length; i++) {
      b = bodies[i];
      if(b !== undefined) {
        b.state.vel.x *= 0.99;
        b.state.vel.y *= 0.99;
      }
    }

    $('#dbg').text(ball.state.pos.y);
    //console.log(ball.state.pos);
  });

  world.on('step', function(){
    world.render();
  });

  /*var ball2 = Physics.body('circle', {
    x: 250,
    y: 45,
    vx: -0.4,
    radius: 20
  });
  world.add(ball2);*/

  /*for(i = 0; i < 10; i++) {
    var tball = Physics.body('circle', {
      x: 200 + Math.random() * 800,
      y: 100 + Math.random() * 475,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 2 - 1,
      radius: 10,
      cof: 0.0
    });
    world.add(tball);
  }*/

  var rect = Physics.body('rectangle', {
    x: 10,
    y: 300,
    width: 20,
    height: 600,
    treatment: 'static',
    cof: 0.0
  });
  world.add(rect);

  var rect2 = Physics.body('rectangle', {
    x: 200,
    y: 500,
    width: 300,
    height: 20,
    angle: Math.PI / 4,
    treatment: 'static',
    cof: 0.0
  });
  world.add(rect2);

  var renderer = Physics.renderer('canvas', {
    el: 'golfcanvas',
    width: 1200,
    height: 600,
    meta: true,
    styles: {
        'circle' : {
            strokeStyle: 'hsla(60, 37%, 17%, 1)',
            lineWidth: 1,
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

  world.add( Physics.behavior('attractor', {
    pos: {x: 400, y: 200},
    strength: 1
  }));

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

  Physics.util.ticker.start();
});
