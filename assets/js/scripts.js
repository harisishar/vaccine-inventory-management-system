// File that creates the purchase details search table
purchaseDetailsSearchTableCreatorFile = 'model/purchase/purchaseDetailsSearchTableCreator.php';

// File that creates the patients details search table
patientsDetailsSearchTableCreatorFile = 'model/patients/patientsDetailsSearchTableCreator.php';

// File that creates the item details search table
itemDetailsSearchTableCreatorFile = 'model/item/itemDetailsSearchTableCreator.php';

// File that creates the vendor details search table
vendorDetailsSearchTableCreatorFile = 'model/vendor/vendorDetailsSearchTableCreator.php';

// File that creates the injection details search table
injectionDetailsSearchTableCreatorFile = 'model/injection/injectionDetailsSearchTableCreator.php';



// File that creates the purchase reports search table
purchaseReportsSearchTableCreatorFile = 'model/purchase/purchaseReportsSearchTableCreator.php';

// File that creates the patients reports search table
patientsReportsSearchTableCreatorFile = 'model/patients/patientsReportsSearchTableCreator.php';

// File that creates the item reports search table
itemReportsSearchTableCreatorFile = 'model/item/itemReportsSearchTableCreator.php';

// File that creates the vendor reports search table
vendorReportsSearchTableCreatorFile = 'model/vendor/vendorReportsSearchTableCreator.php';

// File that creates the injection reports search table
injectionReportsSearchTableCreatorFile = 'model/injection/injectionReportsSearchTableCreator.php';



// File that returns the last inserted vendorID
vendorLastInsertedIDFile = 'model/vendor/populateLastVendorID.php';

// File that returns the last inserted patientsID
patientsLastInsertedIDFile = 'model/patients/populateLastPatientsID.php';

// File that returns the last inserted purchaseID
purchaseLastInsertedIDFile = 'model/purchase/populateLastPurchaseIDForPurchaseTab.php';

// File that returns the last inserted injectionID
injectionLastInsertedIDFile = 'model/injection/populateLastInjectionIDForInjectionTab.php';

// File that returns the last inserted productID for item details tab
itemLastInsertedIDFile = 'model/item/populateLastProductID.php';



// File that returns purchaseIDs
showPurchaseIDSuggestionsFile = 'model/purchase/showPurchaseIDs.php';

// File that returns InjectionIDs
showInjectionIDSuggestionsFile = 'model/injection/showInjectionIDs.php';

// File that returns vendorIDs
showVendorIDSuggestionsFile = 'model/vendor/showVendorIDs.php';

// File that returns patientsIDs
showPatientsIDSuggestionsFile = 'model/patients/showPatientsIDs.php';

// File that returns patientsIDs for Injection tab
showPatientsIDSuggestionsForInjectionTabFile = 'model/patients/showPatientsIDsForInjectionTab.php';



// File that returns itemNumbers
showItemNumberSuggestionsFile = 'model/item/showItemNumber.php';

// File that returns itemNumbers in image tab
showItemNumberSuggestionsForImageTabFile = 'model/item/showItemNumberForImageTab.php';

// File that returns itemNumbers for purchase tab
showItemNumberForPurchaseTabFile = 'model/item/showItemNumberForPurchaseTab.php';

// File that returns itemNumbers for Injection tab
showItemNumberForInjectionTabFile = 'model/item/showItemNumberForInjectionTab.php';

// File that returns itemNames
showItemNamesFile = 'model/item/showItemNames.php';



// File that returns stock 
getItemStockFile = 'model/item/getItemStock.php';

// File that returns item name
getItemNameFile = 'model/item/getItemName.php';

// File that updates an image
updateImageFile = 'model/image/updateImage.php';

// File that deletes an image
deleteImageFile = 'model/image/deleteImage.php';



// File that creates the filtered purchase report table
purchaseFilteredReportCreatorFile = 'model/purchase/purchaseFilteredReportTableCreator.php';

// File that creates the filtered Injection report table
injectionFilteredReportCreatorFile = 'model/injection/injectionFilteredReportTableCreator.php';



$(document).ready(function(){
	// Style the dropdown boxes. You need to explicitly set the width 
    // in order to fix the dropdown box not visible issue when tab is hidden
	$('.chosenSelect').chosen({ width: "95%"});
	
	// Initiate tooltips
	$('.invTooltip').tooltip(); 
	
	// Listen to Patients add button
	$('#addPatients').on('click', function(){
		addPatients();
	});
	
	// Listen to vendor add button
	$('#addVendor').on('click', function(){
		addVendor();
	});
	
	// Listen to item add button
	$('#addItem').on('click', function(){
		addItem();
	});
	
	// Listen to purchase add button
	$('#addPurchase').on('click', function(){
		addPurchase();
	});
	
	// Listen to injection add button
	$('#addInjectionButton').on('click', function(){
		addInjection();
	});
	
	// Listen to update button in item details tab
	$('#updateItemDetailsButton').on('click', function(){
		updateItem();
	});
	
	// Listen to update button in Patients details tab
	$('#updatePatientsDetailsButton').on('click', function(){
		updatePatients();
	});
	
	// Listen to update button in vendor details tab
	$('#updateVendorDetailsButton').on('click', function(){
		updateVendor();
	});
	
	// Listen to update button in purchase details tab
	$('#updatePurchaseDetailsButton').on('click', function(){
		updatePurchase();
	});
	
	// Listen to update button in Injection details tab
	$('#updateInjectionDetailsButton').on('click', function(){
		updateInjection();
	});
	
	// Listen to delete button in item details tab
	$('#deleteItem').on('click', function(){
		// Confirm before deleting
		bootbox.confirm('Are you sure you want to delete?', function(result){
			if(result){
				deleteItem();
			}
		});
	});
	
	// Listen to delete button in Patients details tab
	$('#deletePatientsButton').on('click', function(){
		// Confirm before deleting
		bootbox.confirm('Are you sure you want to delete?', function(result){
			if(result){
				deletePatients();
			}
		});
	});
	
	// Listen to delete button in vendor details tab
	$('#deleteVendorButton').on('click', function(){
		// Confirm before deleting
		bootbox.confirm('Are you sure you want to delete?', function(result){
			if(result){
				deleteVendor();
			}
		});
	});
	
	// Listen to item name text box in item details tab
	$('#itemDetailsItemName').keyup(function(){
		showSuggestions('itemDetailsItemName', showItemNamesFile, 'itemDetailsItemNameSuggestionsDiv');
	});
	
	// Remove the item names suggestions dropdown in the item details tab
	// when user selects an item from it
	$(document).on('click', '#itemDetailsItemNamesSuggestionsList li', function(){
		$('#itemDetailsItemName').val($(this).text());
		$('#itemDetailsItemNamesSuggestionsList').fadeOut();
	});
	
	// Listen to item number text box in item details tab
	$('#itemDetailsItemNumber').keyup(function(){
		showSuggestions('itemDetailsItemNumber', showItemNumberSuggestionsFile, 'itemDetailsItemNumberSuggestionsDiv');
	});
	
	// Remove the item numbers suggestions dropdown in the item details tab
	// when user selects an item from it
	$(document).on('click', '#itemDetailsItemNumberSuggestionsList li', function(){
		$('#itemDetailsItemNumber').val($(this).text());
		$('#itemDetailsItemNumberSuggestionsList').fadeOut();
		getItemDetailsToPopulate();
	});
	

	// Listen to item number text box in Injection details tab
	$('#injectionDetailsItemNumber').keyup(function(){
		showSuggestions('injectionDetailsItemNumber', showItemNumberForInjectionTabFile, 'injectionDetailsItemNumberSuggestionsDiv');
	});
	
	// Remove the item numbers suggestions dropdown in the injection details tab
	// when user selects an item from it
	$(document).on('click', '#injectionDetailsItemNumberSuggestionsList li', function(){
		$('#injectionDetailsItemNumber').val($(this).text());
		$('#injectionDetailsItemNumberSuggestionsList').fadeOut();
		getItemDetailsToPopulateForInjectionTab();
	});
	
	
	// Listen to item number text box in item image tab
	$('#itemImageItemNumber').keyup(function(){
		showSuggestions('itemImageItemNumber', showItemNumberSuggestionsForImageTabFile, 'itemImageItemNumberSuggestionsDiv');
	});
	
	// Remove the item numbers suggestions dropdown in the item image tab
	// when user selects an item from it
	$(document).on('click', '#itemImageItemNumberSuggestionsList li', function(){
		$('#itemImageItemNumber').val($(this).text());
		$('#itemImageItemNumberSuggestionsList').fadeOut();
		getItemName('itemImageItemNumber', getItemNameFile, 'itemImageItemName');
	});
	
	// Clear the image from item tab when Clear button is clicked
	$('#itemClear').on('click', function(){
		$('#imageContainer').empty();
	});
	
	// Clear the image from injection tab when Clear button is clicked
	$('#injectionClear').on('click', function(){
		$('#injectionDetailsImageContainer').empty();
	});
	
	// Refresh the purchase report datatable in the purchase report tab when Clear button is clicked
	$('#purchaseFilterClear').on('click', function(){
		reportsPurchaseTableCreator('purchaseReportsTableDiv', purchaseReportsSearchTableCreatorFile, 'purchaseReportsTable');
	});
	
	// Refresh the injection report datatable in the injection report tab when Clear button is clicked
	$('#injectionFilterClear').on('click', function(){
		reportsInjectionTableCreator('injectionReportsTableDiv', injectionReportsSearchTableCreatorFile, 'injectionReportsTable');
	});
	
	
	// Listen to item number text box in purchase details tab
	$('#purchaseDetailsItemNumber').keyup(function(){
		showSuggestions('purchaseDetailsItemNumber', showItemNumberForPurchaseTabFile, 'purchaseDetailsItemNumberSuggestionsDiv');
	});
	
	// remove the item numbers suggestions dropdown in the purchase details tab
	// when user selects an item from it
	$(document).on('click', '#purchaseDetailsItemNumberSuggestionsList li', function(){
		$('#purchaseDetailsItemNumber').val($(this).text());
		$('#purchaseDetailsItemNumberSuggestionsList').fadeOut();
		
		// Display the item name for the selected item number
		getItemName('purchaseDetailsItemNumber', getItemNameFile, 'purchaseDetailsItemName');
		
		// Display the current stock for the selected item number
		getItemStockToPopulate('purchaseDetailsItemNumber', getItemStockFile, 'purchaseDetailsCurrentStock');
	});
	
	// Listen to patientsID text box in patients details tab
	$('#patientsDetailsPatientsID').keyup(function(){
		showSuggestions('patientsDetailsPatientsID', showPatientsIDSuggestionsFile, 'patientsDetailsPatientsIDSuggestionsDiv');
	});
	
	// Remove the PatientsID suggestions dropdown in the Patients details tab
	// when user selects an item from it
	$(document).on('click', '#patientsDetailsPatientsIDSuggestionsList li', function(){
		$('#patientsDetailsPatientsID').val($(this).text());
		$('#patientsDetailsPatientsIDSuggestionsList').fadeOut();
		getPatientsDetailsToPopulate();
	});
	

	// Listen to PatientsID text box in injection details tab
	$('#injectionDetailsPatientsID').keyup(function(){
		showSuggestions('injectionDetailsPatientsID', showPatientsIDSuggestionsForInjectionTabFile, 'injectionDetailsPatientsIDSuggestionsDiv');
	});
	
	// Remove the PatientsID suggestions dropdown in the injection details tab
	// when user selects an item from it
	$(document).on('click', '#injectionDetailsPatientsIDSuggestionsList li', function(){
		$('#injectionDetailsPatientsID').val($(this).text());
		$('#injectionDetailsPatientsIDSuggestionsList').fadeOut();
		getPatientsDetailsToPopulateInjectionTab();
	});
	
	
	// Listen to VendorID text box in vendor details tab
	$('#vendorDetailsVendorID').keyup(function(){
		showSuggestions('vendorDetailsVendorID', showVendorIDSuggestionsFile, 'vendorDetailsVendorIDSuggestionsDiv');
	});
	
	// Remove the VendorID suggestions dropdown in the vendor details tab
	// when user selects an item from it
	$(document).on('click', '#vendorDetailsVendorIDSuggestionsList li', function(){
		$('#vendorDetailsVendorID').val($(this).text());
		$('#vendorDetailsVendorIDSuggestionsList').fadeOut();
		getVendorDetailsToPopulate();
	});
	
	
	// Listen to PurchaseID text box in purchase details tab
	$('#purchaseDetailsPurchaseID').keyup(function(){
		showSuggestions('purchaseDetailsPurchaseID', showPurchaseIDSuggestionsFile, 'purchaseDetailsPurchaseIDSuggestionsDiv');
	});
	
	// Remove the PurchaseID suggestions dropdown in the  details tab
	// when user selects an item from it
	$(document).on('click', '#purchaseDetailsPurchaseIDSuggestionsList li', function(){
		$('#purchaseDetailsPurchaseID').val($(this).text());
		$('#purchaseDetailsPurchaseIDSuggestionsList').fadeOut();
		getPurchaseDetailsToPopulate();
	});
	
	
	// Listen to injectionID text box in injection details tab
	$('#injectionDetailsInjectionID').keyup(function(){
		showSuggestions('injectionDetailsInjectionID', showInjectionIDSuggestionsFile, 'injectionDetailsInjectionIDSuggestionsDiv');
	});
	
	// Remove the injectionID suggestions dropdown in the injection details tab
	// when user selects an item from it
	$(document).on('click', '#injectionDetailsInjectionIDSuggestionsList li', function(){
		$('#injectionDetailsInjectionID').val($(this).text());
		$('#injectionDetailsInjectionIDSuggestionsList').fadeOut();
		getinjectionDetailsToPopulate();
	});


	// Listen to image update button
	$('#updateImageButton').on('click', function(){
		processImage('imageForm', updateImageFile, 'itemImageMessage');
	});
	
	// Listen to image delete button
	$('#deleteImageButton').on('click', function(){
		processImage('imageForm', deleteImageFile, 'itemImageMessage');
	});
	
	// Initiate datepickers
	$('.datepicker').datepicker({
		format: 'yyyy-mm-dd',
		todayHighlight: true,
		todayBtn: 'linked',
		orientation: 'bottom left'
	});
	
	// Calculate Total in purchase tab
	$('#purchaseDetailsQuantity, #purchaseDetailsUnitPrice').change(function(){
		calculateTotalInPurchaseTab();
	});

	// Calculate Total in injection tab
	$('#injectionDetailsDiscount, #injectionDetailsQuantity, #injectionDetailsUnitPrice').change(function(){
		calculateTotalInInjectionTab();
	});
	
	// Close any suggestions lists from the page when a user clicks on the page
	$(document).on('click', function(){
		$('.suggestionsList').fadeOut();
	});

	// Load searchable datatables for patients, purchase, item, vendor, injection
	searchTableCreator('itemDetailsTableDiv', itemDetailsSearchTableCreatorFile, 'itemDetailsTable');
	searchTableCreator('purchaseDetailsTableDiv', purchaseDetailsSearchTableCreatorFile, 'purchaseDetailsTable');
	searchTableCreator('patientsDetailsTableDiv', patientsDetailsSearchTableCreatorFile, 'patientsDetailsTable');
	searchTableCreator('injectionDetailsTableDiv', injectionDetailsSearchTableCreatorFile, 'injectionDetailsTable');
	searchTableCreator('vendorDetailsTableDiv', vendorDetailsSearchTableCreatorFile, 'vendorDetailsTable');
	
	// Load searchable datatables for patients, purchase, item, vendor, injection reports
	reportsTableCreator('itemReportsTableDiv', itemReportsSearchTableCreatorFile, 'itemReportsTable');
	reportsPurchaseTableCreator('purchaseReportsTableDiv', purchaseReportsSearchTableCreatorFile, 'purchaseReportsTable');
	reportsTableCreator('patientsReportsTableDiv', patientsReportsSearchTableCreatorFile, 'patientsReportsTable');
	reportsinjectionTableCreator('injectionReportsTableDiv', injectionReportsSearchTableCreatorFile, 'injectionReportsTable');
	reportsTableCreator('vendorReportsTableDiv', vendorReportsSearchTableCreatorFile, 'vendorReportsTable');
	
	// Initiate popovers
	$(document).on('mouseover', '.itemDetailsHover', function(){
		// Create item details popover boxes
		$('.itemDetailsHover').popover({
			container: 'body',
			title: 'Item Details',
			trigger: 'hover',
			html: true,
			placement: 'right',
			content: fetchData
		});
	});
	
	// Listen to refresh buttons
	$('#searchTablesRefresh, #reportsTablesRefresh').on('click', function(){
		searchTableCreator('itemDetailsTableDiv', itemDetailsSearchTableCreatorFile, 'itemDetailsTable');
		searchTableCreator('purchaseDetailsTableDiv', purchaseDetailsSearchTableCreatorFile, 'purchaseDetailsTable');
		searchTableCreator('patientsDetailsTableDiv', patientsDetailsSearchTableCreatorFile, 'patientsDetailsTable');
		searchTableCreator('vendorDetailsTableDiv', vendorDetailsSearchTableCreatorFile, 'vendorDetailsTable');
		searchTableCreator('injectionDetailsTableDiv', injectionDetailsSearchTableCreatorFile, 'injectionDetailsTable');
		
		reportsTableCreator('itemReportsTableDiv', itemReportsSearchTableCreatorFile, 'itemReportsTable');
		reportsPurchaseTableCreator('purchaseReportsTableDiv', purchaseReportsSearchTableCreatorFile, 'purchaseReportsTable');
		reportsTableCreator('patientsReportsTableDiv', patientsReportsSearchTableCreatorFile, 'patientsReportsTable');
		reportsTableCreator('vendorReportsTableDiv', vendorReportsSearchTableCreatorFile, 'vendorReportsTable');
		reportsinjectionTableCreator('injectionReportsTableDiv', injectionReportsSearchTableCreatorFile, 'injectionReportsTable');
	});
	
	
	// Listen to purchase report show button
	$('#showPurchaseReport').on('click', function(){
		filteredPurchaseReportTableCreator('purchaseReportStartDate', 'purchaseReportEndDate', purchaseFilteredReportCreatorFile, 'purchaseReportsTableDiv', 'purchaseFilteredReportsTable');
	});
	
	// Listen to injection report show button
	$('#showInjectionReport').on('click', function(){
		filteredInjectionReportTableCreator('injectionReportStartDate', 'injectionReportEndDate', injectionFilteredReportCreatorFile, 'injectionReportsTableDiv', 'injectionFilteredReportsTable');
	});
	
});


// Function to fetch data to show in popovers
function fetchData(){
	var fetch_data = '';
	var element = $(this);
	var id = element.attr('id');
	
	$.ajax({
		url: 'model/item/getItemDetailsForPopover.php',
		method: 'POST',
		async: false,
		data: {id:id},
		success: function(data){
			fetch_data = data;
		}
	});
	return fetch_data;
}


// Function to call the script that process imageURL in DB
function processImage(imageFormID, scriptPath, messageDivID){
	var form = $('#' + imageFormID)[0];
	var formData = new FormData(form);
	$.ajax({
		url: scriptPath,
		method: 'POST',
		data: formData,
		contentType: false,
		processData: false,
		success: function(data){
			$('#' + messageDivID).html(data);
		}
	});
}

// Function to create searchable datatables for patients, item, purchase, injection
function searchTableCreator(tableContainerDiv, tableCreatorFileUrl, table){
	var tableContainerDivID = '#' + tableContainerDiv;
	var tableID = '#' + table;
	$(tableContainerDivID).load(tableCreatorFileUrl, function(){
		// Initiate the Datatable plugin once the table is added to the DOM
		$(tableID).DataTable();
	});
}


// Function to create reports datatables for patients, item, purchase, injection
function reportsTableCreator(tableContainerDiv, tableCreatorFileUrl, table){
	var tableContainerDivID = '#' + tableContainerDiv;
	var tableID = '#' + table;
	$(tableContainerDivID).load(tableCreatorFileUrl, function(){
		// Initiate the Datatable plugin once the table is added to the DOM
		$(tableID).DataTable({
			dom: 'lBfrtip',
			//dom: 'lfBrtip',
			//dom: 'Bfrtip',
			buttons: [
				'copy',
				'csv', 'excel',
				{extend: 'pdf', orientation: 'landscape', pageSize: 'LEGAL'},
				'print'
			]
		});
	});
}


// Function to create reports datatables for purchase
function reportsPurchaseTableCreator(tableContainerDiv, tableCreatorFileUrl, table){
	var tableContainerDivID = '#' + tableContainerDiv;
	var tableID = '#' + table;
	$(tableContainerDivID).load(tableCreatorFileUrl, function(){
		// Initiate the Datatable plugin once the table is added to the DOM
		$(tableID).DataTable({
			dom: 'lBfrtip',
			buttons: [
				'copy',
				{extend: 'csv', footer: true, title: 'Purchase Report'},
				{extend: 'excel', footer: true, title: 'Purchase Report'},
				{extend: 'pdf', footer: true, orientation: 'landscape', pageSize: 'LEGAL', title: 'Purchase Report'},
				{extend: 'print', footer: true, title: 'Purchase Report'},
			],
			"footerCallback": function ( row, data, start, end, display ) {
				var api = this.api(), data;
	 
				// Remove the formatting to get integer data for summation
				var intVal = function ( i ) {
					return typeof i === 'string' ?
						i.replace(/[\$,]/g, '')*1 :
						typeof i === 'number' ?
							i : 0;
				};
	 
				// Quantity total over all pages
				quantityTotal = api
					.column( 6 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
	 
				// Quantity for current page
				quantityFilteredTotal = api
					.column( 6, { page: 'current'} )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				
				// Unit price total over all pages
				unitPriceTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				
				// Unit price for current page
				unitPriceFilteredTotal = api
					.column( 7, { page: 'current'} )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					
				// Full price total over all pages
				fullPriceTotal = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				
				// Full price for current page
				fullPriceFilteredTotal = api
					.column( 8, { page: 'current'} )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
	 
				// Update footer columns
				$( api.column( 6 ).footer() ).html(quantityFilteredTotal +' ('+ quantityTotal +' total)');
				$( api.column( 7 ).footer() ).html(unitPriceFilteredTotal +' ('+ unitPriceTotal +' total)');
				$( api.column( 8 ).footer() ).html(fullPriceFilteredTotal +' ('+ fullPriceTotal +' total)');
			}
		});
	});
}


// Function to create reports datatables for injection
function reportsInjectionTableCreator(tableContainerDiv, tableCreatorFileUrl, table){
	var tableContainerDivID = '#' + tableContainerDiv;
	var tableID = '#' + table;
	$(tableContainerDivID).load(tableCreatorFileUrl, function(){
		// Initiate the Datatable plugin once the table is added to the DOM
		$(tableID).DataTable({
			dom: 'lBfrtip',
			buttons: [
				'copy',
				{extend: 'csv', footer: true, title: 'injection Report'},
				{extend: 'excel', footer: true, title: 'injection Report'},
				{extend: 'pdf', footer: true, orientation: 'landscape', pageSize: 'LEGAL', title: 'injection Report'},
				{extend: 'print', footer: true, title: 'injection Report'},
			],
			"footerCallback": function ( row, data, start, end, display ) {
				var api = this.api(), data;
	 
				// Remove the formatting to get integer data for summation
				var intVal = function ( i ) {
					return typeof i === 'string' ?
						i.replace(/[\$,]/g, '')*1 :
						typeof i === 'number' ?
							i : 0;
				};
	 
				// Quantity Total over all pages
				quantityTotal = api
					.column( 7 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
	 
				// Quantity Total over this page
				quantityFilteredTotal = api
					.column( 7, { page: 'current'} )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				
				// Unit price Total over all pages
				unitPriceTotal = api
					.column( 8 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				
				// Unit price total over current page
				unitPriceFilteredTotal = api
					.column( 8, { page: 'current'} )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
					
				// Full price Total over all pages
				fullPriceTotal = api
					.column( 9 )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
				
				// Full price total over current page
				fullPriceFilteredTotal = api
					.column( 9, { page: 'current'} )
					.data()
					.reduce( function (a, b) {
						return intVal(a) + intVal(b);
					}, 0 );
	 
				// Update footer columns
				$( api.column( 7 ).footer() ).html(quantityFilteredTotal +' ('+ quantityTotal +' total)');
				$( api.column( 8 ).footer() ).html(unitPriceFilteredTotal +' ('+ unitPriceTotal +' total)');
				$( api.column( 9 ).footer() ).html(fullPriceFilteredTotal +' ('+ fullPriceTotal +' total)');
			}
		});
	});
}


// Function to create filtered datatable for injection details with total values
function filteredInjectionReportTableCreator(startDate, endDate, scriptPath, tableDIV, tableID){
	var startDate = $('#' + startDate).val();
	var endDate = $('#' + endDate).val();

	$.ajax({
		url: scriptPath,
		method: 'POST',
		data: {
			startDate:startDate,
			endDate:endDate,
		},
		success: function(data){
			$('#' + tableDIV).empty();
			$('#' + tableDIV).html(data);
		},
		complete: function(){
			// Initiate the Datatable plugin once the table is added to the DOM
			$('#' + tableID).DataTable({
				dom: 'lBfrtip',
				buttons: [
					'copy',
					{extend: 'csv', footer: true, title: 'injection Report'},
					{extend: 'excel', footer: true, title: 'injection Report'},
					{extend: 'pdf', footer: true, orientation: 'landscape', pageSize: 'LEGAL', title: 'injection Report'},
					{extend: 'print', footer: true, title: 'injection Report'},
				],
				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;
		 
					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
							i.replace(/[\$,]/g, '')*1 :
							typeof i === 'number' ?
								i : 0;
					};
		 
					// Total over all pages
					quantityTotal = api
						.column( 7 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
		 
					// Total over this page
					quantityFilteredTotal = api
						.column( 7, { page: 'current'} )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
					
					// Total over all pages
					unitPriceTotal = api
						.column( 8 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
					
					// Quantity total
					unitPriceFilteredTotal = api
						.column( 8, { page: 'current'} )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
						
					// Full total over all pages
					fullPriceTotal = api
						.column( 9 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
					
					// Full total over current page
					fullPriceFilteredTotal = api
						.column( 9, { page: 'current'} )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
		 
					// Update footer columns
					$( api.column( 7 ).footer() ).html(quantityFilteredTotal +' ('+ quantityTotal +' total)');
					$( api.column( 8 ).footer() ).html(unitPriceFilteredTotal +' ('+ unitPriceTotal +' total)');
					$( api.column( 9 ).footer() ).html(fullPriceFilteredTotal +' ('+ fullPriceTotal +' total)');
				}
			});
		}
	});
}


// Function to create filtered datatable for purchase details with total values
function filteredPurchaseReportTableCreator(startDate, endDate, scriptPath, tableDIV, tableID){
	var startDate = $('#' + startDate).val();
	var endDate = $('#' + endDate).val();

	$.ajax({
		url: scriptPath,
		method: 'POST',
		data: {
			startDate:startDate,
			endDate:endDate,
		},
		success: function(data){
			$('#' + tableDIV).empty();
			$('#' + tableDIV).html(data);
		},
		complete: function(){
			// Initiate the Datatable plugin once the table is added to the DOM
			$('#' + tableID).DataTable({
				dom: 'lBfrtip',
				buttons: [
					'copy',
					{extend: 'csv', footer: true, title: 'Purchase Report'},
					{extend: 'excel', footer: true, title: 'Purchase Report'},
					{extend: 'pdf', footer: true, orientation: 'landscape', pageSize: 'LEGAL', title: 'Purchase Report'},
					{extend: 'print', footer: true, title: 'Purchase Report'}
				],
				"footerCallback": function ( row, data, start, end, display ) {
					var api = this.api(), data;
		 
					// Remove the formatting to get integer data for summation
					var intVal = function ( i ) {
						return typeof i === 'string' ?
							i.replace(/[\$,]/g, '')*1 :
							typeof i === 'number' ?
								i : 0;
					};
		 
					// Quantity total over all pages
					quantityTotal = api
						.column( 6 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
		 
					// Quantity for current page
					quantityFilteredTotal = api
						.column( 6, { page: 'current'} )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
					
					// Unit price total over all pages
					unitPriceTotal = api
						.column( 7 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
					
					// Unit price for current page
					unitPriceFilteredTotal = api
						.column( 7, { page: 'current'} )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
					
					// Full price total over all pages
					fullPriceTotal = api
						.column( 8 )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
					
					// Full price for current page
					fullPriceFilteredTotal = api
						.column( 8, { page: 'current'} )
						.data()
						.reduce( function (a, b) {
							return intVal(a) + intVal(b);
						}, 0 );
		 
					// Update footer columns
					$( api.column( 6 ).footer() ).html(quantityFilteredTotal +' ('+ quantityTotal +' total)');
					$( api.column( 7 ).footer() ).html(unitPriceFilteredTotal +' ('+ unitPriceTotal +' total)');
					$( api.column( 8 ).footer() ).html(fullPriceFilteredTotal +' ('+ fullPriceTotal +' total)');
				}
			});
		}
	});
}


// Calculate Total Purchase value in purchase details tab
function calculateTotalInPurchaseTab(){
	var quantityPT = $('#purchaseDetailsQuantity').val();
	var unitPricePT = $('#purchaseDetailsUnitPrice').val();
	$('#purchaseDetailsTotal').val(Number(quantityPT) * Number(unitPricePT));
}


// Calculate Total injection value in injection details tab
function calculateTotalInInjectionTab(){
	var quantityST = $('#injectionDetailsQuantity').val();
	var unitPriceST = $('#injectionDetailsUnitPrice').val();
	var discountST = $('#injectionDetailsDiscount').val();
	$('#injectionDetailsTotal').val(Number(unitPriceST) * ((100 - Number(discountST)) / 100) * Number(quantityST));
}


// Function to call the insertpatients.php script to insert patients data to db
function addPatients() {
	var patientsDetailsPatientsFullName = $('#patientsDetailsPatientsFullName').val();
	var patientsDetailsPatientsEmail = $('#patientsDetailsPatientsEmail').val();
	var patientsDetailsPatientsMobile = $('#patientsDetailsPatientsMobile').val();
	var patientsDetailsPatientsPhone2 = $('#patientsDetailsPatientsPhone2').val();
	var patientsDetailsPatientsAddress = $('#patientsDetailsPatientsAddress').val();
	var patientsDetailsPatientsAddress2 = $('#patientsDetailsPatientsAddress2').val();
	var patientsDetailsPatientsCity = $('#patientsDetailsPatientsCity').val();
	var patientsDetailsPatientsState = $('#patientsDetailsPatientsState option:selected').text();
	var patientsDetailstatus = $('#patientsDetailsStatus option:selected').text();
	
	$.ajax({
		url: 'model/patients/insertPatients.php',
		method: 'POST',
		data: {
			patientsDetailsPatientsFullName:patientsDetailsPatientsFullName,
			patientsDetailsPatientsEmail:patientsDetailsPatientsEmail,
			patientsDetailsPatientsMobile:patientsDetailsPatientsMobile,
			patientsDetailsPatientsPhone2:patientsDetailsPatientsPhone2,
			patientsDetailsPatientsAddress:patientsDetailsPatientsAddress,
			patientsDetailsPatientsAddress2:patientsDetailsPatientsAddress2,
			patientsDetailsPatientsCity:patientsDetailsPatientsCity,
			patientsDetailsPatientsState:patientsDetailsPatientsState,
			patientsDetailsStatus:patientsDetailsStatus,
		},
		success: function(data){
			$('#patientsDetailsMessage').fadeIn();
			$('#patientsDetailsMessage').html(data);
		},
		complete: function(data){
			populateLastInsertedID(patientsLastInsertedIDFile, 'patientsDetailsPatientsID');
			searchTableCreator('patientsDetailsTableDiv', patientsDetailsSearchTableCreatorFile, 'patientsDetailsTable');
			reportsTableCreator('patientsReportsTableDiv', patientsReportsSearchTableCreatorFile, 'patientsReportsTable');
		}
	});
}


// Function to call the insertVendor.php script to insert vendor data to db
function addVendor() {
	var vendorDetailsVendorFullName = $('#vendorDetailsVendorFullName').val();
	var vendorDetailsVendorEmail = $('#vendorDetailsVendorEmail').val();
	var vendorDetailsVendorMobile = $('#vendorDetailsVendorMobile').val();
	var vendorDetailsVendorPhone2 = $('#vendorDetailsVendorPhone2').val();
	var vendorDetailsVendorAddress = $('#vendorDetailsVendorAddress').val();
	var vendorDetailsVendorAddress2 = $('#vendorDetailsVendorAddress2').val();
	var vendorDetailsVendorCity = $('#vendorDetailsVendorCity').val();
	var vendorDetailsVendorState = $('#vendorDetailsVendorState option:selected').text();
	var vendorDetailsStatus = $('#vendorDetailsStatus option:selected').text();
	
	$.ajax({
		url: 'model/vendor/insertVendor.php',
		method: 'POST',
		data: {
			vendorDetailsVendorFullName:vendorDetailsVendorFullName,
			vendorDetailsVendorEmail:vendorDetailsVendorEmail,
			vendorDetailsVendorMobile:vendorDetailsVendorMobile,
			vendorDetailsVendorPhone2:vendorDetailsVendorPhone2,
			vendorDetailsVendorAddress:vendorDetailsVendorAddress,
			vendorDetailsVendorAddress2:vendorDetailsVendorAddress2,
			vendorDetailsVendorCity:vendorDetailsVendorCity,
			vendorDetailsVendorState:vendorDetailsVendorState,
			vendorDetailsStatus:vendorDetailsStatus,
		},
		success: function(data){
			$('#vendorDetailsMessage').fadeIn();
			$('#vendorDetailsMessage').html(data);
		},
		complete: function(data){
			populateLastInsertedID(vendorLastInsertedIDFile, 'vendorDetailsVendorID');
			searchTableCreator('vendorDetailsTableDiv', vendorDetailsSearchTableCreatorFile, 'vendorDetailsTable');
			reportsTableCreator('vendorReportsTableDiv', vendorReportsSearchTableCreatorFile, 'vendorReportsTable');
			$('#purchaseDetailsVendorName').load('model/vendor/getVendorNames.php');
		}
	});
}


// Function to call the insertItem.php script to insert item data to db
function addItem() {
	var itemDetailsItemNumber = $('#itemDetailsItemNumber').val();
	var itemDetailsItemName = $('#itemDetailsItemName').val();
	var itemDetailsDiscount = $('#itemDetailsDiscount').val();
	var itemDetailsQuantity = $('#itemDetailsQuantity').val();
	var itemDetailsUnitPrice = $('#itemDetailsUnitPrice').val();
	var itemDetailsStatus = $('#itemDetailsStatus').val();
	var itemDetailsDescription = $('#itemDetailsDescription').val();
	
	$.ajax({
		url: 'model/item/insertItem.php',
		method: 'POST',
		data: {
			itemDetailsItemNumber:itemDetailsItemNumber,
			itemDetailsItemName:itemDetailsItemName,
			itemDetailsDiscount:itemDetailsDiscount,
			itemDetailsQuantity:itemDetailsQuantity,
			itemDetailsUnitPrice:itemDetailsUnitPrice,
			itemDetailsStatus:itemDetailsStatus,
			itemDetailsDescription:itemDetailsDescription,
		},
		success: function(data){
			$('#itemDetailsMessage').fadeIn();
			$('#itemDetailsMessage').html(data);
		},
		complete: function(){
			populateLastInsertedID(itemLastInsertedIDFile, 'itemDetailsProductID');
			getItemStockToPopulate('itemDetailsItemNumber', getItemStockFile, itemDetailsTotalStock);
			searchTableCreator('itemDetailsTableDiv', itemDetailsSearchTableCreatorFile, 'itemDetailsTable');
			reportsTableCreator('itemReportsTableDiv', itemReportsSearchTableCreatorFile, 'itemReportsTable');
		}
	});
}


// Function to call the insertPurchase.php script to insert purchase data to db
function addPurchase() {
	var purchaseDetailsItemNumber = $('#purchaseDetailsItemNumber').val();
	var purchaseDetailsPurchaseDate = $('#purchaseDetailsPurchaseDate').val();
	var purchaseDetailsItemName = $('#purchaseDetailsItemName').val();
	var purchaseDetailsQuantity = $('#purchaseDetailsQuantity').val();
	var purchaseDetailsUnitPrice = $('#purchaseDetailsUnitPrice').val();
	var purchaseDetailsVendorName = $('#purchaseDetailsVendorName').val();
	
	$.ajax({
		url: 'model/purchase/insertPurchase.php',
		method: 'POST',
		data: {
			purchaseDetailsItemNumber:purchaseDetailsItemNumber,
			purchaseDetailsPurchaseDate:purchaseDetailsPurchaseDate,
			purchaseDetailsItemName:purchaseDetailsItemName,
			purchaseDetailsQuantity:purchaseDetailsQuantity,
			purchaseDetailsUnitPrice:purchaseDetailsUnitPrice,
			purchaseDetailsVendorName:purchaseDetailsVendorName,
		},
		success: function(data){
			$('#purchaseDetailsMessage').fadeIn();
			$('#purchaseDetailsMessage').html(data);
		},
		complete: function(){
			getItemStockToPopulate('purchaseDetailsItemNumber', getItemStockFile, 'purchaseDetailsCurrentStock');
			populateLastInsertedID(purchaseLastInsertedIDFile, 'purchaseDetailsPurchaseID');
			searchTableCreator('purchaseDetailsTableDiv', purchaseDetailsSearchTableCreatorFile, 'purchaseDetailsTable');
			reportsPurchaseTableCreator('purchaseReportsTableDiv', purchaseReportsSearchTableCreatorFile, 'purchaseReportsTable');
			searchTableCreator('itemDetailsTableDiv', itemDetailsSearchTableCreatorFile, 'itemDetailsTable');
			reportsTableCreator('itemReportsTableDiv', itemReportsSearchTableCreatorFile, 'itemReportsTable');
		}
	});
}


// Function to call the insertinjection.php script to insert injection data to db
function addInjection() {
	var injectionDetailsItemNumber = $('#injectionDetailsItemNumber').val();
	var injectionDetailsItemName = $('#injectionDetailsItemName').val();
	var injectionDetailsDiscount = $('#injectionDetailsDiscount').val();
	var injectionDetailsQuantity = $('#injectionDetailsQuantity').val();
	var injectionDetailsUnitPrice = $('#injectionDetailsUnitPrice').val();
	var injectionDetailsPatientsID = $('#injectionDetailsPatientsID').val();
	var injectionDetailsPatientsName = $('#injectionDetailsPatientsName').val();
	var injectionDetailsInjectionDate = $('#injectionDetailsInjectionDate').val();
	
	$.ajax({
		url: 'model/injection/insertInjection.php',
		method: 'POST',
		data: {
			injectionDetailsItemNumber:injectionDetailsItemNumber,
			injectionDetailsItemName:injectionDetailsItemName,
			injectionDetailsDiscount:injectionDetailsDiscount,
			injectionDetailsQuantity:injectionDetailsQuantity,
			injectionDetailsUnitPrice:injectionDetailsUnitPrice,
			injectionDetailsPatientsID:injectionDetailsPatientsID,
			injectionDetailsPatientsName:injectionDetailsPatientsName,
			injectionDetailsInjectionDate:injectionDetailsInjectionDate,
		},
		success: function(data){
			$('#injectionDetailsMessage').fadeIn();
			$('#injectionDetailsMessage').html(data);
		},
		complete: function(){
			getItemStockToPopulate('injectionDetailsItemNumber', getItemStockFile, 'injectionDetailsTotalStock');
			populateLastInsertedID(injectionLastInsertedIDFile, 'injectionDetailsInjectionID');
			searchTableCreator('injectionDetailsTableDiv', injectionDetailsSearchTableCreatorFile, 'injectionDetailsTable');
			reportsinjectionTableCreator('injectionReportsTableDiv', injectionReportsSearchTableCreatorFile, 'injectionReportsTable');
			searchTableCreator('itemDetailsTableDiv', itemDetailsSearchTableCreatorFile, 'itemDetailsTable');
			reportsTableCreator('itemReportsTableDiv', itemReportsSearchTableCreatorFile, 'itemReportsTable');
		}
	});
}


// Function to send itemNumber so that item details can be pulled from db
// to be displayed on item details tab
function getItemDetailsToPopulate(){
	// Get the itemNumber entered in the text box
	var itemNumber = $('#itemDetailsItemNumber').val();
	var defaultImgUrl = 'data/item_images/imageNotAvailable.jpg';
	var defaultImageData = '<img class="img-fluid" src="data/item_images/imageNotAvailable.jpg">';
	
	// Call the populateItemDetails.php script to get item details
	// relevant to the itemNumber which the user entered
	$.ajax({
		url: 'model/item/populateItemDetails.php',
		method: 'POST',
		data: {itemNumber:itemNumber},
		dataType: 'json',
		success: function(data){
			//$('#itemDetailsItemNumber').val(data.itemNumber);
			$('#itemDetailsProductID').val(data.productID);
			$('#itemDetailsItemName').val(data.itemName);
			$('#itemDetailsDiscount').val(data.discount);
			$('#itemDetailsTotalStock').val(data.stock);
			$('#itemDetailsUnitPrice').val(data.unitPrice);
			$('#itemDetailsDescription').val(data.description);
			$('#itemDetailsStatus').val(data.status).trigger("chosen:updated");

			newImgUrl = 'data/item_images/' + data.itemNumber + '/' + data.imageURL;
			
			// Set the item image
			if(data.imageURL == 'imageNotAvailable.jpg' || data.imageURL == ''){
				$('#imageContainer').html(defaultImageData);
			} else {
				$('#imageContainer').html('<img class="img-fluid" src="' + newImgUrl + '">');
			}
		}
	});
}


// Function to send itemNumber so that item details can be pulled from db
// to be displayed on injection details tab
function getItemDetailsToPopulateForinjectionTab(){
	// Get the itemNumber entered in the text box
	var itemNumber = $('#injectionDetailsItemNumber').val();
	var defaultImgUrl = 'data/item_images/imageNotAvailable.jpg';
	var defaultImageData = '<img class="img-fluid" src="data/item_images/imageNotAvailable.jpg">';
	
	// Call the populateItemDetails.php script to get item details
	// relevant to the itemNumber which the user entered
	$.ajax({
		url: 'model/item/populateItemDetails.php',
		method: 'POST',
		data: {itemNumber:itemNumber},
		dataType: 'json',
		success: function(data){
			//$('#injectionDetailsItemNumber').val(data.itemNumber);
			$('#injectionDetailsItemName').val(data.itemName);
			$('#injectionDetailsDiscount').val(data.discount);
			$('#injectionDetailsTotalStock').val(data.stock);
			$('#injectionDetailsUnitPrice').val(data.unitPrice);

			newImgUrl = 'data/item_images/' + data.itemNumber + '/' + data.imageURL;
			
			// Set the item image
			if(data.imageURL == 'imageNotAvailable.jpg' || data.imageURL == ''){
				$('#injectionDetailsImageContainer').html(defaultImageData);
			} else {
				$('#injectionDetailsImageContainer').html('<img class="img-fluid" src="' + newImgUrl + '">');
			}
		},
		complete: function() {
			//$('#injectionDetailsDiscount, #injectionDetailsQuantity, #injectionDetailsUnitPrice').trigger('change');
			calculateTotalInInjectionTab();
		}
	});
}


// Function to send itemNumber so that item name can be pulled from db
function getItemName(itemNumberTextBoxID, scriptPath, itemNameTextbox){
	// Get the itemNumber entered in the text box
	var itemNumber = $('#' + itemNumberTextBoxID).val();

	// Call the script to get item details
	$.ajax({
		url: scriptPath,
		method: 'POST',
		data: {itemNumber:itemNumber},
		dataType: 'json',
		success: function(data){
			$('#' + itemNameTextbox).val(data.itemName);
		},
		error: function (xhr, ajaxOptions, thrownError) {
      }
	});
}


// Function to send itemNumber so that item stock can be pulled from db
function getItemStockToPopulate(itemNumberTextbox, scriptPath, stockTextbox){
	// Get the itemNumber entered in the text box
	var itemNumber = $('#' + itemNumberTextbox).val();
	
	// Call the script to get stock details
	$.ajax({
		url: scriptPath,
		method: 'POST',
		data: {itemNumber:itemNumber},
		dataType: 'json',
		success: function(data){
			$('#' + stockTextbox).val(data.stock);
		},
		error: function (xhr, ajaxOptions, thrownError) {
        //alert(xhr.status);
        //alert(thrownError);
		//console.warn(xhr.responseText)
      }
	});
}


// Function to populate last inserted ID
function populateLastInsertedID(scriptPath, textBoxID){
	$.ajax({
		url: scriptPath,
		method: 'POST',
		dataType: 'json',
		success: function(data){
			$('#' + textBoxID).val(data);
		}
	});
}


// Function to show suggestions
function showSuggestions(textBoxID, scriptPath, suggestionsDivID){
	// Get the value entered by the user
	var textBoxValue = $('#' + textBoxID).val();
	
	// Call the showPurchaseIDs.php script only if there is a value in the
	// purchase ID textbox
	if(textBoxValue != ''){
		$.ajax({
			url: scriptPath,
			method: 'POST',
			data: {textBoxValue:textBoxValue},
			success: function(data){
				$('#' + suggestionsDivID).fadeIn();
				$('#' + suggestionsDivID).html(data);
			}
		});
	}
}


// Function to delte item from db
function deleteItem(){
	// Get the item number entered by the user
	var itemDetailsItemNumber = $('#itemDetailsItemNumber').val();
	
	// Call the deleteItem.php script only if there is a value in the
	// item number textbox
	if(itemDetailsItemNumber != ''){
		$.ajax({
			url: 'model/item/deleteItem.php',
			method: 'POST',
			data: {itemDetailsItemNumber:itemDetailsItemNumber},
			success: function(data){
				$('#itemDetailsMessage').fadeIn();
				$('#itemDetailsMessage').html(data);
			},
			complete: function(){
				searchTableCreator('itemDetailsTableDiv', itemDetailsSearchTableCreatorFile, 'itemDetailsTable');
				reportsTableCreator('itemReportsTableDiv', itemReportsSearchTableCreatorFile, 'itemReportsTable');
			}
		});
	}
}


// Function to delete item from db
function deletePatients(){
	// Get the PatientsID entered by the user
	var patientsDetailsPatientsID = $('#patientsDetailsPatientsID').val();
	
	// Call the deletePatients.php script only if there is a value in the
	// item number textbox
	if(patientsDetailsPatientsID != ''){
		$.ajax({
			url: 'model/patients/deletePatients.php',
			method: 'POST',
			data: {patientsDetailsPatientsID:patientsDetailsPatientsID},
			success: function(data){
				$('#patientsDetailsMessage').fadeIn();
				$('#patientsDetailsMessage').html(data);
			},
			complete: function(){
				searchTableCreator('patientsDetailsTableDiv', patientsDetailsSearchTableCreatorFile, 'patientsDetailsTable');
				reportsTableCreator('patientsReportsTableDiv', patientsReportsSearchTableCreatorFile, 'patientsReportsTable');
			}
		});
	}
}


// Function to delete vendor from db
function deleteVendor(){
	// Get the vendorID entered by the user
	var vendorDetailsVendorID = $('#vendorDetailsVendorID').val();
	
	// Call the deleteVendor.php script only if there is a value in the
	// vendor ID textbox
	if(vendorDetailsVendorID != ''){
		$.ajax({
			url: 'model/vendor/deleteVendor.php',
			method: 'POST',
			data: {vendorDetailsVendorID:vendorDetailsVendorID},
			success: function(data){
				$('#vendorDetailsMessage').fadeIn();
				$('#vendorDetailsMessage').html(data);
			},
			complete: function(){
				searchTableCreator('vendorDetailsTableDiv', vendorDetailsSearchTableCreatorFile, 'vendorDetailsTable');
				reportsTableCreator('vendorReportsTableDiv', vendorReportsSearchTableCreatorFile, 'vendorReportsTable');
			}
		});
	}
}


// Function to send patientsID so that patients details can be pulled from db
// to be displayed on patients details tab
function getpatientsDetailsToPopulate(){
	// Get the patientsID entered in the text box
	var patientsDetailsPatientsID = $('#patientsDetailsPatientsID').val();
	
	// Call the populateItemDetails.php script to get item details
	// relevant to the itemNumber which the user entered
	$.ajax({
		url: 'model/patients/populatePatientsDetails.php',
		method: 'POST',
		data: {patientsID:patientsDetailsPatientsID},
		dataType: 'json',
		success: function(data){
			//$('#patientsDetailsPatientsID').val(data.PatientsID);
			$('#patientsDetailsPatientsFullName').val(data.fullName);
			$('#patientsDetailsPatientsMobile').val(data.mobile);
			$('#patientsDetailsPatientsPhone2').val(data.phone2);
			$('#patientsDetailsPatientsEmail').val(data.email);
			$('#patientsDetailsPatientsAddress').val(data.address);
			$('#patientsDetailsPatientsAddress2').val(data.address2);
			$('#patientsDetailsPatientsCity').val(data.city);
			$('#patientsDetailsPatientsState').val(data.state).trigger("chosen:updated");
			$('#patientsDetailsStatus').val(data.status).trigger("chosen:updated");
		}
	});
}


// Function to send PatientsID so that Patients details can be pulled from db
// to be displayed on injection details tab
function getPatientsDetailsToPopulateinjectionTab(){
	// Get the PatientsID entered in the text box
	var patientsDetailsPatientsID = $('#injectionDetailsPatientsID').val();
	
	// Call the populatePatientsDetails.php script to get Patients details
	// relevant to the PatientsID which the user entered
	$.ajax({
		url: 'model/patients/populatePatientsDetails.php',
		method: 'POST',
		data: {patientsID:patientsDetailsPatientsID},
		dataType: 'json',
		success: function(data){
			//$('#injectionDetailsPatientsID').val(data.PatientsID);
			$('#injectionDetailsPatientsName').val(data.fullName);
		}
	});
}


// Function to send vendorID so that vendor details can be pulled from db
// to be displayed on vendor details tab
function getVendorDetailsToPopulate(){
	// Get the vendorID entered in the text box
	var vendorDetailsVendorID = $('#vendorDetailsVendorID').val();
	
	// Call the populateVendorDetails.php script to get vendor details
	// relevant to the vendorID which the user entered
	$.ajax({
		url: 'model/vendor/populateVendorDetails.php',
		method: 'POST',
		data: {vendorDetailsVendorID:vendorDetailsVendorID},
		dataType: 'json',
		success: function(data){
			//$('#vendorDetailsVendorID').val(data.vendorID);
			$('#vendorDetailsVendorFullName').val(data.fullName);
			$('#vendorDetailsVendorMobile').val(data.mobile);
			$('#vendorDetailsVendorPhone2').val(data.phone2);
			$('#vendorDetailsVendorEmail').val(data.email);
			$('#vendorDetailsVendorAddress').val(data.address);
			$('#vendorDetailsVendorAddress2').val(data.address2);
			$('#vendorDetailsVendorCity').val(data.city);
			$('#vendorDetailsVendorState').val(data.state).trigger("chosen:updated");
			$('#vendorDetailsStatus').val(data.status).trigger("chosen:updated");
		}
	});
}


// Function to send purchaseID so that purchase details can be pulled from db
// to be displayed on purchase details tab
function getPurchaseDetailsToPopulate(){
	// Get the purchaseID entered in the text box
	var purchaseDetailsPurchaseID = $('#purchaseDetailsPurchaseID').val();
	
	// Call the populatePurchaseDetails.php script to get item details
	// relevant to the itemNumber which the user entered
	$.ajax({
		url: 'model/purchase/populatePurchaseDetails.php',
		method: 'POST',
		data: {purchaseDetailsPurchaseID:purchaseDetailsPurchaseID},
		dataType: 'json',
		success: function(data){
			//$('#purchaseDetailsPurchaseID').val(data.PatientsID);
			$('#purchaseDetailsItemNumber').val(data.itemNumber);
			$('#purchaseDetailsPurchaseDate').val(data.purchaseDate);
			$('#purchaseDetailsItemName').val(data.itemName);
			$('#purchaseDetailsQuantity').val(data.quantity);
			$('#purchaseDetailsUnitPrice').val(data.unitPrice);
			$('#purchaseDetailsVendorName').val(data.vendorName).trigger("chosen:updated");
		},
		complete: function(){
			calculateTotalInPurchaseTab();
			getItemStockToPopulate('purchaseDetailsItemNumber', getItemStockFile, 'purchaseDetailsCurrentStock');
		}
	});
}


// Function to send injectionID so that injection details can be pulled from db
// to be displayed on injection details tab
function getinjectionDetailsToPopulate(){
	// Get the injectionID entered in the text box
	var injectionDetailsInjectionID = $('#injectionDetailsInjectionID').val();
	
	// Call the populateinjectionDetails.php script to get item details
	// relevant to the itemNumber which the user entered
	$.ajax({
		url: 'model/injection/populateInjectionDetails.php',
		method: 'POST',
		data: {injectionDetailsInjectionID:injectionDetailsInjectionID},
		dataType: 'json',
		success: function(data){
			//$('#injectionDetailsinjectionID').val(data.injectionID);
			$('#injectionDetailsItemNumber').val(data.itemNumber);
			$('#injectionDetailsPatientsID').val(data.patientsID);
			$('#injectionDetailsPatientsName').val(data.patientsName);
			$('#injectionDetailsItemName').val(data.itemName);
			$('#injectionDetailsInjectionDate').val(data.injectionDate);
			$('#injectionDetailsDiscount').val(data.discount);
			$('#injectionDetailsQuantity').val(data.quantity);
			$('#injectionDetailsUnitPrice').val(data.unitPrice);
		},
		complete: function(){
			calculateTotalInInjectionTab();
			getItemStockToPopulate('injectionDetailsItemNumber', getItemStockFile, 'injectionDetailsTotalStock');
		}
	});
}


// Function to call the upateItemDetails.php script to UPDATE item data in db
function updateItem() {
	var itemDetailsItemNumber = $('#itemDetailsItemNumber').val();
	var itemDetailsItemName = $('#itemDetailsItemName').val();
	var itemDetailsDiscount = $('#itemDetailsDiscount').val();
	var itemDetailsQuantity = $('#itemDetailsQuantity').val();
	var itemDetailsUnitPrice = $('#itemDetailsUnitPrice').val();
	var itemDetailsStatus = $('#itemDetailsStatus').val();
	var itemDetailsDescription = $('#itemDetailsDescription').val();
	
	$.ajax({
		url: 'model/item/updateItemDetails.php',
		method: 'POST',
		data: {
			itemNumber:itemDetailsItemNumber,
			itemDetailsItemName:itemDetailsItemName,
			itemDetailsDiscount:itemDetailsDiscount,
			itemDetailsQuantity:itemDetailsQuantity,
			itemDetailsUnitPrice:itemDetailsUnitPrice,
			itemDetailsStatus:itemDetailsStatus,
			itemDetailsDescription:itemDetailsDescription,
		},
		success: function(data){
			var result = $.parseJSON(data);
			$('#itemDetailsMessage').fadeIn();
			$('#itemDetailsMessage').html(result.alertMessage);
			if(result.newStock != null){
				$('#itemDetailsTotalStock').val(result.newStock);
			}
		},
		complete: function(){
			searchTableCreator('itemDetailsTableDiv', itemDetailsSearchTableCreatorFile, 'itemDetailsTable');			
			searchTableCreator('purchaseDetailsTableDiv', purchaseDetailsSearchTableCreatorFile, 'purchaseDetailsTable');
			searchTableCreator('injectionDetailsTableDiv', injectionDetailsSearchTableCreatorFile, 'injectionDetailsTable');
			reportsTableCreator('itemReportsTableDiv', itemReportsSearchTableCreatorFile, 'itemReportsTable');
			reportsPurchaseTableCreator('purchaseReportsTableDiv', purchaseReportsSearchTableCreatorFile, 'purchaseReportsTable');
			reportsInjectionTableCreator('injectionReportsTableDiv', injectionReportsSearchTableCreatorFile, 'injectionReportsTable');
		}
	});
}


// Function to call the upatePatientsDetails.php script to UPDATE Patients data in db
function updatePatients() {
	var patientsDetailsPatientsID = $('#patientsDetailsPatientsID').val();
	var patientsDetailsPatientsFullName = $('#patientsDetailsPatientsFullName').val();
	var patientsDetailsPatientsMobile = $('#patientsDetailsPatientsMobile').val();
	var patientsDetailsPatientsPhone2 = $('#patientsDetailsPatientsPhone2').val();
	var patientsDetailsPatientsAddress = $('#patientsDetailsPatientsAddress').val();
	var patientsDetailsPatientsEmail = $('#patientsDetailsPatientsEmail').val();
	var patientsDetailsPatientsAddress2 = $('#patientsDetailsPatientsAddress2').val();
	var patientsDetailsPatientsCity = $('#patientsDetailsPatientsCity').val();
	var patientsDetailsPatientsState = $('#patientsDetailsPatientsState').val();
	var patientsDetailsStatus = $('#patientsDetailsStatus option:selected').text();
	
	$.ajax({
		url: 'model/patients/updatePatientsDetails.php',
		method: 'POST',
		data: {
			patientsDetailsPatientsID:patientsDetailsPatientsID,
			patientsDetailsPatientsFullName:patientsDetailsPatientsFullName,
			patientsDetailsPatientsMobile:patientsDetailsPatientsMobile,
			patientsDetailsPatientsPhone2:patientsDetailsPatientsPhone2,
			patientsDetailsPatientsAddress:patientsDetailsPatientsAddress,
			patientsDetailsPatientsEmail:patientsDetailsPatientsEmail,
			patientsDetailsPatientsAddress2:patientsDetailsPatientsAddress2,
			patientsDetailsPatientsCity:patientsDetailsPatientsCity,
			patientsDetailsPatientsState:patientsDetailsPatientsState,
			patientsDetailsStatus:patientsDetailsStatus,
		},
		success: function(data){
			$('#patientsDetailsMessage').fadeIn();
			$('#patientsDetailsMessage').html(data);
		},
		complete: function(){
			searchTableCreator('patientsDetailsTableDiv', patientsDetailsSearchTableCreatorFile, 'patientsDetailsTable');
			reportsTableCreator('patientsReportsTableDiv', patientsReportsSearchTableCreatorFile, 'patientsReportsTable');
			searchTableCreator('injectionDetailsTableDiv', injectionDetailsSearchTableCreatorFile, 'injectionDetailsTable');
			reportsinjectionTableCreator('injectionReportsTableDiv', injectionReportsSearchTableCreatorFile, 'injectionReportsTable');
		}
	});
}


// Function to call the upateVendorDetails.php script to UPDATE vendor data in db
function updateVendor() {
	var vendorDetailsVendorID = $('#vendorDetailsVendorID').val();
	var vendorDetailsVendorFullName = $('#vendorDetailsVendorFullName').val();
	var vendorDetailsVendorMobile = $('#vendorDetailsVendorMobile').val();
	var vendorDetailsVendorPhone2 = $('#vendorDetailsVendorPhone2').val();
	var vendorDetailsVendorAddress = $('#vendorDetailsVendorAddress').val();
	var vendorDetailsVendorEmail = $('#vendorDetailsVendorEmail').val();
	var vendorDetailsVendorAddress2 = $('#vendorDetailsVendorAddress2').val();
	var vendorDetailsVendorCity = $('#vendorDetailsVendorCity').val();
	var vendorDetailsVendorState = $('#vendorDetailsVendorState').val();
	var vendorDetailsStatus = $('#vendorDetailsStatus option:selected').text();
	
	$.ajax({
		url: 'model/vendor/updateVendorDetails.php',
		method: 'POST',
		data: {
			vendorDetailsVendorID:vendorDetailsVendorID,
			vendorDetailsVendorFullName:vendorDetailsVendorFullName,
			vendorDetailsVendorMobile:vendorDetailsVendorMobile,
			vendorDetailsVendorPhone2:vendorDetailsVendorPhone2,
			vendorDetailsVendorAddress:vendorDetailsVendorAddress,
			vendorDetailsVendorEmail:vendorDetailsVendorEmail,
			vendorDetailsVendorAddress2:vendorDetailsVendorAddress2,
			vendorDetailsVendorCity:vendorDetailsVendorCity,
			vendorDetailsVendorState:vendorDetailsVendorState,
			vendorDetailsStatus:vendorDetailsStatus,
		},
		success: function(data){
			$('#vendorDetailsMessage').fadeIn();
			$('#vendorDetailsMessage').html(data);
		},
		complete: function(){
			searchTableCreator('purchaseDetailsTableDiv', purchaseDetailsSearchTableCreatorFile, 'purchaseDetailsTable');
			searchTableCreator('vendorDetailsTableDiv', vendorDetailsSearchTableCreatorFile, 'vendorDetailsTable');
			reportsPurchaseTableCreator('purchaseReportsTableDiv', purchaseReportsSearchTableCreatorFile, 'purchaseReportsTable');
			reportsTableCreator('vendorReportsTableDiv', vendorReportsSearchTableCreatorFile, 'vendorReportsTable');
		}
	});
}


// Function to call the updatePurchase.php script to update purchase data to db
function updatePurchase() {
	var purchaseDetailsItemNumber = $('#purchaseDetailsItemNumber').val();
	var purchaseDetailsPurchaseDate = $('#purchaseDetailsPurchaseDate').val();
	var purchaseDetailsItemName = $('#purchaseDetailsItemName').val();
	var purchaseDetailsQuantity = $('#purchaseDetailsQuantity').val();
	var purchaseDetailsUnitPrice = $('#purchaseDetailsUnitPrice').val();
	var purchaseDetailsPurchaseID = $('#purchaseDetailsPurchaseID').val();
	var purchaseDetailsVendorName = $('#purchaseDetailsVendorName').val();
	
	$.ajax({
		url: 'model/purchase/updatePurchase.php',
		method: 'POST',
		data: {
			purchaseDetailsItemNumber:purchaseDetailsItemNumber,
			purchaseDetailsPurchaseDate:purchaseDetailsPurchaseDate,
			purchaseDetailsItemName:purchaseDetailsItemName,
			purchaseDetailsQuantity:purchaseDetailsQuantity,
			purchaseDetailsUnitPrice:purchaseDetailsUnitPrice,
			purchaseDetailsPurchaseID:purchaseDetailsPurchaseID,
			purchaseDetailsVendorName:purchaseDetailsVendorName,
		},
		success: function(data){
			$('#purchaseDetailsMessage').fadeIn();
			$('#purchaseDetailsMessage').html(data);
		},
		complete: function(){
			getItemStockToPopulate('purchaseDetailsItemNumber', getItemStockFile, 'purchaseDetailsCurrentStock');
			searchTableCreator('purchaseDetailsTableDiv', purchaseDetailsSearchTableCreatorFile, 'purchaseDetailsTable');
			reportsPurchaseTableCreator('purchaseReportsTableDiv', purchaseReportsSearchTableCreatorFile, 'purchaseReportsTable');
			searchTableCreator('itemDetailsTableDiv', itemDetailsSearchTableCreatorFile, 'itemDetailsTable');
			reportsTableCreator('itemReportsTableDiv', itemReportsSearchTableCreatorFile, 'itemReportsTable');
		}
	});
}


// Function to call the updateinjection.php script to update injection data to db
function updateinjection() {
	var injectionDetailsItemNumber = $('#injectionDetailsItemNumber').val();
	var injectionDetailsInjectionDate = $('#injectionDetailsInjectionDate').val();
	var injectionDetailsItemName = $('#injectionDetailsItemName').val();
	var injectionDetailsQuantity = $('#injectionDetailsQuantity').val();
	var injectionDetailsUnitPrice = $('#injectionDetailsUnitPrice').val();
	var injectionDetailsInjectionID = $('#injectionDetailsInjectionID').val();
	var injectionDetailsPatientsName = $('#injectionDetailsPatientsName').val();
	var injectionDetailsDiscount = $('#injectionDetailsDiscount').val();
	var injectionDetailsPatientsID = $('#injectionDetailsPatientsID').val();
	
	$.ajax({
		url: 'model/injection/updateInjection.php',
		method: 'POST',
		data: {
			injectionDetailsItemNumber:injectionDetailsItemNumber,
			injectionDetailsInjectionDate:injectionDetailsInjectionDate,
			injectionDetailsItemName:injectionDetailsItemName,
			injectionDetailsQuantity:injectionDetailsQuantity,
			injectionDetailsUnitPrice:injectionDetailsUnitPrice,
			injectionDetailsInjectionID:injectionDetailsInjectionID,
			injectionDetailsPatientsName:injectionDetailsPatientsName,
			injectionDetailsDiscount:injectionDetailsDiscount,
			injectionDetailsPatientsID:injectionDetailsPatientsID,
		},
		success: function(data){
			$('#injectionDetailsMessage').fadeIn();
			$('#injectionDetailsMessage').html(data);
		},
		complete: function(){			
			getItemStockToPopulate('injectionDetailsItemNumber', getItemStockFile, 'injectionDetailsTotalStock');
			searchTableCreator('injectionDetailsTableDiv', injectionDetailsSearchTableCreatorFile, 'injectionDetailsTable');
			reportsinjectionTableCreator('injectionReportsTableDiv', injectionReportsSearchTableCreatorFile, 'injectionReportsTable');
			searchTableCreator('itemDetailsTableDiv', itemDetailsSearchTableCreatorFile, 'itemDetailsTable');
			reportsTableCreator('itemReportsTableDiv', itemReportsSearchTableCreatorFile, 'itemReportsTable');
		}
	});
}