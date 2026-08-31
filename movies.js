// ==========================================================
// MOVIE CLASS
// ==========================================================

// This class is used to create Movie objects.
class Movie {

    constructor(id, title, year, image_url, price) {

        this.id = id;
        this.title = title;
        this.year = year;
        this.image_url = image_url;
        this.price = price;

    }


    // ------------------------------------------------------
    // Used by DEMO 1
    // Creates the HTML for a normal movie card.
    // ------------------------------------------------------

    render() {

        return `
            <div class="col-12 col-sm-6 col-lg-4 p-2">

                <div class="movie-card h-100">

                    <img
                        src="${this.image_url}"
                        class="movie-poster"
                        alt="${this.title}"
                    >

                    <h3 class="text-center mt-3">
                        ${this.title}
                    </h3>

                    <p class="text-center">
                        Year: ${this.year}
                    </p>

                </div>

            </div>
        `;

    }


    // ------------------------------------------------------
    // Used by DEMO 4
    // Creates the HTML for a movie shop card.
    // ------------------------------------------------------

    renderShopMovie() {

        return `
            <div class="col-12 col-sm-6 col-lg-4 p-2">

                <div class="movie-card h-100 text-center">

                    <img
                        src="${this.image_url}"
                        class="movie-poster"
                        alt="${this.title}"
                    >

                    <h4 class="mt-3">
                        ${this.title}
                    </h4>

                    <p>
                        Year: ${this.year}
                    </p>

                    <p>
                        <strong>
                            Price: $${this.price.toFixed(2)}
                        </strong>
                    </p>

                    <button
                        class="btn btn-warning"
                        type="button"
                        onclick="addToCart(${this.id})"
                    >

                        <i class="bi bi-cart-plus"></i>

                        Add to Cart

                    </button>

                </div>

            </div>
        `;

    }

}



// ==========================================================
// MOVIE DATA
// ==========================================================

// Array containing the information about each movie.
let topMovies = [

    {
        id: 0,
        title: "The Shawshank Redemption",
        year: 1994,
        price: 14.99,
        image_url:
            "https://www.filmsite.org/posters/shawshankredemption.jpg"
    },

    {
        id: 1,
        title: "The Godfather",
        year: 1972,
        price: 12.99,
        image_url:
            "https://media.timeout.com/images/105455970/750/562/image.jpg"
    },

    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        price: 16.99,
        image_url:
            "https://upload.wikimedia.org/wikipedia/sco/8/8a/Dark_Knight.jpg"
    },

    {
        id: 3,
        title: "Star Wars",
        year: 1977,
        price: 15.99,
        image_url:
            "https://media.timeout.com/images/105456000/750/562/image.jpg"
    },

    {
        id: 4,
        title: "Schindler's List",
        year: 1993,
        price: 13.99,
        image_url:
            "https://upload.wikimedia.org/wikipedia/en/3/38/Schindler%27s_List_movie.jpg"
    },

    {
        id: 5,
        title: "Star Wars: The Clone Wars",
        year: 2008,
        price: 17.99,
        image_url:
            "images/star%20wars%20clone%20wars.webp"
    }

];



// ==========================================================
// CREATE MOVIE OBJECTS
// ==========================================================

// This array will contain Movie objects.
let movieObjects = [];


// Loop through topMovies and convert each item into
// a Movie object.
for (let i = 0; i < topMovies.length; i++) {

    let movie = new Movie(

        topMovies[i].id,
        topMovies[i].title,
        topMovies[i].year,
        topMovies[i].image_url,
        topMovies[i].price

    );


    // Add the Movie object to movieObjects.
    movieObjects.push(movie);

}



// ==========================================================
// FOUR JAVASCRIPT DEMO BUTTONS
// ==========================================================

// This function displays the selected demo and hides the others.
function showDemo(demoNumber) {


    // There are four demo sections.
    for (let i = 1; i <= 4; i++) {


        // Hide the demo.
        document
            .getElementById("demo" + i)
            .classList.add("d-none");


        // Remove the orange colour from the button.
        document
            .getElementById("demoBtn" + i)
            .classList.remove("active-demo");

    }


    // Show the selected demo.
    document
        .getElementById("demo" + demoNumber)
        .classList.remove("d-none");


    // Make the selected button orange.
    document
        .getElementById("demoBtn" + demoNumber)
        .classList.add("active-demo");

}



// ==========================================================
// DEMO 1
// SEARCH AND FILTER MOVIES
// ==========================================================


// Displays movie cards on the page.
function displayMovies(movies) {

    let movieContent = "";


    // Check if there are any movies.
    if (movies.length === 0) {

        movieContent = `
            <div class="col-12">

                <div class="alert alert-warning">

                    No movies were found.

                </div>

            </div>
        `;

    } else {


        // Loop through all movies.
        for (let i = 0; i < movies.length; i++) {

            movieContent += movies[i].render();

        }

    }


    // Place the movie cards into the webpage.
    document.getElementById("movie-list").innerHTML =
        movieContent;

}



// Display all movies when the page first loads.
displayMovies(movieObjects);



// Search function.
function displayFilteredMovies() {


    // Get what the user typed into the search box.
    let keyword = document
        .getElementById("searchInput")
        .value
        .trim()
        .toLowerCase();


    // Filter the Movie objects.
    let filteredMovies = movieObjects.filter(

        function (movie) {

            return movie.title
                .toLowerCase()
                .includes(keyword);

        }

    );


    // Display the matching movies.
    displayMovies(filteredMovies);

}



// Reset the movie search.
function resetMovieSearch() {


    // Clear the search field.
    document.getElementById("searchInput").value = "";


    // Display every movie again.
    displayMovies(movieObjects);

}



// Allow Enter to perform the movie search.
document
    .getElementById("searchInput")
    .addEventListener("keydown", function (event) {


        if (event.key === "Enter") {

            displayFilteredMovies();

        }

    });



// ==========================================================
// DEMO 2
// MOVIE WATCH LIST
// ==========================================================


// Array used to store movies added to the watch list.
let watchList = [];



// Create the dropdown menu.
function loadMovieDropdown() {


    let movieSelect =
        document.getElementById("movieSelect");


    let options = `
        <option value="">
            Please select a movie
        </option>
    `;


    // Add every movie to the dropdown.
    for (let i = 0; i < movieObjects.length; i++) {

        options += `

            <option value="${movieObjects[i].id}">

                ${movieObjects[i].title}
                (${movieObjects[i].year})

            </option>

        `;

    }


    // Insert dropdown options.
    movieSelect.innerHTML = options;

}



// Add a selected movie to the watch list.
function addMovieToWatchList() {


    // Get the selected dropdown value.
    let selectedValue =
        document.getElementById("movieSelect").value;


    // Check that something has been selected.
    if (selectedValue === "") {

        alert("Please select a movie first.");

        return;

    }


    // Convert the selected value to a number.
    let selectedMovieID =
        Number(selectedValue);


    // Find the selected movie.
    let selectedMovie = movieObjects.find(

        function (movie) {

            return movie.id === selectedMovieID;

        }

    );


    // Check if the movie is already in the watch list.
    let alreadyAdded = watchList.some(

        function (movie) {

            return movie.id === selectedMovieID;

        }

    );


    // Prevent duplicate movies.
    if (alreadyAdded) {

        alert(
            selectedMovie.title +
            " is already in your watch list."
        );

        return;

    }


    // Add the movie.
    watchList.push(selectedMovie);


    // Update the webpage.
    displayWatchList();

}



// Display the watch list.
function displayWatchList() {


    let content = "";


    // Get the empty message.
    let emptyMessage =
        document.getElementById(
            "emptyWatchListMessage"
        );


    // If the watch list is empty.
    if (watchList.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    // Loop through the watch list.
    for (let i = 0; i < watchList.length; i++) {


        content += `

            <li class="
                list-group-item
                d-flex
                justify-content-between
                align-items-center
            ">


                <div>

                    <strong>
                        ${watchList[i].title}
                    </strong>

                    <br>

                    <small>
                        Released: ${watchList[i].year}
                    </small>

                </div>


                <button
                    class="btn btn-sm btn-danger"
                    type="button"
                    onclick="removeFromWatchList(${watchList[i].id})"
                >

                    Remove

                </button>


            </li>

        `;

    }


    // Display list.
    document.getElementById("watchList").innerHTML =
        content;

}



// Remove one movie from the watch list.
function removeFromWatchList(movieID) {


    // Keep all movies except the selected movie.
    watchList = watchList.filter(

        function (movie) {

            return movie.id !== movieID;

        }

    );


    // Update the list.
    displayWatchList();

}



// Remove everything from the watch list.
function clearWatchList() {


    watchList = [];


    displayWatchList();

}



// Create dropdown when page loads.
loadMovieDropdown();



// ==========================================================
// DEMO 3
// CUSTOMIZE THE WEBPAGE
// ==========================================================


// Get the customisable part of the webpage.
const pageContent =
    document.getElementById("page_content");



// ----------------------------------------------------------
// LOAD SAVED BACKGROUND COLOUR
// ----------------------------------------------------------

if (
    pageContent &&
    localStorage.getItem("color_preference") !== null
) {


    pageContent.style.backgroundColor =
        localStorage.getItem("color_preference");


    // Change the dropdown to the saved value.
    document.getElementById("colorOption").value =
        localStorage.getItem("color_preference");

}



// ----------------------------------------------------------
// LOAD SAVED TEXT SIZE
// ----------------------------------------------------------

if (
    pageContent &&
    localStorage.getItem("size_preference") !== null
) {


    pageContent.style.fontSize =
        localStorage.getItem("size_preference");


    // Change dropdown to saved value.
    document.getElementById("text-size").value =
        localStorage.getItem("size_preference");

}



// ----------------------------------------------------------
// CHANGE BACKGROUND COLOUR
// ----------------------------------------------------------

function changeColor() {


    // Get selected colour.
    const selectedBGColor =
        document.getElementById("colorOption").value;


    // Do nothing if no colour is selected.
    if (!selectedBGColor || !pageContent) {

        return;

    }


    // Change background.
    pageContent.style.backgroundColor =
        selectedBGColor;


    // Save preference permanently in browser.
    localStorage.setItem(
        "color_preference",
        selectedBGColor
    );

}



// ----------------------------------------------------------
// CHANGE TEXT SIZE
// ----------------------------------------------------------

function customizeText() {


    // Get selected text size.
    const selectedTextSize =
        document.getElementById("text-size").value;


    // Do nothing if no size selected.
    if (!selectedTextSize || !pageContent) {

        return;

    }


    // Change text size.
    pageContent.style.fontSize =
        selectedTextSize;


    // Save preference in Local Storage.
    localStorage.setItem(
        "size_preference",
        selectedTextSize
    );

}



// ----------------------------------------------------------
// RESET CUSTOMISATION
// ----------------------------------------------------------

function resetCustomisation() {


    // Remove custom styling.
    pageContent.style.backgroundColor = "";

    pageContent.style.fontSize = "";


    // Reset dropdowns.
    document.getElementById("colorOption").value = "";

    document.getElementById("text-size").value = "";


    // Remove Local Storage values.
    localStorage.removeItem("color_preference");

    localStorage.removeItem("size_preference");

}



// ----------------------------------------------------------
// MORE / LESS FUNCTION
// ----------------------------------------------------------

function expandText() {


    const detailedText =
        document.getElementById("detailed");


    const expandBtn =
        document.getElementById("expandBtn");


    // Check the current state.
    if (detailedText.style.display === "none") {


        // Show extra text.
        detailedText.style.display = "block";


        // Change button.
        expandBtn.textContent = "LESS";


    } else {


        // Hide extra text.
        detailedText.style.display = "none";


        // Change button.
        expandBtn.textContent = "MORE";

    }

}



// ==========================================================
// DEMO 4
// MOVIE SHOPPING CART
// ==========================================================


// Array containing movies added to the cart.
let cart = [];



// Display all movie products.
function displayShopMovies() {


    let content = "";


    // Create a shop card for each movie.
    for (let i = 0; i < movieObjects.length; i++) {

        content +=
            movieObjects[i].renderShopMovie();

    }


    // Display movie products.
    document.getElementById(
        "shop-movie-list"
    ).innerHTML = content;

}



// Add movie to the shopping cart.
function addToCart(movieID) {


    // Find the movie.
    let selectedMovie = movieObjects.find(

        function (movie) {

            return movie.id === movieID;

        }

    );


    // Add movie if found.
    if (selectedMovie) {

        cart.push(selectedMovie);

    }


    // Update shopping cart.
    displayCart();

}



// Display the shopping cart.
function displayCart() {


    let cartContent = "";

    let total = 0;


    // ----------------------------------------------
    // EMPTY CART
    // ----------------------------------------------

    if (cart.length === 0) {


        cartContent = `

            <p>
                Your cart is empty.
            </p>

        `;


    } else {


        // ------------------------------------------
        // DISPLAY CART ITEMS
        // ------------------------------------------

        for (let i = 0; i < cart.length; i++) {


            cartContent += `

                <div class="
                    cart-item
                    d-flex
                    justify-content-between
                    align-items-center
                ">


                    <div>

                        <strong>
                            ${cart[i].title}
                        </strong>

                        <br>

                        $${cart[i].price.toFixed(2)}

                    </div>


                    <button
                        class="btn btn-sm btn-danger"
                        type="button"
                        onclick="removeFromCart(${i})"
                    >

                        Remove

                    </button>


                </div>

            `;


            // Add movie price to total.
            total += cart[i].price;

        }

    }


    // Display cart items.
    document.getElementById(
        "cartItems"
    ).innerHTML = cartContent;


    // Display total with two decimal places.
    document.getElementById(
        "cartTotal"
    ).textContent = total.toFixed(2);

}



// Remove one item from the cart.
function removeFromCart(index) {


    // Remove one item at the selected position.
    cart.splice(index, 1);


    // Update cart.
    displayCart();

}



// Remove all items from the cart.
function clearCart() {


    cart = [];


    displayCart();

}



// Display movie shop when page loads.
displayShopMovies();



// Display empty shopping cart when page loads.
displayCart();