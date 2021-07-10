<?php
	require_once('../../inc/config/constants.php');
	require_once('../../inc/config/db.php');
	
	if(isset($_POST['injectionDetailsItemNumber'])){
		
		$itemNumber = htmlentities($_POST['injectionDetailsItemNumber']);
		$itemName = htmlentities($_POST['injectionDetailsItemName']);
		$quantity = htmlentities($_POST['injectionDetailsQuantity']);
		$unitPrice = htmlentities($_POST['injectionDetailsUnitPrice']);
		$patientsID = htmlentities($_POST['injectionDetailsPatientsID']);
		$patientsName = htmlentities($_POST['injectionDetailsPatientsName']);
		$injectionDate = htmlentities($_POST['injectionDetailsInjectionDate']);
		
		// Check if mandatory fields are not empty
		if(!empty($itemNumber) && isset($patientsID) && isset($injectionDate) && isset($quantity) && isset($unitPrice)){
			
			// Sanitize item number
			$itemNumber = filter_var($itemNumber, FILTER_SANITIZE_STRING);
			
			// Validate item quantity. It has to be a number
			if(filter_var($quantity, FILTER_VALIDATE_INT) === 0 || filter_var($quantity, FILTER_VALIDATE_INT)){
				// Valid quantity
			} else {
				// Quantity is not a valid number
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a valid number for quantity</div>';
				exit();
			}
			
			// Check if patientsID is empty
			if($patientsID == ''){ 
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a Patients ID.</div>';
				exit();
			}
			
			// Validate patientsID
			if(filter_var($patientsID, FILTER_VALIDATE_INT) === 0 || filter_var($patientsID, FILTER_VALIDATE_INT)){
				// Valid patientsID
			} else {
				// patientsID is not a valid number
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a valid patients ID</div>';
				exit();
			}
			
			// Check if itemNumber is empty
			if($itemNumber == ''){ 
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter Item Number.</div>';
				exit();
			}
			
			// Check if unit price is empty
			if($unitPrice == ''){ 
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter Unit Price.</div>';
				exit();
			}
			
			// Validate unit price. It has to be a number or floating point value
			if(filter_var($unitPrice, FILTER_VALIDATE_FLOAT) === 0.0 || filter_var($unitPrice, FILTER_VALIDATE_FLOAT)){
				// Valid float (unit price)
			} else {
				// Unit price is not a valid number
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a valid number for unit price</div>';
				exit();
			}
			
			
			// Calculate the stock values
			$stockSql = 'SELECT stock FROM item WHERE itemNumber = :itemNumber';
			$stockStatement = $conn->prepare($stockSql);
			$stockStatement->execute(['itemNumber' => $itemNumber]);
			if($stockStatement->rowCount() > 0){
				// Item exits in DB, therefore, can proceed to a injection
				$row = $stockStatement->fetch(PDO::FETCH_ASSOC);
				$currentQuantityInItemsTable = $row['stock'];
				
				if($currentQuantityInItemsTable <= 0) {
					// If currentQuantityInItemsTable is <= 0, stock is empty! that means we can't make a sell. Hence abort.
					echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Stock is empty. Therefore, can\'t make a injection. Please select a different item.</div>';
					exit();
				} elseif ($currentQuantityInItemsTable < $quantity) {
					// Requested injection quantity is higher than available item quantity. Hence abort 
					echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Not enough stock available for this injection. Therefore, can\'t make a injection. Please select a different item.</div>';
					exit();
				}
				else {
					// Has at least 1 or more in stock, hence proceed to next steps
					$newQuantity = $currentQuantityInItemsTable - $quantity;
					
					// Check if the patients is in DB
					$patientsSql = 'SELECT * FROM patients WHERE patientsID = :patientsID';
					$patientsStatement = $conn->prepare($patientsSql);
					$patientsStatement->execute(['patientsID' => $patientsID]);
					
					if($patientsStatement->rowCount() > 0){
						// patients exits. That means both patients, item, and stocks are available. Hence start INSERT and UPDATE
						$patientsRow = $patientsStatement->fetch(PDO::FETCH_ASSOC);
						$patientsName = $patientsRow['fullName'];
						
						// INSERT data to injection table
						$insertInjectionSql = 'INSERT INTO injection(itemNumber, itemName, quantity, unitPrice, patientsID, patientsName, injectionDate) VALUES(:itemNumber, :itemName, :quantity, :unitPrice, :patientsID, :patientsName, :injectionDate)';
						$insertInjectionStatement = $conn->prepare($insertInjectionSql);
						$insertInjectionStatement->execute(['itemNumber' => $itemNumber, 'itemName' => $itemName, 'quantity' => $quantity, 'unitPrice' => $unitPrice, 'patientsID' => $patientsID, 'patientsName' => $patientsName, 'injectionDate' => $injectionDate]);
						
						// UPDATE the stock in item table
						$stockUpdateSql = 'UPDATE item SET stock = :stock WHERE itemNumber = :itemNumber';
						$stockUpdateStatement = $conn->prepare($stockUpdateSql);
						$stockUpdateStatement->execute(['stock' => $newQuantity, 'itemNumber' => $itemNumber]);
						
						echo '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>Injection details added to DB and stocks updated.</div>';
						exit();
						
					} else {
						echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Patients does not exist.</div>';
						exit();
					}
				}
				
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Item already exists in DB. Please click the <strong>Update</strong> button to update the details. Or use a different Item Number.</div>';
				exit();
			} else {
				// Item does not exist, therefore, you can't make a injection from it
				echo '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>Item does not exist in DB.</div>';
				exit();
			}

		} else {
			// One or more mandatory fields are empty. Therefore, display a the error message
			echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter all fields marked with a (*)</div>';
			exit();
		}
	}
?>