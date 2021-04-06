import React from 'react';
import Home from "./Home";
import {connect} from "react-redux";
import {getScreams} from "../../redux/actions/dataAction";

class HomeContainer extends React.Component {
    componentDidMount() {
        this.props.getScreams();
    }

    render() {
        return (
            <div>
                <Home
                    screams={this.props.data.screams}
                    loading={this.props.ui.loading}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        data: state.data,
        ui: state.ui
    }
}

export default connect(mapStateToProps, {
    getScreams: getScreams,
})(HomeContainer);

