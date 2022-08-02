import { Fuzzer, FuzzTarget } from "fuzzbuzz";
import { ByteArray, String } from "fuzzbuzz/generator";
import * as python from "fuzzbuzz/lang/python";

// atheris fuzzing is currently broken with bs
python.useSettrace(true)
const fuzzbs = python.importModule("fuzzbs");

export function FuzzBS(f: Fuzzer) {
  const body = new String("body");
  body.setMaxLength(4096);

  const target = new FuzzTarget((body: string): void => {
    console.log("body", body, "typeof", typeof body);
    fuzzbs.fuzz_bshtml(body);
  }, body);

  target.seed(`<html>
<head>
</head>
<body>
</body>
</html>
`);

  f.addFuzzTarget(target);
}
