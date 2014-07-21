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
  $('#btn_final').hide();

  $('#btn_reload').click(function() {
    if (confirm("确定重新开局吗？")) {
      location.reload();
    }
  });

  $('#btn_final').click(function() {
    if (confirm("确定开始单挑（时间减半）吗？")) {
      c = Math.round(c / 2);
      $('#btn_final').remove();
    }
  }); 
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
    if !$('#btn_final') {
      c = Math.round(c / 2);
    }
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

  $('#btn_pause').show();
  $('#btn_continue').hide();
  if ($('btn_final')) {
    $('#btn_final').show();
  }
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
  else alert("平局！？");
}

function EvalSound(soundobj) {
  var thissound=document.getElementById(soundobj);
  thissound.play();
}
