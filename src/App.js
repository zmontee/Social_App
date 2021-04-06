import './App.css';
import { Route, Switch } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import HomeContainer from "./components/Home/HomeContainer";
import jwtDecode from "jwt-decode";
import AuthRoute from "./components/common/AuthRoute";
import {getUserData, logoutUser} from "./redux/actions/userAction";
import store from "./redux/store";
import {SET_AUTHENTICATED} from "./redux/types";
import axios from "axios";
import User from "./components/User/User";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgb(36, 151, 255)',
            contrastText: '#fff'
        }
    }
})

const token = localStorage.FBIdToken;
if(token) {
    const decodedToken = jwtDecode(token);
    if(decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutUser())
        window.location.href = '/login';
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token;
        store.dispatch(getUserData());
    }
}

axios.defaults.baseURL = 'http://europe-west1-socialapp-8233c.cloudfunctions.net/api';

const App = props => {

  return (
    <MuiThemeProvider theme={theme}>
        <div className="App">
            <Navbar/>
            <div className="container">
                <Switch>
                    <Route exact path='/' component={HomeContainer}/>
                    <AuthRoute exact path='/login' component={Login}/>
                    <AuthRoute exact path='/signup' component={Signup}/>
                    <Route exact path='/user/:handle' component={User}/>
                    <Route exact path='/user/:handle/scream/:screamId' component={User}/>
                </Switch>
            </div>
        </div>
    </MuiThemeProvider>
  );
}


export default App;
