<?php
  print_r($_POST);
  print_r($_GET);
  if($_GET['destination'] == "bamberg"){
    echo "hallo bamberg";
  }

  if(isset($_POST)){
    $myfile = fopen("data/data.txt", "w") or die("Unable to open file!");
    $txt = $_POST['destination'];
    fwrite($myfile, $txt);
    fclose($myfile);
  }

/*
  if(isset($_GET)){
    $myfile = fopen("data/data.txt", "w") or die("Unable to open file!");
    $txt = "asdasd\n";
    fwrite($myfile, $txt);
    fclose($myfile);
  }
*/

 ?>
