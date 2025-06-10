function removeNullParams(paramsObject) {
    const newObj = {};

    for (const [key, value] of Object.entries(paramsObject)) {
        if (value !== null && value !== undefined) {
            newObj[key] = value;
        }
    }

    return newObj;
}

export default removeNullParams;