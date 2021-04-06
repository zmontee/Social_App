import React from 'react';
import {CircularProgress, Grid} from "@material-ui/core";
import Profile from "./Profile/Profile";
import s from "./Home.module.css";
import ScreamsItem from "./ScreamsItem/ScreamsItem";

const Home = props => {
    const screamsElements = props.screams.map(scream => <ScreamsItem
        key={scream.screamId}
        scream={scream}
    />)

    return (
        <Grid container spacing={4}>
            {props.loading ? <CircularProgress size={100} className={s.progress}/>
            :
            (<>
                <Grid item sm={8} xs={12}>
                    {screamsElements}
                </Grid>
                <Grid item sm={4} xs={12} className={s.profile}>
                    <Profile />
                </Grid>
            </>)
            }
        </Grid>
    )
}

export default Home;