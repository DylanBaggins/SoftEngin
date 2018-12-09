//bool for switcing apis
sessionStorage.setItem("api", "1");

//preparing for form submission and making sure th page is ready]
$(document).ready(() => {  
    $('#movieBar').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

//getting the movie from the user search
function getMovies(searchText) {

    //which api will be used
    var swap = sessionStorage.getItem("api");

    if (swap = "1") {
        //OMDB
        //axios to make the url request and return the reposnse data
        axios.get('http://www.OMDbapi.com/?s=' + searchText + '&apikey=b309e8b6')
        .then((response) => {
            console.log(response);
            //set the respone to a usable data form
            let movies = response.data.Search;
            //define a blank outpout to tbe filled with movie data
            let output = ``;
            //iterate through the results to build the content
            $.each(movies, (index, movie) => {
                //build an div filled with the movie data
                output += `
                <div>
                    <div>
                    <img src="${movie.Poster}">   
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelector('${movie.imdbID}'); getMovie();" href="#">Movie Details</a>
                    </div>
                </div>
            `;
            });

            $('#Movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
    } else if (swap = "0") {
        //TMDB
        //same as before but modified parameters for the other api repsonses
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=7f70288d7e54e945603b366d1098a3d9&query=' + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.results;
            let output = ``;
            $.each(movies, (index, movie) => {
                output += `
                <div>
                    <div>
                    <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}">   
                    <h5>${movie.title}</h5>
                    <a onclick="movieSelector('${movie.id}'); getMovie();" href="#">Movie Details</a>
                    </div>
                </div>
                `;
                });

                $('#Movies').html(output);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    
}

//api swap function for the main page
function setAPI() {
    var swap = sessionStorage.getItem("api");
    
    if(swap = "1") {
        sessionStorage.setItem("api", "0");
    } else {
        sessionStorage.setItem("api", "1");
    }
}

//generates and fills IMDB ids that are too short with extra 0's i.e. 1234 = 0001234
function idGetPad() {

    var ranID = Math.floor(Math.random() * 3333333) + 1;

    var idString = '' + ranID;

    while (idString.length < 7) {
        idString = '0' + idString;
    }
    return idString;
}

//uses the random id in a normla search function to return a result
function getRandom() {

    axios.get('http://www.OMDbapi.com/?i=tt' + idGetPad() + '&apikey=b309e8b6')
        .then((response) => {
            console.log(response);
            let movie = response.data;
            let output = `
            <div>
                <div>
                    <img src="${movie.Poster}">   
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelector('${movie.imdbID}')" href="#">Movie Details</a>
                </div>
            </div>
        `;
            $('#Movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

//saves a movie id to be used for the information display
function movieSelector(id) {
    sessionStorage.setItem('movieId', id);
    return false;
}

//fetches the movie information and displays it all ot the user in more detail than the search page
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    //same query but using the id search instead of the normal text search
    axios.get('http://www.OMDbapi.com/?i=' + movieId + '&apikey=b309e8b6')
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
            <div class="movHold">        
                <div class="posterHold">
                        <img src="${movie.Poster} class="thumbnail">
                    </div>
                    <div class="infoHold">
                        <h2>${movie.Title}</h2>
                        <ul class="list">
                            <li class="list-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-item"><strong>IMDb Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-item"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                        <h3>Plot</h3>
                        <p>${movie.Plot}</p>
                    </div>
                    <div class="buttonHold">
                        <a onclick="saveMovie('${movie.imdbID}')" href="#">Save Movie</a>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="blank">View IMDb</a>
                    </div>
                    </div>
        `;

            $('#Movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
}

//sets a local array to keep track of a watchlist on the users device
let WatchList = localStorage.getItem("moviesL") ? JSON.parse(localStorage.getItem("moviesL")) : [];
localStorage.setItem("moviesL", JSON.stringify(WatchList));

//saves the current movie to the users watchlist
function saveMovie(id) {

    WatchList.push(id);

    localStorage.setItem("moviesL", JSON.stringify(WatchList));

}

//removes the current movie from the users watchlist
function deleteMovie(id) {
    var aI = WatchList.indexOf(id);

    WatchList.splice(aI, 1);

    localStorage.setItem("moviesL", JSON.stringify(WatchList));
}

//generates the watchlist when the button is clicked or content is changed
function generateList() {
    var listRetrieve = JSON.parse(localStorage["moviesL"]);

    console.log(listRetrieve);

    getWatchList(listRetrieve);

}

//forcibly reloads the page
function refresh() {
    window.location.reload();
}

//builds the watchlist using the list generated above
function getWatchList(id) {

    let output = ``;

    for (i = 0; i < id.length; i++) {

        axios.get('http://www.OMDbapi.com/?i=' + id[i] + '&apikey=b309e8b6').then((response) => {
            console.log(response);
            let movie = response.data;

            output += `
            <div class="movHold">        
                <div class="posterHold">
                    <img src="${movie.Poster} class="thumbnail">
                </div>
                <div class="infoHold">
                    <h2>${movie.Title}</h2>
                    <ul class="list">
                        <li class="list-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-item"><strong>IMDb Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                    <h3>Plot</h3>
                    <p>${movie.Plot}</p>
                </div>
            <div class="buttonHold">
                <a onclick="deleteMovie('${movie.imdbID}'); generateList();" href="#">Delete Movie</a>
                <a href="http://imdb.com/title/${movie.imdbID}" target="blank">View IMDb</a>
            </div>
            </div>
            `;
            $('#Movies').html(output);
        })
            .catch((err) => {
                console.log(err);
            });
    }
}