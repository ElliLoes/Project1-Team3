
let keyStorageUserRestaurants = 'chow_town_user_restaurants';
let keyStorageTrips = 'chow_town_trips';


// load function when window is ready
window.onload = function () {


    $('#fullpage').fullpage({
        //options here
        autoScrolling: true,
        scrollHorizontally: true,
    });

    //methods
    $.fn.fullpage.setAllowScrolling(true);
}































let arrSearchResults = [
    {
        restaurant_id: 'restaurant_x',
        image_url: './scripts/chicken.png',
        name: 'restaurant X',
        location: 'Sydney',
        price: '$',
        categories: 'Alcohol',
        rating: 4.4,
        url: 'https://www.yelp.com.au/biz/belles-hot-chicken-barangaroo?osq=chicken'
    },
    {
        restaurant_id: 'restaurant_y',
        image_url: './scripts/chicken.png',
        name: 'restaurant Y',
        location: 'Sydney',
        price: '$$',
        categories: 'Cheese',
        rating: 4.5,
        url: 'https://www.yelp.com.au/biz/belles-hot-chicken-barangaroo?osq=chicken'
    },
    {
        restaurant_id: 'restaurant_z',
        image_url: './scripts/chicken.png',
        name: 'restaurant Z',
        location: 'Sydney',
        price: '$$$',
        categories: 'Vegetarian',
        rating: 4.6,
        url: 'https://www.yelp.com.au/biz/belles-hot-chicken-barangaroo?osq=chicken'
    }
];

let arrUserRestaurants = [];
let arrTrips = [];


function pushToDB(key, arr) {
    localStorage.setItem(key, JSON.stringify(arr));
}
function getFromDB() {
    let dbContentUserRestaurants = undefined;
    dbContentUserRestaurants = localStorage.getItem(keyStorageUserRestaurants);
    if (dbContentUserRestaurants === null) {
        console.log('USER BITES: no content');
    } else {
        console.log('USER BITES: content exists');
        arrUserRestaurants = JSON.parse(localStorage.getItem(keyStorageUserRestaurants));
    }

    let dbContentTrips = undefined;
    dbContentTrips = localStorage.getItem(keyStorageTrips);
    if (dbContentTrips === null) {
        console.log('TRIPS: no content');
    } else {
        console.log('TRIPS: content exists');
        arrTrips = JSON.parse(localStorage.getItem(keyStorageTrips));
    }
}
getFromDB();











let inViewTripDetails = undefined;
let inViewEditID = undefined;

//counter for trip id
let tripCounter = arrTrips.length;

let arrListSearch = [];
arrListSearch.push('Ramen');
arrListSearch.push('Bubble Tea');
arrListSearch.push('ChickenWings');
arrListSearch.push('Pizza');
renderListSearch();
function renderListSearch() {
    for (let i = 0; i < arrListSearch.length; i++) {
        $('#listSearch').append('<option value="' + arrListSearch[i] + '"></option>');
    }
}



let arrListLocation = [];
arrListLocation.push({ name: 'Adelaide', lat: -34.906101, lon: 138.593903 });
arrListLocation.push({ name: 'Brisbane', lat: -27.470125, lon: 153.021072 });
arrListLocation.push({ name: 'Canberra', lat: -35.343784, lon: 149.082977 });
arrListLocation.push({ name: 'Darwin', lat: -12.462827, lon: 130.841782 });
arrListLocation.push({ name: 'Hobart', lat: -42.87936, lon: 147.32941 });
arrListLocation.push({ name: 'Los Angeles', lat: 34.052235, lon: -118.243683 });
arrListLocation.push({ name: 'Perth', lat: -31.953512, lon: 115.857048 });
arrListLocation.push({ name: 'Sydney', lat: -33.865143, lon: 151.209900 });
renderListLocation();
function renderListLocation() {
    for (let i = 0; i < arrListLocation.length; i++) {
        $('#listLocation').append('<option value="' + arrListLocation[i].name + '"></option>');
    }
}
//////////////////////////////
/*
this code is for searching for restaurants
*/
///////////////////////////////


$('#searchFrom').on('submit', function(e) {
    e.preventDefault();
    
    $('#userInput').blur();
    let inputSearchTerm = $('#userInput').val().trim().toLowerCase();
    if (inputSearchTerm.length == 0) {
        inputSearchTerm = 'bubble tea';
        $('#userInput').val(inputSearchTerm);
    }
    let inputLocationTerm = $('#userInputLocation').val().trim().toLowerCase();
    let lat = 0;
    let lon = 0;
    for (let i = 0; i < arrListLocation.length; i++) {
        if (inputLocationTerm == arrListLocation[i].name.toLowerCase()) {
            lat = arrListLocation[i].lat;
            lon = arrListLocation[i].lon;
        } else {
            inputLocationTerm = 'Sydney';
            lat = -33.865143;
            lon = 151.209900;
            $('#userInputLocation').val(inputLocationTerm);
        }
    }


    $('#addResult').empty();
    $('#addResult').append('<tr><td colspan="1000"><p class="m-0 p-0 text-center"><i>Searching ...</i></p></td></tr>');
    
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?limit=20&latitude=' + lat + '&longitude=' + lon + '&radius=3000&sort_by=best_match&term=' + inputSearchTerm,
        method: 'GET',
        headers: {
            'Authorization': 'Bearer YD2lcCavl5yda52nTX1wKG-uHD-BRa_9izM0BLTdtg0nvbPe5j81Y9WNLsFEhnCZtOGUH2kbC4f06c7Cdw5UwR4-HJvPJtMf0izr-79DSXBaDzHpWQ3ljZJs9RiAXXYx'
        }
    }).then(function (response) {
        let arr = response.businesses;
        arrSearchResults = [];
        for (let i = 0; i < arr.length; i++) {
            let locationArr = arr[i].location.display_address;
            let locationString = '';
            for (let j = 0; j < locationArr.length; j++) {
                if (j != 0) {
                    locationString += '<br>';
                }
                locationString += locationArr[j].trim();
            }
            let categoriesArr = arr[i].categories;
            let categoriesString = '';
            for (let j = 0; j < categoriesArr.length; j++) {
                categoriesString += categoriesArr[j].title.trim();
                if (j != categoriesArr.length - 1) {
                    categoriesString += ', ';
                }

            }
            arrSearchResults.push({
                restaurant_id: arr[i].id,
                image_url: arr[i].image_url,
                name: arr[i].name,
                location: locationString,
                price: (typeof arr[i].price == 'undefined' ? '$' : arr[i].price),
                rating: arr[i].rating,
                categories: categoriesString,
                url: arr[i].url
            });
        }

        if (arrSearchResults.length != 0) {
            renderSearchResults(arrSearchResults);
        } else {
            $('#addResult').empty();
            $('#addResult').append('<tr><td colspan="1000"><p class="m-0 p-0 text-center"><i>No results found. Try again.</i></p></td></tr>');
        }
        $('#clearList').removeClass('d-none');
        $('#clearList').on('click', function () {
            $('#clearList').addClass('d-none');
            $('#addResult').empty();
            $('#userInput').val('');
            $('#userInputLocation').val('');
            $('#addResult').append('<tr><td colspan="1000"><p class="m-0 p-0 text-center"><i>Search for something.</i></p></td></tr>');
        });

    })
        .catch((err) => {
            $('#addResult').empty();
            $('#addResult').append('<tr><td colspan="1000"><p class="m-0 p-0 text-center"><i>Something went wrong. Try again.</i></p></td></tr>');
            console.log('Caught error:', err);

            $('#clearList').removeClass('d-none');
            $('#clearList').on('click', function () {
                $('#clearList').addClass('d-none');
                $('#addResult').empty();
                $('#userInput').val('');
                $('#userInputLocation').val('');
                $('#addResult').append('<tr><td colspan="1000"><p class="m-0 p-0 text-center"><i>Search for something.</i></p></td></tr>');
            });
        });
});
// activate this to allow default contents
// renderSearchResults(arrSearchResults);
function renderSearchResults(arr) {
    $('#addResult').empty();
    for (let i = 0; i < arr.length; i++) {
        appendSearchResult(arr[i]);
    }
}
function appendSearchResult(data) {
    // vars to create elements
    var tr = $("<tr>");

    // prepend to relevant table rows
    $("#addResult").prepend(tr);

    // add table contents
    tr.append("<td class='bubbleFont'>" + "<img src='src/burger-icon.png' class='mr-3 rounded food-icon'>" + data.name);
    tr.append("<td>" + data.location);
    tr.append("<td class='d-none d-md-block'>" + data.categories);
    tr.append("<td class='bubbleFont'>" + data.price);


    var tdWebsite = $("<td class='d-none d-md-block'>");
    tr.append(tdWebsite);
    var buttonWebsite = $("<button class='btn-table'>Website</button>");
    buttonWebsite.on('click', function () {
        window.open(data.url, '_blank');
    });
    tdWebsite.append(buttonWebsite);


    var tdAddCookie = $('<td>');
    tr.append(tdAddCookie);
    var buttonAddCookie = $("<button class='btn-table'>Add Bite</button>");
    buttonAddCookie.on('click', function () { addSearchToUserRestaurants(data) });
    tdAddCookie.append(buttonAddCookie);

}
function addSearchToUserRestaurants(data) {
    let toAddItem = true;
    for (let i = 0; i < arrUserRestaurants.length; i++) {
        if (data.restaurant_id == arrUserRestaurants[i].restaurant_id) {
            toAddItem = false;
        }
    }
    if (toAddItem) {
        arrUserRestaurants.push(data);
        ////database >>>
        pushToDB(keyStorageUserRestaurants, arrUserRestaurants);
        getFromDB();
        ////<<< database
        renderUserRestaurants();
    }
    console.log('restaurant already saved: ' + !toAddItem);
}
$('#addResultsButtonClear').on('click', function () {
    $('#addResults').empty();
});





























renderUserRestaurants();
function renderUserRestaurants() {
    // $('#regionBites').empty();
    $("#addBites").empty();
    for (let i = 0; i < arrUserRestaurants.length; i++) {
        prependUserRestaurant(arrUserRestaurants[i]);
    }
    if (arrUserRestaurants.length == 0) {
        prependBlankRestaurant();
    }
}
function prependBlankRestaurant() {
    var divCard = $("<div class='card mr-2 mb-2 bg-dark w-100'>");
    divCard.append('<p class="m-0 p-0 text-center"><i>Add some restaurants</i></p>');
    $("#addBites").prepend(divCard);
}
function prependUserRestaurant(data) {

    // vars to create elements
    var divCard = $("<div class='card mr-2 mb-2 bg-dark'>");
    var divCol = $("<div class='col-12'>");
    // buttons for card
    var removeBtn = $('<a id="removeBite" href="#"><img src="src/exit-icon.png" class="remove"></a>');
    var shareBtn = $('<a id="shareButton" href="#"><img src="src/share-link.png" class="share"></a>');
    var webBtn = $('<a id="webButton" href="' + data.url + '" target="_blank"><img src="src/web-link.png" class="web"></a>');


    // prepend relevant divs
    $("#addBites").prepend(divCard);
    divCard.prepend(divCol);
    divCol.prepend(removeBtn);
    divCol.prepend(shareBtn);
    divCol.prepend(webBtn);

    // add table contents
    divCol.append('<div class="d-flex"><h2 class="pr-3">' + data.name + '</h2><h2>' + data.price + '</h2></div>');
    divCol.append('<div class="d-flex"><p class="pr-3">' + data.location + '</p><p>' + data.categories + '</p></div>');
    divCol.append('<div class="btn-group btn-group-toggle mr-2" data-toggle="buttons"><label class="btn btn-green"><input type="radio" name="options" id="option1" autocomplete="off" checked>Try</label><label class="btn btn-pink"><input type="radio" name="options" id="option2" autocomplete="off"><img src="src/heart-icon.png" class="heart"></label></div>');


    let divDropdown = $('<div class="dropdown">');
    let divDropdownButton = $('<button id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="btn-table dropdown-toggle">Add Cookies</button>');
    divDropdown.append(divDropdownButton);


    let divDropdownMenu = $('<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">');
    divDropdown.append(divDropdownMenu);


    divDropdownButton.on('click', function () {
        renderBiteTrips(divDropdownMenu, data.restaurant_id);
    });

    divCol.append(divDropdown);










    removeBtn.on('click', function () {
        // let saveScrollPosition = $('#regionBites').scrollTop();
        for (let i = 0; i < arrUserRestaurants.length; i++) {
            if (data.restaurant_id == arrUserRestaurants[i].restaurant_id) {
                arrUserRestaurants.splice(i, 1);
                ////database >>>
                pushToDB(keyStorageUserRestaurants, arrUserRestaurants);
                getFromDB();
                ////<<< database

            }
        }
        renderUserRestaurants();

        if (typeof inViewTripDetails != 'undefined') {
            for (let i = 0; i < arrTrips.length; i++) {
                if (inViewTripDetails == arrTrips[i].trip_id) {
                    arrTrips[i].restaurant_ids.splice(arrTrips[i].restaurant_ids.indexOf(data.restaurant_id), 1);
                    ////database >>>
                    pushToDB(keyStorageTrips, arrTrips);
                    getFromDB();
                    ////<<< database

                    renderTripRestaurants(arrTrips[i].restaurant_ids);
                }
            }
        }
        for (let i = 0; i < arrTrips.length; i++) {
            for (let j = 0; j < arrTrips[i].restaurant_ids.length; j++) {
                let indexOfRemovedRestaurant = arrTrips[i].restaurant_ids.indexOf(data.restaurant_id);
                if (indexOfRemovedRestaurant > -1) {
                    arrTrips[i].restaurant_ids.splice(indexOfRemovedRestaurant, 1);
                    ////database >>>
                    pushToDB(keyStorageTrips, arrTrips);
                    getFromDB();
                    ////<<< database
                }
            }
        }
    });

}


function renderBiteTrips(menuElement, restaurantID) {
    // console.log('add to which trip?');
    menuElement.empty();
    for (let i = 0; i < arrTrips.length; i++) {
        prependBiteTrip(menuElement, arrTrips[i], restaurantID);
    }
    if (arrTrips.length == 0) {
        menuElement.append('<p class="m-0 p-0 text-center"><i>Create a trip first</i></p>');
    }
}
function prependBiteTrip(menuElement, tripData, restaurantID) {
    let anchor = $('<a class="dropdown-item">' + tripData.trip_name + '</a>');
    anchor.on('click', function () {
        let toAddItem = true;
        for (let i = 0; i < tripData.restaurant_ids.length; i++) {
            if (restaurantID == tripData.restaurant_ids[i]) {
                toAddItem = false;
            }
        }
        if (toAddItem) {
            tripData.restaurant_ids.push(restaurantID);
            ////database >>>
            pushToDB(keyStorageTrips, arrTrips);
            getFromDB();
            ////<<< database

            // if (typeof inViewTripDetails != 'undefined') {
            //     if (inViewTripDetails == tripData.trip_id) {
            //         renderTripRestaurants(tripData.restaurant_ids);
            //     }
            // }
            if (inViewTripDetails == tripData.trip_id) {
                renderTripRestaurants(tripData.restaurant_ids);
            }
        } else {
            console.log('already in the trip');
        }
    });
    menuElement.prepend(anchor);
}














































$('#tripCreateCancel').on('click', function () {
    $('#tripCreateInput').val('');
});


$('#tripCreateSave').on('click', function () {
    let name = $('#tripCreateInput').val().trim();

    let toSaveTrip = true;
    for (let i = 0; i < arrTrips.length; i++) {
        if (name.toUpperCase() == arrTrips[i].trip_name.toUpperCase()) {
            console.log('this name already exists');
            toSaveTrip = false;
        }
    }

    if (toSaveTrip) {
        $('#tripCreateInput').val('');

        tripCounter += 1;

        if (name.length == 0) {
            name = 'trip-' + tripCounter;
        }

        arrTrips.push({
            trip_id: 'trip' + tripCounter,
            trip_name: name.toUpperCase(),
            restaurant_ids: []
        });
        ////database >>>
        pushToDB(keyStorageTrips, arrTrips);
        getFromDB();
        ////<<< database
        renderTrips();


        $('#tripModal').modal('hide');
    } else {
        $('#tripCreateError').text('This name has already been taken');
    }
    $('#tripModal').on('hide.bs.modal', function () { $('#tripCreateError').text(''); });
});


$('#tripRenameSave').on('click', function () {
    let tripNameString = $('#tripRenameInput').val().trim().toUpperCase();

    let toSaveTrip = true;
    for (let i = 0; i < arrTrips.length; i++) {
        if (tripNameString.toUpperCase() == arrTrips[i].trip_name.toUpperCase()) {
            console.log('this name already exists');
            toSaveTrip = false;
        }
    }

    if (toSaveTrip) {
        if (tripNameString.length != 0 && typeof inViewEditID != 'undefined') {
            for (let i = 0; i < arrTrips.length; i++) {
                if (inViewEditID == arrTrips[i].trip_id) {
                    arrTrips[i].trip_name = tripNameString;
                    pushToDB(keyStorageTrips, arrTrips);
                    getFromDB();
                    renderTrips();

                    if (
                        // arrTrips[i].restaurant_ids.length == 0 && 
                        inViewEditID == inViewTripDetails) {
                        renderTripRestaurants(arrTrips[i].restaurant_ids);
                    }
                }
            }

            $('#tripModalRename').modal('hide');
        } else {
            $('#tripRenameError').text('A name is required');
        }
    } else {
        $('#tripRenameError').text('This name has already been taken');
    }

    $('#tripModalRename').on('hide.bs.modal', function () { inViewEditID = undefined; $('#tripRenameError').text(''); });
});



renderTrips();
function renderTrips() {
    $('#cardContain').empty();

    for (let i = 0; i < arrTrips.length; i++) {
        prependTrip(arrTrips[i]);
    }


    let cardCookies = $('<div class="cardCookies justify-content-center mr-2 bg-pink d-flex align-items-center p-0" style="flex: 0 0 25%;">');
    let createTripButton = $('<button id="tripButton" class="text-white w-100 h-100" href="#" data-toggle="modal"data-target="#tripModal">');
    createTripButton.append('<h2>+ Add</h2>');
    cardCookies.append(createTripButton);
    $('#cardContain').prepend(cardCookies);
}
function prependTrip(data) {
    let editTripAnchor = $('<a id="edit" href="#" data-toggle="modal" data-target="#tripModalRename">');
    editTripAnchor.append('<img src="src/edit-icon.png" class="edit">');
    editTripAnchor.on('click', () => {
        console.log(data.trip_name);
        inViewEditID = data.trip_id;
        console.log(inViewEditID);
        $('#tripRenameInput').val(data.trip_name);

    });





    let removeTripAnchor = $('<a id="removeBite"><img src="src/exit-icon.png" class="remove2">');
    removeTripAnchor.on('click', function () {
        //if the in view trip is the same as the deleted one, 
        if (data.trip_id == inViewTripDetails) {
            inViewTripDetails = undefined;
            renderTripRestaurants([]);
        }

        for (let i = 0; i < arrTrips.length; i++) {
            if (data.trip_id == arrTrips[i].trip_id) {
                arrTrips.splice(i, 1);
                ////database >>>
                pushToDB(keyStorageTrips, arrTrips);
                getFromDB();
                ////<<< database
            }
        }
        renderTrips();
    });







    let viewTripButton = $('<button id="tripRenameButton" class="text-white w-100 h-100 no-btn">');
    viewTripButton.append('<h2>' + data.trip_name + '</h2>');
    if (inViewTripDetails == data.trip_id) {
        viewTripButton.addClass('btn-success');
    }
    viewTripButton.on('click', function () {
        $('#addTripDetails').empty();
        // $(this).addClass('btn-success');
        inViewTripDetails = data.trip_id;
        for (let i = 0; i < arrTrips.length; i++) {
            if (inViewTripDetails == arrTrips[i].trip_id) {
                renderTripRestaurants(arrTrips[i].restaurant_ids);
                $('#addTripDetails').scrollTop(0);
            }
        }
    });



    let cardCookies = $('<div class="cardCookies justify-content-center mr-2 bg-dark d-flex align-items-center p-0" style="flex: 0 0 25%;">');
    cardCookies.append(editTripAnchor);

    cardCookies.append(removeTripAnchor);

    cardCookies.append(viewTripButton);
    $('#cardContain').prepend(cardCookies);
}
//pass in the array that represents the list of restaurants that belong to the trip
function renderTripRestaurants(arr) {
    $('#addTripDetails').empty();

    let title = '';
    for (let i = 0; i < arrTrips.length; i++) {
        if (inViewTripDetails == arrTrips[i].trip_id) {
            title = arrTrips[i].trip_name;
        }
    }
    if (arr.length == 0 && typeof inViewTripDetails != "undefined") {
        $('#addTripDetails').append('<tr><td colspan="1000"><p class="m-0 p-0 text-center"><b><u>' + title + '</u></b><i> currently has no restaurants</i></p></td></tr>');
    } else if (arr.length == 0 && typeof inViewTripDetails == "undefined") {
        $('#addTripDetails').append('<tr><td colspan="1000"><p class="m-0 p-0 text-center"><i>Select a trip to view details.<i></p></td></tr>');
    } else {
        $('#addTripDetails').append('<tr><td colspan="1000"><p class="m-0 p-0 text-center"><b><u>' + title + '</u></b></p></td></tr>');
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arrUserRestaurants.length; j++) {
            if (arr[i] == arrUserRestaurants[j].restaurant_id) {
                appendTripRestaurant(arrUserRestaurants[j]);
            }
        }
    }

}

function appendTripRestaurant(data) {
    // vars to create elements
    var tr = $("<tr>");

    // prepend to relevant table rows
    $("#addTripDetails").append(tr);

    // add table contents
    tr.append("<td class='bubbleFont'>" + "<img src='src/burger-icon.png' class='mr-3 rounded food-icon'>" + data.name);
    tr.append("<td>" + data.location);
    tr.append("<td class='d-none d-md-block'>" + data.categories);
    tr.append("<td class='bubbleFont'>" + data.price);


    var tdWebsite = $("<td class='d-none d-md-block'>");
    tr.append(tdWebsite);
    var buttonWebsite = $("<button class='btn-table'>Website</button>");
    buttonWebsite.on('click', function () {
        window.open(data.url, '_blank');
    });
    tdWebsite.append(buttonWebsite);


    var tdRemoveCookie = $('<td>');
    tr.append(tdRemoveCookie);
    var buttonRemoveCookie = $("<button class='btn-table'>Remove Bite</button>");
    buttonRemoveCookie.on('click', function () {
        console.log('remove this one');
        for (let i = 0; i < arrTrips.length; i++) {
            if (inViewTripDetails == arrTrips[i].trip_id) {
                // //remove the restaurant from the array.
                arrTrips[i].restaurant_ids.splice(arrTrips[i].restaurant_ids.indexOf(data.restaurant_id), 1);
                ////database >>>
                pushToDB(keyStorageTrips, arrTrips);
                getFromDB();
                ////<<< database
                renderTripRestaurants(arrTrips[i].restaurant_ids);
            }
        }
    });
    tdRemoveCookie.append(buttonRemoveCookie);

}

