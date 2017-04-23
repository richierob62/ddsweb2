import React from 'react'
import createEventDispatcher from './create_dispatcher'

const editButton = p => {
    const handleClick = () => createEventDispatcher('begin', 'Edit', p)()
    return <button type="button" onClick={handleClick} className="btn btn-sm btn-outline-primary">Edit</button>
}

const newButton = p => {
    const handleClick = () => createEventDispatcher('begin', 'Create', p)()
    return <button type="button" onClick={handleClick} className="btn btn-sm btn-outline-primary">New</button>
}

const duplicateButton = p => {
    const handleClick = () => createEventDispatcher('begin', 'Duplicate', p)()
    return <button type="button" onClick={handleClick} className="btn btn-sm btn-outline-primary">Duplicate</button>
}

const deleteButton = p => {
    const handleClick = () => createEventDispatcher('begin', 'Delete', p)()
    return <button type="button" onClick={handleClick} className="btn btn-sm btn-outline-primary">Delete</button>
}

const saveButton = p => {
    const handleClick = () => createEventDispatcher('save', '', p)()
    return <button type="button" onClick={handleClick} className="btn btn-sm btn-outline-success">Save</button>
}

const cancelButton = p => {
    const handleClick = () => createEventDispatcher('cancel', '', p)()
    return <button type="button" onClick={handleClick} className="btn btn-sm btn-outline-danger">Cancel</button>
}

const contextMenuButtons = p => {
    const mode = p.data.get('mode')
    if (mode === 'display') {
        return (
            <div className="btn-collection">
                {editButton(p)}
                {newButton(p)}
                {duplicateButton(p)}
                {deleteButton(p)}
            </div>
        )
    } else if (mode === 'deleting') {
        return null
    }
    else {
        return (
            <div className="btn-collection">
                {saveButton(p)}
                {cancelButton(p)}
            </div>
        )
    }
}

export default contextMenuButtons
