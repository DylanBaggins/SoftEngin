$(document).ready(() => {
    $('#movieBar').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get('http://www.OMDbapi.com/?s=' + searchText + '&apikey=b309e8b6')
    .then((response) => {
        console.log(response);
        let movies = response.data.Search;
        let output = ``;
        $.each(movies, (index, movie) => {
            output += `
                <div class="col-md-3">
                    <div class="well text-center">
                    <img src="${movie.Poster}">   
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelector('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
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

<<<<<<< HEAD
function getRandom() {
    
    var ranID = Math.floor(Math.random() * 10000000);
    console.log(ranID);
    
    axios.get('http://www.OMDbapi.com/?i=tt' + String(ranID) + '&apikey=b309e8b6')
    .then((response) => {
        console.log(response);
        let movie = response.data;
        let output = `
                <div class="col-md-3">
                    <div class="well text-center">
                    <img src="${movie.Poster}">   
                    <h5>${movie.Title}</h5>
                    <a onclick="movieSelector('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
            `;
            $('#Movies').html(output);
        })
    .catch((err) => {
        console.log(err);
    });
}

=======
>>>>>>> 98792984ab70b071697a82b6c3ffbe3943635fd0
function movieSelector(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.OMDbapi.com/?i=' + movieId + '&apikey=b309e8b6')
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster} class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                        <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                        <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                        <li class="list-group-item"><strong>IMDb Rating:</strong> ${movie.imdbRating}</li>
                        <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                        <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                        <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
<<<<<<< HEAD
                    <a onclick="saveMovie('${movie.imdbID}')" class="btn btn-primary" href="#">Save Movie</a>
=======
>>>>>>> 98792984ab70b071697a82b6c3ffbe3943635fd0
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-primary">View IMDb</a> 
                    <a href="main.html" class="btn btn-default">Back to Search</a>
                </div>
            </div>
        `;

        $('#Movie').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
<<<<<<< HEAD
}

let WatchList = localStorage.getItem("moviesL") ? JSON.parse(localStorage.getItem("moviesL")) : [];
localStorage.setItem("moviesL", JSON.stringify(WatchList));

function saveMovie(id) {
    
    WatchList.push(id);
    
    localStorage.setItem("moviesL", JSON.stringify(WatchList));

}

function deleteMovie(id) {
    var aI = WatchList.indexOf(id);

    WatchList.splice(aI, 1);

    localStorage.setItem("moviesL", JSON.stringify(WatchList));
}

function generateList() {
    var listRetrieve = JSON.parse(localStorage["moviesL"]);

    console.log(listRetrieve);

    getWatchList(listRetrieve);

}

function refresh() {
    window.location.reload();
}

function getWatchList(id) {
    
    let output = ``;
    
    for (i = 0; i < id.length; i++) {

        axios.get('http://www.OMDbapi.com/?i=' + id[i] + '&apikey=b309e8b6').then((response) => {
            console.log(response);
            let movie = response.data;

            output += `
                <div class="row">
                    <div class="col-md-4">
                        <img src="${movie.Poster} class="thumbnail">
                    </div>
                    <div class="col-md-8">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDb Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        ${movie.Plot}
                        <a onclick="deleteMovie('${movie.imdbID}'); refresh(); generateList();" class="btn btn-primary" href="#">Delete Movie</a>
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="blank" class="btn btn-primary">View IMDb</a> 
                        <a href="main.html" class="btn btn-default">Back to Search</a>
                    </div>
                </div>
            `;
            $('#List').html(output);
        })
        .catch((err) => {
            console.log(err);
        });
    }   
=======
>>>>>>> 98792984ab70b071697a82b6c3ffbe3943635fd0
}