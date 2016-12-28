import React from 'react';

class GuessList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			cows: 0,
			bulls: 0
		};
	}

	render() {
		return <div id="guess-list" className="guess-list">
			<p id="guess-remaining" className="guess-remaining">Remaining attempts: <span>{this.props.remaining}</span></p>
			<p id="guess-errors" className="guess-errors"><span>{this.state.error}</span></p>
			<ol className="guess-list-items"></ol>
			<ol className="messages">
				{ this.state.bulls === 4 && <li className="success">Congratulations ! You guessed <span></span> !</li> }
				{ this.props.remaining === 0 && <li className="failure">Sorry, the number was <span></span>.</li> }
			</ol>
		</div>;
	}
}

export default GuessList;