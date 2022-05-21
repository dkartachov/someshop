export const Product = (product) => {
    return {
        id: product.product_id,
        name: product.name,
        description: product.description,
        inventory: product.inventory,
        price: product.price,
        // image: product.image,
    };
}