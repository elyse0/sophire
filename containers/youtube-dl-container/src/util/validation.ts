const isString = (x: any): x is string => {
    return typeof x === "string"
}

export { isString }
