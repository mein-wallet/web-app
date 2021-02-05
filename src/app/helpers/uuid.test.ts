import React, { Dispatch } from "react";
import { generateUUID } from "./uuid";

describe("uuid helper functions", () => {
  it("returns a uuid that contains the defined structure", () => {
    const uuid = generateUUID();
    expect(uuid).toContain("-4");
  });

  it("returns differents uuids", () => {
    const uuid1 = generateUUID();
    const uuid2 = generateUUID();

    expect(uuid1).not.toEqual(uuid2);
  });
});
