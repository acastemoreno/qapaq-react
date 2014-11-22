"use strict";

var gmap = {
  center: [-10.96083, -76.23509],
  urlkml: "http://acastemoreno.me/data/kapaq.kml",
  zoom: 17
};

var j_data = $.ajax({
  dataType: "json",
  url: "js/lista_data.js",
  async: false
}).responseText;
var lista_data = JSON.parse(j_data);

var Gmap = React.createClass({
	getDefaultProps: function() {
		return{
			gmap: {},
			mark: {}
		};
	},
	propTypes: function() {
		return{
			gmap: React.PropTypes.array,
			mark: React.PropTypes.array
		};
	},
	componentDidMount: function() {
		var self = this;
		var myLatlng = new google.maps.LatLng(this.props.gmap.center[0], this.props.gmap.center[1]);
  		var mapOptions = {
    			center: myLatlng,
			zoom: self.props.gmap.zoom,
			styles:[{stylers: [ {saturation: -100}]}]
  		};
  		var map = new google.maps.Map(this.refs.canvas.getDOMNode(), mapOptions);
		var kmlLayer = new google.maps.KmlLayer({
    			url: this.props.gmap.urlkml,
    			suppressInfoWindows: true,
   			map: map
  		});
		new google.maps.marker({
			values:this.props.mark.slice(1).map(function(data){
				return {
					latLng: [data.lat, data.lon],
					data: data.id
				}
			}),
			options:{
				draggable: false
			}
		});
		return true;
	},
	render: function() {
		return (
			<div ref="canvas" id="map-canvas" >
			</div>
		);
	}
});

React.render(
	<Gmap gmap={gmap} mark={lista_data} />,
	document.getElementById('content')
);
