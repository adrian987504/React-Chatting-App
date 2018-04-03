import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.email && user.password) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    return (
      <Col md={6} mdOffset={3}>
        <h2>Register</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !user.firstName ? ' has-error' : ''}`}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
            {submitted && !user.firstName &&
            <div className="help-block">First Name is required</div>
                        }
          </div>
          <div className={`form-group${submitted && !user.lastName ? ' has-error' : ''}`}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
            {submitted && !user.lastName &&
            <div className="help-block">Last Name is required</div>
                        }
          </div>
          <div className={`form-group${submitted && !user.email ? ' has-error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" name="email" value={user.email} onChange={this.handleChange} />
            {submitted && !user.email &&
            <div className="help-block">Email is required</div>
                        }
          </div>
          <div className={`form-group${submitted && !user.password ? ' has-error' : ''}`}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
            {submitted && !user.password &&
            <div className="help-block">Password is required</div>
                        }
            {submitted && user.password && user.password.length < 8 &&
            <div className="help-block">Your password must be at least 8 characters </div>
                        }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
            {registering &&
              <img src="../../assets/images/loading.gif" alt="" />
            }
            <Link to="/login" className="btn btn-link">Cancel</Link>
          </div>
        </form>
      </Col>
    );
  }
}

RegisterPage.propTypes = {
  registering: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};
RegisterPage.defaultProps = {
  registering: false,
};
function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering,
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
