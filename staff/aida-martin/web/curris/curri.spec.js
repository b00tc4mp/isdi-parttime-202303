import curri from "./curri.js";

describe("curri", () => {
  describe("constructor", () => {
    it("should create a new instance with the given elements", () => {
      const c = new curri(10, 20, 30);

      expect(c).toBeInstanceOf(curri);
      expect(c.length).toBe(3);
      expect(c[0]).toBe(10);
      expect(c[1]).toBe(20);
      expect(c[2]).toBe(30);
    });

    it("should create a new instance with no elements and the length of the given numeric argument", function () {
      const c = new curri(10);

      expect(c).toBeInstanceOf(curri);
      expect(c.length).toBe(10);
    });

    it("should create a new instance with only that no numeric element", function () {
      const c = new curri(true);

      expect(c).toBeInstanceOf(curri);
      expect(c.length).toBe(1);
      expect(c[0]).toBe(true);
    });
  });
});

describe("forEach", () => {
  it("should iterate over a collection of elements", () => {
    const c = new curri();

    c[0] = "A";
    c.length++;
    c[1] = "B";
    c.length++;
    c[2] = "C";
    c.length++;

    const a = [];

    c.forEach((elem, i) => (a[i] = elem));

    expect(a.length).toBe(c.length);
    expect(a[0]).toBe(c[0]);
    expect(a[1]).toBe(c[1]);
    expect(a[2]).toBe(c[2]);
  });
});

describe("map", () => {
  it("should iterate over a collection of elements and return a new collection with all them mapped", () => {
    const c = new curri();

    c[0] = "A";
    c.length++;
    c[1] = "B";
    c.length++;
    c[2] = "C";
    c.length++;

    const c2 = c.map((elem) => elem.toLowerCase());

    expect(c2).toBeInstanceOf(curri);
    expect(c2.length).toBe(c.length);
    expect(c2[0]).toBe(c[0].toLowerCase());
    expect(c2[1]).toBe(c[1].toLowerCase());
    expect(c2[2]).toBe(c[2].toLowerCase());
  });
});

describe("of", () => {
  it("should create a new instance with the given elements", () => {
    const c = curri.of(10, 20, 30);

    expect(c).toBeInstanceOf(curri);
    expect(c.length).toBe(3);
    expect(c[0]).toBe(10);
    expect(c[1]).toBe(20);
    expect(c[2]).toBe(30);
  });

  it("should create a new instance with the only one element", () => {
    const c = curri.of(10);

    expect(c).toBeInstanceOf(curri);
    expect(c.length).toBe(1);
    expect(c[0]).toBe(10);
  });
});

describe("at", () => {
  it("should return the element matching index", () => {
    const c = new curri();

    c[0] = "A";
    c.length++;
    c[1] = "B";
    c.length++;
    c[2] = "C";
    c.length++;

    const a = c.at(0);
    const a1 = c.at(1);
    const a2 = c.at(2);

    expect(a).toBe(c[0]);
    expect(a1).toBe(c[1]);
    expect(a2).toBe(c[2]);
  });

  it("should return the element matching the curri length minus index", () => {
    const c = new curri();

    c[0] = "A";
    c.length++;
    c[1] = "B";
    c.length++;
    c[2] = "C";
    c.length++;

    const a = c.at(-1);
    const a1 = c.at(-2);

    expect(a).toBe(c[c.length - 1]);
    expect(a1).toBe(c[c.length - 2]);
  });
});

describe("concat", () => {
  it("should create a new instance concatenating the elements of two curries", () => {
    const c = new curri(10, 20, 30);
    const c2 = new curri(40, 50, 60);

    const c3 = c.concat(c2);

    expect(c3).toBeInstanceOf(curri);
    expect(c3.length).toBe(c.length + c2.length);
    expect(c3[0]).toBe(10);
    expect(c3[1]).toBe(20);
    expect(c3[2]).toBe(30);
    expect(c3[3]).toBe(40);
    expect(c3[4]).toBe(50);
    expect(c3[5]).toBe(60);
  });
});

describe("every", () => {
  it("should check if all elements meet a condition", () => {
    const c = new curri(10, 20, 30);

    const a = c.every((element) => element > 9);
    const a1 = c.every((element) => element > 10);

    expect(a).toBe(true);
    expect(a1).toBe(false);
  });

  it("should always show true with a empty curri", () => {
    const c = new curri();

    const a = c.every((element) => element > 9);
    const a1 = c.every((element) => element > 10);

    expect(a).toBe(true);
    expect(a1).toBe(true);
  });
});

describe("fill", () => {
  it("");
});
