<?php
include("data.php");
$limit = $_POST['options']['limit'];
$offset = $_POST['options']['offset'];

$html = '';
$html .= '<table class="table">';
$html .= "<tr><th>" . "№" . "</th><th>" . "Имя" . "</th><th>" . "Дата" . "</th></tr>";
    for ($i = $offset; $i < ($offset + $limit); $i++) {
        if (isset($items[$i]['name']))
            $html .= "<tr><td>" . $i . "</td><td>" . $items[$i]['name'] . "</td><td>" . date("Y-m-d H:i:s", strtotime($i . "month")) . "</td></tr>";
    };
$html .= '</table>';
echo $html;