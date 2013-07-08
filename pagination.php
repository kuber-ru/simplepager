<?php
    $page = $_GET['page'];
   
    $result = array(
        'page' => $page,
        'countPages' => 58
    );
    echo json_encode($result);
?>