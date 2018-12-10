import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
    };

    this.showDropdown = this.showDropdown.bind(this);
  }

  showDropdown(e) {
    e.preventDefault();

    this.setState({
      showDropdown: true,
    });
  }

  hideDropdown(e) {
    e.preventDefault();

    this.setState({
      showDropdown: false,
    });
  }

  render() {
    const guestGreeting = () => (
      <>
        <i
          className="fa fa-user-o"
          aria-hidden="true"
          onMouseEnter={this.showDropdown}
          onMouseLeave={this.hideDropdown}
        />

        <p>Welcome, Guest!</p>

        <ul>
          <li><Link to="/login">Log In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </>
    );

    const { currentUser, logout } = this.props;

    const personalGreeting = () => (
      <>
        <i
          className="fa fa-user-o"
          aria-hidden="true"
          onMouseEnter={this.showDropdown}
          onMouseLeave={this.hideDropdown}
        />

        <p>
          Hello,
          {' '}
          {currentUser.email}
        </p>

        <button type="button" onClick={logout}>Log Out</button>
      </>
    );

    return currentUser.id !== null ? personalGreeting() : guestGreeting();
  }
}

Greeting.defaultProps = {
  currentUser: {
    id: null,
    email: null,
  },
};

Greeting.propTypes = {
  currentUser: propTypes.shape({
    id: propTypes.number,
    email: propTypes.string,
  }),
  logout: propTypes.func.isRequired,
};


export default Greeting;