;( function() {

	var Guess = Backbone.Model.extend({
		defaults: {
			number: '',
			cows  : 0,
			bulls : 0,
			errors: []
		},

		validate: function() {
			var guessArray   = this.get( 'number' ).split( '' );
			var validGuess   = true;
			var validations  = [
				this.containsNaNs( guessArray ),
				this.duplicates( guessArray ),
				this.invalidGuessLength(),
				this.invalidGuessNumber( guessArray )
			];

			for ( var i = 0; i < validations.length; i++ ) {
				if ( validations[i] === true ) {
					validGuess = false;
					break;
				}
			}

			if ( ! validGuess ) {
				return this.get( 'errors' )[0];
			}

			this.guessCheck( guessArray );
		},

		containsNaNs: function( array ) {
			var numbersOnly = true;

			for ( var i = 0; i < array.length; i++ ) {
				if ( isNaN( array[i] ) ) {
					this.set( 'errors', _.union( this.get( 'errors' ), ['Please enter numbers only.'] ) );
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
						this.set( 'errors', _.union( this.get( 'errors' ), ['Please enter 4 different numbers.'] ) );
						break;
					}
				}
			}

			return duplicateNumbers;
		},

		invalidGuessLength: function() {
			if ( this.get( 'number' ).length != 4 ) {
				this.set( 'errors', _.union( this.get( 'errors' ), ['Please enter 4 numbers.'] ) );

				return true;
			}
		},

		invalidGuessNumber: function( array ) {
			if ( array.indexOf( '0' ) != -1 ) {
				this.set( 'errors', _.union( this.get( 'errors' ), ['Please enter numbers from 1 to 9 only.'] ) );

				return true;
			}
		},

		guessCheck: function( array ) {
			var cows  = 0;
			var bulls = 0;

			for ( var j = 0; j < array.length; j++ ) {
				var numberPosition = guessesView.numberSplit.indexOf( array[j] );

				if ( numberPosition === -1 ) {
					continue;
				}

				if ( array.indexOf( array[j] ) === numberPosition ) {
					bulls++;
					continue;
				}

				cows++;
			}

			this.set( 'cows', cows );
			this.set( 'bulls', bulls );
		},
	});

	var GuessView = Backbone.View.extend({
		model: new Guess(),

		tagName: 'li',

		initialize: function() {
			this.template = _.template( $( '#guess-template' ).html() );
		},

		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		}
	});

	var Guesses = Backbone.Collection.extend({});

	var guesses = new Guesses();

	var GuessesView = Backbone.View.extend({
		model: guesses,

		el: $('#cows-bulls'),

		initialize: function() {
			var self = this;

			this.numbersArray = [ 2, 1, 4, 9, 5, 7, 8, 3, 6 ];
			this.slicedArray  = _.shuffle( this.numbersArray ).slice( 0, 4 );
			this.theNumber    = this.slicedArray.join( '' );
			this.numberSplit  = this.theNumber.split( '' );
			this.remaining    = 15;

			this.model.on('add', this.decreaseRemaining, this);
			this.render();
		},

		decreaseRemaining: function() {
			this.remaining--;

			if ( this.remaining <= 0 ) {
				this.$( '#guess-remaining span' ).text( '0' );
				this.$( '.failure span' ).text( this.theNumber ).parent().show();

				this.gameOver();

				return;
			}

			var lastGuess = this.model.last();

			if ( lastGuess.get( 'bulls' ) === 4 ) {
				this.$( '.success span' ).text( this.theNumber ).parent().show();

				this.gameOver();

				return;
			}

			this.render();
		},

		gameOver: function() {
			this.$( '#guess-input, #guess-submit' ).prop( 'disabled', true );
		},

		render: function() {
			var self = this;

			this.$( '[type="text"]' ).focus();
			this.$( '#guess-remaining span' ).text( this.remaining );

			this.$( '.guess-list-items' ).html( '' );

			_.each( this.model.toArray(), function( guess ) {
				self.$( '.guess-list-items' ).append( ( new GuessView( { model: guess } ) ).render().$el );
			} );

			$('#guess-remaining span').text(this.remaining);
			return this;
		},

		events: {
			'submit #guess-form': 'checkGuess'
		},

		checkGuess: function( event ) {
			var $guessInput  = this.$( '#guess-form :text' );
			var $guessErrors = this.$( '#guess-errors span' );

			$guessErrors.empty();

			event.preventDefault();

			var guess = new Guess({
				number: $guessInput.val()
			});

			if ( ! guess.isValid() ) {
				$guessErrors.text( guess.validationError );
				return;
			}

			$guessInput.val( '' );

			guesses.add( guess );
		}
	});

	var guessesView = new GuessesView();

} )();