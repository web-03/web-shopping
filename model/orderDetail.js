var orderDetail = function (id, id_customer, id_product, id_order, status, note) {
    this.id = id;
    this.status = status;
    this.id_product = id_product;
    this.note=note;
    this.id_order = id_order;
    this.id_customer = id_customer;
}



module.exports = orderDetail;
