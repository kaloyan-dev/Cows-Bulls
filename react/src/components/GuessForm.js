import React from 'react';

class GuessForm extends React.Component {
	render() {
		return <form id="guess-form">
			<input id="guess-input" type="text" maxLength="4" value="" />
			<input id="guess-submit" type="submit" value="Check" />
		</form>;
	}
}

export default GuessForm;