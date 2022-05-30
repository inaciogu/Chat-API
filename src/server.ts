import { serverHttp } from './http';
import "./webSocket"

serverHttp.listen(3001, () => console.log('Server is running on PORT 3001'))