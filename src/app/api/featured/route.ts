// app/api/categories/route.ts

import { NextResponse } from "next/server";

const mockFeatured = [
  {
    featureId: "1",
    featureName: "Featured Products",
    products: [
      {
        id: 4,
        productID: "exanoke",
        title: "Red Lipstick",
        description:
          "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
        category: "beauty",
        price: 12.99,
        discountPercentage: 12.16,
        rating: 4.36,
        // this is our part
        stock: 91,
        sales: 20,
        Offerdiscount: 25,
        persentage: true,
        // this is our part
        tags: ["beauty", "lipstick"],
        brand: "Chic Cosmetics",
        sku: "BEA-CHI-LIP-004",
        weight: 1,
        dimensions: {
          width: 18.11,
          height: 28.38,
          depth: 22.17,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "In Stock",
        reviews: [
          {
            rating: 4,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Liam Garcia",
            reviewerEmail: "liam.garcia@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Ruby Andrews",
            reviewerEmail: "ruby.andrews@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Would buy again!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Clara Berry",
            reviewerEmail: "clara.berry@x.dummyjson.com",
          },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 40,
        meta: {
          createdAt: "2025-04-30T09:41:02.053Z",
          updatedAt: "2025-04-30T09:41:02.053Z",
          barcode: "9467746727219",
          qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
      },
      {
        id: 3,
        productID: "exanoke",
        title: "Red Lipstick",
        description:
          "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
        category: "beauty",
        price: 12.99,
        discountPercentage: 12.16,
        rating: 4.36,
        stock: 0,
        sales: 82,
        Offerdiscount: 25,
        persentage: true,
        tags: ["beauty", "lipstick"],
        brand: "Chic Cosmetics",
        sku: "BEA-CHI-LIP-004",
        weight: 1,
        dimensions: {
          width: 18.11,
          height: 28.38,
          depth: 22.17,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "In Stock",
        reviews: [
          {
            rating: 4,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Liam Garcia",
            reviewerEmail: "liam.garcia@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Ruby Andrews",
            reviewerEmail: "ruby.andrews@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Would buy again!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Clara Berry",
            reviewerEmail: "clara.berry@x.dummyjson.com",
          },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 40,
        meta: {
          createdAt: "2025-04-30T09:41:02.053Z",
          updatedAt: "2025-04-30T09:41:02.053Z",
          barcode: "9467746727219",
          qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
      },
      {
        id: 10,
        productID: "exanoke",
        title: "Red Lipstick",
        description:
          "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
        category: "beauty",
        price: 800,
        discountPercentage: 12.16,
        rating: 4.36,
        stock: 91,
        sales: 15,
        Offerdiscount: 250,
        persentage: false,
        tags: ["beauty", "lipstick"],
        brand: "Chic Cosmetics",
        sku: "BEA-CHI-LIP-004",
        weight: 1,
        dimensions: {
          width: 18.11,
          height: 28.38,
          depth: 22.17,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "In Stock",
        reviews: [
          {
            rating: 4,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Liam Garcia",
            reviewerEmail: "liam.garcia@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Ruby Andrews",
            reviewerEmail: "ruby.andrews@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Would buy again!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Clara Berry",
            reviewerEmail: "clara.berry@x.dummyjson.com",
          },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 40,
        meta: {
          createdAt: "2025-04-30T09:41:02.053Z",
          updatedAt: "2025-04-30T09:41:02.053Z",
          barcode: "9467746727219",
          qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
      },
      {
        id: 3,
        productID: "exanoke",
        title: "Red Lipstick",
        description:
          "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
        category: "beauty",
        price: 12.99,
        discountPercentage: 12.16,
        rating: 4.36,
        stock: 91,
        sales: 82,
        Offerdiscount: 25,
        persentage: true,
        tags: ["beauty", "lipstick"],
        brand: "Chic Cosmetics",
        sku: "BEA-CHI-LIP-004",
        weight: 1,
        dimensions: {
          width: 18.11,
          height: 28.38,
          depth: 22.17,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "In Stock",
        reviews: [
          {
            rating: 4,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Liam Garcia",
            reviewerEmail: "liam.garcia@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Ruby Andrews",
            reviewerEmail: "ruby.andrews@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Would buy again!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Clara Berry",
            reviewerEmail: "clara.berry@x.dummyjson.com",
          },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 40,
        meta: {
          createdAt: "2025-04-30T09:41:02.053Z",
          updatedAt: "2025-04-30T09:41:02.053Z",
          barcode: "9467746727219",
          qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
      },
      {
        id: 10,
        productID: "exanoke",
        title: "Red Lipstick",
        description:
          "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
        category: "beauty",
        price: 12.99,
        discountPercentage: 12.16,
        rating: 4.36,
        stock: 91,
        sales: 15,
        Offerdiscount: 25,
        persentage: true,
        tags: ["beauty", "lipstick"],
        brand: "Chic Cosmetics",
        sku: "BEA-CHI-LIP-004",
        weight: 1,
        dimensions: {
          width: 18.11,
          height: 28.38,
          depth: 22.17,
        },
        warrantyInformation: "3 year warranty",
        shippingInformation: "Ships in 1 week",
        availabilityStatus: "In Stock",
        reviews: [
          {
            rating: 4,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Liam Garcia",
            reviewerEmail: "liam.garcia@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Great product!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Ruby Andrews",
            reviewerEmail: "ruby.andrews@x.dummyjson.com",
          },
          {
            rating: 5,
            comment: "Would buy again!",
            date: "2025-04-30T09:41:02.053Z",
            reviewerName: "Clara Berry",
            reviewerEmail: "clara.berry@x.dummyjson.com",
          },
        ],
        returnPolicy: "7 days return policy",
        minimumOrderQuantity: 40,
        meta: {
          createdAt: "2025-04-30T09:41:02.053Z",
          updatedAt: "2025-04-30T09:41:02.053Z",
          barcode: "9467746727219",
          qrCode: "https://cdn.dummyjson.com/public/qr-code.png",
        },
        images: [
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
        ],
        thumbnail:
          "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
      },
    ],
  },
];

export async function GET() {
  return NextResponse.json(mockFeatured);
}
