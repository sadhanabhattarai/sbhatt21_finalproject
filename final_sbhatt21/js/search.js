// this function executes our search via an AJAX call
function runSearch( term ) {
    // hide and clear the previous results, if any
    $('#results').hide();
    $('#results tbody').empty();

    // transforms all the form parameters into a string we can send to the server
    var frmStr = $('#gene_search').serialize();

    $.ajax({
        url: './sbhatt21_final.cgi',
        dataType: 'json',
        data: frmStr,
        success: function(data, textStatus, jqXHR) {
            processJSON(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Failed to perform Lineage Search! textStatus: (" + textStatus +
                  ") and errorThrown: (" + errorThrown + ")");
        }
    });
}

function clickLin( term ) {
    // hide and clear the previous results, if any
    $('#results thead').empty(); 
    $('#results tbody').empty(); 
    $('#results').hide();
    $.ajax({
        url: './lin_search.cgi',
        dataType: 'json',
        data: {'foo': term},
        success: function(data, textStatus, jqXHR) {
            processJSONLin(data);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert("Failed to perform search on the specific lineage choosen! textStatus: (" + textStatus +
                  ") and errorThrown: (" + errorThrown + ")");
        }
    });
}


function processJSONLin( data ) {
    // set the span that lists the match count
    $('#match_count_lin').text( data.match_count );
    
    // this will be used to keep track of row identifiers
    var next_row_num = 1;
    
    // iterate over each match and add a row to the result table for each
    $.each( data.matches, function(i, item) {
        var this_row_id = 'result_row' + next_row_num++;
        
        // create a row and append it to the body of the table
        $('<tr/>', { "id" : this_row_id} ).appendTo('#2');
        
        // add the Cell Line column
        $('<td/>', { "text" : item.Cell_Line } ).appendTo('#' + this_row_id);
        
        // add the Depmap_Id column
        $('<td/>', { "text" : item.Depmap_Id } ).appendTo('#' + this_row_id);
        
        // add the Primary_Disease column
        $('<td/>', { "text" : item.Primary_Disease } ).appendTo('#' + this_row_id);
        
        // add the Disease_Subtype column
        $('<td/>', { "text" : item.Disease_Subtype } ).appendTo('#' + this_row_id);

        // add the Lineage column
        $('<td/>', { "text" : item.Lineage } ).appendTo('#' + this_row_id);
	
	// add the Lineage_Subtype column
        $('<td/>', { "text" : item.Lineage_Subtype } ).appendTo('#' + this_row_id);
        
        // add the Chr column
        $('<td/>', { "text" : item.Chr } ).appendTo('#' + this_row_id);
        
        // add the Start_Position column
        $('<td/>', { "text" : item.Start_Position } ).appendTo('#' + this_row_id);
        
        // add the End_Position column
        $('<td/>', { "text" : item.End_Position } ).appendTo('#' + this_row_id);

        // add the Variant_Classification column
        $('<td/>', { "text" : item.Variant_Classification } ).appendTo('#' + this_row_id);

	// add the TCGA_Hotspot_count column
        $('<td/>', { "text" : item.TCGA_Hotspot_count } ).appendTo('#' + this_row_id);
        
        // add the Cosmic_Hs_Cnt column
        $('<td/>', { "text" : item.Cosmic_Hs_Cnt } ).appendTo('#' + this_row_id);

    });

    // now show the result section that was previously hidden
    $('#results_lin').show();
}





// this processes a passed JSON structure representing gene matches and draws it
// to the result table
function processJSON( data ) {
    // set the span that lists the match count
    $('#match_count').text( data.match_count );

    // this will be used to keep track of row identifiers
    var next_row_num = 1;

    // iterate over each match and add a row to the result table for each
    $.each( data.matches, function(i, item) {
        var this_row_id = 'result_row_' + next_row_num++;

        // create a row and append it to the body of the table
        $('<tr/>', { "id" : this_row_id} ).appendTo('#1');

        // add the Cell Line column
        $('<td/>', { "text" : item.Cell_Line } ).appendTo('#' + this_row_id);

        // add the Primary Disease column
        $('<td/>', { "text" : item.Primary_Disease } ).appendTo('#' + this_row_id);
	
	
	// add the Disease Subtype column
        $('<td/>', { "text" : item.Disease_Subtype } ).appendTo('#' + this_row_id);
	
	// add the Lineage column
        $('<td/>', { "text" : item.Lineage } ).appendTo('#' + this_row_id).click(function(){toggleClass(item.Lineage)});

	// add the Lineage Subtype column
        $('<td/>', { "text" : item.Lineage_Subtype } ).appendTo('#' + this_row_id);

	// add the Hotspot count column
        $('<td/>', { "text" : item.TCGA_Hotspot_count } ).appendTo('#' + this_row_id);
    });

    // now show the result section that was previously hidden
    $('#results').show();
}

function toggleClass( input ) {
    clickLin( input );
    // alert("Hello! I am an alert box! The clicked lineage is " + input);
}

// run our javascript once the page is ready
$(document).ready( function() {
    
    $('#results').hide();
    $('#results tbody').empty();    
    
    $('#results_lin').hide();
     $('#results_lin tbody').empty();
    // define what should happen when a user clicks submit on our search form
    $('#submit').click( function() {
        runSearch();
        return false;  // prevents 'normal' form submission
    });

});
