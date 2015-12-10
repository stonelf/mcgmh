function setTab(name,cursel,n){ 
for(i=1;i<=n;i++){ 
var menu=document.getElementById(name+i); 
var con=document.getElementById("tab_"+name+"_"+i); 
menu.className=i==cursel?"current":""; 
con.style.display=i==cursel?"block":"none"; 
} 
}

 var ont_idname = new Array("ont")

 var tab_ont__idname = new Array("tab_ont_")

 var tabcount = new Array("6")

 var loadtabs = new Array("1") 

 var autochangemenu = 1;

 var changespeed = 5;

 var stoponhover = 0;

 function easytabs(menunr, active) {if (menunr == autochangemenu){currenttab=active;}if ((menunr == autochangemenu)&&(stoponhover==1)) {stop_autochange()} else if ((menunr == autochangemenu)&&(stoponhover==0)) {counter=0;}menunr = menunr-1;for (i=1; i <= tabcount[menunr]; i++){document.getElementById(ont_idname[menunr]+i).className='tab'+i;document.getElementById(tab_ont__idname[menunr]+i).style.display = 'none';}document.getElementById(ont_idname[menunr]+active).className='tab'+active+' tabactive';document.getElementById(tab_ont__idname[menunr]+active).style.display = 'block';}var timer; counter=0; var totaltabs=tabcount[autochangemenu-1];var currenttab=loadtabs[autochangemenu-1];function start_autochange(){counter=counter+1;timer=setTimeout("start_autochange()",1000);if (counter == changespeed+1) {currenttab++;if (currenttab>totaltabs) {currenttab=1}easytabs(autochangemenu,currenttab);restart_autochange();}}function restart_autochange(){clearTimeout(timer);counter=0;start_autochange();}function stop_autochange(){clearTimeout(timer);counter=0;}

window.onload=function(){
 var menucount=loadtabs.length; var a = 0; var b = 1; do {easytabs(b, loadtabs[a]); a++; b++;}while (b<=menucount);
 if (autochangemenu!=0){start_autochange();}
 }
