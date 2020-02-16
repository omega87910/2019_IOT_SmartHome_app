<?php
    include 'connection.php';
    $json = file_get_contents('php://input');
    $obj = json_decode($json,true);


    $password = $obj['new_password'];
    $sql= "UPDATE member SET pwd = '$password'";

    if ($con->query($sql) === TRUE ){
        echo json_encode("success");
    } else {
        echo json_encode("Error");
        echo "Error: " . $sql . "<br>" . $con->error;
    }
?>
