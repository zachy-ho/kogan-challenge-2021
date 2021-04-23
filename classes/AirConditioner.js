class AirConditioner {
  constructor({ length, height, width }) {
    // Store in metres
    this.length = length / 100;
    this.height = height / 100;
    this.width = width / 100;
  }

  // Formula given from the coding challenge spec
  getCubicWeight() {
    return this.length * this.height * this.width * 250;
  }
}

module.exports = AirConditioner;
