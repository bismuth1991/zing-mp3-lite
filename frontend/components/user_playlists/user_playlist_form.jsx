import React from 'react';
import { connect } from 'react-redux';
import { addSongsToList } from '../../actions/audio_player_actions';
import { currentDate } from '../../util/user_playlist_utils';

class UserPlaylistForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistNameInput: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e) {
    this.setState({
      playlistNameInput: e.target.value,
    });
  }

  handleClick(type) {
    return (e) => {
      e.preventDefault();

      let { playlistNameInput } = this.state;
      if (playlistNameInput === '') playlistNameInput = currentDate();

      const {
        savePlaylist, editPlaylist, playingSongIds, userId, playlistId, addSongsToList,
      } = this.props;

      switch (type) {
        case 'edit':
          editPlaylist(playlistId, userId, playingSongIds, playlistNameInput);

          this.setState({
            playlistNameInput: '',
          });
          break;
        case 'play':
          addSongsToList(playingSongIds);

          window.setTimeout(() => document.getElementById('play-icon').click(), 500);
          break;
        case 'save':
          savePlaylist(userId, playingSongIds, playlistNameInput);

          this.setState({
            playlistNameInput: '',
          });
          break;
        default:
          return null;
      }
      return null;
    };
  }

  render() {
    const { playlistNameInput } = this.state;
    const { playlistName } = this.props;

    return (
      <section className="section">
        <div className="container search-bar playlist-form">
          <form className="input-wrapper" onSubmit={this.handleClick('edit')}>
            <button type="button" className="play">
              <i
                className="fas fa-play"
                role="presentation"
                title="Play all"
                onClick={this.handleClick('play')}
              />
            </button>

            <h2>{playlistName}</h2>

            <input type="text" onChange={this.handleChange} value={playlistNameInput} placeholder="Change playlist's name here..." />

            <button type="button">
              <i
                className="fas fa-edit"
                role="presentation"
                title="edit Playlist"
                onClick={this.handleClick('edit')}
              />
            </button>

            <button type="button">
              <i
                className="fas fa-save"
                role="presentation"
                title="save to new Playlist"
                onClick={this.handleClick('save')}
              />
            </button>
          </form>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addSongsToList: songIds => dispatch(addSongsToList(songIds)),
});

export default connect(
  null,
  mapDispatchToProps,
)(UserPlaylistForm);
