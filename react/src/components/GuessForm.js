import React from 'react';

class GuessForm extends React.Component {
	componentDidMount() {
		this.guessInput.focus();
	}

	render() {
		return <form id="guess-form">
			<input id="guess-input" type="text" maxLength="4" value="" ref={(input) => { this.guessInput = input; }}  />
			<input id="guess-submit" type="submit" value="Check" />
		</form>;
	}
}

export default GuessForm;