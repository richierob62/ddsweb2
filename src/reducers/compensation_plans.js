import Immutable from 'immutable'

const initial_state = Immutable.fromJS({
  list: [],
  first_index: 0,
  list_dirty: true,
  page_title: "Compensation Plans",
  action_word: "CompensationPlan",
  reducer_name: "compensation_plans",
  selected_id: -1,
  current_sort: {
    field_name: "name",
    direction: "ASC"
  },
  current_filters: {},
  mode: "display",
  fields: {
    name: { label: "Name", input_type: "text", ref_table: undefined },
    code: { label: "Code", input_type: "text", ref_table: undefined },
  },
  list_template: [
    { field_name: "code", width: "7%" },
    { field_name: "name", width: "20%" },
  ],
  details_template: {
    current_tab: "",
    tabs: [
      {
        name: "",
        rows: [
          ["code"],
          ["name"],
        ]
      },
    ]
  },
  context_menu: [
  ],
  ref_list: [],
  ref_list_dirty: true,
  typeahead: ""
});

export default initial_state