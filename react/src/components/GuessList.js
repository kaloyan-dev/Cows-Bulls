import React from 'react';

class GuessList extends React.Component {
	render() {
		return <div id="guess-list" className="guess-list">
			<p id="guess-remaining" className="guess-remaining">Remaining attempts: <span></span></p>
			<p id="guess-errors" className="guess-errors"><span></span></p>
			<ol className="guess-list-items"></ol>
			<ol className="messages">
				<li className="success">Congratulations ! You guessed <span></span> !</li>
				<li className="failure">Sorry, the number was <span></span>.</li>
			</ol>
		</div>;
	}
}

export default GuessList;