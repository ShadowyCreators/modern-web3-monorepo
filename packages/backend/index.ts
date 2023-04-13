import app from './app';
import { validatedENV } from './src/services/zodValidation'

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running at port [${validatedENV.PORT || 8080}]`);
});