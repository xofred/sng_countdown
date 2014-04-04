var c, c_init, t, min, round, sec;

c = 1;

round = 1;

$(document).ready(function (){
  $('#txt').hide();
  $('#audio1').hide();
  $('tr').hide();
  $('.warning').show();
  $('body').css("background-color", "black");
  $('body').css("color", "white");
  $('.warning').css("color", "black")
  $('table').css("font-size","large");
  $('#min').hide();
  $('#sec').hide();
  $('#btn_reload').hide();
});

function getValue() {
  c_init = (document.getElementById('init').value) * 100;
  c = c_init;
  $('#btn_start').hide();
  $('#btn_reload').show();
}

function timedCount() {
  if (c > 0) {
    c -= 1;
    min = Math.floor(c / 60);
    sec = c - min * 60;
    $(".highLight tr:eq(" + round + ")").show();
    $(".highLight tr:eq(" + round + ")").css("color", "red");
    document.getElementById('txt').value = c;
    document.getElementById('min').value = min;
    document.getElementById('sec').value = sec;
    $('#timeleft').html("当前级别剩余" + c + "秒,\n" + min + ":" + sec);
    $('#chips').html("每人" + Math.round(9000 / document.getElementById('init').value) + "筹码");
    t = setTimeout("timedCount()", 1000);
  } else {
    stopCount();
    EvalSound('audio1');
    alert("是时候升级盲注了！");
    nextRound();
  }
  $('#btn_reload').click(function() {
    location.reload();
  });
}

function stopCount() {
  clearTimeout(t);
}

function nextRound() {
  if (round < 17) {
    //$('p').toggle('slow');
    $(".highLight tr:eq(" + round + ")").hide();
    round += 1;
    getValue();
    timedCount();
  } 
}

function EvalSound(soundobj) {
  var thissound=document.getElementById(soundobj);
  thissound.play();
}
