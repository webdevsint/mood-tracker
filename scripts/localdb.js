const bucket = localStorage;

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === "QuotaExceededError" ||
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      storage &&
      storage.length !== 0
    );
  }
}

class LocalDB {
  constructor() {
    if (storageAvailable("localStorage") === false)
      console.error("localStorage not enabled!");

    this.bucket = bucket;

    this.storage = () => {
      const data = [];

      Object.keys({ ...bucket }).forEach(function (key) {
        let object = JSON.parse({ ...bucket }[key]);
        object = Object.assign({ id: key }, object);

        data.push(object);
      });

      return data;
    };

    this.write = (id, obj) => bucket.setItem(id, JSON.stringify(obj));
    this.read = (id) => {
      const entry = JSON.parse(bucket.getItem(id));

      if (entry === null) return "this entry does not exist!";
      else return entry;
    };
    this.rewrite = (id, obj) => {
      let entry = JSON.parse(bucket.getItem(id));

      if (entry === null)
        console.error(`entry of id "${id}" does not exist, cannot rewrite!`);
      else bucket.setItem(id, JSON.stringify(obj));
    };
    this.remove = (id) => bucket.removeItem(id);

    this.clear = () => bucket.clear();
  }
}
