import { GET_VOCABULARIES_LIST } from '../../../constants/backend-constants/get-vocabularies';
import { GetVocabularyListStateTypes, GetVocabularyListActionTypes } from './get-vocabulary-list.types';

const initialState: GetVocabularyListStateTypes = {
    vocabularies: [],
    names: []
}

export const vocabularyListReducer = (state = initialState, action: GetVocabularyListActionTypes) => {
    switch (action.type) {
        case GET_VOCABULARIES_LIST:
            let names: string[] = []
            action.payload.map((vocabulary) => names.push(vocabulary.displayName))
            return {
                ...state,
                vocabularies: action.payload,
                names: names
            }
        default:
            return { ...state }
    }
}   