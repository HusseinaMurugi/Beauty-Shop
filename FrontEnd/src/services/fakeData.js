// src/services/fakeData.js

// 1. The "Database" (In-Memory Arrays)
export const products = [
  {
    id: 1,
    name: "Radiance Vitamin C Serum",
    category: "Skincare",
    price: 6240.00,
    rating: 4.8,
    reviews: 120,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600",
    description: "A powerful serum that brightens skin tone and reduces signs of aging.",
    stock: 50,
    isNew: true,
    // NEW: Sample reviews
    reviewsList: [
      { id: 101, user: "Sarah J.", rating: 5, comment: "Absolutely love this! My skin glows.", date: "2023-10-15" },
      { id: 102, user: "Mike T.", rating: 4, comment: "Good texture, but smells a bit strong.", date: "2023-09-22" }
    ]
  },
  {
    id: 2,
    name: "Hydra-Boost Moisturizer",
    category: "Skincare",
    price: 7280.00,
    rating: 4.5,
    reviews: 85,
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&q=80&w=600",
    description: "Deep hydration for dry and sensitive skin.",
    stock: 30,
    isNew: false,
    reviewsList: [
      { id: 201, user: "Emily R.", rating: 5, comment: "Saved my dry skin in winter!", date: "2023-11-05" }
    ]
  },
  {
    id: 3,
    name: "Velvet Matte Lipstick",
    category: "Makeup",
    price: 4160.00,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
    description: "Long-lasting matte finish that doesn't dry out lips.",
    stock: 100,
    isNew: true,
    reviewsList: []
  },
  {
    id: 4,
    name: "Argan Repair Hair Oil",
    category: "Haircare",
    price: 4680.00,
    rating: 4.2,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&q=80&w=600",
    description: "Restores shine and softness to damaged hair.",
    stock: 25,
    isNew: false,
    reviewsList: []
  },
  {
    id: 5,
    name: "Sunshield SPF 50 Sunscreen",
    category: "Skincare",
    price: 3770.00,
    rating: 4.7,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=600",
    description: "Broad-spectrum sunscreen that protects against UVA and UVB rays.",
    stock: 60,
    isNew: true,
    reviewsList: [
      { id: 501, user: "Liam K.", rating: 5, comment: "Lightweight and non-greasy. Perfect for daily use.", date: "2023-08-30" }
    ]
  },
  {
    id: 6,
    name: "Volume Boost Shampoo",
    category: "Haircare",
    price: 3120.00,
    rating: 4.3, 
    reviews: 65,
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600",
    description: "Enhances volume and adds body to fine hair.",
    stock: 40,
    isNew: false,
    reviewsList: [
      { id: 601, user: "Sophie M.", rating: 4, comment: "Great for adding volume. My hair feels fuller now.", date: "2023-10-12" }
    ]
  }
];

export const categories = [
  {
    id: 1,
    title: "Skincare",
    subtitle: "Nourish & Glow",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdd403cc2?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 2,
    title: "Haircare",
    subtitle: "Strength & Shine",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: 3,
    title: "Makeup",
    subtitle: "Define & Enhance",
    image: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&q=80&w=600"
  }
];

// This array acts as our "Database" for orders
const ordersDb = [];

// 2. Helper Functions (Simulating API Calls)

// Get single product
export const getProductById = (id) => {
  return products.find(p => p.id === parseInt(id));
};

// Simulate creating an order (Async)
export const createOrder = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newOrder = {
        ...orderData,
        id: `ORD-${Date.now()}`, // Generate unique ID based on timestamp
        createdAt: new Date().toISOString(),
        status: 'Processing'
      };
      ordersDb.push(newOrder); // Save to "DB"
      resolve(newOrder);
    }, 1500); // 1.5 second delay to simulate network
  });
};

// Simulate fetching an order by ID
export const getOrderById = (orderId) => {
  return ordersDb.find(o => o.id === orderId);
};