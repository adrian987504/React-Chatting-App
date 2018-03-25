import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { grey500 } from 'material-ui/styles/colors';
import Person from 'material-ui/svg-icons/social/person';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import ThemeDefault from '../theme-default';
import { register } from '../apis/userApi';

class SignupPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }
  onRegister() {
    register({
      email: 'longx6951@gmail.com',
      password: 'ABcd12#$',
      firstName: 'Long',
      lastName: 'Xiao',
      type: 'private',
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err.response);
    });
  }
  render() {
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
      registerBtn: {
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
                  value={this.state.username}
                  hintText="UserName"
                  floatingLabelText="UserName"
                  fullWidth
                  onChange={e => this.setState({ username: e.target.value })}
                  type="name" />
                <TextField
                  value={this.state.email}
                  hintText="E-mail"
                  floatingLabelText="E-mail"
                  fullWidth
                  onChange={e => this.setState({ email: e.target.value })}
                  type="email" />
                <TextField
                  value={this.state.password}
                  hintText="Password"
                  floatingLabelText="Password"
                  fullWidth
                  onChange={e => this.setState({ password: e.target.value })}
                  type="password" />
                <div>
                  <RaisedButton
                    label="Register"
                    primary
                    onClick={() => this.onRegister()}
                    style={styles.registerBtn} />
                </div>
              </form>
            </Paper>
            <div style={styles.buttonsDiv}>
              <Link to="/">
                <FlatButton
                  label="Login"
                  style={styles.flatButton}
                  icon={<Person />} />
              </Link>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SignupPage;
