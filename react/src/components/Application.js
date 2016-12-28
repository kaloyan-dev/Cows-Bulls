import React from 'react';
import GuessForm from 'components/GuessForm';
import GuessList from 'components/GuessList';
import Helpers from 'helpers/Helpers';

class Application extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number   : 0,
			remaining: 15
		}
	}

	componentDidMount() {
		document.title    = 'Cows & Bulls';

		let helpers       = new Helpers();
		let numbersArray  = [ 2, 1, 4, 9, 5, 7, 8, 3, 6 ];

		this.state.number = helpers.shuffle( numbersArray ).slice( 0, 4 );
	}

	render() {
		return <div>
			<GuessForm />
			<GuessList remaining={this.state.remaining} />
		</div>;
	}
}

export default Application;