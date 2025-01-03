import { getElementById } from "../common/common";
export class GithubPageOpener {
    constructor() {
        this.button = this.getButton();
    }
    getButton() {
        const element = getElementById(GithubPageOpener.buttonId);
        element.addEventListener('click', ev => this.onClick());
        return element;
    }
    onClick() {
        var _a;
        (_a = window.open(GithubPageOpener.sourceUrl, '_blank')) === null || _a === void 0 ? void 0 : _a.focus();
    }
}
GithubPageOpener.buttonId = "get_code_button";
GithubPageOpener.sourceUrl = "https://github.com/f3d0rov/planner";
//# sourceMappingURL=github_page_opener.js.map