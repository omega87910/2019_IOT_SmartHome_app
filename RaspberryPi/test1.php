<?php
$command='ip neigh show dev wlan0';
$output=shell_exec($command);
//echo $output;

//echo'<br>-------------- <br>';
$temp=str_replace(PHP_EOL,'',$output);
//echo'<br>-------<br>';
$temp2= str_replace(' ','',$temp);
//echo '<br>-------<br>';
//echo str_replace('lladdr',' ',$temp2);

$temp3=str_replace('lladdr',' ',$temp2);

//echo '<br>------------------<br>';
$temp4=str_replace('STALE',' ',$temp3);
$temp5=str_replace('DELAY',' ',$temp4);
$temp6=str_replace('reachable',' ',$temp5);
$temp7=str_replace('PROBE',' ',$temp6);
$temp8=str_replace('INCOMPLETE',' ',$temp7);

$split=explode(' ',$temp8);

$cat=array();
for ($i=0;$i<count($split)-1;$i++){
array_push($cat,$split[$i]);
}
print_r($cat);


?>
