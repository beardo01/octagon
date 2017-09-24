<?php

if(explode('.', $_SERVER['HTTP_HOST'])[0] == 'study') {
	header("Location: https://xd.adobe.com/view/25b66be6-d965-4bf2-9b82-227d563da70d/");
	die();
}

header("Location: http://simpalapps.com");
die();
?>
