<?php
//获取返回json，并解析成数组
$data = geturl("https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1");
//构建返回的json
$json['code'] = 1;
$json['copyright'] = $data['images'][0]['copyright'];
$json['images'] = 'https://www.bing.com'.$data['images'][0]['url'];
//输出json
//echo 'https://www.bing.com'.$data['images'][0]['url'];
exit(json_encode($json));

function geturl($url){
        $headerArray =array("Content-type:application/json;","Accept:application/json");
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch,CURLOPT_HTTPHEADER,$headerArray);
        $output = curl_exec($ch);
        curl_close($ch);
        $output = json_decode($output,true);
        return $output;
}
?>