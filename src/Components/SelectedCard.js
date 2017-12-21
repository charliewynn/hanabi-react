import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button } from 'reactstrap';

class SelectedCard extends Component {
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
									<Button>Play</Button><Button>Discard</Button>
								</div>
							)
								:
								(
									<div>
										<Button>Advise Colors</Button><Button>Advise Numbers</Button>
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
	isYou: PropTypes.bool,
	playerName: PropTypes.string
}