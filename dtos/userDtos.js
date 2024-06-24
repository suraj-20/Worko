class UserDto {
  constructor({ _id, email, name, age, city, zipCode }) {
    this.id = _id;
    this.email = email;
    this.name = name;
    this.age = age;
    this.city = city;
    this.zipCode = zipCode;
  }
}

module.exports = UserDto