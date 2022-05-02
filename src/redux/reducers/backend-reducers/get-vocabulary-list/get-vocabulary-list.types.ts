export interface GetVocabularyListStateTypes {
    vocabularies: GetVocabularyListTypes[];
    names: string[]
}

export interface GetVocabularyListActionTypes {
    type: string;
    payload: GetVocabularyListTypes[]
}


export interface GetVocabularyListTypes {
    displayName: string;
    logicalName: string;
}