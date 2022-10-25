import { Fuzzer, FuzzTarget } from "fuzzbuzz";
import { UTF8String } from "fuzzbuzz/generator";
import * as python from "fuzzbuzz/lang/python";

const fuzzscrapy = python.importModule("fuzzscrapy");

export function FuzzLinkExtractor(f: Fuzzer) {
  const body = new UTF8String("body");
  body.setMaxLength(4096);

  const target = new FuzzTarget((body: string): void => {
    fuzzscrapy.fuzz_linkextractor(body);
  }, body);

  target.seed(
    '<a href="https://example.com/nofollow.html#foo" rel="nofollow">Dont follow this one</a>'
  );

  f.addFuzzTarget(target);
}
