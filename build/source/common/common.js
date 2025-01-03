export function getElementById(id) {
    const element = document.getElementById(id);
    if (element === null || element === undefined) {
        throw new MediaError;
    }
    return element;
}
class TemplateCloner {
    constructor() {
        this.cachedTemplates = new Map;
    }
    cloneTemplateById(templateId) {
        const template = this.getTemplate(templateId);
        return this.cloneTemplate(template);
    }
    getTemplate(templateId) {
        if (this.cachedTemplates.has(templateId)) {
            return this.getTemplateFromCache(templateId);
        }
        else {
            return this.getAndCacheTemplateFromDocument(templateId);
        }
    }
    getTemplateFromCache(templateId) {
        return this.cachedTemplates.get(templateId);
    }
    getAndCacheTemplateFromDocument(templateId) {
        const template = getElementById(templateId);
        this.cachedTemplates.set(templateId, template);
        return template;
    }
    cloneTemplate(template) {
        const clone = template.cloneNode(true);
        clone.id = "";
        clone.classList.remove(TemplateCloner.templateClass);
        return clone;
    }
}
TemplateCloner.templateClass = "template";
var templateCloner = new TemplateCloner;
export function cloneTemplateById(id) {
    return templateCloner.cloneTemplateById(id);
}
//# sourceMappingURL=common.js.map