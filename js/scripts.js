//##########################
//     BUSINESS LOGIC
//##########################
allToppings = [
  new Topping("Ham", 100),
  new Topping("Sausage", 120),
  new Topping("Pepperoni", 80),
  new Topping("Green Pepper", 80),
  new Topping("Onion", 80),
  new Topping("Bacon", 100),
  new Topping("Beef", 150),
  new Topping("Mushrooms", 120),
  new Topping("Olives", 100),
  new Topping("Diced Tomatoes", 90),
  new Topping("Pineapple", 80),
  new Topping("Extra Cheese", 50),
];
//  PIZZA OBJECT
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
Pizza.prototype.name = function() {
  var name = "";
  if(this.size==="L") {
    name+="Large "
  } else if(this.size==="S") {
    name+="Personal "
  } else {
    name+="Medium "
  }
  name = name+this.crustType+" Pizza";
  if(this.toppings.length>0) {
    name = name+" with "+this.toppings[0].type;
  }
  if(this.toppings.length>1) {
    name+=" etc."
  }
  return name;
}

//  TOPPING OBJECT
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

// MULTI-PIZZA FUNCTIONALITY
order = [];

var orderPrice = function() {
  var totalPrice = 0;
  order.forEach(function(pizza) {
    totalPrice+=pizza.calculatePrice();
  });
  return totalPrice;
}


//##########################
//     USER INTERFACE
//##########################
var dollarFormat = function(val) {
  return "$"+(val/100).toFixed(2).toString();
}
//  Drawing Stuff
var drawPizza = function(pizza) {
  var rad = 0;
  if(pizza.size==="L") {
    rad+=160;
  } else if(pizza.size==="M") {
    rad+=110;
  } else {
    rad+=70;
  }
  var crustOffset = 0;
  if(pizza.crustType==="Deep Dish" || pizza.crustType==="Stuffed Crust") {
    crustOffset = 5;
  } else if(pizza.crustType==="Thin Crust") {
    crustOffset = -5;
  }
  var c = document.getElementById("picture-canvas");
  var ctx = c.getContext("2d");
  ctx.clearRect(0,0,c.width,c.height);
  ctx.fillStyle = "#D6B592";
  ctx.beginPath();
  ctx.arc(c.width/2, c.height/2, rad+crustOffset, 0, 2*Math.PI, true);
  ctx.fill();
  ctx.fillStyle = "#C23E3E";
  ctx.beginPath();
  ctx.arc(c.width/2, c.height/2, rad-15, 0, 2*Math.PI, true);
  ctx.fill();
  ctx.fillStyle = "#FCEAB6";
  ctx.beginPath();
  ctx.arc(c.width/2, c.height/2, rad-25, 0, 2*Math.PI, true);
  ctx.fill();
  pizza.toppings.forEach(function(t) {
    var toppingType = t.type;
    drawTopping(pizza.size, toppingType);
  });
}
var drawTopping = function(size, toppingType) {
  var c = document.getElementById("picture-canvas");
  var ctx = c.getContext("2d");
  var rad = 0;
  if(size==="L") {
    rad+=115;
  } else if(size==="M") {
    rad+=75;
  } else {
    rad+=35;
  }
  for(var i=c.width/2-rad; i<c.width/2+rad; i+=5) {
    for(var j=c.height/2-rad; j<c.height/2+rad; j+=5) {
      if(Math.random()<0.03) {
        if(toppingType==="Bacon") {
          ctx.fillStyle = "#AD5050";
          ctx.fillRect(i,j,15,7);
        }
        if(toppingType==="Diced Tomatoes") {
          ctx.fillStyle = "#D96A6A";
          ctx.fillRect(i,j,7,7);
        }
        if(toppingType==="Green Pepper") {
          ctx.strokeStyle = "#519648";
          ctx.beginPath();
          ctx.arc(i, j, 10, 0, Math.PI, true);
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        if(toppingType==="Olives") {
          ctx.strokeStyle = "#2A301C";
          ctx.beginPath();
          ctx.arc(i, j, 5, 0, 2*Math.PI, true);
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        if(toppingType==="Pineapple") {
          ctx.fillStyle = "#F2F230";
          ctx.fillRect(i,j,7,7);
        }
        if(toppingType==="Pepperoni") {
          ctx.fillStyle = "#8A3227";
          ctx.beginPath();
          ctx.arc(i, j, 7, 0, 2*Math.PI, true);
          ctx.fill();
        }
        if(toppingType==="Ham") {
          ctx.fillStyle = "#F2C2CC";
          ctx.beginPath();
          ctx.moveTo(i-6,j-6);
          ctx.lineTo(i+6,j-6);
          ctx.lineTo(i,j+6);
          ctx.fill();
        }
        if(toppingType==="Onion") {
          ctx.strokeStyle = "#C468A9";
          ctx.beginPath();
          ctx.arc(i, j, 7, 0, Math.PI/2, true);
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        if(toppingType==="Sausage" || toppingType==="Beef") {
          ctx.fillStyle = "#7D5C39";
          ctx.beginPath();
          ctx.arc(i, j, 4, 0, 2*Math.PI, true);
          ctx.fill();
        }
        if(toppingType==="Mushrooms") {
          ctx.fillStyle = "#D6CCC3";
          ctx.beginPath();
          ctx.arc(i+2, j, 4, 0, 2*Math.PI, true);
          ctx.fill();
          ctx.beginPath();
          ctx.arc(i-2, j, 4, 0, 2*Math.PI, true);
          ctx.fill();
          ctx.fillRect(i-2,j,4,7);
        }
      }
    }
  }
}

$(document).ready(function() {
  for(var i=0; i<allToppings.length; i++) {
    $("#toppings").append("<button class='btn btn-warning' id='"+i.toString()+"' type='button'>"+allToppings[i].type+"</button>");
  }
  var beginPizza = function() {
    currentPizza = new Pizza("M","Pan");
    $("button").removeAttr("disabled","disabled");
    $("button").removeClass("active");
    $("#M").addClass("active");
    $("#Pan").addClass("active");
    $(".ordering").hide();
    $("#save").show();
  }
  beginPizza();

  var displayPizzaInfo = function() {
    $("#info-top h3").text(dollarFormat(currentPizza.calculatePrice()));
    $("#info-list").empty();
    if(currentPizza.size==="L") {
      var s = "Large";
    } else if(currentPizza.size==="M") {
      var s = "Medium";
    } else {
      var s = "Personal";
    }
    $("#info-list").append("<li><span class='info-type'>Size: </span>"+s+"</li>");
    $("#info-list").append("<li><span class='info-type'>Crust: </span>"+currentPizza.crustType+"</li>");
    if(currentPizza.toppings.length > 0) {
      $("#info-list").append("<li><span class='info-type'>Toppings: </span><ul id='topping-info'>");
      currentPizza.toppings.forEach(function(t) {
        $("#topping-info").append("<li>"+t.type+"</li>");
      });
      $("#info-list").append("</li>");
    }
    drawPizza(currentPizza);
  }
  displayPizzaInfo();

  var displayOrder = function() {
    $("#pizza-list").empty();
    $("#pizza-list").append("<h3>Your Order:</h3><hr>");
    for(var i=0; i<order.length; i++) {
      $("#pizza-list").append("<li>"+order[i].name()+"<button class='btn btn-xs btn-default' id='"+i.toString()+"'>X</button><span class='info-type'>"+dollarFormat(order[i].calculatePrice())+"</span></li><hr>");
    }
    $("#order-price").text("Total Price: "+dollarFormat(orderPrice()));
    $("#pizza-list button").click(function() {
      var removeIndex = parseInt($(this).attr("id"));
      order = order.slice(0,removeIndex).concat(order.slice(removeIndex+1,order.length));
      displayOrder();
    });
  }
  $("#size button").click(function() {
    currentPizza.size = $(this).attr("id");
    $("#size button").removeClass("active");
    $(this).toggleClass("active");
    displayPizzaInfo();
  });
  $("#crust button").click(function() {
    currentPizza.crustType = $(this).attr("id");
    $("#crust button").removeClass("active");
    $(this).toggleClass("active");
    displayPizzaInfo();
  });
  $("#toppings button").click(function() {
    currentPizza.addRemoveTopping(parseInt($(this).attr("id")));
    $(this).toggleClass("active");
    displayPizzaInfo();
  });
  $("#save").click(function() {
    order.push(currentPizza);
    $(".ordering").show();
    $(this).hide();
    displayOrder();
    $("#size button").attr("disabled", "disabled");
    $("#crust button").attr("disabled", "disabled");
    $("#toppings button").attr("disabled", "disabled");
  });
  $("#order").click(function() {
    alert("This is a demo. Checkout not currently available.");
  })
  $("#new").click(function() {
    beginPizza();
    displayPizzaInfo();
  });
});
