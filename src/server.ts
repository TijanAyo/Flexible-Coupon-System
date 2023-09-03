import app from "./index";
import dbConfig from "./config/db.config";
const PORT = process.env.PORT || 4090;

app.listen(PORT, async ():Promise<void> => {
   await dbConfig();
    // TODO: Using proper logger package
   console.log(`Server running on http://localhost:${PORT}`);
});
