//import dispatcher from '../dispatcher';
import hanabi from 'hanabi-node';

export function createGame(playerNames){
	const gameInit = hanabi.createGame({playerNames});

	localStorage.setItem("game" + gameInit.id,
		JSON.stringify(hanabi.getGame()));
	return gameInit;
}

export function load(gid, callback){
	const storedGameString = localStorage.getItem('game'+gid);
	const storedGame = JSON.parse(storedGameString);
	const partialGame = hanabi.loadGame(storedGame);
	callback(partialGame);
}

export function getCurrPlayerState(callback){
	const game = hanabi.getGame();
	const playerId = game.players[game.whosTurn].id;
	const playerState = hanabi.getPlayerGameState(playerId);
	callback(playerState);
}