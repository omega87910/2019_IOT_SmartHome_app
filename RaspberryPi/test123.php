<?php
include 'connection.php';

$result=mysqli_query($con,"select * from on_connect except select * from unlock_cellphone");
$num_rows=mysqli_num_rows($result);
$temp_array=array();
if($num_rows>0){
	while($row=mysqli_fetch_assoc($result)){
	$temp_array[]=$row;
	}
}
echo json_encode(array("data"=>$temp_array));

?>
