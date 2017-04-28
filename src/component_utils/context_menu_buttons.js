import React from 'react'
import createEventDispatcher from './create_dispatcher'
import styled from 'styled-components'

const StyledButtonCollection = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 10px;

    .btn-sm {
        font-size: .7rem;
        margin: 2px 2px;
    }
`

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

    const click_handler =createEventDispatcher('save', '', p)

    const handleClick = () => {
        click_handler()
    }

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
            <StyledButtonCollection>
                {editButton(p)}
                {newButton(p)}
                {duplicateButton(p)}
                {deleteButton(p)}
            </StyledButtonCollection>
        )
    } else if (mode === 'deleting') {
        return null
    }
    else {
        return (
            <StyledButtonCollection>
                {saveButton(p)}
                {cancelButton(p)}
            </StyledButtonCollection>
        )
    }
}

export default contextMenuButtons
