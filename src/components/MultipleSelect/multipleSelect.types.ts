export interface MultiplePropTypes {
    chose: (e: React.ChangeEvent<HTMLInputElement>) => void;
    values: string[];
    deleteFunc: (item:string) => void;
    data: string[];
}