<?php
/*  print_r($_POST);
  print_r($_GET);
  if($_GET['destination'] == "bamberg"){
    echo "hallo bamberg";
  }*/

    $txt = file_get_contents("data/data.txt");

  echo "{\n";
  echo '"State":"' . trim($txt) . '"' . "\n";

  echo "}";


 ?>
