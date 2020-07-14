let images = $('.gallery').children("img"),
	arr = [],
	calcButton = $(".recipe-container").children("button");

$(images).on('mouseenter', showPreview);
$(images).on('mouseleave', hidePreview);
$(images).on('click', addToRecipe);
console.log(arr);

//$(calcButton).on('click', daysMagic(arr));
console.log(daysMagic(arr));






function cutIt(arr, k)
{
	let result = [],
		len = arr.length,
		begin = [], 
		end = [];

	if ((k>=0) && (k<len))
	{
		begin = arr.slice(0,k);	
		end = arr.slice(k+1,len);
		result = begin.concat(end);
	}		
	return result;
}

function permute(arr) 
{
	let result = [];
	for (let i = 0; i < arr.length; i++) 
	{
		let rest = permute(cutIt(arr, i));
	    if (rest.length<1) result.push([arr[i]]);
		else 
		{
			for(let j = 0; j < rest.length; j++) 
			{
				result.push([arr[i]].concat(rest[j]))
			}
		}
	}
	return result;
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

function addDays()
{
	let terms =	document.getElementById('terms'),
		button = document.getElementsByTagName('button'),
		ingredients = document.getElementsByClassName('ingredients')[0];

	terms.setAttribute('class','hide');
	button[0].setAttribute('class','hide');
	ingredients.setAttribute('class','show');
}

function showPreview()
{	
	let src =  $(this).attr("src"),
		ingredientName = src.slice(4,-4),
		imgPositionTop = $(this).position().top,
		imgPositionLeft = $(this).position().left,
		newTop = imgPositionTop + 34,
		newLeft = imgPositionLeft - 17.5, 
		where = $(this).parent(),
		newDiv = "<div id='pr' class='preview-containter' style='top:" + newTop + "; left:" + newLeft + " ;' ><img class='preview' src='"+ src +"' ><p>" + ingredientName + "</p></div>";

	$(newDiv).appendTo(where);
}

function hidePreview() 
{	
	$("#pr").remove();
}

function addToRecipe()
{
	let ingredientName = $(this).attr("src").slice(4,-4),
		recipeAdres = $(".recipe-container").children("ul"),
		btn = $(recipeAdres).siblings('button');
	$("<li>" + ingredientName + "</li>").appendTo(recipeAdres);
	arr.push($(this).attr("alt"));
	$(btn).removeClass();
	console.log(arr);

}