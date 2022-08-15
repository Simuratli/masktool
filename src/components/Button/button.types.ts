export interface ButtonPropTypes {
    text?: string;
    disabled?: boolean;
    onClick?: () => void;
    type?:string;
    size?:string;
    addLoading?:boolean;
}