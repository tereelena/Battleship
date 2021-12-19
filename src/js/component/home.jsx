import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [player, setPlayer] = useState([
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	]);
	const [playerFire, setPlayerFire] = useState([
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	]);

	const [computerPlayer, setComputerPlayer] = useState([
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	]);
	const [computerPlayerFire, setComputerPlayerFire] = useState([
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	]);
	//hooks
	const [playerHit, setPlayerHit] = useState([]);
	const [playerScore, setPlayerScore] = useState(5);

	const [computerHit, setComputerHit] = useState([]);
	const [computerScore, setComputerScore] = useState(5);

	useEffect(() => {
		randomComputerShip();

		randomComputerShipFire();
	}, []);

	//Jugador ubica  sus barcos
	function jugadorBarco(e) {
		// Set ship variable to pisition in array ;
		let ship = e.target.getAttribute("data-index");
		player[ship] = "Barco";
		//Set maximum amount of ships allowed
		let suma = 0;
		for (let num = 0; num < player.length; num++) {
			if (player[num] === "Barco") {
				sum += 1;
			}
		}
		if (sum < 2) {
			alert("Puedes colocar 3 Naves mas");
			setPlayer([...player], player[ship]);
		} else if (sum < 3) {
			alert("Puedes colocar  2 Naves mas");
			setPlayer([...player], player[ship]);
		} else if (sum < 4) {
			alert("Puedes colocar 1 Naves mas");
			setPlayer([...player], player[ship]);
		} else {
			alert("Ya cuentas con la cantidad suficiente de la flota");
		}
		console.log(player);
	}

	//player picks firing position
	function playerFirePosition(e) {
		// Set ship variable to pisition in array ;
		let fire = e.target.getAttribute("data-index");
		playerFire[fire] = "X";
		setPlayerFire([...playerFire], playerFire[fire]);
		console.log("player fire -->", playerFire);
	}
	//Computer random Fire Position
	function randomComputerShip() {
		// Set ship variable to pisition in array ;
		let randomShip = Math.floor(Math.random() * 25);
		computerPlayer[randomShip] = "X";
		setComputerPlayerFire([...computerPlayer], computerPlayer[randomShip]);
		console.log(computerPlayer);
	}
	//Computer random placement of ships
	function randomComputerShipFire() {
		// Set ship variable to pisition in array ;
		let randomShipFire = Math.floor(Math.random() * 20);
		computerPlayerFire[randomShipFire] = "Barco";
		setComputerPlayer(
			[...computerPlayerFire],
			computerPlayer[randomShipFire]
		);
		console.log("computerPlayerFire ", computerPlayerFire);
	}

	function fireToComputer() {
		for (let i = 0; i < playerFire.length; i++) {
			for (let j = 0; j < computerPlayer.length; j++) {
				if (
					playerFire[i] === "X" &&
					computerPlayer[j] === "Ship" &&
					playerFire[i] !== computerPlayer[j] &&
					i === j
				) {
					console.log(
						"we have a hit ",
						"playerFire ",
						i,
						"computerPlayer ",
						j
					);
					setComputerHit([...computerHit, j]);
					console.log("computerHit ", computerHit);
					//reset to Bang when hit!
					function playerBang() {
						computerPlayer[j] = "BANG!";
						setComputerPlayer(
							[...computerPlayer],
							computerPlayer[j]
						);
						console.log("BAAANG! -->", computerPlayer);
					}
					playerBang();
				}
			}
		}
	}

	return (
		<div className="text-center text-white">
			<h1>Battleships</h1>
			<div className="row">
				<div className="table_battle mt-5">
					{/* ___ Tablero  Usuario ___ */}
					<h5 className="text-center text-white">
						Jugador{" "}
						<span className="mx-3 text-primary text-sm">
							flota: {""}{" "}
						</span>
					</h5>

					{player.map((key, index) => {
						return (
							<button
								type="button"
								className="btn btn-warning m-2"
								key={{ key }}
								style={{
									width: "15%",
								}}
								data-index={index}
								onClick={jugadorBarco}>
								{key === "Barco" || key === "X" || key === 0 ? (
									<span className="invisible">{key}</span>
								) : (
									<span className="">{key}</span>
								)}
							</button>
						);
					})}
				</div>
				<div className="table_battle mt-5">
					{/* ___ Tablero  Computador ___ */}
					<h5 className="text-center text-white">
						Computador{" "}
						<span className="mx-3 text-primary text-sm">
							flota: {""}{" "}
						</span>
					</h5>

					{computerPlayer.map((key, index) => {
						return (
							<button
								type="button"
								className="btn btn-info m-2"
								key={{ key }}
								style={{
									width: "15%",
								}}
								data-index={index}>
								{key}
							</button>
						);
					})}
				</div>
			</div>

			<div className="container">
				<div className="row">
					<button
						type="button"
						className="btn btn-primary mx-auto mt-2"
						style={{ width: "200px" }}
						onClick={"fireToComputer"}>
						player Shoot
					</button>
					<button
						type="button"
						className="btn btn-primary mx-auto mt-2"
						style={{ width: "200px" }}
						onClick={"fireToPlayer"}>
						Computer Shoot
					</button>
				</div>
			</div>
		</div>
	);
};

export default Home;
