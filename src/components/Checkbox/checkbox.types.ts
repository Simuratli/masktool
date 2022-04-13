export interface CheckboxPropTypes {
    text?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
    value?:string;
}