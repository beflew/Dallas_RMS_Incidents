function mapping(offense,incidents,time,result) {
	document.getElementById('mapcontain').innerHTML="<div id='map'></div>";
	var map = new L.Map("map", {center: [32.740, -96.889], zoom: 12})
		.addLayer(new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"));
	
	
    L.canvasOverlay()
		.drawing(drawingOnCanvas)
		.addTo(leafletMap);
	
	function drawingOnCanvas(canvasOverlay, params){
		var ctx = params.canvas.getContext('2d');
            ctx.clearRect(0, 0, params.canvas.width, params.canvas.height);
            ctx.fillStyle = "None";
		
		var detachedContainer = document.createElement("custom");
		var dataContainer = d3.select(detachedContainer);
		
		console.log(offense);
		console.log(time);
		console.log(incidents);
		console.log(result);
		var data=[]
		
		
		d3.json("data/streetlevelbigroads.json", function(error, collection) {
			if (error) throw error;
			data=$.extend(collection,data);
			collection.forEach(function (d){
				d.path.forEach(function (t){
					count=0;
					t.incidents.forEach(function (incident){
						if ((in_array(incident["offense"],offense))&&(in_array(incident["time"],time))&&(in_array(incident["type"],incidents))&&(in_array(incident["result"],result))){
							count=count+1;
						}
						
					});
					t.count=count;
				});
			});
			
		
		var transform = d3.geo.transform({
			point: projectPoint
		});
		var d3path = d3.geo.path().projection(transform);

		function projectPoint(lat, lon) {
			var point = map.latLngToLayerPoint(new L.LatLng(lat, lon));
			this.stream.point(point.x, point.y);
		}
		
		var toLine = d3.svg.line()
			.interpolate("linear")
			.x(function(d) {
				return applyLatLngToLayer(d).x
			})
			.y(function(d) {
				return applyLatLngToLayer(d).y
			});

		function applyLatLngToLayer(d) {
			var y = d.lat
			var x = d.lon
			return map.latLngToLayerPoint(new L.LatLng(y, x))
		}
		draw();
		map.on("viewreset", reset);
		reset();
		drawCanvas();
		function reset() {
			for (var i=0;i<collection.length;i++){
				var ss=d3.selectAll(".path"+i)
						.attr("d",function (d){return toLine(d.points)});
						
			}
			
		}
		

		function draw(){
			mark=0
			var features = dataContainer.selectAll(".road")
				.data(collection)
				.enter()
				.append("g")
				.attr("id",function (d,i){
					return "road"+i
				})
				.attr("class",function (d){
					if (d.name!=""){
						var reg=new RegExp(" ","g"); 
						return d.name.replace(reg,"_")+" road";
					} else {
						return "road";
					}
				})
				.on("mouseover",function (d){
					if (d.name!=""){
						
						var reg=new RegExp(" ","g");
						var nameclass="."+d.name.replace(reg,"_");
						d3.selectAll(nameclass)
							.style("stroke-width",5)
					}
				})
				.on("mouseout",function (d){
					if (d.name!=""){
						var reg=new RegExp(" ","g");
						var nameclass="."+d.name.replace(reg,"_");
						d3.selectAll(nameclass)
							.style("stroke-width",2)
					}
				});

			paths=[]
			path=[]
			for (var i=0;i<collection.length;i++){
				var temp=dataContainer.select("#road"+i);
				
				var tt=temp.selectAll(".path"+i)
					.data(collection[i].path)
					.enter()
					.append("path")
					.attr("class",function (){
						var reg=new RegExp(" ","g");
						var nameclass=collection[i].name.replace(reg,"_");
						return nameclass+" path path"+i;
					})
					.style("fill","none")
					.style("stroke",function (d){
						if (d.count>20) {
							return "red";}
						if (d.count>3){
							return "yellow";}
						return "green";
					})
					.style("stroke-width",2);
				for (var j=0;j<tt[0].length;j++){
					path.push(tt[0][j])
				}
			}
			paths.push(path);
			
		}
		function drawCanvas()
			var elements = dataContainer.selectAll(".path");
			elements.each(function(d) {
				var node = d3.select(this);

				ctx.beginPath();
				ctx.lineWidth = 2;
				var p = new Path2D(node.attr("d")
				ctx.stroke(p);
				ctx.closePath();

		  });
		});
	}
}

function in_array(stringToSearch, arrayToSearch) {
 for (s = 0; s < arrayToSearch.length; s++) {
  thisEntry = arrayToSearch[s].toString();
  if (thisEntry == stringToSearch) {
   return true;
  }
 }
 return false;
}
