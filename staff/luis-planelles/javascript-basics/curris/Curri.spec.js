import Curri from './Curri.js';

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

    it('should to create a curri with one argument if argument is only one and not a number', function () {
      const c = new Curri(true);

      expect(c).toBeInstanceOf(Curri);
      expect(c.length).toBe(1);
      expect(c[0]).toBe(true);
    });
  });

  describe('forEach', () => {
    it('should iterate over a collection of elements', () => {
      const c = new Curri('A', 'B', 'C');

      const a = [];

      c.forEach((elem, i) => (a[i] = elem));

      expect(a.length).toBe(c.length);
      expect(a[0]).toBe(c[0]);
      expect(a[1]).toBe(c[1]);
      expect(a[2]).toBe(c[2]);
    });
  });

  describe('map', () => {
    it('should iterate over a collection of elements and return a new collection with all them mapped', () => {
      const c = new Curri('A', 'B', 'C');

      const c2 = c.map((elem) => elem.toLowerCase());

      expect(c2).toBeInstanceOf(Curri);
      expect(c2.length).toBe(c.length);
      expect(c2[0]).toBe(c[0].toLowerCase());
      expect(c2[1]).toBe(c[1].toLowerCase());
      expect(c2[2]).toBe(c[2].toLowerCase());
    });
  });

  describe('at', () => {
    it('should return element in curri by index', () => {
      const testCurri = new Curri(12, 20, 30);
      const c = testCurri.at(1);

      expect(c).toBe(testCurri[1]);
    });
  });

  describe('concat', () => {
    it('should return new curri whit orginal curri and new concatenated', () => {
      const testCurri = new Curri(10, 20, 30);
      const testCurri2 = new Curri(40, 50, 60);
      const curriResult = testCurri.concat(testCurri2);

      expect(curriResult).toBeInstanceOf(Curri);
      expect(curriResult.length).toBe(6);
      expect(curriResult[0]).toBe(10);
      expect(curriResult[3]).toBe(40);
      expect(curriResult[5]).toBe(60);
    });
  });

  describe('every', () => {
    it('should return true if every item in curri meets the condition', () => {
      const testCurri = new Curri(10, 20, 30);

      const curriResultTrue = testCurri.every((item) => item > 9);
      const curriResultFalse = testCurri.every((item) => item < 30);

      expect(curriResultTrue).toBe(true);
      expect(curriResultFalse).toBe(false);
    });
  });

  describe('fill', () => {
    it('should return original curri whit filled by item in every position', () => {
      const testCurri = new Curri(10, 20, 30);

      testCurri.fill('Guido Van Rossum');

      expect(testCurri.length).toBe(3);
      expect(testCurri[0]).toBe('Guido Van Rossum');
      expect(testCurri[1]).toBe('Guido Van Rossum');
      expect(testCurri[2]).toBe('Guido Van Rossum');
    });

    it('should return original curri whit filled by item starting in set position', () => {
      const testCurri = new Curri(10, 20, 30);
      testCurri.fill('Guido Van Rossum', 1);

      expect(testCurri.length).toBe(3);
      expect(testCurri[0]).toBe(10);
      expect(testCurri[1]).toBe('Guido Van Rossum');
      expect(testCurri[2]).toBe('Guido Van Rossum');
    });

    it('should return original curry whit filled by item starting in set position and end in end position', () => {
      const testCurri = new Curri(10, 20, 30);
      testCurri.fill('Guido Van Rossum', 1, 2);

      expect(testCurri.length).toBe(3);
      expect(testCurri[0]).toBe(10);
      expect(testCurri[1]).toBe('Guido Van Rossum');
      expect(testCurri[2]).toBe(30);
    });
  });

  describe('filter', () => {
    it('should return new curri whit filtered items by the callback', () => {
      const testCurri = new Curri(
        'spray',
        'limit',
        'elite',
        'exuberant',
        'destruction',
        'present'
      );

      const testResult = testCurri.filter((word) => word.length > 6);

      expect(testResult[0]).toBe('exuberant');
      expect(testResult[1]).toBe('destruction');
      expect(testResult[2]).toBe('present');
      expect(testResult.length).toBe(3);
    });
  });

  describe('find', () => {
    it('should return fist item that meets condition by callback', () => {
      const testCurri = new Curri(5, 12, 8, 130, 44);

      const result = testCurri.find((element) => element > 10);

      expect(result).toBe(12);
    });
  });

  describe('findByIndex', () => {
    it('should return first idex of item that meets condition by callback', () => {
      const testCurri = new Curri(5, 12, 8, 130, 44);

      const isLargeNumber = (element) => element > 13;
      const result = testCurri.findIndex(isLargeNumber);

      expect(result).toBe(3);
    });
  });

  describe('from', () => {
    it('should return a new iterable array from argument', () => {
      const testCurri = new Curri();

      const result = testCurri.from('foo');

      expect(result.length).toBe(3);
      expect(result[0]).toBe('f');
      expect(result[1]).toBe('o');
      expect(result[2]).toBe('o');
    });

    it('should return a new iterable array from argument by callback', () => {
      const testCurri = new Curri(1, 2, 3);

      const result = testCurri.from(testCurri, (x) => x + x);

      expect(result.length).toBe(3);
      expect(result[0]).toBe(2);
      expect(result[1]).toBe(4);
      expect(result[2]).toBe(6);
    });
  });

  describe('some', () => {
    it('should return true if some item in curri match the condition', () => {
      const testCurri = new Curri(1, 2, 3, 4, 5);

      const even = (element) => element % 2 === 0;
      const result = testCurri.some(even);

      expect(result).toBe(true);
    });
  });

  describe('includes', () => {
    it('should return true if item is in curri', () => {
      const testCurri = new Curri(1, 2, 3, 4, 5);

      const result = testCurri.includes(5);

      expect(result).toBe(true);
    });
  });

  describe('indexOF', () => {
    const testCurri = new Curri('ant', 'bison', 'camel', 'duck', 'bison');

    it('should return first index of item is item in curri', () => {
      const result = testCurri.indexOf('bison');

      expect(result).toBe(1);
    });

    it('should return index of item if item is in curri after index argument', () => {
      const result = testCurri.indexOf('bison', 2);

      expect(result).toBe(4);
    });
    it('should return -1 of if item isnt in curri', () => {
      const result = testCurri.indexOf('Guido Van Rossum');

      expect(result).toBe(-1);
    });
  });

  describe('isCurry', () => {
    it('should return true when object is a curri', () => {
      const testCurri = new Curri(10, 20, 30);
      const result = testCurri.isCurri();

      expect(result).toBe(true);
    });
  });

  describe('join', () => {
    it('should return new string with joined elements by coma', () => {
      const testCurri = new Curri(10, 20, 30);
      const result = testCurri.join();

      expect(result).toBe('10,20,30');
    });

    it('should return new string with joined elements', () => {
      const testCurri = new Curri(10, 20, 30);
      const result = testCurri.join('');

      expect(result).toBe('102030');
    });

    it('should return new string with joined elements bay item', () => {
      const testCurri = new Curri(10, 20, 30);
      const result = testCurri.join('-');

      expect(result).toBe('10-20-30');
    });
  });

  describe('lastIndexOf', () => {
    it('should return index of last element meets in curri', () => {
      const testCurri = new Curri('Dodo', 'Tiger', 'Penguin', 'Dodo');
      const result = testCurri.lastIndexOf('Dodo');

      expect(result).toBe(3);
    });
  });

  describe('pop', () => {
    it('should put off the last element in curri', () => {
      const testCurri = new Curri('Dodo', 'Tiger', 'Penguin', 'Dodo');
      const result = testCurri.pop('Dodo');

      expect(result).toBe('Dodo');
      expect(testCurri.length).toBe(3);
      expect(testCurri[0]).toBe('Dodo');
      expect(testCurri[1]).toBe('Tiger');
      expect(testCurri[2]).toBe('Penguin');
    });
  });

  describe('push', () => {
    it('should add item in the end of a curri and return the length of curri', () => {
      const testCurri = new Curri('pigs', 'goats', 'sheep');
      const result = testCurri.push('Guido Van Rossum');

      expect(result).toBe(4);
      expect(testCurri.length).toBe(4);
      expect(testCurri[0]).toBe('pigs');
      expect(testCurri[3]).toBe('Guido Van Rossum');
    });

    it('should add items in the end of a curri and return the length of curri', () => {
      const testCurri = new Curri('pigs', 'goats', 'sheep');
      const result = testCurri.push('Guido Van Rossum', 'Python');

      expect(result).toBe(5);
      expect(testCurri.length).toBe(5);
      expect(testCurri[4]).toBe('Python');
    });
  });

  describe('reduce', () => {
    it('should return an item consecuence of callback function on each element of the array', () => {
      const testCurri = new Curri(1, 2, 3, 4);
      const result = testCurri.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      expect(result).toBe(10);
    });
  });

  describe('reverse', () => {
    it('should swicht the original curri ordered rigthside left', () => {
      const testCurri = new Curri(1, 2, 3, 4);
      const result = testCurri.reverse();

      expect(result.length).toBe(4);
      expect(testCurri[0]).toBe(4);
      expect(testCurri[3]).toBe(1);
    });
  });

  describe('shift', () => {
    it('should get off first item in curri and return it', () => {
      const testCurri = new Curri(1, 2, 3);
      const result = testCurri.shift();

      expect(result).toBe(1);
      expect(testCurri.length).toBe(2);
      expect(testCurri[0]).toBe(2);
      expect(testCurri[1]).toBe(3);
    });
  });

  describe('slice', () => {
    const testCurri = new Curri('ant', 'bison', 'camel', 'duck', 'elephant');

    it('should return a new curri slice from start index', () => {
      const result = testCurri.slice(2);

      expect(testCurri.length).toBe(5);
      expect(testCurri[0]).toBe('ant');
      expect(testCurri[4]).toBe('elephant');

      expect(result.length).toBe(3);
      expect(result[0]).toBe('camel');
      expect(result[1]).toBe('duck');
      expect(result[2]).toBe('elephant');
    });

    it('should return a new curri slice from the end if start index is negative', () => {
      const result = testCurri.slice(-2);

      expect(testCurri.length).toBe(5);

      expect(result.length).toBe(2);
      expect(result[0]).toBe('duck');
      expect(result[1]).toBe('elephant');
    });

    it('should return a new curri slice by item from start to end index ', () => {
      const result = testCurri.slice(2, 4);

      expect(testCurri.length).toBe(5);

      expect(result.length).toBe(2);
      expect(result[0]).toBe('camel');
      expect(result[1]).toBe('duck');
    });

    it('should return a new curri empty curri and doesnt modify original without calling arguments', () => {
      const result = testCurri.slice();

      expect(testCurri.length).toBe(5);
      expect(testCurri[0]).toBe('ant');
      expect(testCurri[4]).toBe('elephant');

      expect(result.length).toBe(0);
    });
  });

  describe('splice', () => {
    it('should return a original curri splice by item from start index', () => {
      const testCurri = new Curri('Jan', 'March', 'April', 'June');
      testCurri.splice(1, 0, 'Feb');

      expect(testCurri.length).toBe(4);
      expect(testCurri[0]).toBe('Jan');
      expect(testCurri[1]).toBe('Feb');
      expect(testCurri[3]).toBe('June');
    });
  });

  describe('toReversed', () => {
    it('should return new curri with reversed items', () => {
      const testCurri = new Curri(1, 2, 3);
      const result = testCurri.toReversed();

      expect(testCurri.length).toBe(3);
      expect(testCurri[0]).toBe(1);
      expect(testCurri[1]).toBe(2);
      expect(testCurri[2]).toBe(3);

      expect(result.length).toBe(3);
      expect(result[0]).toBe(3);
      expect(result[1]).toBe(2);
      expect(result[2]).toBe(1);
    });
  });

  describe('unshift', () => {
    it('should return new length of original curri with new items at the biginning', () => {
      const testCurri = new Curri(1, 2, 3);
      const result = testCurri.unshift(4, 5);

      expect(result).toBe(5);
      expect(testCurri.length).toBe(5);
      expect(testCurri[0]).toBe(4);
      expect(testCurri[2]).toBe(1);
      expect(testCurri[4]).toBe(3);
    });
  });
});
