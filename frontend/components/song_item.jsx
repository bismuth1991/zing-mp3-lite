import React from 'react';
import PropTypes from 'prop-types';

class SongItem extends React.Component {
  constructor(props) {
    super(props);

    this.findPlayingSongIdx = this.findPlayingSongIdx.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  findPlayingSongIdx() {
    const { currentlyPlayingTitles } = this.props;

    const marquee = document.getElementsByClassName('marquee')[0];
    if (marquee) {
      const currentlyPlaying = marquee.innerHTML.split(' - ')[1];
      const currentlyPlayingIdx = currentlyPlayingTitles.indexOf(currentlyPlaying);
      if (currentlyPlayingIdx) return currentlyPlayingIdx;
    }
    return 0;
  }

  handleClick(type) {
    return (e) => {
      e.preventDefault();
      e.stopPropagation();

      const {
        playSong, addSongToList, removePlaylistSong, removeSongFromList,
      } = this.props;

      const { id, playlistSongs } = this.props;
      const playIcon = document.getElementById('play-icon');

      switch (type) {
        case 'add':
          addSongToList(id);
          break;
        case 'remove': {
          const playlistSongToRemvove = playlistSongs.filter(playlistSong => playlistSong.songId === id);
          if (playlistSongToRemvove) removePlaylistSong(playlistSongToRemvove[0].id);

          removeSongFromList(id);
          break;
        }
        case 'play':
          if (playIcon) playIcon.click();

          playSong(id, this.findPlayingSongIdx());
          window.setTimeout(() => document.getElementById('play-icon').click(), 500);
          break;
        default:
          return null;
      }
      return null;
    };
  }

  render() {
    const {
      title, artist, albumCover, playlistId,
    } = this.props;

    let plusHeart;
    let trashCan;
    if (!playlistId) {
      plusHeart = (
        <>
          <i className="fas fa-plus" role="presentation" title="Add to current Playlist" onClick={this.handleClick('add')} />
          <i className="fas fa-heart" title="Like" />
        </>
      );
    } else {
      trashCan = (
        <i
          className="fas fa-trash-alt"
          role="presentation"
          onClick={this.handleClick('remove')}
        />
      );
    }

    return (
      <div className="song-item-container">
        <figure className="song-img-container">
          <img className="song-img" src={albumCover} alt={title} />

          <i className="far fa-play-circle fade" role="presentation" onClick={this.handleClick('play')} />
          {plusHeart}
          {trashCan}
        </figure>

        <a>{title}</a>
        <a>{artist}</a>
      </div>
    );
  }
}

// SongIndexItemHC.defaultProps = {
//   playingSongTitles: [],
// };

// SongIndexItemHC.propTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   artist: PropTypes.string.isRequired,
//   albumCover: PropTypes.string.isRequired,
//   playingSongTitles: PropTypes.arrayOf(PropTypes.string),
//   playSong: PropTypes.func.isRequired,
//   addSongToList: PropTypes.func.isRequired,
// };

export default SongItem;
