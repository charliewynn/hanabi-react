import React, { Component } from 'react';
import { Row, Col, Progress } from 'reactstrap';
import * as LocalStorage from '../Actions/LocalStorage';
import Card from './Card';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faBomb } from '@fortawesome/fontawesome-free-solid';
import { faCommentAlt } from '@fortawesome/fontawesome-free-regular';

class Game extends Component {
	constructor(props){
		super(props);
		const backend = props.isLocal ?
			LocalStorage : this.noBackend;
		this.state = {
			backend,
			playerGameState : {}
		}
	}
	dev=true;
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
		if(this.props.isLocal){
			this.setState({
				countDown  : this.dev ? 3 : 5,
				playerName : gameInit.players[gameInit.whosTurn].name
			})
			setTimeout(()=>this.countDown(), this.dev ? 200 : 1000);
		} else {
			this.state.backend.getCurrPlayerState(this.gotCurrPlayerState.bind(this));
		}
	}
	countDown(){
		const newCountDown = this.state.countDown-1;
		this.setState({
			countDown : newCountDown
		});
		if(newCountDown > 0) setTimeout(()=>this.countDown(), this.dev ? 200: 1000);
		else {
			this.state.backend.getCurrPlayerState(this.gotCurrPlayerState.bind(this));
		}
	}
	gotCurrPlayerState(playerGameState) {
		console.log("playerGameState", playerGameState);
		this.setState({
			playerGameState
		});
	}
	render() {
		const bombs = Array(this.state.playerGameState.bombs||0).fill('').map((b,i)=>
			<FontAwesomeIcon key={i} icon={faBomb} size="lg" />
		);
		const advice = Array(this.state.playerGameState.advice||0).fill('').map((b,i)=>
			<FontAwesomeIcon className="advice" key={i} icon={faCommentAlt} size="lg" />
		);
		const played = Object.keys(this.state.playerGameState.played||{}).map((c,i)=>
			<Card key={i} color={c} number={this.state.playerGameState.played[c]} played />
		);
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
				<hr />
				{played}
				<br />
				<div className="iconHolder">{advice}</div>
				<div className="iconHolder">{bombs}</div>
				{
					this.state.playerGameState.id && (
						<Row id="deckLeft"><Col xs={{size : 10, offset : 1}}>
							<div>
								{this.state.playerGameState.cardsInDeck} cards left
							</div>
							<Progress multi>
								<Progress bar value={(50-this.state.playerGameState.cardsInDeck)*2} animated color='warning' />
								<Progress bar value={this.state.playerGameState.cardsInDeck*2} />
							</Progress>
						</Col></Row>
					)
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