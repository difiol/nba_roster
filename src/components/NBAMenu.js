import React, { useState } from "react";
import { TweenMax, Bounce } from "gsap";
import NBAForm from "../components/NBAForm.js";
import score_board from "../images/score-board.png";

export default function NBAMenu(props) {
	const [anim, setAnim] = useState(true);

	/** ANIMATIONS **/
	const showScoreBoard = (el) => {
		if (anim) {
			TweenMax.from(el, 1, {
				y: -250,
				ease: Bounce.easeOut,
				delay: 0.5,
			});
			setAnim(false);
		}
	};

	return (
		<div id="menu" className="m-auto">
			<div className="absolute md:h-10" ref={showScoreBoard}>
				<div>
					<img
						id="score-board"
						src={score_board}
						className="relative"
						alt="Score Board Menu"
					></img>
				</div>
				<div className="-mt-24">
					<h1
						id="roster-title"
						className="relative w-1/2 mx-auto text-center | text-2xl text-gray-50 text-opacity-75"
					>
						Rosters NBA
					</h1>
					<div className="w-max m-auto relative">
						<NBAForm onSubmit={props.onSubmit}></NBAForm>
					</div>
				</div>
			</div>
		</div>
	);
}
