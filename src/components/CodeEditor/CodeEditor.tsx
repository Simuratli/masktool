import React from 'react';
import { setCodeEditorValue } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import { ReducerType } from '../../redux/reducers/reducer.types'

function CodeEditor() {
    const dispatch = useDispatch()
    const codeEditorState = useSelector((state: ReducerType) => state.codeEditorReducer.data)

    const writeCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setCodeEditorValue(e.target.value))
    }
    return (
        <textarea onChange={writeCode} value={codeEditorState} className='editor' />
    )
}

export default React.memo(CodeEditor)