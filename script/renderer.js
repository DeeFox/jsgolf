define([
  'physicsjs-full.min'
], function( Physics ){
  var renderer;
  return {
    getRenderer: function() {
      renderer = Physics.renderer('canvas', {
        el: 'golfcanvas',
        width: 1000,
        height: 600,
        meta: false,
        autoResize: false,
        styles: {
            'circle' : {
                fillStyle: 'hsla(60, 37%, 57%, 0.8)',
                angleIndicator: 'hsla(60, 37%, 17%, 0.4)'
            }
        }
      });
      return renderer;
    }
  }
});
