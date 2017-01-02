$(".submit-delete").click( function(event){
event.preventDefault
var data = {};

var database_selected = $("#database_selected").text();

console.log("Database selected is: " + database_selected);

	$(this).parent().siblings().each(function(){
		$(this).each(function(){
			$(this).each(function(){
				$(this).children().each(function(){
					data[$(this).attr('name')] = $(this).attr('value');
				});
			});
		});
	});

	for(property in data){
		console.log(property + ": " + data[property]);
	}

	var url_delete = "/"+database_selected+"/delete";
	console.log("delete url: " + url_delete);

	//var url_list = "/"+database_selected+"/list";
	//console.log("list url: " + url_list);
	$.post( url_delete, data).done(function(){
		window.location.reload();
	});
});

	$(".submit-update").click( function(event){
		event.preventDefault
		var data = {};

		var database_selected = $("#database_selected").text();

		console.log("Database selected is: " + database_selected);

		$(this).parent().siblings().each(function(){
			$(this).each(function(){
				$(this).each(function(){
					$(this).children().each(function(){
						data[$(this).attr('name')] = $(this).attr('value');
					});
				});
			});
		});
			console.log("Front end prints:");
		for(property in data){
			console.log(property + ": " + data[property]);
		}

		var url_delete = "/"+database_selected+"/update";
		console.log("update url: " + url_delete);

		$.post( url_delete, data).done(function(){
			window.location.reload();
		});
	});

	$('input').on('change', function(){
		console.log("Value changed!");
		var current = $(this);
		current.attr('value',current.val());
	});





