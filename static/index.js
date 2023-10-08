// Function to handle smooth scrolling
function smoothScroll(targetId) {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
        window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth"
        });
    }
}

// Function to handle slider navigation
function navigateSlider(direction) {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');

    let currentScroll = slider.scrollLeft;
    let newScroll = currentScroll;

    if (direction === 'left') {
        newScroll = currentScroll - slider.offsetWidth;
        if (newScroll < 0) newScroll = 0;
    } else if (direction === 'right') {
        newScroll = currentScroll + slider.offsetWidth;
        if (newScroll > slider.scrollWidth - slider.offsetWidth) {
            newScroll = slider.scrollWidth - slider.offsetWidth;
        }
    }

    if (newScroll !== currentScroll) {
        slider.scrollTo({
            left: newScroll,
            behavior: 'smooth'
        });
    }
}

// Function to validate the search form
function validateSearchForm() {
    var locationInput = document.getElementById("locationInput").value;

    if (!locationInput) {
        alert("Please enter your location.");
        return false;
    }

    return true;
}

// Function to perform search action
// Function to perform search action
async function performSearch() {
    var locationInput = document.getElementById("locationInput").value;

    try {
        // Create a JavaScript object to hold the search data
        var searchData = { location: locationInput };

        // Send a POST request to the /search endpoint
        var response = await fetch('/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData) // Send the search data as JSON
        });

        if (response.ok) {
            var searchResults = await response.json();

            // Display the search results
            displaySearchResults(searchResults);
        } else {
            console.error('Failed to fetch search results.');
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}


// Function to display search results
function displaySearchResults(results) {
    var resultContainer = document.getElementById("searchResults");
    resultContainer.innerHTML = ""; // Clear previous results

    results.forEach(function (result) {
        var resultItem = document.createElement("div");
        resultItem.textContent = result;
        resultContainer.appendChild(resultItem);
    });
}
