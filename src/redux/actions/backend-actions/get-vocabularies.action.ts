import { GET_VOCABULARIES_LIST } from '../../constants/backend-constants/get-vocabularies';
import { GetVocabularyListTypes } from '../../reducers/backend-reducers/get-vocabulary-list/get-vocabulary-list.types';

export const setAllVocabularies = (payload: GetVocabularyListTypes[]) => ({
    type: GET_VOCABULARIES_LIST,
    payload
})