import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css';
import Scroll from '../components/Scroll'
import { robots } from "../robot"; //if the file only contain one thing, use {} to get it


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
class App extends Component{
    constructor(){
        super();
        this.state = {
            robots: [],
            searchfield:''
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({ robots: users }))
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }
    render(){
        const { robots, searchfield } = this.state;
        const filterRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        });
        return !robots.length ? 
            <h1>Loading</h1> : 
            (
            <div className="tc">
                <h1 className="f1" >RobotFriends</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filterRobots} />
                </Scroll>
            </div>
        );
        // ! is 'is not' thus !robots = no robots ?=if
    }
}
// to make we only scroll inside the content, we need to use children <Scroll>
//state is a two ways communication while props is just one way

export default App;