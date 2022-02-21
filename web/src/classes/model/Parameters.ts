export enum ParameterType {
    TEXT = "TEXT",
    DATETIME = "DATETIME",
    TIME = "TIME",
    URL = "URL",
    NUMBER = "NUMBER"
}

export interface Parameter {
    label: string;
    name: string;
    type: ParameterType;
}