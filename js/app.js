new Vue({

	el: '#cows-bulls',

	data: {
		theNumber   : false,
		numberSplit : [],
		guess       : '',
		attempts    : [],
		errors      : [],
		maxAttempts : 15,
		remaining   : null,
		success     : false,
		failure     : false
	},

	methods: {
		shuffle: function ( array ) {
			var counter = array.length;
			var temp;
			var index;

			while ( counter > 0 ) {
				index = Math.floor( Math.random() * counter );

				counter--;

				temp           = array[counter];
				array[counter] = array[index];
				array[index]   = temp;
			}

			return array;
		},

		generateNumber: function() {
			var numbersArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
			var slicedArray  = this.shuffle( numbersArray ).slice( 0, 4 );

			return slicedArray.join( '' );
		},

		gameEnded: function() {
			if ( this.success || this.failure ) {
				this.guess = '';
				return true;
			}
		},

		containsNaNs: function( array ) {
			var numbersOnly = true;

			for ( var i = 0; i < array.length; i++ ) {
				if ( isNaN( array[i] ) ) {
					this.errors.push( 'Please enter numbers only.' );
					numbersOnly = false;
					break;
				}
			}

			return ! numbersOnly;
		},

		duplicates: function( array ) {
			var duplicateNumbers = false;

			for ( var i = 0; i < array.length; i++ ) {
				if ( duplicateNumbers ) {
					break;
				}

				for ( var n = 0; n < array.length; n++ ) {
					if ( i == n ) {
						continue;
					}

					if ( array.indexOf( array[n] ) != n ) {
						duplicateNumbers = true;
						this.errors.push( 'Please enter 4 different numbers.' );
						break;
					}
				}
			}

			return duplicateNumbers;
		},

		invalidGuessLength: function() {
			if ( this.guess.length != 4 ) {
				this.errors.push( 'Please enter 4 numbers.' );

				return true;
			}
		},

		invalidGuessNumber: function( array ) {
			if ( array.indexOf( '0' ) != -1 ) {
				this.errors.push( 'Please enter numbers from 1 to 9 only.' );

				return true;
			}
		},

		guessCheck: function( array ) {
			var cows  = 0;
			var bulls = 0;

			for ( var j = 0; j < array.length; j++ ) {
				var numberPosition = this.numberSplit.indexOf( array[j] );

				if ( numberPosition === -1 ) {
					continue;
				}

				if ( array.indexOf( array[j] ) === numberPosition ) {
					bulls++;
					continue;
				}

				cows++;
			}

			if ( bulls === 4 ) {
				this.success = true;
				return;
			}

			this.attempts.push( {
				guess : this.guess,
				cows  : cows,
				bulls : bulls
			} );

			this.remaining--;

			if ( this.remaining === 0 ) {
				this.failure = true;
			}
		},

		validation: function( e ) {
			e.preventDefault();

			this.errors = [];

			var guessArray  = this.guess.split( '' );
			var validGuess  = true;
			var validations = [
				this.gameEnded(),
				this.containsNaNs( guessArray ),
				this.duplicates( guessArray ),
				this.invalidGuessLength(),
				this.invalidGuessNumber( guessArray )
			];

			for ( var i = 0; i < validations.length; i++ ) {
				if ( validations[i] === true ) {
					validGuess = false;
				}
			}

			if ( ! validGuess ) {
				return;
			}

			this.guessCheck( guessArray );

			this.guess = '';
		}
	},

	ready: function() {
		this.theNumber   = this.generateNumber();
		this.numberSplit = this.theNumber.split( '' );
		this.remaining   = this.maxAttempts;
	}
	
});