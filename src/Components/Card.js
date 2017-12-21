import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HanabiDispatcher from '../Actions/HanabiDispatcher';

class Card extends Component {
	constructor(){
		super();
		this.state = {
			selected : false
		}
	}
	componentDidMount(){
		HanabiDispatcher.register(this.eventReceived.bind(this));
	}
	eventReceived(event) {
		switch(event.source){
			case "CARD_SELECTED":
				this.setState({selected : event.cardId === this.props.id && !this.state.selected});
				break;
			default: break;
		}
	}
	render() {
		return (
			<div onClick={()=>this.props.clickHandler(this.props.id)}
				className={
					this.props.color + ' gamecard ' +
					(this.props.played ? ' played ' : '') + 
					(this.state.selected ? ' selected ' : '')
				}
			>
				{
					<span className="playedNumber">
						{this.props.number === undefined ? '?' : this.props.number}
					</span>
				} 
			</div>
		);
	}
}


export default Card;
Card.propTypes = {
	played       : PropTypes.bool,
	color        : PropTypes.string,
	number       : PropTypes.number,
	clickHandler : PropTypes.func,
	id           : PropTypes.number,
	selected     : PropTypes.bool
}