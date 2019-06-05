var con = require('./../config/key');
var order = function (id, address, customerName, orderName, sumMoney, status, create,id_customer) {
    this.id = id;
    this.address = address;
    this.customerName = customerName;
    this.orderName = orderName;
    this.sumMoney = sumMoney;
    this.status = status;
    this.create = create;
    this.id_customer = id_customer;
}



module.exports = order;
