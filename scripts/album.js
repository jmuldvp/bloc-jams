var createSongRow = function(songNumber, songName, songLength) {
  var template =
      '<tr class="album-view-song-item">'
    + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
    + '  <td class="song-item-title">' + songName + '</td>'
    + '  <td class="song-item-duration">' + songLength + '</td>'
    + '</tr>'
  ;
  
  var $row = $(template);

  var clickHandler = function() {
    var songNumber = parseInt($(this).attr('data-song-number')); // "1"
    
    // TODO: If it IS the song item number use that otherwise find it
    // $(this) OR $(this).find('.song-item-number');
    if(currentlyPlayingSongNumber !== null) {
//      var currentCell = $(this).find('.song-item-number'); // <div data-song-number="1"></div>
//      var currentCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
      var currentCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentCell.html(currentlyPlayingSongNumber);
    }
    
    if (parseInt(currentlyPlayingSongNumber) !== songNumber) {
        $(this).html(pauseButtonTemplate);
//        currentlyPlayingSongNumber = songNumber;
//        currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
        setSong(songNumber);
      
        updatePlayerBarSong()
    } else if (parseInt(currentlyPlayingSongNumber) === songNumber) {
      // This runs if we click the pause button of the song that is playing
//      console.log(currentlyPlayingSong, 'currentlyPlayingSong is ', songNumber);
//      console.log(songNumberCell)
      //songNumberCell.html(playButtonTemplate);
      $(this).html(playButtonTemplate);
      currentlyPlayingSongNumber = null;
      currentSongFromAlbum = null;
      $('.main-controls .play-pause').html(playerBarPlayButton);
    } 
  };
    
  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
//    getSongNumberCell(songNumberCell);
    
    
    if (songNumber !== parseInt(currentlyPlayingSongNumber)) {
      songNumberCell.html(playButtonTemplate);
    }
  };
  
  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
//    getSongNumberCell(songNumberCell);
    
    //    console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
    if (songNumber !== parseInt(currentlyPlayingSongNumber)) {
      songNumberCell.html(songNumber);
    }
  };
  
  $row.find('.song-item-number').click(clickHandler);
  $row.hover(onHover, offHover);
  return $row;
};

var setCurrentAlbum = function(album) {
  currentAlbum = album;
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

var trackIndex = function(album, song) {
  return album.songs.indexOf(song);
}

var setSong = function(songNumber) {
  currentlyPlayingSongNumber = parseInt(songNumber);
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function (number) {
//  var songNumber = parseInt(number.attr('data-song-number'));
  return $('.song-item-number[data-song-number="' + number + '"]');
};

var nextSong = function() {
  currentSongNumber = trackIndex(currentAlbum, currentSongFromAlbum);
  
  // incrementing song number
  currentSongNumber++;
  
  // checks to see if the song number is at the end of the array
  // if so, it assigns it to 0
  if(currentSongNumber >= currentAlbum.songs.length) {
    currentSongNumber = 0;
  }
  
  // saving the song number before its changed
  var lastSong = currentlyPlayingSongNumber;
  
  currentlyPlayingSongNumber = currentSongNumber + 1;
  currentSongFromAlbum = currentAlbum.songs[currentSongNumber];
//  setSong(currentSongNumber);
  
  // update the player bar
  updatePlayerBarSong();
  
  // assigning the data-song-number attribute from the song-item-number class
  // ...to the variable nextSongNumber using the currently playing song number
  var $nextSongNumber = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
  // assigning the data-song-number attribute from the song-item-number class
  // ...to the variable lastSongNumber using the last song number
  var $lastSongNumber = $('.song-item-number[data-song-number="' + lastSong + '"]');
  
  // Both lines make HTML changes on the cells.
  $nextSongNumber.html(pauseButtonTemplate);
  $lastSongNumber.html(lastSong);  
};

var previousSong = function() {
  currentSongNumber = trackIndex(currentAlbum, currentSongFromAlbum);
  
  // decreasing song number
  currentSongNumber--;
  
  // checks to see if the song number is at the beginning of the array
  // if so, it assigns it to the last number
  if(currentSongNumber < 0) {
    currentSongNumber = currentAlbum.songs.length - 1;
  }
  
  // saving the song number before its changed
  var lastSong = currentlyPlayingSongNumber;
  
  currentlyPlayingSongNumber = currentSongNumber + 1;
  currentSongFromAlbum = currentAlbum.songs[currentSongNumber];
//  setSong(currentSongNumber);
  
  // update the player bar
  updatePlayerBarSong();
  
  $('.main-controls .play-pause').html(playerBarPauseButton);
  
  // assigning the data-song-number attribute from the song-item-number class
  // ...to the variable nextSongNumber using the currently playing song number
  var $previousSongNumber = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
  // assigning the data-song-number attribute from the song-item-number class
  // ...to the variable lastSongNumber using the last song number
  var $lastSongNumber = $('.song-item-number[data-song-number="' + lastSong + '"]');
  
  $previousSongNumber.html(pauseButtonTemplate);
  $lastSongNumber.html(lastSong);
};

var updatePlayerBarSong = function() {
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
  
  $('.main-controls .play-pause').html(playerBarPauseButton);
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = 0;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function() {
//  var $songRows = $('.album-view-song-item');
  // Right away (after the document loads) it sends the Picasso album information
  // ..to the setCurrentAlbum function
  setCurrentAlbum(albumPicasso);
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);
});