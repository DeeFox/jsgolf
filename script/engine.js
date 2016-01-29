define([
  'physicsjs-full.min'
], function( Physics ){
  var world;
  var ball;
  var ballSleeping = false;
  return {
    initialize: function() {
      world = Physics({
        maxIPF: 5,
        timestep: 6
      });
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
    },
    isBallAsleep: function() {
      return ballSleeping;
    },
    initBall: function() {
      ball = Physics.body('circle', {
        x: 100, // x-coordinate
        y: 210, // y-coordinate
        vx: 0.0, // velocity in x-direction
        vy: 0.0, // velocity in y-direction
        radius: 8,
        treatment: 'dynamic',
        cof: 0.0
      });
      world.add(ball);
    },
    hitBall: function(vx, vy) {
      ball.state.vel.x = vx;
      ball.state.vel.y = vy;
    },
    addItem: function(item) {
      world.add(item);
    },
    calculateStep: function() {
      world.step();
      var bodies = world.getBodies();
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
        ballSleeping = true;
      }

      console.log(ball.state.vel.x + " _ " + ball.state.vel.y);
    },
    kickRenderer: function() {
      world.render();
    }
  }
});
