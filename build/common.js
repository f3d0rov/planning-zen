export function getElementById(id) {
    const element = document.getElementById(id);
    if (element === null || element === undefined) {
        throw new MediaError;
    }
    return element;
}
//# sourceMappingURL=common.js.map