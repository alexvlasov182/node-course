class SimpleCache {
  constructor(ttl = 600000) {
    this.ttl = ttl; // ms
    this.store = new Map();
  }

  get(key) {
    const cached = this.store.get(key);
    if(!cached) return null;

    if (Date.now() > cached.expiry) {
      this.store.delete(key);
      return null;
    }
    return cached.value
  }

  set(key, value) {
    const expiry = Date.now() + this.ttl;
    this.store.set(key, {value, expiry});
  }
}

module.exports = SimpleCache