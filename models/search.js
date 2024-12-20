const input = base.html.document.querySelector('#search');
const suggestions = document.querySelector('.suggestions ul');


// const customers = await Customer.all();
function search(str) {
    const query = encodeURIComponent(str);
	
	results = fetch(`/search?q=${query}`)
        .then(response => response.json())
        .then(data => data)
        .catch(e => {
            console.error('Error fetching search results: ', e);
            return [];
     });
}


function searchHandler(e) {
	// TODO 
	//something needs to check if the user has clicked on the input and highlight and start searching

	let inputVal = input.value.trim(); 
    console.log("Searching for:", inputVal);
	if (inputVal.length > 0) {
        search(inputVal).then(results => {
            showSuggestions(results);
        });
    }
    else {
        suggestions.innerHTML = '';
    }
}

function showSuggestions(results) {
	// TODO prints suggestion results array - suggestions will be if input.includes fruit = suggestions - shows in array results 
	// takes in array results with a bunch of different suggestions inside //need indefinate number in array results that will each print to own ul
	suggestions.innerText = "";
    if (results.length > 0) {
        results.forEach(result => {
            const suggestion = document.createElement("li");
            suggestion.innerText = `${result.firstName} ${result.lastName}`;
            suggestions.appendChild(suggestion);
        });
    }
    else {
        suggestions.innerHTML = '<li>No results found</li>';
    }
}

function useSuggestion(e) {
	// TODO if user clicks on suggestion, it becomes current input uses suggestions event listener to find which is clicked 
	//to populate the Search Bar with the suggestion. Add this function to the event listener.
	if (e.target.tagName === "LI") //if you click on a li suggestion
	{
		//set value as li value
		input.value = e.target.innerText;
		suggestions.innerText = ""; //clear suggestions when one is clicked 
	}
}


input.addEventListener('keyup', searchHandler); // key is pressed
suggestions.addEventListener('click', useSuggestion); // when user selects the input from ul list