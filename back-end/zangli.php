<?php
$today = getdate();
$strDate=$today['year'].'.'.$today['mon'].'.'.$today['mday'];

$kv = new SaeKV();
// 初始化KVClient对象
$ret = $kv->init();
var_dump($ret);

//$strZangli = getvalue($strDate);
//if($strZangli){
//    echo '<br>cache:'.$zangli;
//}else{
	$url = 'http://www.zhibeifw.com/wap/';
	$str = file_get_contents($url);
	//$str = readfile($url);

    $zangliRegex="/>(\d{4}\.\d{1,2}.\d{1,2})\s星期\S+\s藏(曆|历)([^<]*)</";
	if(preg_match($zangliRegex,$str,$result)){
    	$strZangli = $result[3];
    	if ($strDate == $result[1]){
            $ret = $kv->set('strZangli', $strZangli);
			var_dump($ret);		
            echo 'zangli_callback("藏历'.$strZangli.'")';
    	}else{
    		echo '<br>服务器时间和获取到的时间不一致！服务器时间：'.$strDate.'  获取到时间'.$result[1];
    	}
    }else{
    	echo '<br>没有获取到预期格式的字符串';
        echo $str;
    };
//}

?>


$kv = new SaeKV();
// 初始化KVClient对象
$ret = $kv->init();
var_dump($ret);

// 更新key-value
$ret = $kv->set('abc', 'aaaaaa');
var_dump($ret);

// 获得key-value
$ret = $kv->get('abc');
var_dump($ret);

// 删除key-value
$ret = $kv->delete('abc');
var_dump($ret);   

// 一次获取多个key-values
$keys = array();     
array_push($keys, 'abc1');
array_push($keys, 'abc2');
array_push($keys, 'abc3');
$ret = $kv->mget($keys); 
var_dump($ret);           

// 前缀范围查找key-values   
$ret = $kv->pkrget('abc', 3);
var_dump($ret);               

// 循环获取所有key-values       
$ret = $kv->pkrget('', 100);     
while (true) {                    
var_dump($ret);                       
end($ret);                                
$start_key = key($ret);
$i = count($ret);
if ($i < 100) break;
$ret = $kv->pkrget('', 100, $start_key);
}
?>
?>