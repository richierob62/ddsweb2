import proper_camel from './../utils/proper_camel'

export const action_templates = [
    'select_*',
    'change_*_Sort',
    'change_*_Filter',
    'select_*_Tab',
    'change_*_Data',
    'begin_*_Edit',
    'begin_*_Create',
    'begin_*_Duplicate',
    'begin_*_Delete',
    'cancel_*',
    'save_*_Completed',
    'delete_*_Completed',
    'load_*_List_Completed',
    'load_*_Reference_Completed',
]

const factory = (table) => {
    const proper = proper_camel(table)
    const output = {}
    action_templates.forEach( template => {
        const finalProperName = template.replace('*', proper).split('_').join('')
        const finalUCName = template.replace('*', table).toUpperCase()
        output[finalProperName] = (payload) => ({ type: finalUCName, payload })
    })
    return output
}

export default factory

