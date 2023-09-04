import app from "./index";
import dbConfig from "./config/db.config";
import {logger} from "./helper";
const PORT = process.env.PORT || 4090;

app.listen(PORT, async ():Promise<void> => {
   await dbConfig();
   logger.info(`Server running on http://localhost:${PORT}`);
});
