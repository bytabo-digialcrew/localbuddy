<?php
  print_r($_POST);
  print_r($_GET);

  if(isset($_GET)){
    $myfile = fopen("data/data.txt", "w") or die("Unable to open file!");
    $txt = $_GET['destination'];
    fwrite($myfile, $txt);
    fclose($myfile);
  }

 ?>
