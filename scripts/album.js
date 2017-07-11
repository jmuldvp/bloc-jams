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

var createSongRow = function(songNumber, songName, songLength) {
  var template =
      '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
    ;
  
  var $row = $(template);
//  var clickHandler = function(targetElement) {
//     var songItem = getSongItem(targetElement);
// 
//     if (currentlyPlayingSong === null) {
//         songItem.innerHTML = pauseButtonTemplate;
//         currentlyPlayingSong = songItem.getAttribute('data-song-number');
//     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
//         songItem.innerHTML = playButtonTemplate;
//         currentlyPlayingSong = null;
//     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
//         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
//         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
//         songItem.innerHTML = pauseButtonTemplate;
//         currentlyPlayingSong = songItem.getAttribute('data-song-number');
//     }
// };
  var clickHandler = function() {
    var songNumber = $(this).attr('data-song-number'); // "1"
    
    // TODO: If it IS the song item number use that otherwise find it
    // $(this) OR $(this).find('.song-item-number');
    if(currentlyPlayingSong !== null) {
      var currentCell = $(this).find('.song-item-number'); // <div data-song-number="1"></div>
      currentCell.html(currentlyPlayingSong);
    }
    
//    if(currentlyPlayingSong === null) {
      // This runs when there is no song currently playing
//      console.log('currentlyPlayingSong is null');
//      console.log(songNumberCell)
      //songNumberCell.html(pauseButtonTemplate);
//      $(this).html(pauseButtonTemplate);
//      currentlyPlayingSong = songNumber;
//    } else 
      if (currentlyPlayingSong === songNumber) {
      // This runs if we click the pause button of the song that is playing
//      console.log(currentlyPlayingSong, 'currentlyPlayingSong is ', songNumber);
//      console.log(songNumberCell)
      //songNumberCell.html(playButtonTemplate);
      $(this).html(playButtonTemplate);
      currentlyPlayingSong = null;
    } else if (currentlyPlayingSong !== songNumber) {
      //console.log(currentlyPlayingSong, 'currentlyPlayingSong is NOT ', songNumber);
//      var currentlyPlayingSongElement = $('[data-song-number="' + currentlyPlayingSong + '"]');
//      currentlyPlayingSongElement.html(currentlyPlayingSong);
//      songNumberCell.html(pauseButtonTemplate);
      $(this).html(pauseButtonTemplate);
      currentlyPlayingSong = songNumber;
    }
  };
    
  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');

    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(playButtonTemplate);
    }
  };
  
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = songNumberCell.attr('data-song-number');

    if (songNumber !== currentlyPlayingSong) {
      songNumberCell.html(songNumber);
    }
  };
  
  $row.click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
}

var setCurrentAlbum = function(album) {
  var $albumTitle = $('.album-view-title');
  var $albumArtist = $('.album-view-artist');
  var $albumReleaseInfo = $('.album-view-release-info');
  var $albumImage = $('.album-cover-art');
  var $albumSongList = $('.album-view-song-list');

  $albumTitle.text(album.title);
  $albumArtist.text(album.artist);
  $albumReleaseInfo.text(album.year + ' ' + album.label);
  $albumImage.attr('src', album.albumArtUrl);

  $albumSongList.empty();

  for (var i = 0; i < album.songs.length; i++) {
    var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
    $albumSongList.append($newRow);
  }
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function() {
//  var $songRows = $('.album-view-song-item');
  setCurrentAlbum(albumPicasso);
  
//  for (var i = 0; i < $songRows.length; i++) {
//    
//    $songRows[i].addEventListener('click', function(event) {
//      clickHandler(event.target);
//    });
//  }
});