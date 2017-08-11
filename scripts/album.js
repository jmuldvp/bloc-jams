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
      var currentCell = getSongNumberCell(currentlyPlayingSongNumber);
      currentCell.html(currentlyPlayingSongNumber);
    }

    if (parseInt(currentlyPlayingSongNumber) !== songNumber) {
      $(this).html(pauseButtonTemplate);
      setSong(songNumber);
      currentSoundFile.play();
      updateSeekBarWhileSongPlays();
      updatePlayerBarSong();
      //  console.log('anything');
    } else if (parseInt(currentlyPlayingSongNumber) === songNumber) {
      // This runs if we click the pause button of the song that is playing
//      console.log(currentlyPlayingSong, 'currentlyPlayingSong is ', songNumber);
//      console.log(songNumberCell)
      if(currentSoundFile.isPaused()) {
        currentSoundFile.play();
        updateSeekBarWhileSongPlays();
        $(this).html(pauseButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPauseButton);
      } else {
        currentSoundFile.pause();
        $(this).html(playButtonTemplate);
        $('.main-controls .play-pause').html(playerBarPlayButton);
      }
    }
  };

  var onHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));
    var currentSongNumber = parseInt(currentlyPlayingSongNumber);
    if (songNumber !== parseInt(currentlyPlayingSongNumber)) {
      songNumberCell.html(playButtonTemplate);
    }
  };

  var offHover = function(event) {
    var songNumberCell = $(this).find('.song-item-number');

    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

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
  if (currentSoundFile){
    currentSoundFile.stop();
  }
  currentlyPlayingSongNumber = songNumber; //parseInt(songNumber);
  // currentAlbum.song returns objects which is in an array starting at 0
  // Need to do [songNumber - 1] since the first song is 0.
  currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
  currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
    formats: [ 'mp3' ],
    preload: true
  });
  setVolume(currentVolume);
};

var setVolume = function(volume) {
  if (currentSoundFile) {
    currentSoundFile.setVolume(volume);
    // Update the Volume Bar CSS to match the volume
    var $ctrlVol = $('.control-group.volume');
    var volRatio = volume / 100;
    updateSeekPercentage($ctrlVol, volRatio);
  }
}

var getSongNumberCell = function (number) {
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

  setSong(currentlyPlayingSongNumber);

  currentSoundFile.play();
  updateSeekBarWhileSongPlays();
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
  setSong(currentlyPlayingSongNumber);

  currentSoundFile.play();
  updateSeekBarWhileSongPlays();

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

var togglePlayFromPlayerBar = function() {
  if(currentSoundFile && currentSoundFile.isPaused()) {
    $(this).html(pauseButtonTemplate);
    $playButton.html(playerBarPauseButton);
    currentSoundFile.play();
  } else if (currentSoundFile) {
    currentSoundFile.pause();
    $(this).html(playButtonTemplate);
    $playButton.html(playerBarPlayButton);
  } else {
    setSong(1);
    $(this).html(pauseButtonTemplate);
    $playButton.html(playerBarPauseButton);
    currentSoundFile.play();
    // nextSong();
  }
};

var updatePlayerBarSong = function() {
  $('.currently-playing .song-name').text(currentSongFromAlbum.title);
  $('.currently-playing .artist-name').text(currentAlbum.artist);
  $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);

  $('.main-controls .play-pause').html(playerBarPauseButton);
};

var updateSeekBarWhileSongPlays = function() {
  if (currentSoundFile) {
    currentSoundFile.bind('timeupdate', function(event) {
      var seekBarFillRatio = this.getTime() / this.getDuration();
      var $seekBar = $('.seek-control .seek-bar');

      updateSeekPercentage($seekBar, seekBarFillRatio);
    });
  }
};

var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
  var offsetXPercent = seekBarFillRatio * 100;
  offsetXPercent = Math.max(0, offsetXPercent); // make sure starting isn't < 0%
  offsetXPercent = Math.min(100, offsetXPercent); // not to exceed 100%

  var percentageString = offsetXPercent + '%';
  $seekBar.find('.fill').width(percentageString);
  $seekBar.find('.thumb').css({left: percentageString});
};

var setupSeekBars = function() {
  var $seekBars = $('.player-bar .seek-bar');

  $seekBars.click(function(event) {
    var offsetX = event.pageX - $(this).offset().left;
    var barWidth = $(this).width();
    var seekBarFillRatio = offsetX / barWidth;
    if(currentSoundFile === null) {
      setSong(1);
    }

    if($(this).parent().attr('class') == 'seek-control') {
      seek(seekBarFillRatio * currentSoundFile.getDuration());
    } else {
      setVolume(seekBarFillRatio * 100);
    }
    // updateSeekPercentage($(this), seekBarFillRatio);
  });

  $seekBars.find('.thumb').mousedown(function(event) {
    var $seekBar = $(this).parent();
    // console.log($seekBar);

    $(document).bind('mousemove.thumb', function(event){
      var offsetX = event.pageX - $seekBar.offset().left;
      var barWidth = $seekBar.width();
      var seekBarFillRatio = offsetX / barWidth;
      if(currentSoundFile === null) {
        setSong(1);
      }

      updateSeekPercentage($seekBar, seekBarFillRatio);
    });

    $(document).bind('mouseup.thumb', function() {
      $(document).unbind('mousemove.thumb');
      $(document).unbind('mouseup.thumb');
    });
  });
};

var seek = function(time) {
  if (currentSoundFile) {
    currentSoundFile.setTime(time);
  }
};

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

// Store state of playing songs
var currentAlbum = null;
var currentlyPlayingSongNumber = 0;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 70;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var $playButton = $('.main-controls .play-pause')

$(document).ready(function() {
//  var $songRows = $('.album-view-song-item');
  // Right away (after the document loads) it sends the Picasso album information
  // ..to the setCurrentAlbum function
  setCurrentAlbum(albumPicasso);
  setupSeekBars();
  $previousButton.click(previousSong);
  $nextButton.click(nextSong);

  $playButton.click(togglePlayFromPlayerBar);
});
