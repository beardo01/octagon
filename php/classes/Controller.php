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
    private $cpp = '/var/www/cpp/./driver';


    /**
     * @param $headers
     * @param $post
     * @param $url
     * @return Response|ResponseError
     */
    public function authenticate($headers, $post, $url) {
        // Check if the sent key is correct
        if($headers['auth_key'] == $this->auth_key) {
            return $this->route($headers, $post, $url);
        } else {
            return new Response(false, "Server authentication failed.");
        }
    }

    /**
     * Calls the CPP depending on the URL.
     * @param $data
     * @return Response if valid, otherwise ResponseError.
     */
    public function route($headers, $post, $url) {
        $type = $url['type'];
        $resource = $url['resource'];

        if($resource == 'user') {
            // Create
            if($type == 'create') {
                return $this->createUser($post);
            }

            // Get
            if($type == 'get') {
                return $this->getUser($post);
            }
        } else {
            // Check client key is set
            $client_key = escapeshellarg($headers['client_key']);

            if(isset($client_key)) {
                if($type == 'create') {
                    // Event
                    if($resource == 'event') {
                        return $this->createEvent($client_key, $post);
                    }

                } else if($type == 'get') {

                    // All
                    if($resource == 'all') {
                        return $this->getAll($client_key);
                    }

                    // Settings
                    if($resource == 'settings') {
                        return $this->getSettings($client_key);
                    }

                    // Events
                    if($resource == 'events') {
                        return $this->getEvents($client_key, $post);
                    }

                } else if($type == 'set') {

                    // Colours
                    if($resource == 'colours') {
                        return $this->setColours($client_key, $post);
                    }

                    // Labels
                    if($resource == 'labels') {
                        return $this->setLabels($client_key, $post);
                    }

                    // User
                    if($resource == 'user') {
                        return $this->setUser($client_key, $post);
                    }

                    // Event
                    if($resource == 'event') {
                        return $this->setEvent($client_key, $post);
                    }
                } else if($type == 'delete') {

                    // Event
                    if($resource == 'event') {
                        return $this->deleteEvent($client_key, $post);
                    }
                    
                }
            } else {
                return new Response(false, "Client authentication error. No key sent.");
            }
        }

        return new Response(false, "Invalid API request.");
    }

    /**
     * Create
     */

    /**
     * @param $headers
     * @param $post
     * @return Response
     */
    private function createUser($post) {
        // Get user credentials
        $username   = escapeshellarg($post['username']);
        $password   = escapeshellarg($post['password']);
        $rpassword  = escapeshellarg($post['rpassword']);
        $email      = escapeshellarg($post['email']);
        $ip         = escapeshellarg($post['ip']);

        // Call CPP to execute command
        $command = "$this->cpp create user $username $email $password $rpassword $ip 2>&1";
        $response = json_decode(shell_exec($command), true);

        // Return CPP
        return new Response($response['success'], $response['data']);
    }

    private function createEvent($client_key, $post) {
        // Get event data
        $type = escapeshellarg($post['type']);
        $description = escapeshellarg($post['description']);
        $location = escapeshellarg($post['location']);
        $start = escapeshellarg($post['start']);
        $end = escapeshellarg($post['end']);

        // Call CPP to execute command
        $command = "$this->cpp create event $client_key $type $description $location $start $end 2>&1";
        $response = json_decode(shell_exec($command), true);

        // Return CPP
        return new Response($response['success'], $response['data']);
    }

    /**
     * Get
     */

    /**
     * @param $headers
     * @return Response
     */
    private function getSettings($client_key) {
        // Call CPP to execute command
        $command = "$this->cpp get settings $client_key 2>&1";
        $response = json_decode(shell_exec($command), true);

        // Return CPP
        return new Response($response['success'], $response['data']);
    }

    /**
     * @param $headers
     * @param $from
     * @param $to
     * @return Response
     */
    private function getEvents($client_key, $post) {
        // Get event data
        $from = escapeshellarg($post['from']);

        // Call CPP to execute command
        $command = "$this->cpp get events $client_key $from 2>&1";
        $response = json_decode(shell_exec($command), true);

        // Return CPP
        return new Response($response['success'], $response['data']);
    }

    /**
     * @param $post
     * @return Response
     */
    private function getUser($post) {
        // Get user credentials
        $identifier = escapeshellarg($post['id']);
        $password = escapeshellarg($post['password']);
        $ip = escapeshellarg($post['ip']);

        // Call CPP to execute command
        $command = "$this->cpp get user $identifier $password $ip 2>&1";
        $response = json_decode(shell_exec($command), true);

        // Return CPP
        return new Response($response['success'], $response['data']);
    }

    /**
     * Set
     */
    private function setColours($client_key, $post) {
        // Get colours
        $colour_one = escapeshellarg($post['colour_one']);
        $colour_two = escapeshellarg($post['colour_two']);
        $colour_three = escapeshellarg($post['colour_three']);

        // Call CPP to execute command
        $command = "$this->cpp set colours $client_key $colour_one $colour_two $colour_three 2>&1";
        $response = json_decode(shell_exec($command), true);

        // Return CPP
        return new Response($response['success'], $response['data']);
    }

    private function setLabels($client_key, $post) {
        // Get labels
        $label_one = escapeshellarg($post['label_one']);
        $label_two = escapeshellarg($post['label_two']);
        $label_three = escapeshellarg($post['label_three']);

        // Call CPP to execute command
        $command = "$this->cpp set labels $client_key $label_one $label_two $label_three 2>&1";
        $response = shell_exec($command);
        $response = json_decode($response, true);

        // Return CPP
        return new Response($response['success'], $response['data']);
    }

    private function setEvent($client_key, $post) {
        return new Response(true, "Set event");
    }

    private function setUser($client_key, $post) {
        return new Response(true, "Set user");
    }

    // Delete
    private function deleteEvent($client_key, $post) {
        // Get event ID
        $event_id = escapeshellarg($post['event_id']);


        // Call CPP to execute command
        $command = "$this->cpp delete event $client_key $event_id 2>&1";
        $response = json_decode(shell_exec($command), true);

        // Return CPP
        return new Response($response['success'], $response['data']);
    }
}
