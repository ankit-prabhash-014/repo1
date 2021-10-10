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
			y: {grid:{display:true},position: 'left'}
		}
	  }
	};

	window.chart = new Chart("sectorChart", window.options);
	var updateRightAxes = function(){
    		var scale = window.devicePixelRatio;

    		var sourceCanvas = window.chart.canvas;
    		var copyWidth = window.chart.scales.y.width;
    		var copyHeight = window.chart.scales.y.height + window.chart.scales.y.top + 10;

    		var targetCtx = document.getElementById("chart-axis").getContext("2d");

    		targetCtx.scale(scale, scale);
    		targetCtx.canvas.width = copyWidth * scale;
    		targetCtx.canvas.height = copyHeight * scale;

    		targetCtx.canvas.style.width = `${copyWidth}px`;
    		targetCtx.canvas.style.height = `${copyHeight}px`;
    		targetCtx.drawImage(sourceCanvas, 0, 0, copyWidth * scale, copyHeight * scale, 0, 0, copyWidth * scale, copyHeight * scale);

    		var sourceCtx = sourceCanvas.getContext('2d');

    		// Normalize coordinate system to use css pixels.

    		sourceCtx.clearRect(0, 0, copyWidth * scale, copyHeight * scale);
    		rectangleSet = true;
    	};
    	setTimeout(updateRightAxes, 10);
	
	$(".sector-name").on("click", function() {
        $(this).toggleClass("not-showing");
        var sector = $(this).find(".s-name").text();
        var index = $(this).attr("data-index")-1;
        window.datasets[index].hidden = !window.datasets[index].hidden;
        window.chart.update();
        $(".tr[sector='"+sector+"']").toggleClass('sec-showing');
	    setTimeout(updateRightAxes, 10);
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
