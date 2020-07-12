let images = $('.gallery').children("img");

$(images).on('mouseenter', showPreview);
$(images).on('mouseleave', hidePreview);

function showPreview()
{	
	$(this).addClass("preview");
	let src = $(this).attr("src"),
		textTooltip = src.slice(4,-4),
		newSpan = "<span class = 'tooltiptext' >" + textTooltip + "</span>";
	$(newSpan).appendTo(this);
}

function hidePreview()
{	
	$(this).removeClass("preview");
	$(this).children().remove();
}

$(images).on('click', addToRecipe);

// до тук я докарах 
function addToRecipe()
{
	let src = $(this).attr("src"),
		ingredientName = src.slice(4,-4);
	console.log(src);
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

function cutIt(arr, i)
{
	let result = [],
		len = arr.length,
		begin = [], 
		end = [];
		if ((i>=0) && (i<len))
	{
		begin = arr.slice(0,i);	
		end = arr.slice(i+1,len);
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

		//console.log(permute([1]));

function daysMagic(arr)
{
	let pers = permute(arr); 
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