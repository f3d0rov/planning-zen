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
        console.log(`Task name set to "${name}"`);
    }
    getSection() {
        return this.section;
    }
    setSection(section) {
        this.section = section;
        console.log(`Task section set to "${section}"`);
    }
    getOrderIndex() {
        return this.index;
    }
    setOrderIndex(index) {
        this.index = index;
        console.log(`Task index set to "${index}"`);
    }
}
//# sourceMappingURL=basic_task.js.map