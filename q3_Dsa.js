const userType = prompt("Are you a SELLER or CUSTOMER?"); //user log in the program will prompt you to enter if you are a seller or customer

if (userType === "SELLER") {  //if the user choose the seller it will ask for the username and password
  const username = prompt("Enter username:"); //and this function will only works for the SEllER 
  const password = prompt("Enter password:");

  const sellers = [
    { username: "seller1", password: "password1" }, //this is the seller passwords and usernames
    { username: "seller2", password: "password2" }, 
    { username: "seller3", password: "password3" },
    { username: "seller4", password: "password4" },
  ];

  if (authenticateSeller(username, password, sellers)) {  //after logging the user passwords and username this will appear on the program and will asked on what do u want next
    const action = prompt("What do you want to do? LOGOUT, ADD, or REMOVE?");

    if (action === "LOGOUT") { //if u choose logout it will start logging out
      console.log("Logging out..."); //this will log on the console
      const userType = prompt("Are you a SELLER or CUSTOMER?"); //after logging out this will going to show and will ask you to prompt
    } else if (action === "ADD") { //if you choose add it will ask u on which category
      const category = prompt("Which category?");
      do {
        const itemName = prompt("Enter item name:"); //on this part the program will going to ask u to enter the name of the item of ur choices
        const price = parseFloat(prompt("Enter price per item:"));
        items[category].push({ name: itemName, price: price });

        const continueAdding = prompt("Do you want to add another item? (yes/no)"); //on this part the user must enter yes or no to answer
      } while (continueAdding.toLowerCase() === "yes");
    } else if (action === "REMOVE") {
      const category = prompt("Which category?");
      do {
        const itemName = prompt("Enter item name to remove:"); 
        items[category] = items[category].filter(item => item.name !== itemName);

        const continueRemoving = prompt("Do you want to remove another item? (yes/no)");
      } while (continueRemoving.toLowerCase() === "yes");
    } else {
      console.log("Invalid action."); // this prints when the action is invalid
    }
  } else {
    console.log("Invalid credentials.");
  }
} else if (userType === "CUSTOMER") { //if the user choose customer this will show on the program
  const items = {
    pasta: [ //categories
      { name: "Spaghetti Carbonara", price: 150 }, //names of the items so with their prices
      { name: "Pancit Canton", price: 120 },
      { name: "Pancit Palabok", price: 200 },
      { name: "Pancit Habhab", price: 50 },
    ],
    desserts: [ //categories
      { name: "Chocolate Cake", price: 100 },  //names of the items so with their prices
      { name: "Leche Plan", price: 80 },
      { name: "Halo-halo", price: 120 },
      { name: "Ube Halaya", price: 90 },
    ],
    drinks: [ //categories
      { name: "Coca-Cola", price: 30 },  //names of the items so with their prices
      { name: "Calamansi Juice", price: 20 },
      { name: "Sprite", price: 30 },
      { name: "Mineral water", price: 15 },
    ],
  };

  const cart = []; 
  const orderHistory = []; 

  while (true) {
    displayMenu(items); 

    const action = prompt("What do you want to do? ORDER, CART, HISTORY, or CANCEL?");

    if (action === "ORDER") { //if the user input order
      const category = prompt("Choose a category:"); //the user will choose on the 3 categories which is the pasta, dessert, drinks
      const item = prompt("Choose an item:"); //you will choose the items u want after choosing one in categories
      const quantity = parseInt(prompt("Enter quantity:")); // at this part the program will ask u on how many or the quantity of items u want

      addToCart(cart, category, item, quantity, items); 
    } else if (action === "CART") {
      if (cart.length === 0) {
        console.log("Your cart is empty."); //this logs on the console when ur cart is empty
      } else {
        console.log("Your Cart:");
        let total = 0;
        cart.forEach(item => {
          console.log(`- ${item.quantity} x ${item.name} ( ₱${item.price * item.quantity})`);
          total += item.price * item.quantity;
        });
        console.log(`Total:  ₱${total}`);

        const cartAction = prompt("What do you want to do? PRINT, ADD, REMOVE, or CANCEL?");
        if (cartAction === "PRINT") { // if the user choose print
          console.log("Printing receipt..."); //it will print the customers receipt
          const order = { 
            items: [...cart], 
            total: total, 
            timestamp: new Date() 
          };
          orderHistory.push(order); 
          cart.length = 0; 
        } else if (cartAction === "ADD") { //adding an item
          // Go back to the main menu
        } else if (cartAction === "REMOVE") { //removing an item
          const itemToRemove = prompt("Enter the item to remove:"); //must need to enter on which item to be remove
          cart.splice(cart.findIndex(item => item.name === itemToRemove), 1);
          console.log(`${itemToRemove} removed from cart.`);
        } else if (cartAction === "CANCEL") {
          // if its invalid it will go back to the main menu
        } else {
          console.log("Invalid cart action.");
        }
      }
    } else if (action === "HISTORY") {
      if (orderHistory.length === 0) {
        console.log("No order history found.");
      } else {
        console.log("Order History:");
        // Display order history using a queue (FIFO)
        const orderQueue = [...orderHistory]; 
        while (orderQueue.length > 0) {
          const order = orderQueue.shift(); 
          console.log(`- ${order.timestamp}:`);
          order.items.forEach(item => {
            console.log(`  - ${item.quantity} x ${item.name} ($${item.price * item.quantity})`);
          });
          console.log(`  Total: $${order.total}`);
        }
      }
    } else if (action === "CANCEL") {
      break;
    } else {
      console.log("Invalid action.");
    }
  }
}

function authenticateSeller(username, password, sellers) {
  for (const seller of sellers) {
    if (seller.username === username && seller.password === password) {
      return true;
    }
  }
  return false;
}

function displayMenu(items) {
  console.log("Menu:");
  for (const category in items) {
    // Sort items by price (ascending) before displaying
    items[category].sort((a, b) => a.price - b.price);
    console.log(`- ${category}`);
    items[category].forEach(item => {
      console.log(`  - ${item.name} (₱${item.price})`);
    });
  }
}

function addToCart(cart, category, item, quantity, items) {
  const selectedItem = items[category].find(i => i.name === item);
  if (selectedItem) {
    cart.push({ ...selectedItem, quantity });
    console.log(`${quantity} ${item} added to cart.`);
  } else {
    console.log("Item not found.");
  }
}
