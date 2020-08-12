/* THIS SCRIPT DROPS THE ENTIRE DB FROM MONGO  */

const mongoose = require('mongoose');
require('dotenv').config();

function dropDB() {
	mongoose
		.connect(process.env.MONGO_HOST)
		.then(() => {
			console.log('Connected to MongoDB');
			mongoose.connection.db
				.dropDatabase()
				.then(() => {
					console.log(`${mongoose.connection.db.databaseName} Dropped!`);
					mongoose
						.disconnect()
						.then(() => console.log('MongoDB Disconnected'))
						.catch((e) => console.log(e));
				})
				.catch((error) => console.log(error));
		})
		.catch((err) => {
			console.log(err);
		});
}

dropDB();
