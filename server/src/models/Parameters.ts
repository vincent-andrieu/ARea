
export enum ParameterType {
    TEXT = "TEXT",
    DATETIME = "DATETIME",
    TIME = "TIME",
    URL = "URL",
    NUMBER = "NUMBER"
}

export interface Parameter {
    name: string, // field name in input object
    label: string, // label to display
    type: ParameterType
}