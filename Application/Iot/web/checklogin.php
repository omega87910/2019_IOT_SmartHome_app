<?php
include 'connection.php';
$con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
$json = file_get_contents('php://input');
$obj = json_decode($json,true);
$id = $obj['id'];
$password = $obj['password'];

$Sql_Query = "select * from member where USER = '$id' and pwd = '$password'";
$result = mysqli_query($con, $Sql_Query);
if($result->num_rows>0){
    while($row[]=$result->fetch_assoc()){
        $temp=$row;
    }
    echo json_encode(array("data"=>$temp));
}
else{
    $InvalidMSG='Wrong';
    $InvalidMSGJSon = json_encode($InvalidMSG);
    echo $InvalidMSGJSon ;
}
mysqli_close($con);
?>