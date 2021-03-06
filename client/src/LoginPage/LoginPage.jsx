import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
      dispatch(userActions.login(username, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <Col md={6} mdOffset={3}>
        <h2>Login</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !username ? ' has-error' : ''}`}>
            <label htmlFor="username">Username</label>
            <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
            {submitted && !username &&
              <div className="help-block">Username is required</div>
            }
          </div>
          <div className={`form-group${submitted && !password ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
            {submitted && !password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            {loggingIn &&
              <img src="../../assets/images/loading.gif" alt="" />
            }
            <Link to="/register" className="btn btn-link">Register</Link>
          </div>
        </form>
      </Col>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loggingIn: PropTypes.bool,
};
LoginPage.defaultProps = {
  loggingIn: false,
};
function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn,
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
