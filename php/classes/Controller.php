<?php

/**
 * A class that controls the API.
 */

//Includes
include('Response.php');
include('ResponseError.php');

class Controller {

    // Private
    private $auth_key = '9C73815A3C9AA677B379EB69BDF19';

    public function authenticate($headers, $post, $url) {
        // Check if the sent key is correct
        if($headers['auth_key'] == $this->auth_key) {
            return $this->route($headers, $post, $url);
        } else {
            return new ResponseError("Authentication failed.");
        }
    }

    /**
     * Calls the CPP depending on the URL.
     * @param $data
     */
    public function route($headers, $data, $url) {
        $type = $url['type'];
        $resource = $url['resource'];

        if($type == 'get') {

            // All
            if($resource == 'all') {
                return $this->getAll();
            }

            // Settings
            if($resource == 'settings') {
                return $this->getSettings();
            }

            if($resource == 'events') {
                $from = $url['from'];
                $to = $url['to'];

                if(isset($from) && isset($to)) {
                    return $this->getEventsBetween($from, $to);
                } else {
                    return $this->getEvents();
                }
            }

            // User
            if($resource == 'user') {
                return $this->getUser();
            }

        } else if($type == 'set') {
            return new Response("You set something.");
        }

        return new ResponseError("Invalid API request.");
    }


    // Private functions

    /**
     *
     */
    private function getAll() {
        return new Response("Get all request");
    }

    /**
     *
     */
    private function getSettings() {
        $settings = array(
            "colours" => array (
                "colour_one" => "red",
                "colour_two" => "green",
                "colour_three" => "yellow"
            ),
            "labels" => array (
                "label_one" => "Meeting",
                "label_two" => "Assignment",
                "label_three" => "Event"
            )
        );

        return new Response($settings);
    }

    /**
     *
     */
    private function getEventsBetween($from, $to) {
        return new Response("Get events between $from and $to request");
    }

    /**
     *
     */
    private function getEvents() {
        return new Response("Get events request");
    }

    /**
     *
     */
    private function getUser() {
        return new Response("Get user request");
    }

}