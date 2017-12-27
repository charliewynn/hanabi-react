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
		this.register = HanabiDispatcher.register(this.eventReceived.bind(this));
	}
	componentWillUnmount(){
		HanabiDispatcher.unregister(this.register);
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
		//if it's the "played" card stack, props.colors doesn't exist
		//so I'll null coalesce and it won't show below
		const colors = (this.props.colors || []).map((c,i)=>
			<span key={i} className={'advise color ' + c} />
		);
		const numbers = (this.props.numbers || []).map((n,i)=>
			<span key={i} className={'advise number ' + n}>{n}</span>
		);
		return (
			<div onClick={()=>this.props.clickHandler(this.props.id)}
				className={
					this.props.color + ' gamecard ' +
					(this.props.played ? ' played ' : '') + 
					(this.state.selected ? ' selected ' : '')
				}
			>
				{
					<div>
						<span className="playedNumber">
							{this.props.number === undefined ? '?' : this.props.number}
						</span>
						{
							(this.props.discard || this.props.played) ? '' : (
								<div>
									<div>
										{colors}
									</div>
									<div>
										{numbers}
									</div>
								</div>
							)
						}
					</div>
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
	selected     : PropTypes.bool,
	colors       : PropTypes.array,
	numbers      : PropTypes.array,
	discard      : PropTypes.bool
}