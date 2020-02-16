<?php
    include 'connection.php';
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);
    $airstate = $obj['air_state'];   
    $result=mysqli_query($con,"SELECT * FROM air_state");
    $number_of_rows = mysqli_num_rows($result);
     
    $temp_array  = array();
     
    if($number_of_rows > 0) {
        while ($row = mysqli_fetch_assoc($result)) {
            $temp_array[] = $row;

        }
    }
  echo json_encode(array("data"=>$temp_array));
?>
