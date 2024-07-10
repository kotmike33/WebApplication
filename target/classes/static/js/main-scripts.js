var map = L.map('map', {
    zoomControl: false,
    minZoom: 3
}).setView([51.9752, 18.8751 - 0.01], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var savedCoordinates = { lat: null, lng: null };
map.on('contextmenu', function(e) {
    savedCoordinates.lat = e.latlng.lat;
    savedCoordinates.lng = e.latlng.lng;
});

var newPlaceButton = document.getElementById('context-new-place');
newPlaceButton.addEventListener('click', function() {
    var locName = prompt('Enter the name of this location:');
    if (locName === null || locName.trim() === '') {
        alert('Please enter a valid location name.');
        return;
    }
    var postData = {
        name: locName,
        mainpictureurl: "test",
        xy: savedCoordinates.lat + ',' + savedCoordinates.lng
    };

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    };

    fetch('/new', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response from server:', data);
            alert('Successfully added new location: ' + locName);
            savedCoordinates.lat = null;
            savedCoordinates.lng = null;
        })
        .catch(error => {
            console.error('Error occurred:', error);
            alert('Error occurred while adding new location.');
        });
});


var markers = L.layerGroup().addTo(map);
L.control.zoom({ position: 'topright' }).addTo(map);

document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('main-search-input');
    const searchResultsContainer = document.getElementById('search-results');

    if (searchButton && searchInput && searchResultsContainer) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                performSearch();
            }
        });
    } else {
        console.error('Required HTML elements not found.');
    }

    document.getElementById('menuButton').addEventListener('click', toggleSidebar);
});

function performSearch() {
    const searchInput = document.getElementById('main-search-input');
    const searchResultsContainer = document.getElementById('search-results');
    const query = searchInput.value.trim();

    if (!query) {
        console.error('Search query is empty.');
        return;
    }

    fetch('/search?query=' + encodeURIComponent(query))
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displaySearchResults(data);
        })
        .catch(error => {
            console.error('Error occurred: ' + error);
        });
}

function createLiElement(result) {
    const li = document.createElement('div');
    li.className = 'search-result';

    const nameElement = document.createElement('h3');
    nameElement.textContent = result.name;

    const locationElement = document.createElement('p');
    locationElement.textContent = `Location: ${result.xy}`;

    li.appendChild(nameElement);
    li.appendChild(locationElement);

    return li;
}

function displaySearchResults(data) {
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';

    if (Array.isArray(data) && data.length > 0) {
        const ul = document.createElement('ul');
        ul.id = 'search';
        data.forEach(result => {
            const li = createLiElement(result);
            ul.appendChild(li);
        });
        searchResultsContainer.appendChild(ul);
    } else {
        searchResultsContainer.innerText = 'No results found.';
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarHandle = document.getElementById('sidebar-handle');

    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-500px';
        sidebarHandle.style.backgroundImage = 'url("../images/right.png")';
    } else {
        sidebar.style.left = '0';
        sidebarHandle.style.backgroundImage = 'url("../images/left.png")';
    }
}
