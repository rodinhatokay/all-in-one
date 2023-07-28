import { Business } from '../services/business/business.types';

const businesses: Business[] = [
	{
		id: '1',
		name: "John's Bakery",
		logoPath:
			'https://img.freepik.com/free-vector/bakery-shop-logo-emblem-template_17005-1482.jpg?w=826&t=st=1690564522~exp=1690565122~hmac=9ffa4e3bd2d748702c65faf8736e644c0e56ca3fc2e71f606ec0f61517dfe48a',
		description: 'The best homemade bread and pastries in town.',
		address: '123 Baker Street, Townville, 12345',
		hasWhatsapp: true,
		phoneNumber: '+1234567890',
		location: {
			latitude: 35.6895,
			longitude: 139.6917,
		},
		owner: 'John Doe',
		openingHours: [
			{
				id: 1,
				day: 'Monday',
				hours: [{ start: '08:00', end: '17:00' }],
			},
			{
				id: 2,
				day: 'Tuesday',
				hours: [{ start: '08:00', end: '17:00' }],
			},
			{
				id: 3,
				day: 'Wednesday',
				hours: [{ start: '08:00', end: '17:00' }],
			},
			{
				id: 4,
				day: 'Thursday',
				hours: [{ start: '08:00', end: '17:00' }],
			},
			{
				id: 5,
				day: 'Friday',
				hours: [{ start: '08:00', end: '22:00' }],
			},
			{
				id: 6,
				day: 'Saturday',
				hours: [{ start: '08:00', end: '17:00' }],
			},
			{
				id: 7,
				day: 'Sunday',
				hours: [{ start: '08:00', end: '17:00' }],
			},
		],
	},
	{
		id: '2',
		name: 'Tech Repair Center',
		logoPath:
			'https://img.freepik.com/free-vector/tech-computer-logo-template_23-2149204147.jpg?w=826&t=st=1690564487~exp=1690565087~hmac=d12a849c88b94b3298fd4693e7998a9a230ba4ab556ddb2bacac2190ef629314',
		description: 'Quick and reliable repairs for all your tech gadgets.',
		address: '456 Tech Drive, Electron City, 54321',
		hasWhatsapp: false,
		phoneNumber: '+0987654321',
		location: {
			latitude: 40.7128,
			longitude: 74.006,
		},
		owner: 'Jane Smith',
		openingHours: [
			{
				id: 1,
				day: 'Monday',
				hours: [{ start: '09:00', end: '18:00' }],
			},
			{
				id: 2,
				day: 'Tuesday',
				hours: [{ start: '09:00', end: '18:00' }],
			},
			{
				id: 3,
				day: 'Wednesday',
				hours: [{ start: '09:00', end: '18:00' }],
			},
			{
				id: 4,
				day: 'Thursday',
				hours: [{ start: '09:00', end: '18:00' }],
			},
			{
				id: 5,
				day: 'Friday',
				hours: [{ start: '09:00', end: '18:00' }],
			},
			{
				id: 6,
				day: 'Saturday',
				hours: [{ start: '09:00', end: '18:00' }],
			},
			{
				id: 7,
				day: 'Sunday',
				hours: [{ start: '09:00', end: '18:00' }],
			},
		],
	},
	{
		id: '3',
		name: 'Green Thumb Nursery',
		logoPath:
			'https://cdn-icons-png.flaticon.com/512/25/25166.png?w=826&t=st=1690564596~exp=1690565196~hmac=080d6defd009351039ac84af3b797af921b6ed82713941154623f5d1233215b9',
		description: 'Healthy and vibrant plants for your home and garden.',
		address: '789 Plant Lane, Green City, 78901',
		hasWhatsapp: true,
		phoneNumber: '+1122334455',
		location: {
			latitude: 34.0522,
			longitude: 118.2437,
		},
		owner: 'Mary Johnson',
		openingHours: [
			{
				id: 1,
				day: 'Monday',
				hours: [{ start: '10:00', end: '19:00' }],
			},
			{
				id: 2,
				day: 'Tuesday',
				hours: [{ start: '10:00', end: '19:00' }],
			},
			{
				id: 3,
				day: 'Wednesday',
				hours: [{ start: '10:00', end: '19:00' }],
			},
			{
				id: 4,
				day: 'Thursday',
				hours: [{ start: '10:00', end: '19:00' }],
			},
			{
				id: 5,
				day: 'Friday',
				hours: [{ start: '10:00', end: '19:00' }],
			},
			{
				id: 6,
				day: 'Saturday',
				hours: [{ start: '10:00', end: '19:00' }],
			},
			{
				id: 7,
				day: 'Sunday',
				hours: [{ start: '10:00', end: '19:00' }],
			},
		],
	},
];

export default businesses;
