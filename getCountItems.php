<?php
include("data.php");
$result = array(
  'page' => $_POST['page'],
  'countItems' => count($items)
);
echo json_encode($result);
