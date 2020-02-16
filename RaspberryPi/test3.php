<?php
include 'connection.php';
$command = 'ip neigh show dev wlan0';

$output = shell_exec($command);

//echo $output;

//echo'<br>-------------- <br>';

$temp = str_replace(PHP_EOL, '', $output);

//echo'<br>-------<br>';

$temp2 = str_replace(' ', '', $temp);

//echo '<br>-------<br>';
$temp3 = str_replace('lladdr', ' ', $temp2);
$temp4 = str_replace('STALE', ' ', $temp3);
$temp5 = str_replace('DELAY', ' ', $temp4);
$temp6 = str_replace('reachable', ' ', $temp5);
$temp7 = str_replace('PROBE', ' ', $temp6);
$temp8 = str_replace('INCOMPLETE', ' ', $temp7);
$split = explode(' ', $temp8);
$cat = array();
mysqli_query($con,"TRUNCATE TABLE on_connect");
for ($i = 0; $i < count($split) - 1; $i++) {

    array_push($cat, $split[$i]);
}
for ($j=0;$j<count($cat)-2;$j++){
	$A=$cat[2*$j];
	$B=$cat[2*$j+1];
	$sql="insert into on_connect set cellphoneNAME='$A',MAC='$B'";
	if($con->query($sql)===true){
		//echo 'ok';
	}
}
echo json_encode('OK');
?>
