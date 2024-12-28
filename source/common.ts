
export function getElementById (id: string): HTMLElement {
	const element = document.getElementById (id);
	if (element === null || element === undefined) {
		throw new MediaError;
	}
	return element;
}