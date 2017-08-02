import proper_camel from "./../utils/proper_camel";

export const action_templates = [
  "begin_*_Create",
  "begin_*_Delete",
  "begin_*_Duplicate",
  "begin_*_Edit",
  "cancel_*",
  "change_*_Data",
  "change_*_Filter",
  "change_*_Sort",
  "delete_*_Failed",
  "delete_*_Completed",
  "do_*_Delete",
  "do_*_Create",
  "do_*_Edit",
  "load_*_List_Completed",
  "load_*_Reference_Completed",
  "next_*_Sublist",
  "previous_*_Sublist",
  "save_*_Completed",
  "save_*_Failed",
  "select_*",
  "select_*_Tab",
];

const factory = table => {
  const proper = proper_camel(table);
  const output = {};
  action_templates.forEach(template => {
    const finalProperName = template.replace("*", proper).split("_").join("");
    const finalUCName = template.replace("*", table).toUpperCase();
    output[finalProperName] = payload => ({ type: finalUCName, payload });
  });
  return output;
};

export default factory;
