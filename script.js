//Global const variables
const API_KEY = "49cf0e81ad87db4a10b79c1291f7109c";
const language = "en-US";
//query variables
const movieForm = document.querySelector("#search-form");
const movieArea = document.getElementById("movie-grid");
const getMovie = document.getElementById("search-input");
const playing_title = document.getElementById("playing-title");
const loadMoreBtn = document.getElementById("load-more-movies-btn");
const close_btn = document.getElementById("close-search-btn");

//var variables
var mouseInside = false;
var page = 1;
var submit = false;
var click = false;
var transitionRan = 0;
//image path
const IMGPATH = "https://image.tmdb.org/t/p/w300";
//api for Searching Movies
const apiSearchEndpoint = "https://api.themoviedb.org/3/search/movie" //endpoint for searching movies

//event listener
movieForm.addEventListener("submit", getMovieResponse);
//movieForm.addEventListener("click", onTextBoxClick);

movieForm.addEventListener("transitionrun", async function() {
    transitionRan = transitionRan + 1;
    console.log("transition run ?? :o");
    console.log(112315,transitionRan);
    if (transitionRan % 2 == 0){
        if (mouseInside==true && submit==true){
            console.log(mouseInside);
            console.log(11111,close_btn.addEventListener("click", clearSearch));
            getMovie.value = "";
            close_btn.addEventListener("click", clearSearch);
        }else{
            console.log("we are clicking outside the text box :3");
            hideClearBtn();
        }
    }else{
        showClearBtn();
    }

  });
close_btn.addEventListener("mouseenter",function(){mouseInside=true;});
close_btn.addEventListener("mouseleave",function(){mouseInside=false;});
loadMoreBtn.addEventListener("click", loadMoreMovies);
close_btn.addEventListener("click", clearSearch);


async function clearSearch(){
    //console.log(1234567,close_btn.addEventListener("mouseleave",clearSearch));
    //console.log(41465,close_btn.addEventListener("click", clearSearch));
    console.log("does clicker work?");
    await clearSearchBar();
    console.log(916,getMovie.value);
    defaultPage();
    hideClearBtn();
    console.log("We are inside clearSearch...so this means that click listener works! :)");
}
function clearSearchBar(){
    getMovie.value = "";
    console.log(916,getMovie.value);
    defaultPage();
    hideClearBtn();
}
async function onTextBoxClick(){
    click = true;
    setTimeout(showClearBtn.bind(null, click), 300);
    console.log("we clicked the text box");
}

function showClearBtn(click){
    close_btn.style.visibility='visible';
    console.log("<3 clicker work?");
}

function hideClearBtn(){
    close_btn.style.visibility='hidden';
    console.log("button should hide...");
}
async function closeBtnHidden(){
    click = false;
    await console.log("hello?")
    console.log(close_btn.addEventListener("click", clearSearch),6565654);
    hideClearBtn();
}

//searching movies
async function getMovieResponse(evt){
    evt.preventDefault();
    loadMoreBtn.style.visibility = 'visible';
    submit = true;
    var getMovies = getMovie.value;
    console.log(getMovies);
    console.log(getMovies);
    let searchedMovie = await findMovies(getMovies, page);
    movieArea.innerHTML = ``;
    playing_title.style.fontSize="x-large"
    playing_title.innerHTML=`Showing results for ${getMovies}`;
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
    submit = false;
    movieArea.innerHTML = ``;
    playing_title.innerHTML = `Now Playing`
    playing_title.style.fontSize = '50px';
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
    if (jsonResponse.length == 0){
        playing_title.innerHTML=`No results for ${getMovie.value}`;
        loadMoreBtn.style.visibility = 'hidden';
    }else{
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
}
//onload 
window.onload = function(){
    closeBtnHidden();
    defaultPage();
    console.log(document.getElementById("close-search-btn"));
}



