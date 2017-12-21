import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
	render() {
		return (
			<div className={this.props.color + ' gamecard ' + (this.props.played && 'played')}>
				{
					this.props.played && <span className="playedNumber">{this.props.number}</span>
				} 
			</div>
		);
	}
}


export default Card;
Card.propTypes = {
	played : PropTypes.bool,
	color  : PropTypes.string,
	number : PropTypes.number
}