export const my_variables = {
	first_name: 'Sourabh',
	last_name: 'Singhal',
	full_name: 'Sourabh Singhal',
	email: 'saurabhsinghal3536@gmail.com',
	address: '#123 B Block, Yamuna Aparts, Panipat, Haryana, India',
	role: 'Front-End Intern',
	company: 'Cudy Technologies'
};
export const general_variables = [
	{
		name: 'Your First Name',
		val: 'Sourabh'
	},
	{
		name: 'Your Last Name',
		val: 'Singhal'
	},
	{
		name: 'Your Full Name',
		val: 'Sourabh Singhal'
	},
	{
		name: 'Your Address',
		val: '#123 B Block, Yamuna Aparts, Panipat, Haryana, India'
	},
	{
		name: 'Your Email',
		val: 'saurabhsinghal3536@gmail.com'
	},
	{
		name: 'Your Role',
		val: 'Front-End Intern'
	},
	{
		name: 'Your Company',
		val: 'Cudy Technologies'
	}
];
export const dynamic_variables = ['Date', 'Time', 'Local TimeZone', 'Day'];
export const replies = {
	General: [
		{
			title: 'Name Example',
			paragraphs: [
				{
					type: 'paragraph',
					children: [
						{
							text: ''
						},
						{
							type: 'link',
							sub: 'daytime',
							options: { morning: 'morning', evening: 'evening', afternoon: 'afternoon', night: 'night' },
							children: [{ text: 'DayTime Conditional' }]
						},
						{
							text: ' is very nice '
						},
						{
							type: 'link',
							sub: 'gender',
							options: { male: 'his', female: 'her', neutral: 'its' },
							children: [{ text: 'Gender Conditional' }]
						},
						{
							text: ' reading skills are good '
						}
					]
				}
			],
			reply: 'Hello my name is .',
			folder: 'General',
			favourite: true
		},
		{
			title: 'Address Example',
			paragraphs: [
				{
					type: 'paragraph',
					children: [
						{
							text: 'Hello I live in '
						},
						{
							type: 'link',
							sub: 'general',
							children: [{ text: 'Your Address' }]
						},
						{
							text: ''
						}
					]
				}
			],
			reply: 'Hello I live in .',
			folder: 'General',
			favourite: true
		}
	],
	Common: [
		{
			title: 'An Example',
			paragraphs: [
				{
					type: 'paragraph',
					children: [
						{
							text: 'This example shows hyperlinks in action. It features two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected.'
						}
					]
				},
				{
					type: 'paragraph',
					children: [
						{
							text: 'In addition to block nodes, you can create inline nodes, like '
						},
						{
							type: 'link',
							sub: 'general',
							children: [{ text: 'Your Company' }]
						},
						{
							text: '!'
						}
					]
				},
				{
					type: 'paragraph',
					children: [
						{
							text: 'This example shows hyperlinks in action. It features two ways to add links. You can either add a link via the toolbar icon above, or if you want in on a little secret, copy a URL to your keyboard and paste it while a range of text is selected.'
						}
					]
				}
			],
			reply: 'Hello and welcome. Here you can make replies that may help you.',
			folder: 'Common',
			favourite: true
		}
	],
	New: []
};
