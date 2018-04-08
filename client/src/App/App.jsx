import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Col, Navbar, Nav, NavItem } from 'react-bootstrap';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { HomeRoute, UserRoute } from '../_components';
import { Header } from '../Header';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { Workspace, WorkspaceSearch } from '../Workspace';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      console.log(action);
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <React.Fragment>
        {localStorage.getItem('user') &&
          <Header />
        }
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              React Chat
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} href="/workspace_search">
                Find Workspace
              </NavItem>
              <NavItem eventKey={2} href="/workspace_create">
                Create Workspace
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Grid>
          <Col sm={8} smOffset={2}>
            {alert.message &&
            <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
              <div>
                <HomeRoute exact path="/" component={HomePage} />
                <UserRoute path="/login" component={LoginPage} />
                <UserRoute path="/register" component={RegisterPage} />
                <UserRoute path="/workspace_create" component={Workspace} />
                <UserRoute path="/workspace_search" component={WorkspaceSearch} />
              </div>
            </Router>
          </Col>
        </Grid>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  alert: PropTypes.shape().isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
