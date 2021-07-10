<?php
	require_once('../../inc/config/constants.php');
	require_once('../../inc/config/db.php');
	
	$uPrice = 0;
	$qty = 0;
	$totalPrice = 0;
	
	if(isset($_POST['startDate'])){
		$startDate = htmlentities($_POST['startDate']);
		$endDate = htmlentities($_POST['endDate']);
		
		$injectionFilteredReportSql = 'SELECT * FROM injection WHERE injectionDate BETWEEN :startDate AND :endDate';
		$injectionFilteredReportStatement = $conn->prepare($injectionFilteredReportSql);
		$injectionFilteredReportStatement->execute(['startDate' => $startDate, 'endDate' => $endDate]);

		$output = '<table id="injectionFilteredReportsTable" class="table table-sm table-striped table-bordered table-hover" style="width:100%">
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
		while($row = $injectionFilteredReportStatement->fetch(PDO::FETCH_ASSOC)){
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
		
		$injectionFilteredReportStatement->closeCursor();
		
		$output .= '</tbody>
						<tfoot>
							<tr>
								<th>Total</th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
								<th></th>
							</tr>
						</tfoot>
					</table>';
		echo $output;
	}
?>


