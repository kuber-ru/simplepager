<?php

$page = $_POST['page'];

include("data.php");

function getItems() {
    
}

switch ($_POST['method']) {
    case "getCountPages":
        $result = array(
            'page' => $page,
            'countPages' => count($items)
        );
        echo json_encode($result);
        break;
    case "getItems":
        $per_page = $_POST['options']['per_page'];
        $page = $_POST['options']['page'] - 1;

        $html = '';
        $html .= '<table class="table">';
        $html .= "<tr><th>" ."№". "</th><th>" . "Имя" . "</th><th>" . "Дата" . "</th></tr>";
        for ($i = $page * $per_page; $i < (($page + 1) * $per_page); $i++) {
            if (isset($items[$i]['name']))
                $html .= "<tr><td>".$i ."</td><td>" . $items[$i]['name'] . "</td><td>" . date("Y-m-d H:i:s", strtotime($i . "month")) . "</td></tr>";
        };
        $html .= '</table>';
        echo $html;
        break;
}