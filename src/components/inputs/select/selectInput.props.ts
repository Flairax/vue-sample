import type { IInputProps } from "../_core/input.props";

export interface ISelectInputProps<T> extends IInputProps<T> {
    options:string[];
}
