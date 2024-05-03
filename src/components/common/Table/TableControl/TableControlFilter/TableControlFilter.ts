export type FilterOperatorTypes = "equal" | "include" | "notEqual";

export type filterOperatorItem = { label: string, value: FilterOperatorTypes };

export type FilterItemColumn = {
    label: string;
    value: string;
    filterOperators: filterOperatorItem[];
}

export type FilterItem = {
    id: string;
    col: string;
    op: string;
    val: string;
}