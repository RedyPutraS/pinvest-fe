import cn from "..";
describe("Clsx", () => {
  it("should merge tailwind class correctly", () => {
    const res = cn(
      "p-2",
      "p-4",
      { "overflow-auto": true, "overflow-hidden": false },
      ["text-xl", "text-lg"]
    );

    expect(res).toBe("p-4 overflow-auto text-lg");
  });
});
