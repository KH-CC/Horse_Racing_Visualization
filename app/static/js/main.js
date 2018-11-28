function init() {
	ParentDiv = document.getElementById("parentHorse");
	RecordDiv = document.getElementById("recordHorse");
	ManDiv = document.getElementById("manHorse");
	RecordChartDiv = document.getElementById("recordHorseChart")
	
	parentDisplay();
	SelectedHorseId = null;

	$.ajaxSetup({
		cache: false //close AJAX cache 
	});

	var man_horse_canvas = document.getElementById("Man_Horse_Chart")
	var cxt = man_horse_canvas.getContext("2d")
	var default_horse_img = new Image()
	var shrink_ratio = 1

	default_horse_img.onload = function() {
		if (default_horse_img.width > man_horse_canvas.width || default_horse_img.height > man_horse_canvas.height)
			shrink_ratio = default_horse_img.width / man_horse_canvas.width > default_horse_img.height / man_horse_canvas.height ?
			default_horse_img.width / man_horse_canvas.width : default_horse_img.height / man_horse_canvas.height

		var img_new_width = default_horse_img.width / shrink_ratio
		var img_new_height = default_horse_img.height / shrink_ratio
		cxt.drawImage(default_horse_img, 0, 0, img_new_width, img_new_height)
	}

	default_horse_img.src = "/static/imgs/horse_UNKNOWN.png"

}
