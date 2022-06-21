import { connect } from "mongoose";

const MONGO_URI = 'mongodb://localhost:27017/RTC'

const connectToDatabase = () => connect(MONGO_URI);

export default connectToDatabase;