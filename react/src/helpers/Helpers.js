class Helpers {
	shuffle(a) {
		for ( let i = a.length; i; i-- ) {
			let j = Math.floor( Math.random() * i );
			[a[i - 1], a[j]] = [a[j], a[i - 1]];
		}

		return a;
	}
}

export default Helpers;