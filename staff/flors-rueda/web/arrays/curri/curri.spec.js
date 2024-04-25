import Curri from './curri.js';

describe('Curri', () => {
  describe('constructor', () => {
    it('should create a new instance with the given elements', () => {
      const c = new Curri(10, 20, 30);
      expect(c).toBeInstanceOf(Curri);
      expect(c.length).toBe(3);
      expect(c[0]).toBe(10);
      expect(c[1]).toBe(20);
      expect(c[2]).toBe(30);
    });

    it('should create a new instance with no elements and the length of the given numeric argument', function () {
      const c = new Curri(10);
      expect(c).toBeInstanceOf(Curri);
      expect(c.length).toBe(10);
    });
  });

  describe('forEach', () => {
    it('should iterate all elements in curri and execute the callback', () => {
        const c = new Curri();
        c[0] = 'A';
        c.length++;
        c[1] = 'B';
        c.length++
        c[2] = 'C';
        c.length++
        let s = new String();
        c.forEach(element => { s += element })
        expect(c.length === s.length).toBe(true)
        expect(c[0] === s[0]).toBe(true)
        expect(c[1] === s[1]).toBe(true)
        expect(c[2] === s[2]).toBe(true)
    })
  })

  describe('map', () => {
    it('should iterate all elements in curri, execute the callback and put it in a new curry', () => {
        const c = new Curri();
        c[0] = 'A';
        c.length++;
        c[1] = 'B';
        c.length++
        c[2] = 'C';
        c.length++
        const c2 = c.map(element => element.toLowerCase());
        expect(c2).toBeInstanceOf(Curri);
        expect(c2.length).toBe(3);
        expect(c2[0]).toBe('a');
        expect(c2[1]).toBe('b');
        expect(c2[2]).toBe('c');
    })
  })

  describe('isCurri', () => {
    it('should return a true Boolean', () => {
      const c = new Curri();
      c[0] = 10;
      c.length++;
      c[1] = 20;
      c.length++
      c[2] = 30;
      c.length++
      const b = Curri.isCurri(c);
      expect(b).toBe(true);
    });

    it('should return a false Boolean', () => {
      const s = new String();
      const b = Curri.isCurri(s);
      expect(b).toBe(false);
    });

    it('should return a false Boolean', () => {
      const cs = new Curri(new String());
      const b = Curri.isCurri(cs);
      expect(b).toBe(true);
    });
  });

  describe('of', () => {
    it('should return a new instance with the given elements', () => {
      const c = Curri.of(10, 20, 30);
      expect(c).toBeInstanceOf(Curri);
      expect(c.length).toBe(3);
      expect(c[0]).toBe(10);
      expect(c[1]).toBe(20);
      expect(c[2]).toBe(30);
    });

    it('should return a new empty instance', () => {
        const c = Curri.of();
        expect(c).toBeInstanceOf(Curri);
        expect(c.length).toBe(0);
      });
  });

  describe('concat', () => {
    it('should return the first instance adding the elements of the second', () => {
      const i = new Curri();
      i[0] = 10;
      i.length++;
      i[1] = 20;
      i.length++
      i[2] = 30;
      i.length++
      const a = new Curri();
      a[0] = 'A';
      a.length++;
      a[1] = 'B';
      a.length++
      a[2] = 'C';
      a.length++
      const c = i.concat(a)
      expect(c).toBeInstanceOf(Curri);
      expect(c.length).toBe(6);
      expect(c[0]).toBe(10);
      expect(c[1]).toBe(20);
      expect(c[2]).toBe(30);
      expect(c[3]).toBe('A');
      expect(c[4]).toBe('B');
      expect(c[5]).toBe('C');
    });
  });

  describe('at', () => {
    it('should return the index of the given element', () => {
      const c = new Curri();
      c[0] = 10;
      c.length++;
      c[1] = 20;
      c.length++
      c[2] = 30;
      c.length++
      const a = c.at(1)
      expect(a).toBe(20);
    });
  });

  describe('every', () => {
    it('should return a true Boolean', () => {
      const c = new Curri();
      c[0] = 10;
      c.length++;
      c[1] = 10;
      c.length++
      c[2] = 10;
      c.length++
      const f = (item) => { return item === 10}
      const b = c.every(f)
      expect(b).toBe(true);
    });

    it('should return a false Boolean', () => {
        const c = new Curri();
        c[0] = 10;
        c.length++;
        c[1] = 10;
        c.length++
        c[2] = 'B';
        c.length++
        const f = (item) => { return item === 10}
        const b = c.every(f)
        expect(b).toBe(false);
      });
  });

});
