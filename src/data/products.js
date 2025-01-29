export const bannerImages = [
  require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752e274.jpg'),
  require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752e582.jpg'),
  require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752ead1.jpg'),
];

export const categories = [
  {
    id: '1',
    name: 'New Arrivals',
    image: require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f23e.jpg'),
    products: Array(10).fill().map((_, index) => ({
      id: `101${index}`,
      name: `Premium Denim Jacket ${index + 1}`,
      price: '299.99',
      images: [
        require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752e274.jpg'),
        require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752e582.jpg'),
      ],
      category: 'New Arrivals',
      description: 'Premium unisex black denim jacket with modern details',
      isNew: true,
    })),
  },
  {
    id: '2',
    name: 'Best Sellers',
    image: require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f58d.jpg'),
    products: Array(10).fill().map((_, index) => ({
      id: `201${index}`,
      name: `Classic Denim Jacket ${index + 1}`,
      price: '249.99',
      images: [
        require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f58d.jpg'),
        require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f23e.jpg'),
      ],
      category: 'Best Sellers',
      description: 'Classic fit denim jacket with premium wash',
    })),
  },
  {
    id: '3',
    name: 'Limited Edition',
    image: require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f775.jpg'),
    products: Array(10).fill().map((_, index) => ({
      id: `301${index}`,
      name: `Limited Edition Jacket ${index + 1}`,
      price: '399.99',
      images: [
        require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f775.jpg'),
        require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f23e.jpg'),
      ],
      category: 'Limited Edition',
      description: 'Limited edition designer piece with unique detailing',
    })),
  },
  {
    id: '4',
    name: 'Essentials',
    image: require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f3fa.jpg'),
    products: Array(10).fill().map((_, index) => ({
      id: `401${index}`,
      name: `Essential Denim Jacket ${index + 1}`,
      price: '199.99',
      images: [
        require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f3fa.jpg'),
        require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f23e.jpg'),
      ],
      category: 'Essentials',
      description: 'Essential denim jacket for everyday wear',
    })),
  },
  {
    id: '5',
    name: 'Collections',
    image: require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752eb62.jpg'),
    products: Array(10).fill().map((_, index) => ({
      id: `501${index}`,
      name: `Collection Piece ${index + 1}`,
      price: '349.99',
      images: [
        require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752eb62.jpg'),
        require('../../assets/products/unisex-denim-jacket-black-denim-front-63c287752f23e.jpg'),
      ],
      category: 'Collections',
      description: 'Exclusive collection piece with premium details',
    })),
  },
];

// Show first 4 categories in home screen
export const categoryThumbnails = categories.slice(0, 4);

// Only show expanded sections for New Arrivals and Best Sellers in home
export const products = categories.slice(0, 2).map(category => ({
  categoryName: category.name,
  items: category.products.slice(0, 4),
  totalItems: category.products.length,
})); 