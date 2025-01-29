export const mockProducts = [
  {
    id: '1',
    name: 'Premium Denim Jacket',
    price: '299.99',
    description: 'High-quality denim jacket with modern styling',
    images: [
      require('../../../assets/products/unisex-denim-jacket-black-denim-front-63c287752e274.jpg'),
      require('../../../assets/products/unisex-denim-jacket-black-denim-front-63c287752e582.jpg'),
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Blue'],
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  // Add more products
];

export const mockCategories = [
  {
    id: '1',
    name: 'New Arrivals',
    image: require('../../../assets/products/unisex-denim-jacket-black-denim-front-63c287752e274.jpg'),
  },
  // Add more categories
];

export const mockOrders = [
  {
    id: 'ORD123456',
    date: '2024-03-15',
    status: 'Processing',
    items: [
      {
        productId: '1',
        quantity: 2,
        size: 'M',
        price: '299.99',
      },
    ],
    total: '599.98',
    shipping: {
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      country: 'USA',
    },
    payment: {
      method: 'Credit Card',
      last4: '4242',
    },
  },
  // Add more orders
]; 