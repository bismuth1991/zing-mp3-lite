import React from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { receiveSongs } from '../../actions/song_actions';
import SongIndexHC from '../songs';
import { playSong, addSongToList, addSongsToList } from '../../actions/audio_player_actions';

class SearchShow extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <SongIndexHC {...this.props} />
    );
  }
}

const mapStateToProps = ({ entities: { searchBar: { songs } } }) => ({
  // songs: songIds.map(songId => songs[songId]),
  songs: Object.values(songs),
});

const mapDispatchToProps = dispatch => ({
  receiveSongs: songs => dispatch(receiveSongs(songs)),
  playSong: (songId, playingSongId) => dispatch(playSong(songId, playingSongId)),
  addSongToList: songId => dispatch(addSongToList(songId)),
  addSongsToList: songIds => dispatch(addSongsToList(songIds)),
  addSongsToAudioPlayer: songIds => dispatch(addSongsToList(songIds)),
});

export default withCookies(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchShow));
