var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CachedTask } from "./cached_task";
export class CachingTaskProvider {
    constructor(underlyingTaskProvider) {
        this.underlyingTaskProvider = underlyingTaskProvider;
    }
    createNewTask() {
        return __awaiter(this, void 0, void 0, function* () {
            const newTask = yield this.underlyingTaskProvider.createNewTask();
            const cachedTask = new CachedTask(newTask);
            yield cachedTask.cacheInfo();
            return cachedTask;
        });
    }
    restoreTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const restoredTasks = yield this.underlyingTaskProvider.restoreTasks();
            const cachedTasks = new Array;
            for (let task of restoredTasks) {
                const cachedTask = new CachedTask(task);
                yield cachedTask.cacheInfo();
                cachedTasks.push(cachedTask);
            }
            return cachedTasks;
        });
    }
    deleteTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const underlyingTask = task.getUnderlyingTask();
            yield this.underlyingTaskProvider.deleteTask(underlyingTask);
        });
    }
}
//# sourceMappingURL=caching_task_provider.js.map