<?php

/**
 * A class that represents an error.
 */

class ResponseError {
    private $data;

    public function __toString() {
        return json_encode(array("success" => false, "data" => $this->data), JSON_PRETTY_PRINT);
    }

    public function __construct($data) {
        $this->data = $data;
    }
}