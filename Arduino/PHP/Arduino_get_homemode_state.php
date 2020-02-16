<?php
    include 'connection.php';
    $device = $_REQUEST['device'];
    $result=mysqli_query($con,"SELECT * FROM $device WHERE 1");
    $number_of_rows = mysqli_num_rows($result);
    while($row = mysqli_fetch_array($result)){
        echo $row["state"];
    }
?>