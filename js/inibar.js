function newNavi(){
	$(document).ready(function(){
		offenseNavi();
		incidentNavi();
		timeNavi();
		resultNavi();

	});
}

function incidentNavi(){
	var offenseIncidentType=returncrime();
		var otype=$("<li></li>");
		var otypeul=$("<ul></ul>")
				.attr("id","incidentTypeul");
		otype.attr("id","inciType")
				.append(function (){
					return $("<a></a>")
							.text("Incident Type")
							.append(function (){
								return $("<i></i>")
										.attr("class","fa fa-balance-scale leftNavIcon");
							});
				})
				.append(otypeul);
		
		offenseIncidentType.forEach(function (d){
			
			var li=$("<li></li>")
				.attr("class","offenseCrime")
				.append(function (){
					return $("<a></a>")
							.text(d)
							.attr("class","offenseCrime")
							.append(function (){
								return $("<i></i>")
										.attr("class","fa fa-angle-right leftNavIcon");
							});
				});
			li.appendTo(otypeul);
		});
					
		$("#leftNavigation").append(otype);
	
	
}

function offenseNavi(){
	var offenseType=["Offense","No Offense"]
		var otype=$("<li></li>");
		var otypeul=$("<ul></ul>")
				.attr("id","offenseTypeul");
		otype.attr("id","otype")
				.append(function (){
					return $("<a></a>")
							.text("Offense Type")
							.append(function (){
								return $("<i></i>")
										.attr("class","fa fa-balance-scale leftNavIcon");
							});
				})
				.append(otypeul);
		
		offenseType.forEach(function (d){
			
			var li=$("<li></li>")
				.attr("class","offense")
				.append(function (){
					return $("<a></a>")
							.text(d)
							.attr("class","offense")
							.append(function (){
								return $("<i></i>")
										.attr("class","fa fa-angle-right leftNavIcon");
							});
				});
			li.appendTo(otypeul);
		});
					
		$("#leftNavigation").append(otype);
}

function timeNavi(){
	var time=returntime();
		var otype=$("<li></li>");
		var otypeul=$("<ul></ul>")
				.attr("id","timeul");
		otype.attr("id","otype")
				.append(function (){
					return $("<a></a>")
							.text("Time")
							.append(function (){
								return $("<i></i>")
										.attr("class","fa fa-balance-scale leftNavIcon");
							});
				})
				.append(otypeul);
		
		time.forEach(function (d){
			
			var li=$("<li></li>")
				.attr("class","time")
				.append(function (){
					return $("<a></a>")
							.text(d)
							.attr("class","time")
							.append(function (){
								return $("<i></i>")
										.attr("class","fa fa-angle-right leftNavIcon");
							});
				});
			li.appendTo(otypeul);
		});
					
		$("#leftNavigation").append(otype);
}

function resultNavi(){
	var result=returnresult();
		var otype=$("<li></li>");
		var otypeul=$("<ul></ul>")
				.attr("id","resultul");
		otype.attr("id","otype")
				.append(function (){
					return $("<a></a>")
							.text("Result")
							.append(function (){
								return $("<i></i>")
										.attr("class","fa fa-balance-scale leftNavIcon");
							});
				})
				.append(otypeul);
		
		result.forEach(function (d){
			
			var li=$("<li></li>")
				.attr("class","result")
				.append(function (){
					return $("<a></a>")
							.text(d)
							.attr("class","result")
							.append(function (){
								return $("<i></i>")
										.attr("class","fa fa-angle-right leftNavIcon");
							});
				});
			li.appendTo(otypeul);
		});
					
		$("#leftNavigation").append(otype);
}



function returncrime(){
	return ["Violation","Property","Traffic","Prostitution","Liquor&Drugs","Property Found","Accident","Others"]
}

function returnoffense(){
	return ["Offense","No Offense"];
	
}

function returntime(){
	return ["midnight","before dawn","morning","noon","afternoon","evening","night"];
}

function returnresult(){
	return ["Clear by Arrest","Clear by Exceptional Arrest","Closed/Cleared","Open","Returned for Correction","Suspended"];
}