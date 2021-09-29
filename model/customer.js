var customer = function(id, name, phoneNumber, place,account,password, status){
    this.id = id;
    this.name = name;
    this.account = account;
    this.phoneNumber = phoneNumber;
    this.place = place;
    this.status = status;
    this.password=password;
  }

module.exports = customer;