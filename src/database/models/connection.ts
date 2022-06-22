import { connect } from "mongoose";
import 'dotenv/config';

const LOCAL_URI = 'mongodb://localhost:27017/RTC'

const MONGO_URI = process.env.MONGO_DB_URI || LOCAL_URI

const connectToDatabase = () => connect(MONGO_URI);

export default connectToDatabase;