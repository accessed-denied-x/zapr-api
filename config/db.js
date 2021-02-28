const mongoose = require('mongoose');
var colors = require('colors'); //it says its unused but if you don't have this line then the db won't connect because of lines 11 and 13

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});
		console.log(
			`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
		); //.cyan is from the 'colors' package. Literally just adds colors to the console
	} catch (err) {
		console.log(`Error: ${err.message}`.red);
		process.exit(1);
	}
};

module.exports = connectDB;
