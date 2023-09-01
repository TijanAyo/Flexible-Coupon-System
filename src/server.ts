import app from "./index";
const PORT = process.env.PORT || 4090;

app.listen(PORT, ():void => {
    // TODO: Using proper logger package
   console.log(`Server running on http://localhost:${PORT}`);
});
