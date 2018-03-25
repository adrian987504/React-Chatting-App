import 'font-awesome/css/font-awesome.css';
import 'flexboxgrid/css/flexboxgrid.css';

import * as React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import {
  grey500,
  // white,
} from 'material-ui/styles/colors';

// import Help from 'material-ui/svg-icons/action/help';
import ThemeDefault from '../theme-default';
import { login } from '../apis/userApi';
import { setUserToken, logout } from '../common/token';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      remember: false,
    };
  }
  onLogin() {
    // const payload = {
    //   email: 'longx695@gmail.com',
    //   password: 'ABcd12#$',
    // };

    const payload = Object.assign({}, this.state);
    delete payload.remember;
    console.log(payload);

    login(payload).then((res) => {
      const { accessToken } = res.data.data;
      if (this.state.remember) {
        setUserToken(accessToken);
      }

    }).catch((err) => {
      console.log(err.response);
    });
  }
  onLogout() {
    logout();
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
            <Paper style={styles.paper} />
            <h1>Welcome to login</h1>
            <br />
            <button onClick={() => this.onLogout()} >logout</button>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

// HomePageComponent.defaultProps = {
//   account: null,
//   setting: null,
//   images: null,
//   question: null,
// };

// const Dispatch = (state) => {
//   return {
//     user: state.token,
//   };
// };

// const ProfileProps = (state) => {
//   return {
//     user: state.user,
//   };
// };


// const Dispatch = (dispatch) => {
//   return {
//     setToken: token => dispatch(setUser(token)),
//   };
// };

// const HomePageProps = (state) => {
//   return {
//     token: state.token,
//   };
// };
// export const HomePage = connect(HomePageProps, Dispatch)(HomePageComponent);

export default HomePage;
