function createProduct(name, price, category) {
    return {
        name,
        price,
        category,
        applyDiscount(discountPercentage) {
            this.price -= this.price * (discountPercentage / 100);
        },
    };
}
function createCategoryManager(categoryName) {
    const products = [];

    return {
        categoryName,

        addProduct(product) {
            if (product.category === this.categoryName) {
                products.push(product);
            } else {
                console.error(`Product category mismatch. Expected: ${this.categoryName}`);
            }
        },

        removeProduct(productName) {
            const index = products.findIndex(product => product.name === productName);
            if (index !== -1) {
                products.splice(index, 1);
            } else {
                console.error(`Product not found: ${productName}`);
            }
        },

        listProducts() {
            return products;
        },

        applyCategoryDiscount(discountPercentage) {
            products.forEach(product => product.applyDiscount(discountPercentage));
        }
    };
}
const electronicsManager = createCategoryManager('Electronics');
const laptop = createProduct('Laptop', 1000, 'Electronics');
const phone = createProduct('Phone', 500, 'Electronics');
const chair = createProduct('Chair', 150, 'Furniture');
electronicsManager.addProduct(laptop);
electronicsManager.addProduct(phone);
electronicsManager.addProduct(chair); 
console.log('Products in Electronics:', electronicsManager.listProducts());

electronicsManager.applyCategoryDiscount(10);
console.log('Products after discount:', electronicsManager.listProducts());
electronicsManager.removeProduct('Phone');
console.log('Products after removal:', electronicsManager.listProducts());
