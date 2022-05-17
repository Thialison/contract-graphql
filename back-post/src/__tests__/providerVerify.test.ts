import { Verifier } from "@pact-foundation/pact";

describe("Pact Verification", () => {
  it("validates the expectations of Matching Service", async () => {
    const opts = {
      providerBaseUrl: "http://localhost:4000/",
      pactBrokerUrl: "http://localhost:9292/",
      provider: "back-post",
      pactBrokerUsername: "qa",
      pactBrokerPassword: "password",
      consumerVersionTags: ["prod"],
      enablePending: false,
      publishVerificationResult: true,
      verbose: true,
      providerVersion: "1.0.0",
    };

    return new Verifier(opts).verifyProvider().then((output) => {
      console.log(output);
    });
  }, 70000);
});
