<?php
	require_once('../../inc/config/constants.php');
	require_once('../../inc/config/db.php');

	// Execute the script if the POST request is submitted
	if(isset($_POST['injectionDetailsInjectionID'])){
		
		$injectionID = htmlentities($_POST['injectionDetailsInjectionID']);
		
		$injectionDetailsSql = 'SELECT * FROM injection WHERE injectionID = :injectionID';
		$injectionDetailsStatement = $conn->prepare($injectionDetailsSql);
		$injectionDetailsStatement->execute(['injectionID' => $injectionID]);
		
		// If data is found for the given injectionID, return it as a json object
		if($injectionDetailsStatement->rowCount() > 0) {
			$row = $injectionDetailsStatement->fetch(PDO::FETCH_ASSOC);
			echo json_encode($row);
		}
		$injectionDetailsStatement->closeCursor();
	}
?>