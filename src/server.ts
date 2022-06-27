import App from './app';
import 'dotenv/config';

const app = new App();

app.start(process.env.PORT || 3001);
