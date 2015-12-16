<!--

var aid = new Array();
var channel = new Array();

function CheckAll(form){
    aid = new Array();
    channel = new Array();
	for (var i = 0; i < form.elements.length; i++){
		if (form.elements[i].type == "checkbox" && !form.elements[i].disabled){
			form.elements[i].checked = true;
		};
	};
	return true;
};
function CheckTurn(form){
    aid = new Array();
    channel = new Array();
	for (var i = 0; i < form.elements.length; i++){
		if (form.elements[i].type == "checkbox" && !form.elements[i].disabled){
			if (form.elements[i].checked){
				form.elements[i].checked = false;
			}else{
				form.elements[i].checked = true;
			};
		};
	};
	return true;
};
function CheckRun(form){
    aid = new Array();
    channel = new Array();
    for (var i = 0; i< form.elements.length; i++){
        if (form.elements[i].type == "checkbox" && !form.elements[i].disabled && form.elements[i].checked && form.elements[i].value != "" && form.elements[i].value.search(/,/)){
            aid.push(form.elements[i].value.split(",")[0]);
		    channel.push(form.elements[i].value.split(",")[1]);
        }
    }
    if(aid.length == 0){
        alert("请勾选您要播放的歌曲");
        return false;
    }
    //aid = aid.reverse();
    aid = aid.toString();
    var newWindow = window.open ('/player.php?song_id=' + aid + '&channel=' + channel[0], 'dedemusicwindow', 'height=534, width=684, left=0, top=0,');
    return true;
};

function OnRun(aid, channel){
    var newWindow = window.open ('/player.php?song_id=' + aid + '&channel=' + channel, 'dedeonemusicwindow', 'height=534, width=374, left=0, top=0,');
    return true;
};

//-->