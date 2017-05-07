import Immutable from 'immutable'

    // 'name' => $faker->word,
    // 'code' => $faker->word,
    // 'rate' => $faker->randomNumber(5)/100,
    // 'primary_book_id' => $primary_book,
    // 'ad_type_id' => $ad_type

const initial_state = Immutable.fromJS({
    list: [
        { id: 1, name: 'Udac name 1', code: 'Udac1', primary_book: 1, ad_type: 1, rate: 900 },
        { id: 2, name: 'Udac name 2', code: 'Udac2', primary_book: 2, ad_type: 2, rate: 901 },
        { id: 3, name: 'Udac name 3', code: 'Udac3', primary_book: 1, ad_type: 1, rate: 902 },
        { id: 4, name: 'Udac name 4', code: 'Udac4', primary_book: 2, ad_type: 2, rate: 903 },
        { id: 5, name: 'Udac name 5', code: 'Udac5', primary_book: 1, ad_type: 1, rate: 904 },
        { id: 6, name: 'Udac name 6', code: 'Udac6', primary_book: 3, ad_type: 3, rate: 905 },
    ],
    page_title: 'Udacs',
    action_word: 'Udac',
    selected_id: -1,
    current_sort: {
        field_name: 'code',
        direction: 'ASC'
    },
    current_filters: {},
    mode: 'display',
    fields: [
        { field_name: 'name', label: 'Name', input_type: 'text', ref_table: undefined },
        { field_name: 'code', label: 'Code', input_type: 'text', ref_table: undefined },
        { field_name: 'rate', label: 'Rate', input_type: 'text', ref_table: undefined },
        { field_name: 'primary_book', label: 'Primary Book', input_type: 'select', ref_table: 'primary_book' },
        { field_name: 'ad_type', label: 'Ad Type', input_type: 'select', ref_table: 'ad_type' }
    ],
    list_template: [
        { field_name: 'code', width: '10%' },
        { field_name: 'name', width: '30%' },
        { field_name: 'primary_book', width: '20%' },
        { field_name: 'ad_type', width: '20%' },
        { field_name: 'rate', width: '20%' }
    ],
    details_template: {
        current_tab: '',
        tabs: [
            {
                name: '',
                rows: [
                    ['code', 'name'],
                    ['primary_book'],
                    ['ad_type'],
                    ['rate']
                ]
            }
        ]
    },
    context_menu: [],
    radio_groups: [],
    ref_list: [],
    typeahead: ''    
})

export default initial_state