//Global const variables
const API_KEY = "49cf0e81ad87db4a10b79c1291f7109c";
const language = "en-US";
//query variables
const movieForm = document.querySelector("#search-form");
const movieArea = document.getElementById("movie-grid");
const getMovie = document.getElementById("search-input");
const playing_title = document.getElementById("playing-title");
const loadMoreBtn = document.getElementById("load-more-movies-btn")
//var variables
var page = 1;
var submit = false;

//image path
const IMGPATH = "https://image.tmdb.org/t/p/w300";
//api for Searching Movies
const apiSearchEndpoint = "https://api.themoviedb.org/3/search/movie" //endpoint for searching movies

//event listener
movieForm.addEventListener("submit", getMovieResponse);
loadMoreBtn.addEventListener("click", loadMoreMovies);
//searching movies
async function getMovieResponse(evt){
    evt.preventDefault();
    submit = true;
    var getMovies = getMovie.value;
    console.log(getMovies);
    console.log(getMovies);
    let searchedMovie = await findMovies(getMovies, page);
    console.log(searchedMovie);
    movieArea.innerHTML = ``;
    playing_title.innerHTML=``;
    displayMovie(searchedMovie);
}

async function findMovies(getMovies, page){
    const apiUrl_Search = apiSearchEndpoint + "?api_key=" + API_KEY + "&language=" + language + "&page="+page+"&include_adult=false"+"&query=" + getMovies; //apiUrl for Searching
    console.log(apiUrl_Search);
    let responseMov = await fetch (apiUrl_Search);
    let responseDataMov = await responseMov.json();
    console.log(responseDataMov.results);
    return responseDataMov.results;
}

//load more movies function
async function loadMoreMovies(){

    page = page + 1;

    if (submit == false){
        let loadMore = await nowPlayingMovies(page);
        console.log(1111,page);
        displayMovie(loadMore);
    } else{
        var loadMovies = getMovie.value;
        let loadMore = await findMovies(loadMovies, page)
        console.log(1111,page);
        displayMovie(loadMore);
    }
}
function resetPage(){
    page = 1;
}
//default now playing page
async function defaultPage(){
    const jsonResponse = await nowPlayingMovies(page);      
    displayMovie(jsonResponse);
}

async function nowPlayingMovies(page){
    const apiUrl_NowPlaying = "https://api.themoviedb.org/3/movie/now_playing" + "?api_key=" + API_KEY + "&language=" + language + "&page=" + page; 
    console.log(apiUrl_NowPlaying);
    let response = await fetch(apiUrl_NowPlaying);
    let responseData = await response.json();
    console.log(responseData.results);
    return responseData.results;
}



//display movies
function displayMovie(jsonResponse){
    console.log(jsonResponse);
    
    for(let i = 0; i < jsonResponse.length; i++){
        if(jsonResponse[i].poster_path!= null){
        movieArea.innerHTML += `
            <div class=movie-card>
                <img src = "${IMGPATH}${jsonResponse[i].poster_path}" class = "movie_poster"></img>

                <div class="movie_rating"><img src = "img/star.jpg.jpg" id="rating_icon"></img> ${jsonResponse[i].vote_average}</div>
                <div class="movie_title">${jsonResponse[i].original_title}</div>
            </div>
        `;
        } else{
            movieArea.innerHTML += `
            <div class="movie-card">
                <img src = "img/emptymovieposter.png" id = "empty_poster"></img>

                <div class="movie_rating"><img src = "img/star.jpg.jpg" id="rating_icon"></img> ${jsonResponse[i].vote_average}</div>
                <div class="movie_title">${jsonResponse[i].original_title}</div>
            </div>
        `;
        }
         console.log(jsonResponse[i].original_title);
         console.log(jsonResponse[i].vote_average);
    }
}
//onload 
window.onload = function(){
    defaultPage();
}



