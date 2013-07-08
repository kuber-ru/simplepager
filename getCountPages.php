<?php
include("data.php");
$page = $_POST['page'];

$result = array(
  'page' => $page,
  'countItems' => count($items)
);
echo json_encode($result);
