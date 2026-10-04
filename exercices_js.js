const products = [
    { name: "Keyboard", price: 45 },
    { name: "Monitor", price: 320 },
    { name: "Mouse", price: 25 }
];

const { name, price } = products[0];
console.log(name, price);

const mouse = products.find((product) => product.name === "Mouse");
console.log(mouse.price);

const cheapProducts = products.filter((product) => product.price < 100);
console.log(cheapProducts);

const withDiscount = (price) => price * 0.9;
console.log(withDiscount(320));