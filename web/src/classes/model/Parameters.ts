export enum ParameterType {
    TEXT = "TEXT",
    DATETIME = "DATETIME",
    TIME = "TIME",
    URL = "URL",
    NUMBER = "NUMBER"
}

export interface Parameter {
    name: string,
    type: ParameterType
}