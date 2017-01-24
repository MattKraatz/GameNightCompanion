import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';

const emptyInput = {newGame: {
  name: '',
  minPlayers: '',
  maxPlayers: '',
  owner: ''
}}

export default React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return emptyInput;
  },
  componentWillMount: function() {
    var ref = Firebase.database().ref('games');
    this.bindAsArray(ref, 'games');
  },
  onChange: function(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const game = this.state.newGame;
    game[name] = value;
    this.setState(game);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.newGame.name && this.state.newGame.name.trim().length !== 0) {
      this.firebaseRefs['games'].push(this.state.newGame);
      this.setState(emptyInput);
    }
  },
  render: function() {
    return <div className="collection">
      <h2>Games Available</h2>
      {this.state.games.map((item, index) => {
        return <div key={item[".key"]}>
            <div>{item.name}</div>
          </div>
      })}
      <h2>New Game</h2>
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="name">Name</label>
          <input name="name" value={ this.state.newGame.name } onChange={ this.onChange } />
        <br />
        <label htmlFor="owner">Owner</label>
          <input name="owner" value={ this.state.newGame.owner } onChange={ this.onChange } />
        <br />
        <label htmlFor="minPlayers">Minimum # of Players</label>
          <input name="minPlayers" value={ this.state.newGame.minPlayers } onChange={ this.onChange } />
        <br />
        <label htmlFor="maxPlayers">Maximum # of Players</label>
          <input name="maxPlayers" value={ this.state.newGame.maxPlayers } onChange={ this.onChange } />
        <button>{ 'Add #' + (this.state.games.length + 1) }</button>
      </form>
    </div>
  }
})
