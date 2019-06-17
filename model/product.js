var product = function(id, name,price,quantity, description, categoryId,image, status,remainQuantity){
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.categoryId = categoryId;
    this.image = image;
    this.status = status;
    this.remainQuantity = remainQuantity;
  }
module.exports = product;