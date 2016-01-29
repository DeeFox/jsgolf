require.config({
  paths: {
    'jquery': './jquery-1.12.0'
  }
});

define([
  'physicsjs-full.min',
  'jquery'
], function( Physics, $ ){

  var processLevel = function(data, engine) {
    for(var i = 0; i < data.length; i++) {
      var p = data[i];
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
        engine.addItem(item);
      }
    }
  };

  return {
    processLevel: processLevel,
    loadLevel: function(levelname, engine, callback) {
      $.getJSON( "levels/" + levelname + ".json", function( data ) {
        processLevel(data, engine);
        callback();
      });
    }
  }
});
