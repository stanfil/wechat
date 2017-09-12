class validate{
  check(type, realType) {
    return realType.find(real => real.type === type);
  }
  city(city, realCity) {
    return realCity.find(real => real === city);
  }
}
module.exports = validate;