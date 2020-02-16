<?php
    include 'connection.php';
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $result=mysqli_query($con,"UPDATE RGB_state SET RGB_state='yellow'");
    if($result===true){
        echo json_decode("OK");
    }
 mysqli_close($con);
?>
