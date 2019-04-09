import React, { Component } from "react";
import {
	Button,
	ButtonGroup,
	Input,
	InputGroup,
	InputGroupButton,
	Row,
	Col
} from "reactstrap";
import * as LocalStorage from "../Actions/LocalStorage";

class CreateGame extends Component {
	constructor() {
		super();
		this.state = {
			gameType: "local",
			numPlayers: 2,
			player1: "Charlie",
			player2: "Thomas",
			player3: "Guy",
			player4: "Jordan",
			player5: ""
		};
	}
	createGame() {
		let playerNames = [];
		for (let i = 0; i < this.state.numPlayers; i++) {
			playerNames.push(this.state["player" + (i + 1)]);
		}
		if (this.state.gameType === "local") {
			const gameInit = LocalStorage.createGame(playerNames);
			window.location.href += "?id=" + gameInit.id;
			this.gameWasCreated.bind(this)(gameInit);
		} else {
			//hit api with create game request, then run gameWasCreated
		}
	}
	gameWasCreated(gameInit) {
		console.log("game was created", gameInit);
	}
	onRadioClick(val) {
		this.setState({
			gameType: val
		});
	}
	nameChange(e) {
		this.setState({
			["player" + (+e.target.attributes.player.value + 1)]: e.target.value
		});
	}

	render() {
		const playerNames = Array(this.state.numPlayers)
			.fill("player")
			.map((p, i) => p + (i + 1))
			.map(p => this.state[p]);

		const everyoneHasNames = playerNames.every(
			playerName => playerName.length > 0
		);
		const dupNames = [...new Set(playerNames)].length !== playerNames.length;

		const localColor =
			this.state.gameType === "local" ? "success" : "secondary";
		const onlineColor =
			this.state.gameType === "online" ? "success" : "secondary";
		const numPlayers = Array(4)
			.fill("")
			.map((a, i) => (
				<Button
					key={i}
					active={this.state.numPlayers === 2 + i}
					color={this.state.numPlayers === 2 + i ? "success" : "secondary"}
					onClick={() => this.setState({ numPlayers: i + 2 })}
				>
					{2 + i}
				</Button>
			));

		const playerNamesEl = Array(this.state.numPlayers)
			.fill("")
			.map((a, i) => (
				<Row key={i}>
					<Col xs={{ size: 10, offset: 1 }}>
						<InputGroup>
							{this.state["player" + (i + 1)].length > 0 &&
								playerNames.filter(n => n === this.state["player" + (i + 1)])
									.length > 1 && (
									<InputGroupButton color="danger">
										Duplicate Name
									</InputGroupButton>
								)}
							<Input
								player={i}
								placeholder={"Player " + (i + 1) + "'s name"}
								onChange={this.nameChange.bind(this)}
								value={this.state["player" + (i + 1)]}
							/>
						</InputGroup>
					</Col>
				</Row>
			));
		return (
			<div>
				<h1>Create a Hanabi Game!</h1>
				<ButtonGroup>
					<Button
						color={localColor}
						onClick={() => this.onRadioClick("local")}
						active={this.state.gameType === "local"}
					>
						Local Game
					</Button>
					<Button
						color={onlineColor}
						onClick={() => this.onRadioClick("online")}
						active={this.state.gameType === "online"}
					>
						Online Game
					</Button>
				</ButtonGroup>
				<br />
				<br />
				<ButtonGroup>
					<Button color="">How Many Players?</Button>
					{numPlayers}
				</ButtonGroup>
				<br />
				<br />
				{playerNamesEl}
				<br />
				{!dupNames && everyoneHasNames && (
					<Button onClick={this.createGame.bind(this)} color="success">
						Start Game
					</Button>
				)}
				{!everyoneHasNames && (
					<Button color="danger">Give Each Player a Name</Button>
				)}
			</div>
		);
	}
}

export default CreateGame;
