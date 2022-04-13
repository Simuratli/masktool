export interface StepReducerTypes {
    type: String;
    payload: String;
}

export interface StepStateTypes {
    step: 'notifications' | 'tutorial' | 'rules' | 'tutorial' | 'progress' | 'results';
}