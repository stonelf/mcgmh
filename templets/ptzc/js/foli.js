
function buddistEraCallback(o){
	s="佛历"+o.buddestEra+"年 &nbsp; "+o.lunar+" &nbsp; "+o.zangli
	document.getElementById("lunarSPAN").innerHTML=s;
	var d = new Date();
	d.setDate(d.getDate()+1);
	d.setHours(0);d.setMinutes(20);
	document.cookie="lunarString="+escape(s)+"; path=/; expires="+d.toGMTString();


}


function CalConv(){
	var m=document.cookie.match(/lunarString=([^;]*)(;|$)/);
	if(m && m.length>1 && m[1].length>0){
		document.write(unescape(m[1]));		
	}else{
		document.write("<span id='lunarSPAN'></span>");
		var url="http://www.kaangsi.net/zangli.php";
		var s=document.createElement("script");
		document.getElementsByTagName("head")[0].appendChild(s);
		s.src=url;
	}
}
