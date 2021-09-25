$(document).ready(function(){
	window.options = {
	  type: "line",
	  data: {
		labels: window.labels,
		datasets: window.datasets
	  },
	  options: {
		elements: {point:{radius: 0}},
		plugins:{legend: {display: false}},
		scales: {
			x: {grid:{display:true}},
			y: {grid:{display:true},position: 'right'}
		}
	  }
	};

	window.chart = new Chart("sectorChart", window.options);
	
	$(".sector-name").on("click", function() {
	   $(this).toggleClass("not-showing"); 
	   var sector = $(this).find(".s-name").text(); 
	   var index = $(this).attr("data-index");
	   window.datasets[index].hidden = !window.datasets[index].hidden;
	   window.chart.update();
	   $(".tr[sector='"+sector+"']").toggleClass('sec-showing');
	});
	
	$("#watchlistTable .sortable").on("click", function() {
		var index = $(this).parent().children().index($(this));
		sortTable(index, $(this).attr("sortorder"));
	});
	
	$(document).on("change paste keyup", ".filter-row .field-symbol", function() {
		var val = $(".filter-row .field-symbol").val();
		
		if(val.length<3) {
			$(".updatable").removeClass('searched');
		} else {
			$(".updatable").removeClass('searched');
			if(val.startsWith('.')){
				$(val).closest('.updatable').addClass('searched');
			} else {
				$('.field-symbol a:contains('+val.toUpperCase()+')').closest('.updatable').addClass('searched');
			}
		}
	});	
	
});

function sortTable(n, direction) {
	var rows, i, x;
	rows = $("#watchlistTable .tr");
	var map = [];
	
    for (i = 0; i < (rows.length); i++) {
		x = rows[i].getElementsByClassName("td")[n];
		map.push({"position": i, "value": Number($(x).text())});
	}
	
	if(direction==1) {
		map.sort((a, b) => {
			return b.value - a.value;
		});
	} else  {
		map.sort((a, b) => {
			return a.value - b.value;
		});
	}
	
	map.forEach (function(item, index){
		rows[item.position].style.order=index;
	});
}
