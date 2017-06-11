<?php

/**
 * A class that represents a response.
 */

class Response {
    private $success;
    private $data;

    public function __toString() {
        return json_encode(array("success" => $this->success, "data" => $this->data), JSON_PRETTY_PRINT);
    }

    public function __construct($success, $data) {
        $this->success = $success;
        $this->data = $data;
    }
}