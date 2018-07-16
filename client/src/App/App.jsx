import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Col } from 'react-bootstrap';

import { history } from '../helpers';
import { alertActions } from '../store/actions';
import {
  HomeRoute, UserRoute,
  Header,
} from '../components';

import {
  LoginPage,
  RegisterPage,
  HomePage,
  Workspace,
  WorkspaceSearch,
} from '../containers';

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
        <Header />
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
