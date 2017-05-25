<?php

/**
 * A class that represents a response.
 */

class Response {
    private $message;

    public function __toString() {
        return json_encode(array("status" => true, "message" => $this->message), JSON_PRETTY_PRINT);
    }

    public function __construct($message) {
        $this->message = $message;
    }
}

