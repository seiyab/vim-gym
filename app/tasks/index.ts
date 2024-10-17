import url0 from "@app/data/task-1/before.ts.txt?url";
import url1 from "@app/data/task-1/after.ts.txt?url";
import url2 from "@app/data/task-2/before.ts.txt?url";
import url3 from "@app/data/task-2/after.ts.txt?url";
import url4 from "@app/data/task-3/before.ts.txt?url";
import url5 from "@app/data/task-3/after.ts.txt?url";
import url6 from "@app/data/task-4/before.css.txt?url";
import url7 from "@app/data/task-4/after.css.txt?url";

export const tasks: Task[] = [
  {
    before: url0,
    after: url1,
    parser: "typescript",
    extension: "ts",
  },
  {
    before: url2,
    after: url3,
    parser: "typescript",
    extension: "ts",
  },
  {
    before: url4,
    after: url5,
    parser: "typescript",
    extension: "ts",
  },
  {
    before: url6,
    after: url7,
    parser: "css",
    extension: "css",
  },
];

export type Task = {
  before: string;
  after: string;
  parser: string;
  extension: string;
};
