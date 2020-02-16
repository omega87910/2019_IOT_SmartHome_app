<?php
    include 'connection.php';
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    $result=mysqli_query($con,"UPDATE Homemode_state SET `state`='0'");
    echo $result;
 mysqli_close($con);
?>
