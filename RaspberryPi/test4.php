<?php
include 'connection.php';
$sql="INSERT INTO `on_connect`(`cellphoneNAME`, `MAC`) VALUES ('10.3.141.56' ,'a0:d7:95:15:6a:73')";
if($con->query($sql)===TRUE){
echo 'OK';
}
else {
echo "NO";
}
?>
