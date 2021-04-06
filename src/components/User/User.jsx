import React from 'react';
import {connect} from "react-redux";
import {getUserData} from "../../redux/actions/dataAction";
import {CircularProgress, Grid} from "@material-ui/core";
import s from "../Home/Home.module.css";
import StaticProfile from "../Home/Profile/StaticProfile";
import {userAPI} from "../../api/api";
import ScreamsItem from "../Home/ScreamsItem/ScreamsItem";

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            profile: null,
            screamIdParam: null
        }
    }

    componentDidMount() {
        debugger;
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if(screamId) {
            this.setState({
                screamIdParam: screamId
            })
        }

        this.props.getUserData(handle);
        userAPI.getUserData(handle)
            .then(res => {
                this.setState({
                    profile: res.data.user
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        const { screams } = this.props.data;
        const { screamIdParam } = this.state;

        return (
            <Grid container spacing={4}>
                {this.props.loading ?
                    (<CircularProgress size={100} className={s.progress}/>)
                    :
                    (<>
                        <Grid item sm={8} xs={12}>
                            { screams === null ? (
                                <p>No screams from this user</p>
                            ) : !screamIdParam ? (
                                screams.map(scream => <ScreamsItem
                                    key={scream.screamId}
                                    scream={scream}
                                />)
                            ) : (
                                screams.map(scream => {
                                   if(scream.screamId !== screamIdParam) {
                                       return <ScreamsItem
                                               key={scream.screamId}
                                               scream={scream}
                                       />
                                   } else return <ScreamsItem
                                       key={scream.screamId}
                                       scream={scream}
                                       openDialog
                                   />
                                })
                            )}
                        </Grid>
                        <Grid item sm={4} xs={12}>
                            {this.state.profile === null ?
                                (<CircularProgress size={100} className={s.progress}/>)
                                :
                                (<StaticProfile profile={this.state.profile} />)
                            }
                        </Grid>
                    </>)
                }

            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data,
    loading: state.ui.loading
})

export default connect(mapStateToProps, {getUserData})(User);