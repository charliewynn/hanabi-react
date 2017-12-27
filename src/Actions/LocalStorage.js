//import dispatcher from '../dispatcher';
import hanabi from 'hanabi-node';

export function createGame(playerNames){
	const gameInit = hanabi.createGame({playerNames});

	localStorage.setItem("game" + gameInit.id,
		JSON.stringify(hanabi.getGame()));
	return gameInit;
}

export function wipe(){
	localStorage.removeItem("game"+hanabi.getGame().id);
}

export function load(gid, callback){
	const storedGameString = localStorage.getItem('game'+gid);
	const storedGame = JSON.parse(storedGameString);
	const partialGame = hanabi.loadGame(storedGame);
	console.log('game', hanabi.getGame());
	callback(partialGame);
}

function save(){
	const game = hanabi.getGame();
	localStorage.setItem('game'+game.id, JSON.stringify(game));
}

export function getCurrPlayerState(callback){
	const game = hanabi.getGame();
	const playerId = game.players[game.whosTurn].id;
	const playerState = hanabi.getPlayerGameState(playerId);
	callback(playerState);
}

export function play(id, callback){
	const game = hanabi.getGame();
	const self = game.players[game.whosTurn].id;
	const res = hanabi.play(self, id);
	console.log('play res', res);
	save();
	callback(res);
}

export function discard(id, callback){
	const game = hanabi.getGame();
	const self = game.players[game.whosTurn].id;
	const res = hanabi.discard(self, id);
	console.log('discard res', res);
	save();
	callback(res);
}

export function advise(id, colorOrNum, callback){
	const game = hanabi.getGame();
	const advisor = game.players[game.whosTurn].id;
	const to = game.players.findIndex(p=>p.hand.findIndex(c=>c.id === id) >= 0);
	const res = hanabi.advise(advisor, to, colorOrNum);
	console.log('advise res', res);
	console.log('game', hanabi.getGame());
	save();
	callback(res);
}