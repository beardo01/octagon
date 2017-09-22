<?php

/**
 * Backend API for COSC345 project.
 *
 * This API takes AJAX requests from the frontend (built using Ionic), authenticates the key and performs actions by
 * passing data to the CPP driver accordingly.
 *
 * Technology stack
 *
 * Ionic Framework
 *   |
 *   v
 * driver.php
 *   |
 *   v
 * driver.cpp
 *
 * Group Members
 * Oliver Reid
 * Charlie Rawstorn
 * Thomas Youngson
 */

// Allow access to Ionic
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization, auth_key, client_key');
header('Content-Type: application/json');

// Controller
include("classes/Controller.php");

// Create the controller object
$controller = new Controller();

// Authenticate the incoming request and give response
$http_headers = getallheaders();
$post_data = json_decode(file_get_contents("php://input"), true);
$url = $_GET;

$response = $controller->authenticate($http_headers, $post_data, $url);

echo $response;