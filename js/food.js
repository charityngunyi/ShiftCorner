function submit() {
  let searchFood = $('#searchfood').val();
  let searchType = $('#searchtype').val();
  let searchNutrient = $('#nutrients').val();
  let appID = "a3f2ef14";
  let appKey = "780080e261298f42e2c984812b650689";
  let url = "https://api.nutritionix.com/v2/search?";
  let foodurl = url + "q=" + searchFood + "&limit=4&offset=0"+ "&search_type="+searchType+ "&search_nutrient"+searchNutrient+ "&appId=" + appID + "&appKey=" + appKey;

  $.getJSON(foodurl, function(data) {
    console.log(data);
    
    var output = '<div>';
    var chart = '<div>';
    var nutrients = [];
$.each(data.results,function(key, val){
  
  output+='</div>';
  output+='<table class="foodtable">';
    
    output+='<tr>';
        
    output+='</tr>';
    output+='<colgroup>';
        output+='<col class="odd" />';
        output+='<col class="even" />';
        output+='<col class="odd" />';
        output+='<col class="even" />';
        output+='<col class="odd" />';
        output+='<col class="even" />';
        output+='<col class="odd" />';
    output+='</colgroup>';
    output+='<tr>';
    output+='<th>'+ val.item_name + '</th>';
        output+='<th>Brand Name</th>';
        output+='<th>Nutrient Name</th>';
        output+='<th>Nutrient Value</th>';
        output+='<th>Nutrient Uom</th>';
        output+='<th>Serving Quantity</th>';
        output+='<th>Serving Uom</th>';

    output+='</tr>';
    output+='<tr>';
    if(val.thumbnail != true){
      output+='<td><img src="js/item1.jpg" width="200" height="183" /></td>';
    }
    else{
      output+='<td><img src="'+ val.thumbnail +'.jpg" width="200" height="183" /></td>';
    };
        output+='<td>'+ val.brand_name + '</td>';
        output+='<td>'+ val.nutrient_name + '</td>';
        output+='<td>'+ val.nutrient_value + '</td>';
        output+='<td>'+ val.nutrient_uom + '</td>';
        output+='<td>'+ val.serving_qty + '</td>';
        output+='<td>'+ val.serving_uom + '</td>';
        
    output+='</tr>';
output+='</table>';
output+='</div>';

  chart+='<div style="top:80px;">';
  nutrients.push([val.item_name, val.nutrient_value, val.serving_qty]);
    
      google.charts.load('current', {packages: ['corechart']});
      google.charts.setOnLoadCallback(drawFoodChart);

      function drawFoodChart() {
        // Define the chart to be drawn.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Food Name');
        data.addColumn('number', 'Nutrient Value');
        data.addColumn('number', 'Nutrient Qty');
        data.addRows(nutrients);

        // Instantiate and draw the chart.
        var chart = new google.visualization.PieChart(document.getElementById('output'));
        chart.draw(data, null);
    }
    chart+='</div>';
    
  
}); 
    chart+='</div>';
    $('#output').html(chart);
    output+='</div>';
    $('#maincontent').html(output);
  });
}






