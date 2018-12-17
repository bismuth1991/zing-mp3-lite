import React from 'react';
import AudioPlayer from 'react-modular-audio-player';
import PropTypes from 'prop-types';
import { Cookies } from 'react-cookie';
import rearrangedPlayer from './rearranged_player';

class Mp3Player extends React.Component {
  constructor(props) {
    super(props);

    this.setCookies = this.setCookies.bind(this);
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.setCookies);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.setCookies);
  }

  setCookies() {
    const { cookies, audioPlayerCookies, songsCookies } = this.props;
    cookies.set(
      'audioPlayer', {
        // entities:
        songs: songsCookies,
        // session:
        audioPlayer: audioPlayerCookies,
      }, { path: '/' },
    );
  }

  render() {
    // debugger;
    const { songList } = this.props;

    if (typeof songList[0] !== 'object') {
      return null;
    }
    return (
      <div className="audio-player-container">
        <AudioPlayer
          audioFiles={songList}
          rearrange={rearrangedPlayer}
          iconSize="25px"
          fontSize="14px"
          playerWidth="450px"
        />
      </div>
    );
  }
}

Mp3Player.propTypes = {
  cookies: PropTypes.instanceOf(Cookies).isRequired,
  songList: PropTypes.instanceOf(Array).isRequired,
};

export default Mp3Player;
