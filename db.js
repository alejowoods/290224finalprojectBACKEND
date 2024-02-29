import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
    console.log('MongoDB working ok, YOU ARE DOING GREATE MATE!');
});

export default connection;
