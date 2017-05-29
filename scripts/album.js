var albumPicasso = {
  title: 'The Colors',
  artist: 'Pablo Picasso',
  label: 'Cubism',
  year: '1881',
  albumArtUrl: 'assets/images/album_covers/01.png',
  songs: [
    { title: 'Blue', duration: '4:26' },
    { title: 'Green', duration: '3:14' },
    { title: 'Red', duration: '5:01' },
    { title: 'Pink', duration: '3:21' },
    { title: 'Magenta', duration: '2:15' }
  ]
};

var albumMarconi = {
  title: 'The Telephone',
  artist: 'Guglielmo Marconi',
  label: 'EM',
  year: '1909',
  albumArtUrl: 'assets/images/album_covers/20.png',
  songs: [
    { title: 'Hello, Operator?', duration: '1:01' },
    { title: 'Ring, ring, ring', duration: '5:01' },
    { title: 'Fits in your pocket', duration: '3:21' },
    { title: 'Can you hear me now?', duration: '3:14' },
    { title: 'Wrong phone number', duration: '2:15' }
  ]
};

var albumTechnique = {
  title: 'Technique',
  artist: 'New Order',
  label: 'Factory',
  year: '1989',
  albumArtUrl: 'assets/images/album_covers/02.png',
  songs: [
    { title: 'Fine Time', duration: '4:42' },
    { title: 'All the Way', duration: '3:22' },
    { title: 'Love Less', duration: '2:58' },
    { title: 'Round & Round', duration: '4:29' },
    { title: 'Guilty Partner', duration: '4:44' },
    { title: 'Run', duration: '4:29' },
    { title: 'Mr. Disco', duration: '4:20' },
    { title: 'Vanishing Point', duration: '5:15' },
    { title: 'Dream Attack', duration: '5:13' }
  ]
}

var CreateSongRow = function(songNumber, songName, songLength) {
  var template =
      '<tr class="album-view-song-item">'
    + ' <td class="gon-item-number">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
  
  return template;
}

var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];

var setCurrentAlbum = function(album) {
  albumTitle.firstChild.nodeValue = album.title;
  albumArtist.firstChild.nodeValue = album.artist;
  albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
  albumImage.setAttribute('src', album.albumArtUrl);

  albumSongList.innerHTML = '';

  for (var i = 0; i < album.songs.length; i++) {
    albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
  }
 };
 
 window.onload = function() {
  setCurrentAlbum(albumPicasso);
   
  var albs = [albumPicasso, albumMarconi, albumTechnique];
  var j = 0;
  albumTitle.addEventListener("click", function(e) {
    setCurrentAlbum(albs[i]);
    j++;
    if (j === 2) {
      j = 0;
    }
  });
 };