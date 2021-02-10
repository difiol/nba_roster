import React, { useState } from "react";
import { gsap, Power3 } from "gsap";

import axios from "axios";
import Roster from "../components/Roster.js";
import NBAMenu from "../components/NBAMenu.js";

let firstLoad = true;
export default function NBA(props) {
	//This component is the one responsible for returning all the NBA related components
	const [roster, setRoster] = useState([]); //Variable for the players information from the GET result
	const [teamResult, setTeamResult] = useState(""); //Variable that store the team name from the result of the petition
	let team = ""; //Variable for the form input and GET petition
	let err = false;
	let errEl;

	/* This function will make the petition to the API with the team name gave by the user */
	const petitionGet = async (team) => {
		const url = `https://data.nba.net/v2015/json/mobile_teams/nba/2020/teams/${team}_roster.json`;

		if (errEl) {
			try {
				document.getElementById("NBAmenu").removeChild(errEl);
			} catch {
				console.log("No child to remove");
			}
		}

		try {
			//GET petition to the API
			const response = await axios.get(url);
			if (response.data.t.tn !== teamResult) {
				let childs = document.getElementById("roster").childNodes; //Gets all the player cards to animate them
				/* Exit animations after the first call */
				if (!firstLoad) {
					gsap.to("#roster", { duration: 0, possition: "relative" });
					let d = 1;
					for (let i = childs.length; i >= 0; i--) {
						console.log(i);
						gsap.to(childs[i], {
							duration: 0.3,
							xPercent: -10,
							left: "50%",
							yPercent: 50,
							top: "50%",
							position: "absolute",
							ease: Power3.easeOut,
							delay: 0.1 * d,
						});
						d++;
					}

					await gsap.to("#roster", {
						duration: 0.2,
						x: 500,
						opacity: 0,
						ease: Power3.easeInOut,
						delay: 0.1 * d,
					});
				}
				firstLoad = false;

				/* New TEAM and ROSTER from the petition result */
				setRoster(response.data.t.pl);
				setTeamResult(response.data.t.tn);

				/* Repossition al the html divs */
				childs = document.getElementById("roster").childNodes;
				for (let i = 0; i < childs.length; i++) {
					gsap.to(childs[i], {
						duration: 0,
						xPercent: 0,
						left: 0,
						yPercent: 0,
						top: 0,
						position: "relative",
					});
				}
				gsap.to("#roster", { duration: 0, x: 0, opacity: 1 });
			}
			err = false;
		} catch {
			//If the petition fails it will be shown in the HTML with a new element
			console.log("¡Fallo en la petición!");
			err = true;
			errEl = document.createElement("div");
			errEl.className =
				"text-red-600 font-bold text-l animate-pulse | relative m-auto w-1/2 top-56";
			errEl.textContent = "INTRODUCE A VALID TEAM";
			document.getElementById("NBAmenu").appendChild(errEl);
			console.log(errEl);
		}
		//GET petition to tha API
		/*axios
			.get(url)
			.then((response) => {
				//If the status is OK the data is stored
				if (response.data.t.tn !== teamResult) {
					setRoster(response.data.t.pl);
					setTeamResult(response.data.t.tn);
				}
				setErr(false);
			})
			.catch(() => {
				//Catch if the team name isn't valid and the petition fails
				console.log("¡Fallo en la petición!");
				setErr(true);
			});*/
	};

	/* Function called from the form setting the input as the new team value */
	const getTeam = (input) => {
		if (!input || /^\s*~/.test(input)) {
			//This will avoid the user typing extra spaces in the input
			return;
		}

		if (team !== input && !err) {
			team = input;
		}
		petitionGet(input);
	};

	return (
		<div>
			<span id="NBAmenu">
				<NBAMenu onSubmit={getTeam}></NBAMenu>
			</span>
			<div id="" className="m-auto pt-44">
				<Roster roster={roster} team={teamResult}></Roster>
			</div>
		</div>
	);
}
