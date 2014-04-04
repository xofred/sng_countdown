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
  $('#btn_continue').hide();
  $('#btn_pause').hide();
});

function getValue() {
  var x = document.getElementById('init').value;
  if (!x || isNaN(x) || x <= 0) {
    alert("请输入比赛人数");
    location.reload();
  }
  else {
    c_init = x * 100;
    c = c_init;
    $('#btn_start').hide();
    $('#btn_reload').show();
    $('#input_number').hide();
  }
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
  $('#btn_pause').show();
  $('#btn_continue').hide();
}

function stopCount() {
  clearTimeout(t);
  $('#btn_pause').hide();
  $('#btn_continue').show();
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
