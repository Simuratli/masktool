import React from 'react';
import { setCustomParameterCodeEditor, setCodeEditorValue } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ReducerType } from '../../redux/reducers/reducer.types';

interface CodeEditorPropTypes {
    border: string | null
}

function CodeEditor({ border }: CodeEditorPropTypes) {
    const dispatch = useDispatch();
    const customParametersState = useSelector((state: ReducerType) => state.customParametersReducer.template)

    const writeCode = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setCodeEditorValue(null))
        dispatch(setCustomParameterCodeEditor(e.target.value));
    }
    return (
        <textarea placeholder='Edit code' onChange={writeCode} value={customParametersState} className={`editor ${border}`} />
    )
}

export default React.memo(CodeEditor)