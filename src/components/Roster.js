import React from "react";
import { gsap, TweenMax, Elastic, Power3, TweenLite } from "gsap";
import default_user from "../images/default_user.png";
import nba_card from "../images/NBA-card.png";
import nba_card_reverse from "../images/NBA-card-reverse.png";

export default function Roster(props) {
	/* This component is the menu of the single page application */
	const roster = props.roster;
	const team = props.team;

	const handleError = (el) => {
		console.log("Error al cargar imagen");
		el.target.onError = null;
		el.target.src = default_user;
	};

	/** ANIMATIONS **/
	var d = 0; //This will add the delay for every card to appear a second after

	const moveCard = (el) => {
		gsap.to(el, { duration: 0, x: -500, opacity: 0 });
		TweenMax.to(el, 0.5, {
			x: 0,
			opacity: 1,
			delay: d,
		});
	};

	const flipReverse = (el) => {
		gsap.to(el, { duration: 0, rotationY: 0, scaleX: 0.9, scaleY: 0.9 });
		TweenMax.to(el, 0.3, {
			rotationY: 90,
			scaleX: 1,
			scaleY: 1,
			delay: d + 1,
		});
	};

	const flipCard = (el) => {
		gsap.to(el, { duration: 0, rotationY: 90, scaleX: 0.9, scaleY: 0.9 });
		TweenMax.to(el, 1, {
			rotationY: 0,
			scaleX: 1,
			scaleY: 1,
			ease: Elastic.easeOut,
			delay: d + 0.9,
		});
	};

	const showImage = (el) => {
		gsap.to(el, { duration: 0, scaleX: 0, scaleY: 0 });
		gsap.to(el, {
			duration: 0.5,
			scaleX: 1,
			scaleY: 1,
			ease: Power3.easeOut,
			delay: d + 0.6,
		});
		d = d + 0.3;
	};

	const mouseOver = (el) => {
		TweenLite.to(el.currentTarget, 0.2, {
			scale: 1.2,
			marginRight: 80,
			y: -50,
		});
	};

	const mouseLeave = (el) => {
		TweenLite.to(el.currentTarget, 0.2, {
			scale: 1,
			marginLeft: -80,
			marginRight: -80,
			y: 0,
		});
	};

	return (
		<div id="roster" className="lg:w-max mx-auto mt-24 sm:w-3/4 ">
			{roster.map(function (player, index) {
				const img = `https://nba-players.herokuapp.com/players/${player.ln}/${player.fn}`;
				return (
					<span
						className="relative float-left w-56 h-90 -mx-20 my-4 pb-4"
						ref={moveCard}
						onInput={moveCard}
						onMouseOver={mouseOver}
						onMouseLeave={mouseLeave}
						key={`card-${index}`}
					>
						<div className="absolute w-52 -top-0 ml-2 mt-2">
							<img src={nba_card_reverse} ref={flipReverse} alt="Reverso"></img>
						</div>
						<div key={index} ref={flipCard} className="" id={index}>
							<img
								id={`img-${index}`}
								src={nba_card}
								className="absolute"
								alt="Carta"
							></img>
							<h1 className="font-mono relative top-1 text-gray-300">
								{team.toUpperCase()}
							</h1>
							<span className="">
								<img
									src={img}
									className=" rounded-full h-32 static m-auto top-8 relative"
									alt="Jugador NBA"
									onError={handleError}
									ref={showImage}
								></img>
							</span>
							<h2 className="text-gray-100 text-center m-auto relative top-14">
								{player.fn.toUpperCase()} {player.ln.toUpperCase()}
							</h2>
							<h3 className="text-left relative ml-4 mt-20 text-xs text-gray-300">
								POSITION: {player.pos.toUpperCase()}
							</h3>
							<h3 className="text-left relative ml-32 -mt-4 text-xs text-gray-300">
								NUMBER: {player.num.toUpperCase()}
							</h3>
							<h3 className="text-left relative ml-4 mt-6 text-xs text-gray-300">
								HEIGHT: {player.ht}
							</h3>
							<h3 className="text-left relative ml-32 -mt-4 text-xs text-gray-300">
								WEIGHT: {player.wt}
							</h3>
						</div>
					</span>
				);
			})}
		</div>
	);
}
