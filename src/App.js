import React, { Component } from 'react';

import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/search-box.component';

import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      monsters: [],
      searchField: ''
    };
  }

  //Word geroepen zodra het root element bestsaat
  componentDidMount() {
    //Haal data op via api
    fetch('https://jsonplaceholder.typicode.com/users')
    //Maak er een JSON formaat van
    .then(response => response.json())
    //Voeg de teruggekeerde json data toe aan de Monsters array
    .then(users => this.setState({ monsters: users }));
  }

  //arrow function (zie hieronder) zorgt ervoor dat "this" context krijgt op basis van hetgeen waar de functie is gedeclareerd
  //In dit geval dus de app class component
  handleChange = e => {
    this.setState({ searchField: e.target.value});
  };

  //Render de DOM
  //Haal monsters en field value op, filter array op value van het searchfield
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster => 
        monster.name.toLowerCase().includes(searchField.toLowerCase())
      );
    return(
      <div className="App">
        <h1>Monsters rolodex</h1>
        <SearchBox
          placeholder='Search monsters' 
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
