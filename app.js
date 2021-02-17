const searchSong = async() => {
    const searchText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    toggleSpinner();
    const response = await fetch(url)
    const data = await response.json();
    displaySongs(data.data);
};

document.getElementById('search-field').addEventListener("keypress", function(event) {
    // event.preventDefault();
    if (event.key == 'Enter') {
        document.getElementById('search-button').click();
    }
})
const displaySongs = songs => {
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = '';
    songs.forEach(song => {
        const songDiv = document.createElement("div");

        songDiv.className = "ingle-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
                <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                         <source src="${song.preview}" type="audio/mpeg">
                        Your browser does not support the audio element.
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
        `;
        songContainer.appendChild(songDiv);
        toggleSpinner();
    });
};

const getLyrics = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    const response = await fetch(url)
    const data = await response.json()
    displayLyrics(data.lyrics);
}

const displayLyrics = lyrics => {
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}

const toggleSpinner = () => {
    const spinner = document.getElementById('loading-spinner');
    const songContainer = document.getElementById('song-container');
    songContainer.classList.toggle('d-none');
    spinner.classList.toggle('d-none');

}