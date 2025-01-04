var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class TaskZoneNewTaskHandler {
    constructor(baseData) {
        this.data = baseData;
        this.setupEvents();
    }
    setupEvents() {
        this.data.getElement().addContentsEvent('dblclick', ev => this.spawnNewTask(ev));
    }
    setInitializeTaskCallback(callbackfn) {
        this.initNewTask = callbackfn;
    }
    setFinalizeTaskCallback(callbackfn) {
        this.finalizeNewTask = callbackfn;
    }
    spawnNewTask(event) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.initNewTask();
            task.setName("Double-click to edit!");
            task.setOrderIndex(this.getNextLastIndex());
            task.setSection(this.data.getCategory());
            this.finalizeNewTask(task);
        });
    }
    getNextLastIndex() {
        const lastTaskElement = this.data.getTasks().back();
        if (lastTaskElement === undefined)
            return 1;
        else
            return lastTaskElement.getTask().getOrderIndex() + 1;
    }
}
//# sourceMappingURL=task_zone_new_task_handler.js.map