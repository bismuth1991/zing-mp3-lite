import { connect } from 'react-redux';
import { createPlaylist, editPlaylist, fetchUserPlaylist } from '../../actions/user_playlist_actions';
import { removePlaylistSong } from '../../actions/playlist_songs_actions';
import UserPlaylistShow from './user_playlist_show';

const mapStateToProps = (state, ownProps) => {
  const { match: { params: { playlistId } } } = ownProps;
  const { entities: { songs } } = state;
  const { session: { currentUser, playlistSongs, userPlaylists } } = state;

  const playingSongIds = [];
  const playingSongs = [];

  for (let i = 0; i < Object.values(playlistSongs).length; i += 1) {
    const song = songs[Object.values(playlistSongs)[i].songId];

    playingSongs.push(song);
    playingSongIds.push(song.id);
  }

  let playlistName;
  if (Object.values(userPlaylists).length !== 0) {
    playlistName = userPlaylists[playlistId].name;
  }

  return {
    playlistId,
    playlistName,
    songs: playingSongs,
    playingSongIds,
    userId: currentUser.id,
    playlistSongs: Object.values(playlistSongs),
  };
};

const mapDispatchToProps = dispatch => ({
  savePlaylist: (userId, songIds, name) => dispatch(createPlaylist(userId, songIds, name)),
  editPlaylist: (playlistId, userId, songIds, name) => dispatch(editPlaylist(playlistId, userId, songIds, name)),
  fetchUserPlaylist: playlistId => dispatch(fetchUserPlaylist(playlistId)),
  removePlaylistSong: playlistSongId => dispatch(removePlaylistSong(playlistSongId)),
});

const UserPlaylistShowContainer = connect(
  mapStateToProps, mapDispatchToProps,
)(UserPlaylistShow);

export default UserPlaylistShowContainer;
