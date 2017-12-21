import { Dispatcher } from 'flux';
var HanabiDispatcher = new Dispatcher();

HanabiDispatcher.cardSelected = function(cardProps, playerName, isYou){
	this.dispatch({
		source : "CARD_SELECTED",
		cardId : cardProps.id,
		props  : cardProps,
		playerName,
		isYou
	});
};

export default HanabiDispatcher;