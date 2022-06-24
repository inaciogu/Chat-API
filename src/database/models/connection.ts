import { connect } from "mongoose";
import 'dotenv/config';

const MONGO_URI = process.env.MONGO_DB_URI || '';

const connectToDatabase = () => connect(MONGO_URI);

export default connectToDatabase;