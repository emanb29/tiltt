$(document).ready(function () {
  var isMobile = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/);

  if (!location.hash){
    var pid = Math.random();
    pid = Math.ceil(pid*10000);
    location.replace(location.href+'#'+pid);
  }

  if (isMobile){
    $('.mobile').show();
    $('.comp').hide();
  } else {
    $('.mobile').hide();
    $('.comp').show();
  }

  var idlbl = $('<h1></h1>')
    .html(location.hash)
    .appendTo($('#sid'));

  $('body').append('isMobile: '+(isMobile ? 'true' : 'false'));

  if (isMobile){
    $('#num').change(function() {
      disp({sid: location.hash.substr(1, location.hash.length-1), update: '0'});
    });
    window.addEventListener('deviceorientation', function (e) {
      // gamma is the left-to-right tilt in degrees, where right is positive
      var tiltLR = Math.round(e.gamma);

      // beta is the front-to-back tilt in degrees, where front is positive
      var tiltFB = Math.round(e.beta);

      // alpha is the compass direction the device is facing in degrees
      var dir = Math.round(e.alpha);

      dat ={x: tiltFB, y: tiltLR, z: dir, sid: location.hash.substr(1, location.hash.length-1), update: 1};
      disp(dat);
      $('#x').html(dat.x.toString());
      $('#y').html(dat.y.toString());
      $('#z').html(dat.z.toString());
    });
  } else{
    setInterval(function () {
      disp({sid: location.hash.substr(1, location.hash.length-1), update: 0});
    }, 10);
  }


  function disp(dat) {
    $.get('serv.php', dat , function(data){
      var res = $.parseJSON(data);
      $('#x').html(res.x.toString());
      $('#y').html(res.y.toString());
      $('#z').html(res.z.toString());
    });
  }
});