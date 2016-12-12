import Immutable from 'immutable';

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'L\'Oréal', address: '10 Leeton Ridge Ave. ', city: 'Wisconsin Rapids', state: 'WI', zip: '54494', area: '494', phone: '487-8119', account_num: '4041234', sales_rep: 3 },
        { id: 2, name: 'Adobe Systems', address: '121 NW. Indian Spring Street ', city: 'Lebanon', state: 'PA', zip: '17042', area: '664', phone: '810-1662', account_num: '4130144', sales_rep: 7 },
        { id: 3, name: 'Allianz', address: '164 Depot Ave. ', city: 'North Ridgeville', state: 'OH', zip: '44039', area: '440', phone: '215-4916', account_num: '9842555', sales_rep: 9 },
        { id: 4, name: 'Amazon.com', address: '2 Kirkland St. ', city: 'Matawan', state: 'NJ', zip: '7747', area: '601', phone: '777-4414', account_num: '1028587', sales_rep: 4 },
        { id: 5, name: 'American Express', address: '204 East Ryan St. ', city: 'Braintree', state: 'MA', zip: '2184', area: '517', phone: '185-6539', account_num: '8652533', sales_rep: 10 },
        { id: 6, name: 'AT&T', address: '251 Shub Farm Drive ', city: 'Huntington Station', state: 'NY', zip: '11746', area: '419', phone: '616-9065', account_num: '4816950', sales_rep: 9 },
        { id: 7, name: 'Bank of America', address: '28 River St. ', city: 'Arlington Heights', state: 'IL', zip: '60004', area: '144', phone: '878-8165', account_num: '5828729', sales_rep: 8 },
        { id: 8, name: 'Budweiser Stag Brewing Company', address: '29 Grant St. ', city: 'Hicksville', state: 'NY', zip: '11801', area: '601', phone: '750-8542', account_num: '4467658', sales_rep: 3 },
        { id: 9, name: 'Caterpillar Inc.', address: '3 Country Court ', city: 'Bismarck', state: 'ND', zip: '58501', area: '340', phone: '671-3497', account_num: '1981765', sales_rep: 8 },
        { id: 10, name: 'Chase', address: '30 Brook Ave. ', city: 'Waterford', state: 'MI', zip: '48329', area: '587', phone: '596-6468', account_num: '6702723', sales_rep: 8 },
        { id: 11, name: 'Cisco Systems, Inc.', address: '313 Paris Hill Road ', city: 'Skokie', state: 'IL', zip: '60076', area: '386', phone: '962-4376', account_num: '8145803', sales_rep: 5 },
        { id: 12, name: 'Citigroup', address: '353 Washington Ave. ', city: 'Trenton', state: 'NJ', zip: '8610', area: '452', phone: '543-4590', account_num: '9347709', sales_rep: 10 },
        { id: 13, name: 'Coca-Cola', address: '355 Andover Court ', city: 'Saint Paul', state: 'MN', zip: '55104', area: '175', phone: '150-0787', account_num: '8712262', sales_rep: 4 },
        { id: 14, name: 'Corona', address: '4 Buckingham Road ', city: 'Vicksburg', state: 'MS', zip: '39180', area: '157', phone: '380-6555', account_num: '5465816', sales_rep: 5 },
        { id: 15, name: 'Credit Suisse', address: '40 Glenridge Street ', city: 'North Tonawanda', state: 'NY', zip: '14120', area: '664', phone: '519-7267', account_num: '5252587', sales_rep: 7 },
        { id: 16, name: 'Deere & Company', address: '429 Fairfield St. ', city: 'Urbandale', state: 'IA', zip: '50322', area: '879', phone: '131-0370', account_num: '2504981', sales_rep: 9 },
        { id: 17, name: 'eBay', address: '43 Thorne Dr. ', city: 'Tampa', state: 'FL', zip: '33604', area: '244', phone: '569-9699', account_num: '2988422', sales_rep: 7 },
        { id: 18, name: 'Global Gillette', address: '45 Essex Drive ', city: 'Collegeville', state: 'PA', zip: '19426', area: '826', phone: '860-7829', account_num: '1288369', sales_rep: 9 },
        { id: 19, name: 'Harley-Davidson Motor Company', address: '471 Lake Forest St. ', city: 'Warwick', state: 'RI', zip: '2886', area: '577', phone: '835-2499', account_num: '5040201', sales_rep: 7 },
        { id: 20, name: 'Hermès', address: '51 Oakwood Lane ', city: 'Kansas City', state: 'MO', zip: '64151', area: '704', phone: '170-7774', account_num: '9216443', sales_rep: 6 },
        { id: 21, name: 'Hewlett-Packard', address: '520 Wayne Street ', city: 'Buford', state: 'GA', zip: '30518', area: '527', phone: '940-8976', account_num: '1427848', sales_rep: 1 },
        { id: 22, name: 'Home Depot', address: '544 Hillcrest Street ', city: 'Palos Verdes Peninsula', state: 'CA', zip: '90274', area: '811', phone: '718-4893', account_num: '5679667', sales_rep: 5 },
        { id: 23, name: 'IBM', address: '6 S. Ohio Street ', city: 'Trumbull', state: 'CT', zip: '6611', area: '377', phone: '749-5649', account_num: '2006699', sales_rep: 8 },
        { id: 24, name: 'Intel Corporation', address: '615 South Newbridge Drive ', city: 'West Bloomfield', state: 'MI', zip: '48322', area: '319', phone: '834-5315', account_num: '5835848', sales_rep: 10 },
        { id: 25, name: 'Jack Daniel\'s', address: '620 Golden Star St. ', city: 'Mundelein', state: 'IL', zip: '60060', area: '770', phone: '869-2784', account_num: '5677722', sales_rep: 3 },
        { id: 26, name: 'Johnnie Walker', address: '72 Cross St. ', city: 'Newburgh', state: 'NY', zip: '12550', area: '194', phone: '345-7191', account_num: '9823346', sales_rep: 10 },
        { id: 27, name: 'KFC', address: '7310 Orange Drive ', city: 'Oshkosh', state: 'WI', zip: '54901', area: '705', phone: '497-0049', account_num: '5679108', sales_rep: 1 },
        { id: 28, name: 'MasterCard', address: '7399 Bridgeton Ave. ', city: 'Danbury', state: 'CT', zip: '6810', area: '648', phone: '617-4166', account_num: '7992192', sales_rep: 1 },
        { id: 29, name: 'McDonald\'s', address: '74 Clinton Ave. ', city: 'Owensboro', state: 'KY', zip: '42301', area: '826', phone: '928-7002', account_num: '3380707', sales_rep: 8 },
        { id: 30, name: 'Mercedes-Benz', address: '74 Ramblewood Ave. ', city: 'Lanham', state: 'MD', zip: '20706', area: '270', phone: '934-0454', account_num: '5339897', sales_rep: 2 },
        { id: 31, name: 'Microsoft', address: '7480 Santa Clara St. ', city: 'North Kingstown', state: 'RI', zip: '2852', area: '261', phone: '199-2631', account_num: '5260880', sales_rep: 8 },
        { id: 32, name: 'Moët et Chandon', address: '7517 High Noon Street ', city: 'Danvers', state: 'MA', zip: '1923', area: '409', phone: '428-6706', account_num: '7358127', sales_rep: 5 },
        { id: 33, name: 'Nintendo', address: '759 Tarkiln Hill Street ', city: 'San Lorenzo', state: 'CA', zip: '94580', area: '425', phone: '895-0818', account_num: '5358787', sales_rep: 5 },
        { id: 34, name: 'Nissan Motor Co., Ltd.', address: '77 Saxon Drive ', city: 'Floral Park', state: 'NY', zip: '11001', area: '695', phone: '754-6120', account_num: '8372416', sales_rep: 1 },
        { id: 35, name: 'Nokia', address: '7748 Buckingham Street ', city: 'Fremont', state: 'OH', zip: '43420', area: '971', phone: '680-1133', account_num: '7893213', sales_rep: 3 },
        { id: 36, name: 'NTT Data', address: '787 Hawthorne St. ', city: 'Danville', state: 'VA', zip: '24540', area: '600', phone: '321-3720', account_num: '2145343', sales_rep: 10 },
        { id: 37, name: 'Pampers', address: '7898 Redwood Drive ', city: 'Columbia', state: 'MD', zip: '21044', area: '663', phone: '389-6517', account_num: '6607691', sales_rep: 1 },
        { id: 38, name: 'Porsche', address: '7940 Vale Avenue ', city: 'York', state: 'PA', zip: '17402', area: '788', phone: '130-8139', account_num: '3074615', sales_rep: 9 },
        { id: 39, name: 'Prada', address: '8 Fawn Avenue ', city: 'Londonderry', state: 'NH', zip: '3053', area: '471', phone: '265-6066', account_num: '2508625', sales_rep: 10 },
        { id: 40, name: 'Ralph Lauren Corporation', address: '80 Bayport Lane ', city: 'South El Monte', state: 'CA', zip: '91733', area: '149', phone: '261-2423', account_num: '7812640', sales_rep: 10 },
        { id: 41, name: 'Siemens AG', address: '8303 Buckingham Street ', city: 'Bozeman', state: 'MT', zip: '59715', area: '756', phone: '812-9276', account_num: '3239194', sales_rep: 3 },
        { id: 42, name: 'Smirnoff', address: '861 Jones Rd. ', city: 'New Brunswick', state: 'NJ', zip: '8901', area: '422', phone: '154-0927', account_num: '4347061', sales_rep: 1 },
        { id: 43, name: 'Sony', address: '8936 Joy Ridge Circle ', city: 'Glendale Heights', state: 'IL', zip: '60139', area: '301', phone: '702-9390', account_num: '5396336', sales_rep: 3 },
        { id: 44, name: 'Sprite', address: '9 N. Wayne Drive ', city: 'Sandusky', state: 'OH', zip: '44870', area: '417', phone: '582-9423', account_num: '1615106', sales_rep: 1 },
        { id: 45, name: 'Tiffany & Co.', address: '916 Mayflower St. ', city: 'Vienna', state: 'VA', zip: '22180', area: '972', phone: '489-1680', account_num: '6714269', sales_rep: 7 },
        { id: 46, name: 'United Parcel Service', address: '9377 Catherine Ave. ', city: 'Elizabethtown', state: 'PA', zip: '17022', area: '906', phone: '702-7893', account_num: '9299734', sales_rep: 3 },
        { id: 47, name: 'Verizon Communications', address: '9402 W. Ohio St. ', city: 'Colonial Heights', state: 'VA', zip: '23834', area: '800', phone: '356-1100', account_num: '8559141', sales_rep: 4 },
        { id: 48, name: 'Vodafone', address: '9429 Arnold Drive ', city: 'Highland Park', state: 'IL', zip: '60035', area: '758', phone: '747-0954', account_num: '2512935', sales_rep: 6 },
        { id: 49, name: 'Wal-Mart', address: '9519 Arnold St. ', city: 'Highland Park', state: 'IL', zip: '60035', area: '463', phone: '462-7023', account_num: '1500730', sales_rep: 3 },
        { id: 50, name: 'Yahoo!', address: '970 Pine St. ', city: 'Centreville', state: 'VA', zip: '20120', area: '139', phone: '865-2178', account_num: '9283560', sales_rep: 1 }
    ],
    selected_id: -1,
    sort_field: 'name',
    sort_direction: 'ASC',
    current_filters: {}
});

const customers = (state = initial_state, action) => {
    switch (action.type) {
        case 'SELECT_CUSTOMER': {
            return state.set('selected_id', action.payload);
        }
        case 'CHANGE_CUSTOMER_SORT': {
            const new_direction = action.payload === state.get('sort_field') ?
                (
                    state.get('sort_direction') === 'ASC' ?
                        'DESC' :
                        'ASC'
                ) :
                'ASC'
            return state.set('sort_field', action.payload).set('sort_direction', new_direction);
        }
        case 'CHANGE_CUSTOMER_FILTER': {
            return state.setIn(['current_filters', action.column], action.value);
        }
        default: return state;
    }
};

export default customers;