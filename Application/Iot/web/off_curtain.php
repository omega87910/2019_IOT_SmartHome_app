<?php
    include 'connection.php';
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);

    $result=mysqli_query($con,"UPDATE curtain_state SET curtain_state='0'");
// ---------------------
// while($obj = mysqli_fetch_object($result)){
//     print ($obj->light_boolean);
//  }
// echo json_encode($row);
 mysqli_close($con);
?>
