//Often referred to as object, map, dictionary or hashTable
//In JS hashtables are built with an array under the hood. Values are stored in an array.

//Hash Tables are a data structure that allow you to create a list of paired values. You can then retrieve a certain value by using the key for that value, which you put into the table beforehand.
//A Hash Table transforms a key into an integer index using a hash function, and the index will decide where to store the key/value pair in memory:
//You'll commonly use a Hash Table because of its fast search, insertion, and delete operations
function hashStringToInt(s, tableSize) {
    let hash = 17;
  
    for (let i = 0; i < s.length; i++) {
      hash = (13 * hash * s.charCodeAt(i)) % tableSize;
    }
  
    return hash;
  }
  
  class HashTable {
    table = new Array(3333);
    numItems = 0;
  
    resize = () => {
      const newTable = new Array(this.table.length * 2);
      this.table.forEach(item => {
        if (item) {
          item.forEach(([key, value]) => {
            const idx = hashStringToInt(key, newTable.length);
            if (newTable[idx]) {
              newTable[idx].push([key, value]);
            } else {
              newTable[idx] = [[key, value]];
            }
          });
        }
      });
      this.table = newTable;
    };
  
    setItem = (key, value) => {
      this.numItems++;
      const loadFactor = this.numItems / this.table.length;
      if (loadFactor > 0.8) {
        // resize
        this.resize();
      }
  
      const idx = hashStringToInt(key, this.table.length);
      if (this.table[idx]) {
        this.table[idx].push([key, value]);
      } else {
        this.table[idx] = [[key, value]];
      }
    };
  
    getItem = key => {
      const idx = hashStringToInt(key, this.table.length);
  
      if (!this.table[idx]) {
        return null;
      }
  
      // O(n)
      return this.table[idx].find(x => x[0] === key)[1];
    };
  }
  
  const myTable = new HashTable();
  myTable.setItem("firstName", "bob");
  myTable.setItem("lastName", "tim");
  myTable.setItem("age", 5);
  myTable.setItem("dob", "1/2/3");
  console.log(myTable.getItem("firstName"));
  console.log(myTable.getItem("lastName"));
  console.log(myTable.getItem("age"));
  console.log(myTable.getItem("dob"));