// with help from https://stackoverflow.com/a/21015393/8665933
var testingCanvas = document.createElement('canvas');
export function getTextWidth(text, styledElement) {
    let ctx = testingCanvas.getContext('2d');
    ctx.font = getFont(styledElement);
    return ctx.measureText(text).width;
}
function getFont(elem) {
    let css = window.getComputedStyle(elem);
    let weight = css.getPropertyValue('font-weight');
    let size = css.getPropertyValue('font-size');
    let family = css.getPropertyValue('font-family');
    let font = `${weight} ${size} ${family}`;
    return font;
}
//# sourceMappingURL=text_width.js.map