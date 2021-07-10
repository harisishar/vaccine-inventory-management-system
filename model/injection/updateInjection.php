<?php

	require_once('../../inc/config/constants.php');
	require_once('../../inc/config/db.php');
	
	if(isset($_POST['injectionDetailsInjectionID'])){

		$injectionDetailsItemNumber = htmlentities($_POST['injectionDetailsItemNumber']);
		$injectionDetailsInjectionDate = htmlentities($_POST['injectionDetailsInjectionDate']);
		$injectionDetailsItemName = htmlentities($_POST['injectionDetailsItemName']);
		$injectionDetailsQuantity = htmlentities($_POST['injectionDetailsQuantity']);
		$injectionDetailsUnitPrice = htmlentities($_POST['injectionDetailsUnitPrice']);
		$injectionDetailsInjectionID = htmlentities($_POST['injectionDetailsInjectionID']);
		$injectionDetailsPatientsName = htmlentities($_POST['injectionDetailsPatientsName']);
		$injectionDetailsPatientsID = htmlentities($_POST['injectionDetailsPatientsID']);
		
		$quantityInOriginalOrder = 0;
		$quantityInNewOrder = 0;
		$originalStockInItemTable = 0;
		$newStock = 0;
		
		// Check if mandatory fields are not empty
		if(isset($injectionDetailsItemNumber) && isset($injectionDetailsinjectionDate) && isset($injectionDetailsQuantity) && isset($injectionDetailsUnitPrice) && isset($injectionDetailsPatientsID)){
			
			// Sanitize item number
			$injectionDetailsItemNumber = filter_var($injectionDetailsItemNumber, FILTER_SANITIZE_STRING);
			
			// Validate item quantity. It has to be an integer
			if(filter_var($injectionDetailsQuantity, FILTER_VALIDATE_INT) === 0 || filter_var($injectionDetailsQuantity, FILTER_VALIDATE_INT)){
				// Quantity is valid
			} else {
				// Quantity is not a valid number
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a valid number for Quantity.</div>';
				exit();
			}
			
			// Validate unit price. It has to be an integer or floating point value
			if(filter_var($injectionDetailsUnitPrice, FILTER_VALIDATE_FLOAT) === 0.0 || filter_var($injectionDetailsUnitPrice, FILTER_VALIDATE_FLOAT)){
				// Valid unit price
			} else {
				// Unit price is not a valid number
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a valid number for Unit Price.</div>';
				exit();
			}
			
						
			// Check if injectionID is empty
			if($injectionDetailsInjectionID == ''){ 
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a injection ID.</div>';
				exit();
			}
			
			// Check if customerID is empty
			if($injectionDetailsPatientsID == ''){ 
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter a Patients ID.</div>';
				exit();
			}
			
			// Check if itemNumber is empty
			if($injectionDetailsItemNumber == ''){ 
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter Item Number.</div>';
				exit();
			}
			
			// Check if quantity is empty
			if($injectionDetailsQuantity == ''){ 
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter quantity.</div>';
				exit();
			}
			
			// Check if unit price is empty
			if($injectionDetailsUnitPrice == ''){ 
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter Unit Price.</div>';
				exit();
			}
			
			// Get the quantity and itemNumber in original injection order
			$orginalInjectionQuantitySql = 'SELECT * FROM injection WHERE injectionID = :injectionID';
			$originalInjectionQuantityStatement = $conn->prepare($orginalInjectionQuantitySql);
			$originalInjectionQuantityStatement->execute(['injectionID' => $injectionDetailsInjectionID]);
			
						
			$patientsIDsql = 'SELECT * FROM patients WHERE patientsID = :patientsID';
			$patientsIDStatement = $conn->prepare($patientsIDsql);
			$patientsIDStatement->execute(['patientsID' => $injectionDetailsPatientsID]);
			
			if($patientsIDStatement->rowCount() < 1){
				// patients id is wrong
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>patients ID does not exist in DB. Please enter a valid patients ID.</div>';
				exit();
			} else {
				$row = $patientsIDStatement->fetch(PDO::FETCH_ASSOC);
				$patientsID = $row['patientsID'];
				$injectionDetailsPatientsName = $row['fullName'];
			}
			
			if($originalInjectionQuantityStatement->rowCount() > 0){
				
				// injection details exist in DB. Hence proceed to calculate the stock
				$originalQtyRow = $originalInjectionQuantityStatement->fetch(PDO::FETCH_ASSOC);
				$quantityInOriginalOrder = $originalQtyRow['quantity'];
				$originalOrderItemNumber = $originalQtyRow['itemNumber'];

				// Check if the user wants to update the itemNumber too. In that case,
				// we need to remove the quantity of the original order for that item and 
				// update the new item details in the item table.
				// Check if the original itemNumber is the same as the new itemNumber
				if($originalOrderItemNumber !== $injectionDetailsItemNumber) {
					// Item numbers are different. That means the user wants to update a new item number too
					// in that case, need to update both items' stocks.
						
					// Get the stock of the new item from item table
					$newItemCurrentStockSql = 'SELECT * FROM item WHERE itemNumber = :itemNumber';
					$newItemCurrentStockStatement = $conn->prepare($newItemCurrentStockSql);
					$newItemCurrentStockStatement->execute(['itemNumber' => $injectionDetailsItemNumber]);
					
					if($newItemCurrentStockStatement->rowCount() < 1){
						// Item number is not in DB. Hence abort.
						echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Item Number does not exist in DB. If you want to update this item, please add it to DB first.</div>';
						exit();
					}
					
					// Calculate the new stock value for new item using the existing stock in item table
					$newItemRow = $newItemCurrentStockStatement->fetch(PDO::FETCH_ASSOC);
					$originalQuantityForNewItem = $newItemRow['stock'];
					$enteredQuantityForNewItem = $injectionDetailsQuantity;
					$newItemNewStock = $originalQuantityForNewItem - $enteredQuantityForNewItem;
					
					// UPDATE the stock for new item in item table
					$newItemStockUpdateSql = 'UPDATE item SET stock = :stock WHERE itemNumber = :itemNumber';
					$newItemStockUpdateStatement = $conn->prepare($newItemStockUpdateSql);
					$newItemStockUpdateStatement->execute(['stock' => $newItemNewStock, 'itemNumber' => $injectionDetailsItemNumber]);
					
					// Get the current stock of the previous item
					$previousItemCurrentStockSql = 'SELECT * FROM item WHERE itemNumber=:itemNumber';
					$previousItemCurrentStockStatement = $conn->prepare($previousItemCurrentStockSql);
					$previousItemCurrentStockStatement->execute(['itemNumber' => $originalOrderItemNumber]);
					
					// Calculate the new stock value for the previous item using the existing stock in item table
					$previousItemRow = $previousItemCurrentStockStatement->fetch(PDO::FETCH_ASSOC);
					$currentQuantityForPreviousItem = $previousItemRow['stock'];
					$previousItemNewStock = $currentQuantityForPreviousItem + $quantityInOriginalOrder;
					
					// UPDATE the stock for previous item in item table
					$previousItemStockUpdateSql = 'UPDATE item SET stock = :stock WHERE itemNumber = :itemNumber';
					$previousItemStockUpdateStatement = $conn->prepare($previousItemStockUpdateSql);
					$previousItemStockUpdateStatement->execute(['stock' => $previousItemNewStock, 'itemNumber' => $originalOrderItemNumber]);
					
					// Finally UPDATE the injection table for new item
					$updateInjectionDetailsSql = 'UPDATE injection SET itemNumber = :itemNumber, injectionDate = :injectionDate, itemName = :itemName, unitPrice = :unitPrice, quantity = :quantity, patientsName = :patientsName, patientsID = :patientsID WHERE injectionID = :injectionID';
					$updateInjectionDetailsStatement = $conn->prepare($updateInjectionDetailsSql);
					$updateInjectionDetailsStatement->execute(['itemNumber' => $InjectionDetailsItemNumber, 'injectionDate' => $injectionDetailsInjectionDate, 'itemName' => $injectionDetailsItemName, 'unitPrice' => $injectionDetailsUnitPrice, 'quantity' => $injectionDetailsQuantity, 'patientsName' => $injectionDetailsPatientsName, 'patientsID' => $patientsID, 'injectionID' => $injectionDetailsInjectionID]);
					
					echo '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>Injection details updated.</div>';
					exit();
					
				} else {
					// Item numbers are equal. That means item number is valid
					
					// Get the quantity (stock) in item table
					$stockSql = 'SELECT * FROM item WHERE itemNumber=:itemNumber';
					$stockStatement = $conn->prepare($stockSql);
					$stockStatement->execute(['itemNumber' => $injectionDetailsItemNumber]);
					
					if($stockStatement->rowCount() > 0){
						// Item exists in the item table, therefore, start updating data in injection table
						
						// Calculate the new stock value using the existing stock in item table
						$row = $stockStatement->fetch(PDO::FETCH_ASSOC);
						$quantityInNewOrder = $injectionDetailsQuantity;
						$originalStockInItemTable = $row['stock'];
						$newStock = $originalStockInItemTable - ($quantityInNewOrder - $quantityInOriginalOrder);
						
						// Update the new stock value in item table.
						$updateStockSql = 'UPDATE item SET stock = :stock WHERE itemNumber = :itemNumber';
						$updateStockStatement = $conn->prepare($updateStockSql);
						$updateStockStatement->execute(['stock' => $newStock, 'itemNumber' => $injectionDetailsItemNumber]);
						
						// Next, update the injection table
						$updateInjectionDetailsSql = 'UPDATE injection SET itemNumber = :itemNumber, injectionDate = :injectionDate, itemName = :itemName, unitPrice = :unitPrice, quantity = :quantity, patientsName = :patientsName, patientsID = :patientsID WHERE injectionID = :injectionID';
						$updateInjectionDetailsStatement = $conn->prepare($updateInjectionDetailsSql);
						$updateInjectionDetailsStatement->execute(['itemNumber' => $injectionDetailsItemNumber, 'injectionDate' => $injectionDetailsInjectionDate, 'itemName' => $injectionDetailsItemName, 'unitPrice' => $injectionDetailsUnitPrice, 'quantity' => $injectionDetailsQuantity, 'patientsName' => $injectionDetailsPatientsName, 'patientsID' => $patientsID, 'injectionID' => $injectionDetailsInjectionID]);
						
						echo '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert">&times;</button>Injection details updated.</div>';
						exit();
						
					} else {
						// Item does not exist in item table, therefore, you can't update 
						// injection details for it 
						echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Item does not exist in DB. Therefore, first enter this item to DB using the <strong>Item</strong> tab.</div>';
						exit();
					}	
					
				}
	
			} else {
				
				// injectionID does not exist in purchase table, therefore, you can't update it 
				echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>injection details does not exist in DB for the given injection ID. Therefore, can\'t update.</div>';
				exit();
				
			}

		} else {
			// One or more mandatory fields are empty. Therefore, display the error message
			echo '<div class="alert alert-danger"><button type="button" class="close" data-dismiss="alert">&times;</button>Please enter all fields marked with a (*)</div>';
			exit();
		}
	}
?>