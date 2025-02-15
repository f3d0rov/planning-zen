
export function getElementById (id: string): HTMLElement {
	const element = document.getElementById (id);
	if (element === null || element === undefined) {
		throw new MediaError;
	}
	return element;
}


class TemplateCloner {
	static templateClass = "template";

	private cachedTemplates: Map <string, HTMLElement> = new Map <string, HTMLElement>;
	
	public cloneTemplateById (templateId: string): HTMLElement {
		const template = this.getTemplate (templateId);
		return this.cloneTemplate (template);
	}

	private getTemplate (templateId: string): HTMLElement {
		if (this.cachedTemplates.has (templateId)) {
			return this.getTemplateFromCache (templateId);
		} else {
			return this.getAndCacheTemplateFromDocument (templateId);
		}
	}

	private getTemplateFromCache (templateId: string): HTMLElement {
		return this.cachedTemplates.get (templateId) as HTMLElement;
	}

	private getAndCacheTemplateFromDocument (templateId: string): HTMLElement {
		const template: HTMLElement = getElementById (templateId);
		this.cachedTemplates.set (templateId, template);
		return template;
	}

	private cloneTemplate (template: HTMLElement): HTMLElement {
		const clone = template.cloneNode (true) as HTMLElement;
		clone.id = "";
		clone.classList.remove (TemplateCloner.templateClass);
		return clone;
	}
}

var templateCloner = new TemplateCloner;

export function cloneTemplateById (id: string): HTMLElement {
	return templateCloner.cloneTemplateById (id);
}


export function getURLForObject (path: string) {
	return getNormalizedURL() + path;
}

function getNormalizedURL (): string {
	let base = `${document.URL}`;
	if (base.endsWith ('/') === false) {
		return base + '/';
	} else {
		return base;
	}
}
