import { Button } from 'reactstrap';
import CreateGame from './Components/CreateGame';
import Game from './Components/Game';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
	constructor() {
		super();
		const href = window.location.href.split('?');
		let gameId = undefined;
		if (href.length === 2) {
			const params = href[1].split('&');
			for (let p of params) {
				let [key, val] = p.split('=');
				if (key.toLowerCase() === 'id') {
					gameId = val;
				}
			}
		}
		console.log('gameid', gameId);
		const currentLocalGames = Object.getOwnPropertyNames(localStorage);
		const isLocalGame = currentLocalGames.indexOf('game'+gameId) > -1;
		
		this.state = {
			gameId,
			isLocalGame,
			currentLocalGames
		};
	}
	localGameChosen(gameId){
		console.log('gid', gameId);
		window.location.href = window.location.href.split('?')[0] + '?id='+gameId.slice(4);
	}
	render() {
		const localGameButtons = this.state.currentLocalGames
			.filter(gid => gid !== 'game'+this.state.gameId)
			.map(gid=>[gid,new Date(+gid.split('-')[0].slice(4))])
			.map((giddate,i) =>
				<Button key={i} color=""
					onClick={()=>this.localGameChosen.bind(this)(giddate[0])}>
					{
						"Game started: " + 
						giddate[1].toLocaleDateString() + " " +
						giddate[1].toLocaleTimeString()
					}
				</Button>
			);
		return (
			<div className="App">
				{
					this.state.gameId ?
						<Game id={this.state.gameId} isLocal={this.state.isLocalGame} />
						:
						<CreateGame />
				}
				<br />
				{localGameButtons}
			</div>
		);
	}
}

export default App;
