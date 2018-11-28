function manDisplay(horseID) //Display man information of input horse ID
{
	var data = {
		data: JSON.stringify({
			"id": horseID
		})
	}
	$.ajax({
		url: "/getManData",
		type: "POST",
		data: data,
		success: function(result) {
			// ManDiv.innerHTML = result.id;
			// console.log('get horse info success...')
			var c = document.getElementById("Man_Horse_Chart")
			c.height = c.height
			var cxt = c.getContext("2d")
			var shrink_ratio = 1
			var progress = 0

			var horse_img = new Image()
			var saddle_img = new Image()
			var jockey_img = new Image()
			var trainer_img = new Image()
			var owner_img = new Image()

			var bronze_img = new Image()
			var silver_img = new Image()
			var golden_img = new Image()

			var bronze_num = parseInt(result.bronze_medal)
			var silver_num = parseInt(result.silver_medal)
			var golden_num = parseInt(result.golden_medal)

			var limit = 8

			var age = parseInt(result.age)

			horse_img.onload = function() {
				progress += 1
				if (progress == limit)
					drawImagesInCanvas(c, cxt, horse_img, saddle_img, bronze_img, silver_img, golden_img, age, trainer_img,
						owner_img, bronze_num, silver_num, golden_num, jockey_img)

			}
			horse_img.src = "/static/imgs/horse_" + result.color + ".png"

			saddle_img.onload = function() {

				progress += 1
				if (progress == limit)
					drawImagesInCanvas(c, cxt, horse_img, saddle_img, bronze_img, silver_img, golden_img, age, trainer_img,
						owner_img, bronze_num, silver_num, golden_num, jockey_img)
			}
			saddle_img.src = "/static/imgs/saddle_" + result.country + ".png"
			// console.log(result.country)

			bronze_img.onload = function() {
				progress += 1
				if (progress == limit)
					drawImagesInCanvas(c, cxt, horse_img, saddle_img, bronze_img, silver_img, golden_img, age, trainer_img,
						owner_img, bronze_num, silver_num, golden_num, jockey_img)
			}
			if (bronze_num > 0)
				bronze_img.src = "/static/imgs/medal_bronze.png"
			else
				bronze_img.src = "/static/imgs/Not_a_thing.png"

			silver_img.onload = function() {

				progress += 1
				if (progress == limit)
					drawImagesInCanvas(c, cxt, horse_img, saddle_img, bronze_img, silver_img, golden_img, age, trainer_img,
						owner_img, bronze_num, silver_num, golden_num, jockey_img)
			}
			if (silver_num > 0)
				silver_img.src = "/static/imgs/medal_silver.png"
			else
				silver_img.src = "/static/imgs/Not_a_thing.png"

			golden_img.onload = function() {

				progress += 1
				if (progress == limit)
					drawImagesInCanvas(c, cxt, horse_img, saddle_img, bronze_img, silver_img, golden_img, age, trainer_img,
						owner_img, bronze_num, silver_num, golden_num, jockey_img)
			}
			if (golden_num > 0)
				golden_img.src = "/static/imgs/medal_gold.png"
			else
				golden_img.src = "/static/imgs/Not_a_thing.png"

			jockey_img.onload = function() {

				progress += 1
				if (progress == limit)
					drawImagesInCanvas(c, cxt, horse_img, saddle_img, bronze_img, silver_img, golden_img, age, trainer_img,
						owner_img, bronze_num, silver_num, golden_num, jockey_img)
			}
			jockey_num = result.id.charCodeAt(0) % 3 + 1
			jockey_img.src = '/static/imgs/jockey_0' + jockey_num + '.png'

			trainer_img.onload = function() {

				progress += 1
				if (progress == limit)
					drawImagesInCanvas(c, cxt, horse_img, saddle_img, bronze_img, silver_img, golden_img, age, trainer_img,
						owner_img, bronze_num, silver_num, golden_num, jockey_img)

			}
			trainer_num = result.trainer[0] > 'O' ? '01' : '02'
			trainer_img.src = '/static/imgs/trainer_' + trainer_num + '.png'

			owner_img.onload = function() {

				progress += 1
				if (progress == limit)
					drawImagesInCanvas(c, cxt, horse_img, saddle_img, bronze_img, silver_img, golden_img, age, trainer_img,
						owner_img, bronze_num, silver_num, golden_num, jockey_img)

			}
			owner_num = result.owner[0] > 'O' ? '01' : '02'
			owner_img.src = '/static/imgs/owner_' + owner_num + '.png'
		}
	})

}

function drawImagesInCanvas(c, cxt, horse_img, saddle_img, bronze_img, silver_img, golden_img, age, trainer_img,
	owner_img, bronze_num, silver_num, golden_num, jockey_img) {
	var shrink_ratio = 1
	if (horse_img.width > c.width || horse_img.height > c.height)
		shrink_ratio = horse_img.width / c.width > horse_img.height / c.height ? horse_img.width / c.width : horse_img
		.height / c.height

	age_size = 0.8 + 0.2 / (9 - 3) * (age - 3)
	// age_size = 0.8
	// age_size = 1

	var a_img_new_width = horse_img.width / shrink_ratio * age_size
	var a_img_new_height = horse_img.height / shrink_ratio * age_size
	cxt.drawImage(horse_img, (c.width - a_img_new_width) / 2, c.height - a_img_new_height, a_img_new_width,
		a_img_new_height)

	var img_new_width = saddle_img.width / shrink_ratio * age_size
	var img_new_height = saddle_img.height / shrink_ratio * age_size
	cxt.drawImage(saddle_img, (c.width - img_new_width) / 2, c.height - img_new_height, img_new_width, img_new_height)

	var img_new_width = bronze_img.width / shrink_ratio * age_size
	var img_new_height = bronze_img.height / shrink_ratio * age_size
	cxt.drawImage(bronze_img, (c.width - img_new_width) / 2, c.height - img_new_height, img_new_width, img_new_height)

	var img_new_width = silver_img.width / shrink_ratio * age_size
	var img_new_height = silver_img.height / shrink_ratio * age_size
	cxt.drawImage(silver_img, (c.width - img_new_width) / 2, c.height - img_new_height, img_new_width, img_new_height)

	var img_new_width = golden_img.width / shrink_ratio * age_size
	var img_new_height = golden_img.height / shrink_ratio * age_size
	cxt.drawImage(golden_img, (c.width - img_new_width) / 2, c.height - img_new_height, img_new_width, img_new_height)

	var img_new_width = jockey_img.width / shrink_ratio
	var img_new_height = jockey_img.height / shrink_ratio
	cxt.drawImage(jockey_img, (c.width - img_new_width) / 2, c.height - (1 + 0.95 * age_size) / 2 * img_new_height,
		img_new_width,
		img_new_height)

	var img_new_width = trainer_img.width / shrink_ratio * 0.55
	var img_new_height = trainer_img.height / shrink_ratio * 0.55
	cxt.drawImage(trainer_img, c.width - img_new_width * 1.12, c.height - img_new_height * 0.95, img_new_width,
		img_new_height)

	var img_new_width = owner_img.width / shrink_ratio * 0.55
	var img_new_height = owner_img.height / shrink_ratio * 0.55
	cxt.drawImage(owner_img, c.width - img_new_width * 0.78, c.height - img_new_height * 0.95, img_new_width,
		img_new_height)

}
