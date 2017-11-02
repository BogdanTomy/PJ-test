$(document).ready(function () {
	
	var initPaje = 'https://swapi.co/api/people/'
		prevPage = 0,
		nextPage = 0,
		prodCard = $('#content_body'),
		tempCard = $('#temp_card');
		checkboxCounter = 1;


	/*--Checkbox--*/

	var getStaticCheckbox = function () {
	    $('input[type="checkbox"]').each(function() {
	        if (localStorage.getItem($(this).attr('name')) == 'true') {
	            $(this).attr('checked', true);
	        }
	    });
	    $('input[type="checkbox"]').on('click', function() {
	        var isChecked = ($(this).is(':checked')) ? true : false;
	        localStorage.setItem($(this).attr('name'), isChecked);
	    });
	};

	/*--Get char data--*/

	var getCaracters = function(paje){
		
		var xhr = new XMLHttpRequest();

		xhr.open("GET", paje, true);

		xhr.send();

		xhr.onreadystatechange = function () {
			if(xhr.readyState !== 4) { return;
			}
			if(xhr.status !== 200) {
				console.log(xhr.status + ': ' + xhr.statusText);
			} else{
				var sourse = JSON.parse(xhr.responseText).results;

				nextPage = JSON.parse(xhr.responseText).next;
				prevPage = JSON.parse(xhr.responseText).previous;
				console.log(nextPage + ' ' + prevPage);

				function filler (root, temp, s){
					prodCard.empty();

					s.forEach( function fill (data){
						console.log(checkboxCounter)
						var body = $(tempCard.html());

						body.find('.character-name')
							.text(data.name);

						body.find('.char-height')
							.text("Height: " + data.height);

						body.find('.char-mass')
							.text("Mass: " + data.mass);

						body.find('.char-hair-color')
							.text("Hair color: " + data.hair_color);

						body.find('.char-skin-color')
							.text("Skin color: " + data.skin_color);

						body.find('.char-eye-color')
							.text("Eye color: " + data.eye_color);

						body.find('.char-birth-year')
							.text("Birth year: " + data.birth_year);

						body.find('.char-gender')
							.text("Gender: " + data.gender);

						body.find('input[type="checkbox"]')
							.attr('name', 'option['+checkboxCounter+']')
							.attr('value', checkboxCounter);

						checkboxCounter++;

						root.append(body);
					});

					getStaticCheckbox()
				};

				filler(prodCard, tempCard, sourse);
			}
		}
	};

	getCaracters(initPaje);

	

	/*--Prev Btn--*/

	$('#prev-page').on('click', function(e){
		if(prevPage) { getCaracters(prevPage);
			checkboxCounter -= 20
		} else {

			return false;
		}
	});


	/*--Next Btn--*/

	$('#next-page').on('click', function(e){
		if(nextPage) { getCaracters(nextPage);
		} else {

			return false;
		}
	});


	/*--Anchor--*/

	$(".anchor").on('click', function(event) {

		event.preventDefault();

	    var elementClick = $(this).attr("href")
	    var destination = $(elementClick).offset().top;

	    jQuery("html:not(:animated),body:not(:animated)").animate({
	    	scrollTop: destination
	    }, 500);

	    return false;
  	});


  	/*--Epic Audio--*/

	setTimeout( function(){
		$('audio').fadeIn("slow");
	}, 3000)


	/*--Little Message--*/
	
	setTimeout( function(){
		$('.little-message').slideDown("slow");

		setTimeout( function(){
		$('.little-message').slideUp("slow");

		}, 3000)
	}, 5000)
});