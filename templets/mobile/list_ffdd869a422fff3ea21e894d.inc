<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!doctype html>
<html class="no-js">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php if (empty($seotitle)){echo $typename;}else{echo $seotitle;}?></title>
  <meta name="description" content="<?php echo $description;?>">
  <meta name="keywords" content="<?php echo $keywords;?>">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <meta name="renderer" content="webkit">
  <meta http-equiv="Cache-Control" content="no-siteapp" />
  <link rel="icon" type="image/png" href="<?php echo $hostName; ?>/assets/i/favicon.png">
  <link rel="stylesheet" href="<?php echo $hostName; ?>/assets/css/amazeui.min.css">
  
  <style type="text/css">
  .am-g > a{
    max-height:100%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;
  }
  </style>
</head>
<body>
<!-- Header -->
<header data-am-widget="header" class="am-header am-header-default">
  <h1 class="am-header-title">
    <?php echo $typename;?>
  </h1>
</header>

<!-- Menu -->
<nav data-am-widget="menu" class="am-menu  am-menu-offcanvas1" data-am-menu-offcanvas>
  <a href="javascript: void(0)" class="am-menu-toggle">
    <i class="am-menu-toggle-icon am-icon-bars"></i>
  </a>
  <div class="am-offcanvas">
    <div class="am-offcanvas-bar">
      <ul class="am-menu-nav sm-block-grid-1">
        <?php echo $channellist; ?>
      </ul>
    </div>
  </div>
</nav>

<!-- 二级栏目 -->
<?php if (!empty($channellistnext)): ?>
<ul class="am-nav am-nav-pills">
  <?php echo $channellistnext; ?>
</ul>
<?php endif; ?>
<!-- List -->
<div data-am-widget="list_news" class="am-list-news am-list-news-default">
  <!--列表标题-->
  <div class="am-list-news-hd am-cf">
    <!--带更多链接-->
      <h2><?php echo $typename; ?></h2>
  </div>
  <div class="am-list-news-bd">
    <ul class="am-list">
      <?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
      <li class="am-g">
        <a href="<?php echo $hostName?>/article/<?php echo $fields['id']; ?>.html" class="am-list-item-hd"><?php echo ConvertStr($fields['title']); ?></a>
      </li>
      <?php
}
}?>
    </ul>
  </div>
  
</div>
<ul class="am-pagination am-pagination-centered">
<?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listsize'] = '2';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>

</ul>

<?php include($cfg_templets_dir."/mobile/footer.htm"); ?>
<script src="<?php echo $hostName; ?>/assets/js/jquery.min.js"></script>
<script src="<?php echo $hostName; ?>/assets/js/amazeui.min.js"></script>
</body>
</html>