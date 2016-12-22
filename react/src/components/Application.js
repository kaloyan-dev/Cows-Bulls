import React from 'react';
import GuessForm from 'components/GuessForm';
import GuessList from 'components/GuessList';

class Application extends React.Component {
	render() {
		return <div>
			<GuessForm />
			<GuessList />
		</div>;
	}
}

export default Application;