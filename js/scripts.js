function Pizza(size, crustType) {
  this.size = size;
  this.crustType = crustType;
  this.toppings = [];
}
Pizza.prototype.calculatePrice = function() {//all prices in pennies
  var totalPrice = 0;
  if(this.size==="L") {
    totalPrice += 1200;
  } else if(this.size==="S") {
    totalPrice += 500;
  } else {
    totalPrice += 1000;
  }
  this.toppings.forEach(function(topping) {
    totalPrice += topping.getPrice();
  });
  return totalPrice;
}

function Topping(type, price) {
  this.type = type;
  this.price = price;
}
Topping.prototype.getPrice = function(size) {
  if(size==="L") {
    return Math.floor(this.price*1.5);
  } else if(size==="S") {
    return Math.floor(this.price*0.5);
  } else {
    return this.price;
  }
}

//global var
availableToppings = [
  new Topping("Ham", 100),
  new Topping("Suasage", 120),
  new Topping("Pepperoni", 80),
  new Topping("Green Pepper", 80),
  new Topping("Onion", 80),
  new Topping("Bacon", 100),
  new Topping("Beef", 150),
  new Topping("Mushrooms", 120),
  new Topping("Olives", 100),
  new Topping("Diced Tomatoes", 90),
  new Topping("Pineapple", 80),
  new Topping("Extra Cheesa", 50),
];


//test
var myPizza = new Pizza("M","Pan");
myPizza.toppings.push(availableToppings[3]);
myPizza.toppings.push(availableToppings[6]);
myPizza.toppings.push(availableToppings[9]);
console.log(myPizza.calculatePrice());
