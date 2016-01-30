define([
  'physicsjs',
  'behaviors/edge-collision-detection',
  'behaviors/body-impulse-response-without-angular-vel',
  'behaviors/body-collision-detection',
  'behaviors/sweep-prune',
  'bodies/circle'
], function( Physics ){
  var world;
  var ball;
  var ballSleeping = false;
  var engineConfig = {
    timestep: 5
  };
  return {
    initialize: function() {
      world = Physics({
        maxIPF: 10,
        timestep: engineConfig.timestep
      });
      var bounds = Physics.aabb(0, 0, 1000, 600);
      world.add( Physics.behavior('edge-collision-detection', {
        aabb: bounds,
        restitution: 1.0,
        cof: 0.0
      }) );

      world.add( Physics.behavior('body-impulse-response-without-angular-vel') );
      world.add( Physics.behavior('body-collision-detection') );
      world.add( Physics.behavior('sweep-prune') );

      world.on('collisions:detected', function(data, e) {
        var bodyA = data.collisions[0].bodyA,
            bodyB = data.collisions[0].bodyB;
        var partner = (bodyA == ball) ? bodyB : bodyA;
        if(partner.material == "bouncy") {
          if(ball.state.vel.x >= ball.state.vel.y) {
            var mult = 2 / Math.abs(ball.state.vel.x);
            ball.state.vel.x *= mult;
            ball.state.vel.y *= mult;
          } else {
            var mult = 2 / Math.abs(ball.state.vel.y);
            ball.state.vel.y *= mult;
            ball.state.vel.x *= mult;
          }

        }

      });

    },
    isBallAsleep: function() {
      return ballSleeping;
    },
    initBall: function() {
      ball = Physics.body('circle', {
        x: 450, // x-coordinate
        y: 300, // y-coordinate
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
          b.state.vel.x *= 0.995;
          b.state.vel.y *= 0.995;
        }
      }

      if(Math.abs(ball.state.vel.x) <= 0.01 && Math.abs(ball.state.vel.y) <= 0.01) {
        ball.state.vel.x = 0;
        ball.state.vel.y = 0;
        ballSleeping = true;
      }
    },
    kickRenderer: function() {
      world.render();
    },
    getBallPos: function() {
      return [ball.state.pos.x, ball.state.pos.y];
    }
  }
});
