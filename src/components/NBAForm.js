import React, { useState } from "react";
import { GoArrowUp } from "react-icons/go";

export default function NBAForm(props) {
	const [input, setInput] = useState("");

	//Function called everytime the input changes its value
	const handleChange = (e) => {
		setInput(e.target.value); //Updates the input
	};

	//Function called when the form is submited
	const handleSubmit = (e) => {
		e.preventDefault();
		props.onSubmit(input.toLowerCase()); //Calls the father function passing the input value
	};

	return (
		<div className="w-20">
			<form onSubmit={handleSubmit}>
				<input
					className="w-24 -ml-2 px-1 text-white text-center text-s | rounded bg-black border-2 border-gray-50 border-opacity-50"
					type="text"
					name="text"
					placeholder="NBA Team"
					value={input}
					onChange={handleChange}
				/>
				<div className="absolute px-2.5">
					<p
						id="search"
						className="relative text-white text-center pt-1 -top-0.5 animate-ping "
					>
						Search
					</p>
					<input
						id="search"
						className=" relative text-white px-1 bg-black bg-opacity-0 text-center pt-1 -top-7"
						type="submit"
						value="Search"
					/>
					<div className="relative -top-12 -left-4 animate-bounce opacity-75 w-min">
						<GoArrowUp />
					</div>
					<div className="relative -top-16 pb-1 left-14 pl-0.5 animate-bounce opacity-75 w-min">
						<GoArrowUp />
					</div>
				</div>
			</form>
		</div>
	);
}
