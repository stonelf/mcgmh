// JavaScript Document
var cDay = new Array("日","一","二","三","四","五","六");
var lunarInfo=new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)
var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");

function lYearDays(y) {
var i, sum = 348
for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0
return(sum+leapDays(y))
}
function leapDays(y) {
if(leapMonth(y)) return((lunarInfo[y-1900] & 0x10000)? 30: 29)
else return(0)
}
function leapMonth(y) {
return(lunarInfo[y-1900] & 0xf)
}
function monthDays(y,m) {
return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 )
}
function Lunar(objDate) {

var i, leap=0, temp=0
var baseDate = new Date(1900,0,31)
var offset = (objDate - baseDate)/86400000

this.dayCyl = offset + 40
this.monCyl = 14

for(i=1900; i<2050 && offset>0; i++) {
temp = lYearDays(i)
offset -= temp
this.monCyl += 12
}

if(offset<0) {
offset += temp;
i--;
this.monCyl -= 12
}

this.year = i
this.yearCyl = i-1864

leap = leapMonth(i)
this.isLeap = false

for(i=1; i<13 && offset>0; i++) {
if(leap>0 && i==(leap+1) && this.isLeap==false)
{ --i; this.isLeap = true; temp = leapDays(this.year); }
else
{ temp = monthDays(this.year, i); }
if(this.isLeap==true && i==(leap+1)) this.isLeap = false

offset -= temp
if(this.isLeap == false) this.monCyl ++
}

if(offset==0 && leap>0 && i==leap+1)
if(this.isLeap)
{ this.isLeap = false; }
else
{ this.isLeap = true; --i; --this.monCyl;}

if(offset<0){ offset += temp; --i; --this.monCyl; }

this.month = i
this.day = offset + 1
this.byear = this.year + 544;
}
function cyclical(num) {
return(Gan[num%10]+Zhi[num%12])
}




  <!--输出日期 -->
function CalConv(){FIRSTYEAR=1998;LASTYEAR=2031;today=new Date();SolarYear=today.getFullYear();SolarMonth=today.getMonth()+1;SolarDate=today.getDate();Weekday=today.getDay();LunarCal=[new tagLunarCal(27,5,3,43,1,0,0,1,0,0,1,1,0,1,1,0,1),new tagLunarCal(46,0,4,48,1,0,0,1,0,0,1,0,1,1,1,0,1),new tagLunarCal(35,0,5,53,1,1,0,0,1,0,0,1,0,1,1,0,1),new tagLunarCal(23,4,0,59,1,1,0,1,0,1,0,0,1,0,1,0,1),new tagLunarCal(42,0,1,4,1,1,0,1,0,1,0,0,1,0,1,0,1),new tagLunarCal(31,0,2,9,1,1,0,1,1,0,1,0,0,1,0,1,0),new tagLunarCal(21,2,3,14,0,1,0,1,1,0,1,0,1,0,1,0,1),new tagLunarCal(39,0,5,20,0,1,0,1,0,1,1,0,1,0,1,0,1),new tagLunarCal(28,7,6,25,1,0,1,0,1,0,1,0,1,1,0,1,1),new tagLunarCal(48,0,0,30,0,0,1,0,0,1,0,1,1,1,0,1,1),new tagLunarCal(37,0,1,35,1,0,0,1,0,0,1,0,1,1,0,1,1),new tagLunarCal(25,5,3,41,1,1,0,0,1,0,0,1,0,1,0,1,1),new tagLunarCal(44,0,4,46,1,0,1,0,1,0,0,1,0,1,0,1,1),new tagLunarCal(33,0,5,51,1,0,1,1,0,1,0,0,1,0,1,0,1),new tagLunarCal(22,4,6,56,1,0,1,1,0,1,0,1,0,1,0,1,0),new tagLunarCal(40,0,1,2,1,0,1,1,0,1,0,1,0,1,0,1,0),new tagLunarCal(30,9,2,7,0,1,0,1,0,1,0,1,1,0,1,0,1),new tagLunarCal(49,0,3,12,0,1,0,0,1,0,1,1,1,0,1,0,1),new tagLunarCal(38,0,4,17,1,0,1,0,0,1,0,1,1,0,1,1,0),new tagLunarCal(27,6,6,23,0,1,0,1,0,0,1,0,1,0,1,1,1),new tagLunarCal(46,0,0,28,0,1,0,1,0,0,1,0,1,0,1,1,0),new tagLunarCal(35,0,1,33,0,1,1,0,1,0,0,1,0,0,1,1,0),new tagLunarCal(24,4,2,38,0,1,1,1,0,1,0,0,1,0,1,0,1),new tagLunarCal(42,0,4,44,0,1,1,0,1,0,1,0,1,0,1,0,1),new tagLunarCal(31,0,5,49,1,0,1,0,1,1,0,1,0,1,0,1,0),new tagLunarCal(21,2,6,54,0,1,0,1,0,1,0,1,1,0,1,0,1),new tagLunarCal(40,0,0,59,0,1,0,0,1,0,1,1,0,1,1,0,1),new tagLunarCal(28,6,2,5,1,0,1,0,0,1,0,1,0,1,1,1,0),new tagLunarCal(47,0,3,10,1,0,1,0,0,1,0,0,1,1,1,0,1),new tagLunarCal(36,0,4,15,1,1,0,1,0,0,1,0,0,1,1,0,1),new tagLunarCal(25,5,5,20,1,1,1,0,1,0,0,1,0,0,1,1,0),new tagLunarCal(43,0,0,26,1,1,0,1,0,1,0,1,0,0,1,0,1),new tagLunarCal(32,0,1,31,1,1,0,1,1,0,1,0,1,0,1,0,0),new tagLunarCal(22,3,2,36,0,1,1,0,1,0,1,1,0,1,0,1,0)];SolarCal=[31,28,31,30,31,30,31,31,30,31,30,31];SolarDays=[0,31,59,90,120,151,181,212,243,273,304,334,365,396,0,31,60,91,121,152,182,213,244,274,305,335,366,397];if(SolarYear<=FIRSTYEAR||SolarYear>LASTYEAR)return 1;sm=SolarMonth-1;if(sm<0||sm>11)return 2;leap=GetLeap(SolarYear);if(sm==1)d=leap+28;else d=SolarCal[sm];if(SolarDate<1||SolarDate>d)return 3;y=SolarYear-FIRSTYEAR;acc=SolarDays[leap*14+sm]+SolarDate;kc=acc+LunarCal[y].BaseKanChih;Kan=kc%10;Chih=kc%12;Age=kc%60;if(Age<22)Age=22-Age;else Age=82-Age;if(acc<=LunarCal[y].BaseDays){y--;LunarYear=SolarYear-1;leap=GetLeap(LunarYear);sm+=12;acc=SolarDays[leap*14+sm]+SolarDate;}else LunarYear=SolarYear;l1=LunarCal[y].BaseDays;for(i=0;i<13;i++){l2=l1+LunarCal[y].MonthDays[i]+29;if(acc<=l2)break;l1=l2;}LunarMonth=i+1;LunarDate=acc-l1;im=LunarCal[y].Intercalation;if(im!=0&&LunarMonth>im){LunarMonth--;if(LunarMonth==im)LunarMonth=-im;}if(LunarMonth>12)LunarMonth-=12;today=new Date();function initArray(){this.length=initArray.arguments.length;for(var i=0;i<this.length;i++)this[i+1]=initArray.arguments[i]}var d=new initArray("星期日","星期一","星期二","星期三","星期四","星期五","星期六");document.write();months=["一","二","三","四","五","六","七","八","九","十","十一","十二"];days=["初一","初二","初三","初四","初五","初六","初七","初八","初九","初十","十一","十二","十三","十四","十五","十六","十七","十八","十九","二十","廿一","廿二","廿三","廿四","廿五","廿六","廿七","廿八","廿九","三十"];document.write("&nbsp;农历"+months[LunarMonth-1]+"月"+days[LunarDate-1]+"");return 0;}function GetLeap(year){if(year%400==0)return 1;else if(year%100==0)return 0;else if(year%4==0)return 1;else return 0;}function tagLunarCal(d,i,w,k,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13){this.BaseDays=d;this.Intercalation=i;this.BaseWeekday=w;this.BaseKanChih=k;this.MonthDays=[m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13];}
