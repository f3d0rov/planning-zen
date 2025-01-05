var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class CachedTask {
    constructor(underlyingTask) {
        this.underlyingTask = underlyingTask;
    }
    cacheInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cachedName = yield this.underlyingTask.getName();
            this.cachedCategory = yield this.underlyingTask.getSection();
            this.cachedIndex = yield this.underlyingTask.getOrderIndex();
        });
    }
    getName() {
        return this.cachedName;
    }
    getSection() {
        return this.cachedCategory;
    }
    getOrderIndex() {
        return this.cachedIndex;
    }
    setName(name) {
        this.underlyingTask.setName(name);
        this.cachedName = name;
    }
    setSection(cat) {
        this.underlyingTask.setSection(cat);
        this.cachedCategory = cat;
    }
    setOrderIndex(index) {
        this.underlyingTask.setOrderIndex(index);
        this.cachedIndex = index;
    }
    getUnderlyingTask() {
        return this.underlyingTask;
    }
}
//# sourceMappingURL=cached_task.js.map