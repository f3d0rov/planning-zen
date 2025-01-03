export class BasicTask {
    constructor(name, section = "unset", index = 0) {
        this.name = "";
        this.section = "unset";
        this.index = 0;
        this.name = name;
        this.section = section;
        this.index = index;
    }
    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getSection() {
        return this.section;
    }
    setSection(section) {
        this.section = section;
    }
    getOrderIndex() {
        return this.index;
    }
    setOrderIndex(index) {
        this.index = index;
    }
}
//# sourceMappingURL=basic_task.js.map