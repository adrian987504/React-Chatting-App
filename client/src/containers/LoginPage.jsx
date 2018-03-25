import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  grey500,
  // white,
} from 'material-ui/styles/colors';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
// import Help from 'material-ui/svg-icons/action/help';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import ThemeDefault from '../theme-default';
import { login } from '../apis/userApi';
import {
  setUserToken,
  setUserEmail,
  setUserPassword,
} from '../common/token';
import { setUser } from '../common/redux/actions';

class LoginPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: false,
    };
  }
  onLogin() {
    const payload = Object.assign({}, this.state);
    delete payload.remember;
    login(payload).then((res) => {
      const { accessToken } = res.data.data;
      if (this.state.remember) {
        setUserToken(accessToken);
        setUserEmail(this.state.email);
        setUserPassword(this.state.password);
        this.props.setToken(accessToken);
      }
    }).catch((err) => {
      console.log(err.response);
    });
  }
  render() {
    if (this.props.token) {
      console.log('Nala', this.props.token);
      return (<Link to="/home" />);
    }
    const styles = {
      loginContainer: {
        minWidth: 320,
        maxWidth: 400,
        height: 'auto',
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        margin: 'auto',
      },
      paper: {
        padding: 20,
        overflow: 'auto',
      },
      buttonsDiv: {
        textAlign: 'center',
        padding: 10,
      },
      flatButton: {
        color: grey500,
      },
      checkRemember: {
        style: {
          float: 'left',
          maxWidth: 180,
          paddingTop: 5,
        },
        labelStyle: {
          color: grey500,
        },
        iconStyle: {
          color: grey500,
          borderColor: grey500,
          fill: grey500,
        },
      },
      loginBtn: {
        float: 'right',
      },
      btnSpan: {
        marginLeft: 5,
      },
    };
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <div style={styles.loginContainer}>
            <Paper style={styles.paper}>
              <form>
                <TextField
                  value={this.state.email}
                  hintText="E-mail"
                  floatingLabelText="E-mail"
                  onChange={e => this.setState({ email: e.target.value })}
                  fullWidth
                  type="email" />
                <TextField
                  value={this.state.password}
                  hintText="Password"
                  floatingLabelText="Password"
                  onChange={e => this.setState({ password: e.target.value })}
                  fullWidth
                  type="password" />
                <div>
                  <Checkbox
                    label="Remember me"
                    style={styles.checkRemember.style}
                    labelStyle={styles.checkRemember.labelStyle}
                    onClick={e => this.setState({ remember: e.target.value })}
                    iconStyle={styles.checkRemember.iconStyle} />
                  <RaisedButton
                    onClick={() => this.onLogin()}
                    value={this.state.remember}
                    label="Login"
                    primary
                    style={styles.loginBtn} />
                </div>
              </form>
            </Paper>
            <div style={styles.buttonsDiv}>
              <Link to="/register">
                <FlatButton
                  label="Register"
                  style={styles.flatButton}
                  icon={<PersonAdd />} />
              </Link>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

LoginPageComponent.propTypes = {
  setToken: PropTypes.func.isRequired,
  token: PropTypes.string,
};

LoginPageComponent.defaultProps = {
  token: '',
};

const Dispatch = (dispatch) => {
  return {
    setToken: token => dispatch(setUser(token)),
  };
};

const UserProps = (state) => {
  return {
    token: state.token,
  };
};
export const LoginPage = connect(UserProps, Dispatch)(LoginPageComponent);

export default LoginPage;
