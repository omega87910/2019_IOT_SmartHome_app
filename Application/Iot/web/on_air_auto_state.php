<?php
    include 'connection.php';
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $result=mysqli_query($con,"UPDATE air_auto_state SET air_auto_state='1'");

 mysqli_close($con);
?>
