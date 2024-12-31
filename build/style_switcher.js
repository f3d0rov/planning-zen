import { getElementById } from "./common";
class StyleModeState {
    constructor(buttonSymbolId, styleClassName) {
        this.buttonSymbol = getElementById(buttonSymbolId);
        this.styleClassName = styleClassName;
    }
    hideButtonSymbol() {
        this.buttonSymbol.classList.add(StyleModeState.hiddenSymbolClass);
    }
    showButtonSymbol() {
        this.buttonSymbol.classList.remove(StyleModeState.hiddenSymbolClass);
    }
    applyClassToBody() {
        document.body.classList.add(this.styleClassName);
        console.log(`Style class set to ${this.styleClassName}`);
    }
    removeClassFromBody() {
        document.body.classList.remove(this.styleClassName);
    }
}
StyleModeState.hiddenSymbolClass = "nodisplay";
export class StyleSwitcher {
    constructor() {
        this.styles = new Array;
        this.currentStyleIndex = 0;
        this.lastSwitchToken = 0;
        this.switchStyleButton = this.setupStyleButton();
        this.setDefaultStyles();
        this.setStyle(0);
    }
    setupStyleButton() {
        const button = getElementById(StyleSwitcher.switchStyleButtonId);
        button.addEventListener('click', ev => this.setNextStyle());
        return button;
    }
    setDefaultStyles() {
        this.styles.push(new StyleModeState('dark_mode_button', 'dark_mode'));
        this.styles.push(new StyleModeState('light_mode_button', 'light_mode'));
    }
    setNextStyle() {
        this.setBodySwitchingStyleClass();
        this.removeStyle(this.currentStyleIndex);
        this.currentStyleIndex = this.getNextStyleIndex();
        this.setStyle(this.currentStyleIndex);
    }
    getNextStyleIndex() {
        return (this.currentStyleIndex + 1) % this.styles.length;
    }
    removeStyle(index) {
        const style = this.styles.at(index);
        style.removeClassFromBody();
    }
    setStyle(index) {
        const style = this.styles.at(index);
        style.applyClassToBody();
        style.hideButtonSymbol();
        const nextStyle = this.styles.at(this.getNextStyleIndex());
        nextStyle.showButtonSymbol();
    }
    setBodySwitchingStyleClass() {
        document.body.classList.add(StyleSwitcher.bodySwitchingStyle);
        const token = Math.random();
        this.lastSwitchToken = token;
        setTimeout(() => this.resetBodySwitchingStyleClass(token), 1000 * StyleSwitcher.bodySwitchingStyleTimeSec);
    }
    resetBodySwitchingStyleClass(token) {
        if (this.lastSwitchToken === token) {
            document.body.classList.remove(StyleSwitcher.bodySwitchingStyle);
        }
    }
}
StyleSwitcher.switchStyleButtonId = "switch_style_button";
StyleSwitcher.bodySwitchingStyle = "switching_style";
StyleSwitcher.bodySwitchingStyleTimeSec = 1;
//# sourceMappingURL=style_switcher.js.map