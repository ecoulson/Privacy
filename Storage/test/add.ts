import tap from "tap";
import add from "../src/add";

tap.test("add function", (t) => {
  t.equal(add(1, 2), 3, "1 and 2 is 3");
  t.end();
});
