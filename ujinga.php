<?php

$ujinga = new stdClass();

$ujinga->config = new stdClass();
$ujinga->config->baseUrl = "http://localhost/ujinga/";
$ujinga->config->defaultJsUrl = $ujinga->config->baseUrl . "assets/ujinga/default.js";

$ujinga->routes = new stdClass();
$ujinga->routes->default = new stdClass();
$ujinga->routes->default->scriptUrl = "assets/ujinga/default.js";
$ujinga->routes->default->path = "dashboard";


$ujinga->routes->fourZeroFour = new stdClass();
$ujinga->routes->fourZeroFour->scriptUrl = "assets/ujinga/fourZeroFour.js";
$ujinga->routes->default->path = "404";

//echo '<pre>';
//print_r($ujinga);
//echo '</pre>';

echo json_encode($ujinga, JSON_PRETTY_PRINT);

?>