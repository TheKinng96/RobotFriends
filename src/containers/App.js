import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import ErrorBoundry from '../components/ErrorBoundry';
import Scroll from '../components/Scroll';

import { setSearchField, requestRobots } from '../action';
// import { robots } from "../robot"; //if the file only contain one thing, use {} to get it


//in order to use state: the search field needs to be a class
/* 
React life cycle method
    mounting - replacing a component and adding an entire app [start of an app]
        constructor
        componentWillMount
        render
        componentDidMount
    updating
    unmounting
*/

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
} //where to get the command or materials for the actions

const mapDispatchToProps = (dispatch) =>{
    return{
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobot: () => dispatch(requestRobots())
    }
} //which actions should be done

class App extends Component{
    
    componentDidMount() {
        this.props.onRequestRobot();
    }

    render(){
        const { searchField, onSearchChange,robots, isPending } = this.props;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase())
        });
        return isPending ? 
            <h1>Loading</h1> : 
            (
            <div className="tc">
                <h1 className="f1" >RobotFriends</h1>
                <SearchBox searchChange = {onSearchChange}/>
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filterRobots} />
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
        // ! is 'is not' thus !robots = no robots ?=if
    }
}
// to make we only scroll inside the content, we need to use children <Scroll>
//state is a two ways communication while props is just one way

export default connect(mapStateToProps, mapDispatchToProps)(App);