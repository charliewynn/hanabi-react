import React, { Component } from 'react';
import * as LocalStorage from '../Actions/LocalStorage';
import PropTypes from 'prop-types';

class Game extends Component {
	constructor(props){
		super(props);
		console.log(props.isLocal);
		const backend = props.isLocal ?
			LocalStorage : this.noBackend;
		this.state = {
			backend
		}
	}
	componentDidMount(){
		this.state.backend.load(this.props.id, this.gameLoaded.bind(this));
	}
	noBackend =
	{
		load : function(){
			alert("you tried to play a game with no backend (probably online)");
		}
	}
	gameLoaded(gameInit){
		console.log("gameinit", gameInit);

		this.setState({
			countDown  : 3,
			playerName : gameInit.players[gameInit.whosTurn].name
		})
		setTimeout(()=>this.countDown(),1000);
	}
	countDown(){
		const newCountDown = this.state.countDown-1;
		this.setState({
			countDown : newCountDown
		});
		if(newCountDown > 0) setTimeout(()=>this.countDown(),1000);
		else {
			this.state.backend.getCurrPlayerState(this.gotCurrPlayerState.bind(this));
		}
	}
	gotCurrPlayerState(playerGameState) {
		console.log("playerGameState", playerGameState);
	}
	render() {
		return (
			<div>
				{
					this.state.countDown > 0 ?
						(
							<div>
								<h1>Preparing for {this.state.playerName}&#39;s Turn </h1>
								<h1>{this.state.countDown}</h1>
							</div>
						)
						:
						<h3>{this.state.playerName}&#39;s Turn</h3>
				}
			</div>
		);
	}
}

export default Game;
Game.propTypes = {
	isLocal : PropTypes.bool,
	id      : PropTypes.string
}