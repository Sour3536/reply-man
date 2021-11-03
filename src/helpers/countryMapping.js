export const countryMap = {
	id: {
		key: 'id',
		name: 'Indonesia',
		currency: 'Rp',
		language: 'id',
		icon: 'icon-indonesia',
		cutorsLink: 'https://t.me/cutors_indonesia',
		phoneCode: '+62',
		symbol: 'Rp',
		assignmentSuggestionRange: [50000, 350000],
		subjectMinTariff: 20000,
		pricePerHourRange: {
			range: [10000, 500000],
			step: 10000
		},
		thirdParties: [{ value: 'idlocanto', label: 'Locanto' }]
	},
	sg: {
		key: 'sg',
		name: 'Singapore',
		currency: 'SG$',
		language: 'en',
		icon: 'icon-singapore',
		cutorsLink: 'https://t.me/cutors',
		phoneCode: '+65',
		symbol: 'SG$',
		assignmentSuggestionRange: [10, 100],
		subjectMinTariff: 2,
		pricePerHourRange: {
			range: [0, 100],
			step: 5
		}
	},
	my: {
		key: 'my',
		name: 'Malaysia',
		currency: 'MY',
		language: 'en',
		icon: 'icon-malaysia',
		cutorsLink: 'https://chat.whatsapp.com/EldHFilEpgl8ChH5SaGn6q',
		phoneCode: '+60',
		symbol: 'RM',
		assignmentSuggestionRange: [30, 90],
		subjectMinTariff: 7,
		pricePerHourRange: {
			range: [30, 300],
			step: 5
		}
	},
	ph: {
		key: 'ph',
		name: 'Philippines',
		currency: '₱',
		language: 'en',
		icon: 'icon-philippines',
		cutorsLink: 'https://chat.whatsapp.com/Fsah1vspBf1IIGMMxbjIEm',
		phoneCode: '+63',
		symbol: '₱',
		assignmentSuggestionRange: [360, 1100],
		subjectMinTariff: 75,
		pricePerHourRange: {
			range: [0, 1000],
			step: 5
		}
	},
	in: {
		key: 'in',
		name: 'India',
		currency: '₹',
		language: 'en',
		icon: 'icon-india',
		cutorsLink: 'https://chat.whatsapp.com/CZmBUlkwRjo1JxF7ePyBXB',
		phoneCode: '+91',
		symbol: 'INR',
		assignmentSuggestionRange: [500, 1500],
		subjectMinTariff: 100,
		pricePerHourRange: {
			range: [500, 1500],
			step: 5
		}
	},
	lk: {
		key: 'lk',
		name: 'Sri Lanka',
		currency: 'Rs',
		language: 'en',
		icon: 'icon-sri-lanka',
		cutorsLink: 'https://chat.whatsapp.com/HjyrWMApBhm7p6ZsnLtZpN',
		phoneCode: '+94',
		symbol: 'Rs',
		assignmentSuggestionRange: [1300, 4000],
		subjectMinTariff: 260,
		pricePerHourRange: {
			range: [1300, 4000],
			step: 5
		}
	}
};

export const countries = [
	{ key: 'sg', name: 'Singapore', currency: 'SG$', language: 'en', icon: 'icon-singapore' },
	{ key: 'id', name: 'Indonesia', currency: 'Rp', language: 'id', icon: 'icon-indonesia' },
	{ key: 'my', name: 'Malaysia', currency: 'MY', language: 'en', icon: 'icon-malaysia' },
	// { key: "vn", name: "Vietnam", currency: "₫", language: "en", icon: "icon-vietnam" },
	{ key: 'ph', name: 'Philippines', currency: '₱', language: 'en', icon: 'icon-philippines' },
	{ key: 'lk', name: 'Sri Lanka', currency: 'Rs', language: 'en', icon: 'icon-sri-lanka' },
	{ key: 'in', name: 'India', currency: '₹', language: 'en', icon: 'icon-india' }
];
