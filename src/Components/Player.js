import React, { Component } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import HanabiDispatcher from '../Actions/HanabiDispatcher';

class Player extends Component {
	cardClicked(id){
		HanabiDispatcher.cardSelected(
			this.props.hand.filter(c=>c.id === id)[0],
			this.props.name,
			this.props.you
		);
	}
	render() {
		const cards = this.props.hand.map((c,i)=>
			<Card clickHandler={this.cardClicked.bind(this)} key={i} {...c} />
		);
		return (
			<Container>
				<Row>
					<Col xs={12}>
						{this.props.name}
						{this.props.you && " (you)"}
					</Col>
				</Row>
				<Row>
					<Col xs={12}>
						{cards}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Player;
Player.propTypes = {
	name : PropTypes.string,
	hand : PropTypes.array,
	you  : PropTypes.bool
}