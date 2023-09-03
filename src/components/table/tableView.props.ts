export interface ITableProps<T extends object> {
    values: readonly T[];
    getId: (value: T) => string;
}
