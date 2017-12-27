import React, { Component } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import HanabiDispatcher from '../Actions/HanabiDispatcher';

class Player extends Component {
	cardClicked(id) {
		HanabiDispatcher.cardSelected(
			this.props.hand.filter(c => c.id === id)[0],
			this.props.name,
			this.props.you
		);
	}
	render() {
		let lastMove = '';
		if (this.props.lastMove) {
			switch (this.props.lastMove[0]) {
				case "Play":
					if (this.props.lastMove[1]) {
						lastMove = (
							<div className="lastMove">
								Played a <Card discard {...this.props.lastMove[2]} />
							</div>
						)
					}
					else {
						lastMove = (
							<div className="lastMove">
								Tried to play a <Card discard {...this.props.lastMove[2]} /> but it didn&#039;t play
							</div>
						)
					}
					break;
				case "Advise":
					lastMove = (
						<div>
							Told {this.props.lastMove[1]} about their {this.props.lastMove[2]}&#039;s
						</div>
					)
					break;
				case "Discard":
					lastMove = (
						<div className="lastMove">
							Discarded a <Card discard {...this.props.lastMove[1]} />
						</div>
					)
					break;
				default: break;
			}
		}
		const cards = this.props.hand.map((c, i) =>
			<Card clickHandler={this.cardClicked.bind(this)} key={i} {...c} />
		);
		return (
			<Container>
				<Row>
					<Col xs={12}>
						{this.props.name}
						{this.props.you && " (you)"}
						{lastMove}
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
	name: PropTypes.string,
	hand: PropTypes.array,
	you: PropTypes.bool,
	lastMove: PropTypes.array
}