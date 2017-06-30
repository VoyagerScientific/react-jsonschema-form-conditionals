import RuleEngine from "../../src/engine/engine";

let rules = {
  telephone: {
    action: "remove",
    when: {
      age: {
        greater: 5,
        less: 70,
      },
    },
  },
};

let schema = {
  properties: {
    age: { type: "number" },
    telephone: { type: "string" },
  },
};

let engine = new RuleEngine(rules, schema, {});

test("age greater 5", () => {
  return engine
    .run({ age: 10 })
    .then(actions =>
      expect(actions).toEqual({ telephone: [{ action: "remove" }] })
    );
});

test("age less 5", () => {
  return engine.run({ age: 4 }).then(actions => expect(actions).toEqual({}));
});

test("age less 70 ", () => {
  return engine
    .run({ age: 69 })
    .then(actions =>
      expect(actions).toEqual({ telephone: [{ action: "remove" }] })
    );
});

test("age greater 70 ", () => {
  return engine.run({ age: 71 }).then(actions => expect(actions).toEqual({}));
});