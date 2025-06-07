const searchFrom = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const searchInput = document.querySelector('#search-input');

const getMovieInfo = async (movieName) => {
    try {
        const Key = `ae1be041`;
        const url = `http://www.omdbapi.com/?apikey=${Key}&t=${movieName}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fech movie data.")
        }
        const data = await response.json();
        console.log(data);

        showMovieInfo(data);
    } catch (error) {
        showErrorMsg(error);
    }

}

const showMovieInfo = (data) => {
    movieContainer.innerHTML = '';
    movieContainer.classList.remove('noBackground');
    const { Title, Year, Rated, Released, Runtime, Genre, Director, Writer, Actors, Plot, Language, Country, Awards, Poster, imdbRating } = data;

    console.log(Genre);
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-element');
    movieElement.innerHTML = `<h2>${Title} (${Year})</h2>
                            <p><strong>Rated: &#11088;</strong> ${Rated}</p>`;

    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(elem => {
        const p = document.createElement('p');
        p.innerText = elem.trim();
        movieGenreElement.appendChild(p);
    });
    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>Released Date :</strong> ${Released}</p>
                            <p><strong>Runtime : </strong> ${Runtime}</p>
                            <p><strong>Director : </strong> ${Director}</p>
                            <p><strong>Writer : </strong> ${Writer}</p>
                            <p><strong>Actors : </strong> ${Actors}</p>
                            <p><strong>Plot : </strong> ${Plot}</p>
                            <p><strong>Language : </strong> ${Language}</p>
                            <p><strong>Country : </strong> ${Country}</p>
                            <p><strong>Awards : </strong> ${Awards}</p>
                            <p><strong>IMDb Rating : </strong>${imdbRating} &#11088;</p>`;

    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}" alt="${Title} Poster">`;
    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
}

const showErrorMsg = (msg) => {
    movieContainer.innerHTML = `<h2>${msg}</h2>`;
    movieContainer.classList.add('noBackground');
}

//Add event listener to the form submission
searchFrom.addEventListener('submit', async (e) => {
    e.preventDefault();
    const movieName = searchInput.value.trim();
    if (movieName !== '') {
        getMovieInfo(movieName);
    } else {
        showErrorMsg(`Please enter a movie name to get movie infomation.`)
        return;
    }

    searchFrom.reset();
});