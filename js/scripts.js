//global var
allToppings = [
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

function Pizza(size, crustType) {
  this.size = size;
  this.crustType = crustType;
  this.toppings = [];
  this.availableToppings = allToppings.slice(0);
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
  if(this.crustType==="Stuffed Crust") {
    totalPrice += 200;
  } else if(this.crustType==="Thin Crust") {
    totalPrice -= 100;
  } else if(this.crustType==="Deep Dish") {
    totalPrice += 100;
  }
  this.toppings.forEach(function(topping) {
    totalPrice += topping.getPrice();
  });
  return totalPrice;
}
Pizza.prototype.addRemoveTopping = function(toppingIndex) {
  var topping = this.availableToppings[toppingIndex];
  if(topping) {
    this.toppings.push(topping);
    this.availableToppings[toppingIndex] = "";
  } else {
    this.availableToppings[toppingIndex] = allToppings[toppingIndex];
    var indexOnPizza = this.toppings.indexOf(allToppings[toppingIndex]);
    this.toppings = this.toppings.slice(0,indexOnPizza).concat(this.toppings.slice(indexOnPizza+1,this.toppings.length));
  }
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

currentPizza = new Pizza("M","Pan");
order = [];

$(document).ready(function() {
  for(var i=0; i<allToppings.length; i++) {
    $("#toppings").append("<button class='btn btn-warning' id='"+i.toString()+"' type='button'>"+allToppings[i].type+"</button>");
  }
  $("#size button").click(function() {
    currentPizza.size = $(this).attr("id");
    $("#size button").removeClass("active");
    $(this).toggleClass("active");
  });
  $("#crust button").click(function() {
    currentPizza.crustType = $(this).attr("id");
    $("#crust button").removeClass("active");
    $(this).toggleClass("active");
  });
  $("#toppings button").click(function() {
    currentPizza.addRemoveTopping(parseInt($(this).attr("id")));
    $(this).toggleClass("active");
  });
  $("#save").click(function() {
    order.push(currentPizza);
    $(".ordering").show();
    $(this).hide();
  });
});



//test
// var myPizza = new Pizza("M","Pan");
// myPizza.addTopping(4);
// myPizza.addTopping(4);
// myPizza.addTopping(5);
// console.log(myPizza.calculatePrice());
