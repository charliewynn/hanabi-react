import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'reactstrap';
import * as LocalStorage from '../Actions/LocalStorage';
import HanabiDispatcher from '../Actions/HanabiDispatcher';

class SelectedCard extends Component {
	play() {
		LocalStorage.play(this.props.id, this.gotMoveResult.bind(this));
	}
	discard() {
		LocalStorage.discard(this.props.id, this.gotMoveResult.bind(this));
	}
	color() {
		LocalStorage.advise(this.props.id, this.props.color, this.gotMoveResult.bind(this));
	}
	number() {
		LocalStorage.advise(this.props.id, this.props.number, this.gotMoveResult.bind(this));
	}
	gotMoveResult() {
		HanabiDispatcher.moveMade();
	}
	render() {
		return (
			<Container>
				<Row>
					<Col>
						{this.props.isYou ? "your" : this.props.playerName + "'s"} card
					</Col>
				</Row>
				<Row>
					<Col>
						{
							this.props.isYou ? (
								<div>
									<Button onClick={this.play.bind(this)} color="primary">Play</Button>
									{
										this.props.advise < 8 ?
											<Button onClick={this.discard.bind(this)} color="warning">Discard</Button>
											:
											<div>Cannot discard with full advise</div>
									}
								</div>
							)
								:
								(
									<div>
										{
											this.props.advise > 0 ? (
												<div>
													<Button onClick={this.color.bind(this)} color="info">
														Advise All {this.props.color}s
													</Button>
													<Button onClick={this.number.bind(this)} color="primary">
														Advise All {this.props.number}s
													</Button>
												</div>
											)
												:
												<span>No advise tokens</span>
										}
									</div>
								)
						}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default SelectedCard;

SelectedCard.propTypes = {
	id: PropTypes.number,
	color: PropTypes.string,
	number: PropTypes.number,
	isYou: PropTypes.bool,
	playerName: PropTypes.string,
	advise    : PropTypes.number
}