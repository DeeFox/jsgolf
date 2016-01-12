var GolfEngine = {
  init: function() {
    // Create the world object
    var world = Physics({
      maxIPF: 5,
      timestep: 6
    });


  }
};

Physics.body('golf-ball', 'circle', function( parent ){

    return {
        // no need for an init

        // spin the wheel at desired speed
    };
});

Physics.body('golf-hole', 'circle', function( parent ){

    return {
        // no need for an init

        // spin the wheel at desired speed
    };
});
