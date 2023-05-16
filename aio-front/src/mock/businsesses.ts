import { Business } from "../services/business/business.types";

const foodCategories: { name: string; businesses: Business[] }[] = [
	{
		name: "Restaurants",
		businesses: [
			{
				name: "Tasty Bites",
				description: "A cozy restaurant serving delicious meals",
				owner: "John Smith",
				phoneNumber: "123-456-7890",
				isFavorite: true,
			},
			{
				name: "Pizza Paradise",
				description: "Authentic Italian pizzas made with love",
				owner: "Jane Doe",
				phoneNumber: "987-654-3210",
				isFavorite: false,
			},
		],
	},
	{
		name: "Food Trucks",
		businesses: [
			{
				name: "Burger On Wheels",
				description: "Gourmet burgers served from a food truck",
				owner: "Mike Johnson",
				phoneNumber: "456-789-0123",
				isFavorite: true,
			},
			{
				name: "Taco Express",
				description: "Tasty tacos on the go",
				owner: "Sarah Thompson",
				phoneNumber: "789-012-3456",
				isFavorite: true,
			},
		],
	},
];

const RetailsAndServicesCategories: { name: string; businesses: Business[] }[] =
	[
		{
			name: "Retails Stores",
			businesses: [],
		},
		{
			name: "Health & Beauty",
			businesses: [],
		},
		{
			name: "Home Services",
			businesses: [],
		},
		{
			name: "Automotives",
			businesses: [],
		},
	];

export const categories = [
	{ name: "Food & Drink", subCategories: foodCategories },
	{ name: "Retail & Services", subCategoris: RetailsAndServicesCategories },
] as const;
