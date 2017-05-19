var animatePoints = function() {
        
  var points = document.getElementsByClassName('point');
  
  var revealPoint = function(points) {
    for(i = 0; i <= points.length - 1; i++) {
      points[i].style.opacity = 1;
      points[i].style.transform = "scaleX(1) translateY(0)";
      points[i].style.msTransform = "scaleX(1) translateY(0)";
      points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    }
  };
  
  revealPoint(points);
 
};