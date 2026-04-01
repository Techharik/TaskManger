import { app } from "./index";
import config from "./shared/config/config";

async function StartServer() {
  try {
    app.listen(config.PORT, (e?: Error) => {
      if (e) {
        throw new Error(`Server not started: ${e?.message}`);
      }
      console.log("Server started Successfully", config.PORT);
    });
  } catch (e) {
    console.log("Failed to start server", e);
    process.exit(1);
  }
}

StartServer();
