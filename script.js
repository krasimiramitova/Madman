function addDays()
{
	let terms =	document.getElementById('terms'),
		button = document.getElementsByTagName('button'),
		ingredients = document.getElementsByClassName('ingredients')[0];

	terms.setAttribute('class','hide');
	button[0].setAttribute('class','hide');
	ingredients.setAttribute('class','show');
}


let images = $('.gallery').find("img"),
	arr = [], 
	k = 0, 
	l = 8, 
	lenGal = images.length,
	calcButton = $(".recipe-container").children("button");

for (let i = 0; i < lenGal; i++ )
{
	$(images[i]).attr('class',"col-1 col-s-2");
}


var slideIndex = 1;  

displaySlides(slideIndex);  

function nextSlide(n) 
{
	displaySlides(slideIndex += n);  
}  
  
function currentSlide(n) 
{
	displaySlides(slideIndex = n);  
}  

function displaySlides(n) 
{ 
	var slides = document.getElementsByClassName("showSlide"), 
		i;  
		
	if (n >= slides.length-7) 
	{
		slideIndex = slides.length-7; 
		$("a.right").addClass('hide');
	}
	else $("a.right").removeClass('hide');
	if (n <= 1)
	{
		slideIndex = 1; 
		$("a.left").addClass('hide');
	}
	else $("a.left").removeClass('hide');
	for (i = 0; i < slides.length; i++) 
	{  
		slides[i].style.display = "none";  
	}
	for (i = slideIndex - 1; i < slideIndex + 7; i++)
	{
		slides[i].style.display = "inline";
	}
} 



$(images).on('mouseenter', showPreview);
$(images).on('mouseleave', hidePreview);

function showPreview()
{	
	let imgPositionTop = $(this).position().top,
		imgPositionLeft = $(this).position().left,
		newTop = imgPositionTop + 150,
		newLeft = imgPositionLeft - 17.5, 
		ingredientName = $(this).attr("alt"),
		src = $(this).attr("src"),
		power = $(this).attr("data-power"),
		where = $("a.right").parent().parent(),
		newDiv = "<div id='preview' style= 'top:" + newTop + "px; left:" + newLeft 
		+ "px;' ><img class='col-4' src='"+ src +"' ><p class='tooltip col-5'> ingredient name: " + ingredientName
		+ "</p><p class='tooltip col-5'> magical nature: " + power 
		+ "</p></div>";

	$(newDiv).insertAfter(where);
}

function hidePreview() 
{	
	$("#preview").remove();
}


$(images).on('click', addToRecipe);

function addToRecipe()
{
	let ingredientName = $(this).attr("alt"),
		power = $(this).attr("data-power"),
		recipeAdres = $(".recipe-container").children("ul"),
		btn = $(recipeAdres).siblings('button'),
		showSlide = $(".showSlide");


//	for (let k = 7; k < showSlide.length;)
//	{	
	
//		if ( ( showSlide[k].style == "display: none" ) && ( showSlide[k-1].style == "display: inline") )
//		{
//			alert(k);
//			showSlide[k].style = "display: inline";
//			break;
//		}
//	}
	$("<li>" + ingredientName + "  - Magical nature: " + power +  "</li>").appendTo(recipeAdres);
	arr.push($(this).attr("data-power"));
	$(this).addClass("hide");
	$(".recipe-container").removeClass("place-holder");
	$(btn).removeClass();
}

$(calcButton).on('click', function(e)
	{
		let response, divDays;

		if (daysMagic(arr) > 1)	response = "You sucseeded to add " + daysMagic(arr) + " days to this world life!";
		else if (daysMagic(arr) == 1) response = "You added only " + daysMagic(arr) + " day to this world life!";
		else response = "Sorry! Today was the last day of this world life! Say goodbye to it!";
		
		divDays = "<div class='col-4 result'> " + response + "</div>";
		console.log(daysMagic(arr));
		$(divDays).insertAfter("div.recipe-container");
		$(".recipe-container").children("button").remove();

	});
 
function cutIt(arr, k)
{
	let cutArr = [],
		len = arr.length,
		begin = [], 
		end = [];

	if ((k>=0) && (k<len))
	{
		begin = arr.slice(0,k);	
		end = arr.slice(k+1,len);
		cutArr = begin.concat(end);
	}		
	return cutArr;
}

function permute(arr) 
{
	let permutations = [];
	for (let i = 0; i < arr.length; i++) 
	{
		let rest = permute(cutIt(arr, i));
	    if (rest.length<1) permutations.push([arr[i]]);
		else 
		{
			for(let j = 0; j < rest.length; j++) 
			{
				permutations.push([arr[i]].concat(rest[j]))
			}
		}
	}
	return permutations;
}
	
function daysMagic(arr)
{
	let pers = permute(arr), 
		len = pers.length,
		lenIn = pers[0].length,
		days = 0;
	if (arr.length == 1) return 1;
	else
	{
		for ( let i = 0; i < len; i++)
		{
			let flag = false;
			for ( let j = 0; j < lenIn-1; j++)
			{
				if ( pers[i][j] == pers[i][j+1] ) 
				{
					flag = true;
					break;
				}
			}
			if (!flag) days++;
		}
		return days;
	}
}


