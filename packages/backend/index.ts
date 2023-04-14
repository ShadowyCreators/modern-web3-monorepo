import app from './app';
import { parsedEnv } from './src/services/zodValidation'

app.listen(parsedEnv.PORT || 8080, () => {
  console.log(`Server is running at port [${parsedEnv.PORT || 8080}]`);
});