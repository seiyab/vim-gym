import url0 from "@app/data/task-1/before.ts.txt?url";
import url1 from "@app/data/task-1/after.ts.txt?url";
import url2 from "@app/data/task-2/before.ts.txt?url";
import url3 from "@app/data/task-2/after.ts.txt?url";
import url4 from "@app/data/task-3/before.ts.txt?url";
import url5 from "@app/data/task-3/after.ts.txt?url";

export const tasks: Task[] = [
  {
    before: url0,
    after: url1,
  },
  {
    before: url2,
    after: url3,
  },
  {
    before: url4,
    after: url5,
  },
];

type Task = {
  before: string;
  after: string;
};
