import React, { Component } from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css';
import { robots } from "./robot"; //if the file only contain one thing, use {} to get it


//in order to use state: the search field needs to be a class

class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: robots,
            searchfield:''
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }
    render(){
        const filterRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        });
        return (
            <div className="tc">
                <h1 className="f1" >RobotFriends</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <CardList robots={filterRobots} />
            </div>
        );
    }
}
//state is a two ways communication while props is just one way

export default App;