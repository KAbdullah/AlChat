export class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	cursorPaginate() {
		//Date.now() gives milliseconds
		const cursorsTime = this.queryString.timing * 1 || Date.now();

		const limit = this.queryString.limit * 1 || 10;

		//new Date() makes a whole date timestamp like so
		// 2026-03-29T01:14:44.211+00:00
		this.query = this.query.find({ createdAt: { $lt: new Date(cursorsTime) } });

		//Descending order
		this.query = this.query.sort({ createdAt: -1 });

		this.query = this.query.limit(limit);
		//This returns an instance of the whole class
		return this;
	}
}
