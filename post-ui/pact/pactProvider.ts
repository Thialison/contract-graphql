import { Pact } from "@pact-foundation/pact";
import path from "path";

export default new Pact({
  port: 5000,
  log: path.resolve(process.cwd(), "pact/logs", "pact.log"),
  dir: path.resolve(process.cwd(), "pact/pacts"),
  consumer: "post-ui",
  provider: "back-post",
  pactfileWriteMode: "overwrite",
});
