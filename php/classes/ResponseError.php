<?php

/**
 * A class that represents an error.
 */

class ResponseError {
    private $message;

    public function __toString() {
        return json_encode(array("status" => false, "message" => $this->message), JSON_PRETTY_PRINT);
    }

    public function __construct($message) {
        $this->message = $message;
    }
}