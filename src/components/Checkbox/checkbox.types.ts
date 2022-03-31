export interface CheckboxPropTypes {
    text?: String,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    checked?: boolean,
    value?:string
}