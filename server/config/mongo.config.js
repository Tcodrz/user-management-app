const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose
	.connect(process.env.MONGO_HOST, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log('Connected To MongoDB');
	})
	.catch((error) => {
		console.log(error);
	});

module.exports = mongoose;
