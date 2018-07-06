import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import InfoDisplay from './components/InfoDisplay.js';
import NavBar from'./components/NavBar.js'

class App extends Component {
    authenticate(){
        return new Promise(resolve => setTimeout(resolve, 2000))
    }

    componentDidMount(){
        this.authenticate().then(() => {
            const ele = document.getElementById('ipl-progress-indicator')
            if(ele){
                // fade out
                ele.classList.add('available')
                setTimeout(() => {
                    // remove from DOM
                    ele.outerHTML = ''
                }, 2000)
            }
        })
    }
  render() {
    return (
      <div className="App" >
          <NavBar/>
        <InfoDisplay/>
      </div>
    );
  }
}

export default App;
