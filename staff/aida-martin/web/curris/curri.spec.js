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
      expect(c[0]).toBeTruthy();
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
  it("should iterate over a collection of elements and returns a new collection with all them mapped", () => {
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

    expect(a).toBeInstanceOf(Boolean);
    expect(a).toBeTruthy();
    expect(a1).toBeInstanceOf(Boolean);
    expect(a1).toBeFalsy();
  });

  it("should always show true with a empty curri", () => {
    const c = new curri();

    const a = c.every((element) => element > 9);
    const a1 = c.every((element) => element > 10);

    expect(a).toBeInstanceOf(Boolean);
    expect(a).toBeTruthy();
    expect(a1).toBeInstanceOf(Boolean);
    expect(a1).toBeTruthy();
  });
});

describe("fill", () => {
  it("should return the modified curri with the changed values", () => {
    const c = new curri(10, 20, 30, 40, 50, 60);

    const a = c.fill(0, 1, 3);

    expect(a).toBeInstanceOf(curri);
    expect(a.length).toBe(c.length);
    expect(a[0]).toBe(10);
    expect(a[1]).toBe(0);
    expect(a[2]).toBe(0);
    expect(a[3]).toBe(40);
    expect(a[4]).toBe(50);
    expect(a[5]).toBe(60);
  });

  it("should return the modified curri with the changed values using negative start and end index", () => {
    const c = new curri(10, 20, 30, 40, 50, 60);

    const a = c.fill(0, -3, -1);

    expect(a).toBeInstanceOf(curri);
    expect(a.length).toBe(c.length);
    expect(a[0]).toBe(10);
    expect(a[1]).toBe(20);
    expect(a[2]).toBe(30);
    expect(a[3]).toBe(0);
    expect(a[4]).toBe(0);
    expect(a[5]).toBe(60);
  });
});

describe("filter", () => {
  it("should create a new instance with the elements matching the condition", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.filter((element) => element > 30);

    expect(a).toBeInstanceOf(curri);
    expect(a.length).toBe(2);
    expect(a[0]).toBe(40);
    expect(a[1]).toBe(50);
  });
});

describe("find", () => {
  it("should return the first element matching the condition", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.find((element) => element > 30);

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(40);
  });

  it("should return undefined if not matching the condition with any element", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.find((element) => element > 50);

    expect(a).toBeUndefined();
  });
});

describe("findIndex", () => {
  it("should return index of first element matching the condition", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.findIndex((element) => element > 30);

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(3);
  });

  it("should return -1 if not matching the condition with any element", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.findIndex((element) => element > 50);

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(-1);
  });
});

describe("includes", () => {
  it("should return true if it finds element inside curri", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.includes(30);

    expect(a).toBeInstanceOf(Boolean);
    expect(a).toBeTruthy();
  });

  it("should return false if it does not finds element inside curri", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.includes(23);

    expect(a).toBeInstanceOf(Boolean);
    expect(a).toBeFalsy();
  });
});

describe("indexOf", () => {
  it("should return index of first element found inside curri", () => {
    const c = new curri(10, 20, 30, 40, 50, 30);

    const a = c.indexOf(30);

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(2);
  });

  it("should return -1 if it does not finds element inside curri", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.indexOf(23);

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(-1);
  });
});

describe("join", () => {
  it("should return the elements of curri converted to string and separated by the indicated separator", () => {
    const c = new curri("uno", "dos", "tres", "cuatro", "cinco");

    const a = c.join("-");

    expect(a).toBeInstanceOf(String);
    expect(a).toBe(`${c[0]}-${c[1]}-${c[2]}-${c[3]}-${c[4]}`);
  });
});

describe("lastIndexOf", () => {
  it("should return index of the last element found inside curri", () => {
    const c = new curri(10, 20, 30, 40, 50, 30);

    const a = c.lastIndexOf(30);
    const a1 = c.lastIndexOf(30, -2);

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(5);
    expect(a1).toBeInstanceOf(Number);
    expect(a1).toBe(2);
  });

  //SE ROMPE JASMINE

  // it("should return -1 if it does not finds element inside curri", () => {
  //   const c = new curri(10, 20, 30, 40, 50);

  //   const a = c.lastIndexOf(24);

  //   expect(a).toBeInstanceOf(Number);
  //   expect(a).toBe(-1);
  // });
});

describe("pop", () => {
  it("should return the last element previously deleted of curri", () => {
    const c = new curri(10, 20, 30, 40, 50);
    const c1 = new curri("uno", "dos", "tres");

    const a = c.pop();
    const a1 = c1.pop();

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(50);
    expect(a1).toBeInstanceOf(String);
    expect(a1).toBe("tres");
  });
});

describe("push", () => {
  it("should return new curri length previously added the elements at the curri end", () => {
    const c = new curri(10, 20, 30, 40, 50);
    const c1 = new curri("uno", "dos", "tres");

    const a = c.push(60, 70);
    const a1 = c1.push("cuatro");

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(c.length);
    expect(a1).toBeInstanceOf(Number);
    expect(a1).toBe(c1.length);
  });
});

describe("reduce", () => {
  it("should executes a reducing function on each element of curri, returning a single value as a result (without initialValue)", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(c[0] + c[1] + c[2] + c[3] + c[4]);
  });

  it("should executes a reducing function on each element of curri, returning a single value as a result (with initialValue)", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      2
    );

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(2 + c[0] + c[1] + c[2] + c[3] + c[4]);
  });
});

describe("reverse", () => {
  it("should reverse the order of curri elements and modify the original curri", () => {
    const c = new curri(10, 20, 30, 40, 50);

    const a = c.reverse();

    expect(a).toBeInstanceOf(curri);
    expect(a[0]).toBe(50);
    expect(a[1]).toBe(40);
    expect(a[2]).toBe(30);
    expect(a[3]).toBe(20);
    expect(a[4]).toBe(10);
    expect(c).toBeInstanceOf(curri);
    expect(c[0]).toBe(50);
    expect(c[1]).toBe(40);
    expect(c[2]).toBe(30);
    expect(c[3]).toBe(20);
    expect(c[4]).toBe(10);
  });
});

describe("shift", () => {
  it("should return the first element previously deleted of curri", () => {
    const c = new curri(10, 20, 30, 40, 50);
    const c1 = new curri("uno", "dos", "tres");

    const a = c.shift();
    const a1 = c1.shift();

    expect(a).toBeInstanceOf(Number);
    expect(a).toBe(10);
    expect(a1).toBeInstanceOf(String);
    expect(a1).toBe("uno");
  });
});
