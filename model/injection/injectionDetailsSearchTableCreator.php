<?php
	require_once('../../inc/config/constants.php');
	require_once('../../inc/config/db.php');
	
	$uPrice = 0;
	$qty = 0;
	$totalPrice = 0;
	
	$injectionDetailsSearchSql = 'SELECT * FROM injection';
	$injectionDetailsSearchStatement = $conn->prepare($injectionDetailsSearchSql);
	$injectionDetailsSearchStatement->execute();

	$output = '<table id="injectionDetailsTable" class="table table-sm table-striped table-bordered table-hover" style="width:100%">
				<thead>
					<tr>
						<th>injection ID</th>
						<th>Item Number</th>
						<th>patients ID</th>
						<th>patients Name</th>
						<th>Item Name</th>
						<th>injection Date</th>
						<th>Quantity</th>
						<th>Unit Price</th>
						<th>Total Price</th>
					</tr>
				</thead>
				<tbody>';
	
	// Create table rows from the selected data
	while($row = $injectionDetailsSearchStatement->fetch(PDO::FETCH_ASSOC)){
		$uPrice = $row['unitPrice'];
		$qty = $row['quantity'];
		$totalPrice = $uPrice * $qty;
			
		$output .= '<tr>' .
						'<td>' . $row['injectionID'] . '</td>' .
						'<td>' . $row['itemNumber'] . '</td>' .
						'<td>' . $row['patientsID'] . '</td>' .
						'<td>' . $row['patientsName'] . '</td>' .
						'<td>' . $row['itemName'] . '</td>' .
						'<td>' . $row['injectionDate'] . '</td>' .
						'<td>' . $row['quantity'] . '</td>' .
						'<td>' . $row['unitPrice'] . '</td>' .
						'<td>' . $totalPrice . '</td>' .
					'</tr>';
	}
	
	$injectionDetailsSearchStatement->closeCursor();
	
	$output .= '</tbody>
					<tfoot>
						<tr>
							<th>injection ID</th>
							<th>Item Number</th>
							<th>patients ID</th>
							<th>patients Name</th>
							<th>Item Name</th>
							<th>injection Date</th>
							<th>Quantity</th>
							<th>Unit Price</th>
							<th>Total Price</th>
						</tr>
					</tfoot>
				</table>';
	echo $output;
?>


