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
        let output = '';
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