import { Business } from "../services/business/business.types";

export type SubCategory = { name: string; businesses: Business[] };

const foodCategories: SubCategory[] = [
	{
		name: "Restaurants",
		businesses: [
			{
				id: "fdgdf",
				name: "Tasty Bites",
				description: "A cozy restaurant serving delicious meals",
				owner: "John Smith",
				phoneNumber: "123-456-7890",
				isFavorite: true,
				rating: 5,
			},
			{
				id: "fdgdfhgf",
				name: "Pizza Paradise",
				description: "Authentic Italian pizzas made with love",
				owner: "Jane Doe",
				phoneNumber: "987-654-3210",
				isFavorite: false,
				rating: 5,
			},
		],
	},
	{
		name: "Food Trucks",
		businesses: [
			{
				id: "fdgdfcvnbcbv",
				name: "Burger On Wheels",
				description: "Gourmet burgers served from a food truck",
				owner: "Mike Johnson",
				phoneNumber: "456-789-0123",
				isFavorite: true,
				rating: 3,
			},
			{
				id: "fdgdhgmjnghf",
				name: "Taco Express",
				description: "Tasty tacos on the go",
				owner: "Sarah Thompson",
				phoneNumber: "789-012-3456",
				isFavorite: true,
				rating: 3,
			},
		],
	},
];
const RetailsAndServicesCategories: { name: string; businesses: Business[] }[] =
	[
		{
			name: "Retail Stores",
			businesses: [
				{
					id: "1",
					name: "Fashion Emporium",
					description: "Trendy clothing store with a wide selection",
					owner: "Emily Anderson",
					phoneNumber: "123-456-7890",
					isFavorite: true,
					rating: 2,
				},
				{
					id: "2",
					name: "Gadget World",
					description: "Electronics store offering the latest gadgets",
					owner: "Michael Johnson",
					phoneNumber: "987-654-3210",
					isFavorite: false,
					rating: 3,
				},
			],
		},
		{
			name: "Health & Beauty",
			businesses: [
				{
					id: "3",
					name: "Wellness Spa",
					description: "Relaxing spa with various wellness treatments",
					owner: "Jessica Davis",
					phoneNumber: "456-789-0123",
					isFavorite: true,
					rating: 2,
				},
				{
					id: "4",
					name: "Beauty Haven",
					description: "Beauty salon specializing in hair and makeup",
					owner: "Sarah Thompson",
					phoneNumber: "789-012-3456",
					isFavorite: true,
					rating: 5,
				},
			],
		},
		{
			name: "Home Services",
			businesses: [
				{
					id: "5",
					name: "Fix-It All",
					description: "Home repair and maintenance services",
					owner: "Daniel Wilson",
					phoneNumber: "012-345-6789",
					isFavorite: true,
					rating: 5,
				},
				{
					id: "6",
					name: "Cleaning Pros",
					description: "Professional cleaning services for homes",
					owner: "Jennifer Adams",
					phoneNumber: "345-678-9012",
					isFavorite: false,
					rating: 5,
				},
			],
		},
		{
			name: "Automotives",
			businesses: [
				{
					id: "7",
					name: "Car Garage",
					description: "Full-service garage for car repairs",
					owner: "Robert Miller",
					phoneNumber: "678-901-2345",
					isFavorite: true,
					rating: 5,
				},
				{
					id: "8",
					name: "Tire Shop",
					description: "Specialized shop for tire sales and services",
					owner: "Michelle Clark",
					phoneNumber: "901-234-5678",
					isFavorite: false,
					rating: 5,
				},
			],
		},
	];

export const categories = [
	{ name: "Retail & Services", subCategories: RetailsAndServicesCategories },
	{ name: "Food & Drink", subCategories: foodCategories },
] as const;
