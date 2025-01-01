// with help from https://stackoverflow.com/a/21015393/8665933

var testingCanvas: HTMLCanvasElement = document.createElement ('canvas');

export function getTextWidth (text: string, styledElement: HTMLElement) {
	let ctx = testingCanvas.getContext ('2d') as CanvasRenderingContext2D;
	ctx.font = getFont (styledElement);
	return ctx.measureText (text).width;
}

function getFont (elem: HTMLElement) {
	let css = window.getComputedStyle (elem);
	let weight = css.getPropertyValue ('font-weight');
	let size = css.getPropertyValue ('font-size');
	let family = css.getPropertyValue ('font-family');
	let font = `${weight} ${size} ${family}`;
	return font;
}
