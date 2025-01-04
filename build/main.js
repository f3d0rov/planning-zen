var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EisenhowerMatrixTaskEditor } from "./eisenhower/eisenhower_matrix_task_editor";
import { GithubPageOpener } from "./misc/github_page_opener";
import { StyleSwitcher } from "./misc/style_switcher";
import { IndexedDBTaskProvider } from "./indexed_db_tasks/indexed_db_task_provider";
function main() {
    logWelcomeMessage();
    initMiscTools();
    initTasks();
}
function logWelcomeMessage() {
    console.log("%cPlanning Zen%c 1.0", "color:#8aee8a; font-size:32px;", "color: red;");
    console.log("Check out the source code, report issues and offer improvements at %chttps://github.com/f3d0rov/planner%c", "color:green;");
}
function initMiscTools() {
    const styleSwitcher = new StyleSwitcher;
    const githubPageOpener = new GithubPageOpener();
}
function initTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const taskProvider = new IndexedDBTaskProvider;
        yield taskProvider.openDB();
        const app = new EisenhowerMatrixTaskEditor(taskProvider);
        app.restoreTasks();
    });
}
window.addEventListener('load', main);
//# sourceMappingURL=main.js.map