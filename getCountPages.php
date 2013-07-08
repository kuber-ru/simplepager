<?php
include("data.php");
$page = $_POST['page'];

$result = array(
  'page' => $page,
  'countPages' => count($items)
);
echo json_encode($result);
