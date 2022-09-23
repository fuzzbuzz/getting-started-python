import { Fuzzer, FuzzTarget } from "fuzzbuzz";
import { UTF8String } from "fuzzbuzz/generator";
import * as python from "fuzzbuzz/lang/python";

const fuzzauthlib = python.importModule("fuzzauthlib");

export function FuzzOAuth2Session(f: Fuzzer) {
  const clientID = new UTF8String("clientID");
  clientID.setMaxLength(1024);

  const clientSecret = new UTF8String("clientSecret");
  clientSecret.setMaxLength(1024);

  const scope = new UTF8String("scope");
  scope.setMaxLength(1024);

  const target = new FuzzTarget(
    (clientID: string, clientSecret: string, scope: string): void => {
      fuzzauthlib.fuzz_oauth2session(clientID, clientSecret, scope);
    },
    clientID,
    clientSecret,
    scope
  );

  f.addFuzzTarget(target);
}
