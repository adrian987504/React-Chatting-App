import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';

import { userActions } from '../_actions';

class WorkspaceSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      displayName: '',
      email: '',
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
    const { email } = this.state;
    const { dispatch } = this.props;

    if (email) {
      const payload = {
        email,
      };
      console.log(payload);
      dispatch(userActions.searchWorkspace(payload));
    }
  }

  render() {
    const { registering } = this.props;
    const { submitted, email } = this.state;
    return (
      <Col md={6} mdOffset={3}>
        <h2>Searcg Workspace</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className={`form-group${submitted && !email ? ' has-error' : ''}`}>
            <label htmlFor="email">Email</label>
            <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
            {submitted && !email &&
            <div className="help-block">Email is required</div>
          }
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Search Workspace</button>
            {registering &&
            <img src="../../assets/images/loading.gif" alt="" />
          }
          </div>
        </form>
      </Col>
    );
  }
}

function mapStateToProps(state) {
  const { authentication: { user } } = state;
  return { user };
}

const connectedWorkspace = connect(mapStateToProps)(WorkspaceSearch);
export { connectedWorkspace as WorkspaceSearch };
