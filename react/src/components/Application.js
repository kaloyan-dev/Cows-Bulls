import React from 'react';
import GuessForm from 'components/GuessForm';
import GuessList from 'components/GuessList';

class Application extends React.Component {
	constructor(props) {
		super(props);
		this.state = { remaining: 15 }
	}

	render() {

		return <div>
			<GuessForm />
			<GuessList remaining={this.state.remaining} />
		</div>;
	}
}

export default Application;