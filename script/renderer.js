define([
  'physicsjs-full.min'
], function( Physics ){
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
  return {
    getRenderer: function() {
      return renderer;
    }
  }
});
