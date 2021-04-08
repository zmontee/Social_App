import React from 'react';
import s from './Navbar.module.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import HomeIcon from '@material-ui/icons/Home';
import MyButton from "../../utils/MyButton";
import PostScream from "../common/PostScream";
import Notifications from "../common/Notifications";


const Navbar = props => {
    const { user:{authenticated} } = props;
    return (
        <div>
            img
            <AppBar>
                <Toolbar className={s.content}>
                    {authenticated ?
                        <>
                            {<PostScream />}
                            <Link to='/'>
                                <MyButton title="Home">
                                    <HomeIcon style={{ color: '#fff' }}/>
                                </MyButton>
                            </Link>
                            <Notifications/>
                        </>
                        :
                        <>
                            <Button color='inherit' component={Link} to='/'>Home</Button>
                            <Button color='inherit' component={Link} to='/login'>Login</Button>
                            <Button color='inherit' component={Link} to='/signup'>Signup</Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(Navbar);