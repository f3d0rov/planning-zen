
import { assert } from "chai";
import { ThemeManager } from "../../source/themes/theme_manager";
import { ThemeApplicator } from "../../source/themes/theme_applicator";
import { Theme } from "../../source/themes/theme";
import { ThemeSaver } from "../../source/themes/theme_saver";
import { ThemeList } from "../../source/themes/theme_list";
import { EmulatedButton } from "../../source/common/button";
import { ThemeIndicator } from "../../source/themes/theme_indicator";


class MockThemeApplicator implements ThemeApplicator {
	private currentTheme: Theme | undefined;

	public applyTheme (theme: Theme): void {
		this.currentTheme = theme;
	}

	public getCurrentTheme (): Theme | undefined {
		return this.currentTheme;
	}
}

class MockThemeSaver implements ThemeSaver {
	private storedStyle: string | undefined = undefined;

	constructor (storedStyle: string | undefined = undefined) {
		this.storedStyle = storedStyle;
	}

	public rememberStyle (style: string): void {
		this.storedStyle = style;
	}

	public restoreStyle (): string | undefined {
		return this.storedStyle;
	}

	public getStoredStyle (): string | undefined {
		return this.storedStyle;
	}
}

class MockTheme implements Theme {
	private className: string;
	private svgIcon: string;
	private loaded: boolean;

	constructor (className: string, svgIcon: string, loaded: boolean = false) {
		this.className = className;
		this.svgIcon = svgIcon;
		this.loaded = loaded;
	}

	public getClass (): string {
		return this.className;
	}

	public getIconSVG (): string {
		return this.svgIcon;
	}

	public async load (): Promise <void> {
		this.loaded = true;
	}

	public isLoaded (): boolean {
		return this.loaded;
	}
}


class MockThemeIndicator implements ThemeIndicator {
	private current: Theme | undefined;
	private next: Theme | undefined;

	public setCurrentTheme (theme: Theme): void {
		this.current = theme;
	}

	public setNextTheme (theme: Theme): void {
		this.next = theme;
	}

	public getCurrentTheme (): Theme | undefined {
		return this.current;
	}

	public getNextTheme (): Theme | undefined {
		return this.next;
	}
}


describe (
	"ThemeManager",

	() => {
		let applicator: MockThemeApplicator;
		let saver: MockThemeSaver;
		let themeList: ThemeList;

		function reset () {
			applicator = new MockThemeApplicator;
			saver = new MockThemeSaver;
			themeList = new ThemeList;
		}

		function pushSomeThemes (): Array <MockTheme> {
			const nextThemes = [
				new MockTheme ("asoihfoaighg", "asoigsh"),
				new MockTheme ("bauogusdhgih", "bioafga"),
				new MockTheme ("caisfjgioajg", "cdanflk"),
				new MockTheme ("dqportugihsl", "diojgbf")
			];
			nextThemes.forEach ((theme: MockTheme) => themeList.addTheme (theme));
			return nextThemes;
		}
		

		it ("Basic initialization", async function () {
			reset();

			const firstTheme = new MockTheme ("theme_1", '<path/>');
			themeList.addTheme (firstTheme); // Can't be empty

			// Construct the theme manager
			const mgr = new ThemeManager (applicator, themeList, saver);
			await mgr.initializeTheme(); // Fetching a theme is an async process

			// First theme is loaded and applied
			assert.isTrue (firstTheme.isLoaded());
			assert.equal (applicator.getCurrentTheme(), firstTheme);
		});
		
		it ("Only the first theme is loaded initially", async function () {
			reset();

			const firstTheme = new MockTheme ("theme_1", '<path/>');
			themeList.addTheme (firstTheme); // Can't be empty

			const nextThemes = pushSomeThemes();

			// Construct the theme manager
			const mgr = new ThemeManager (applicator, themeList, saver);
			await mgr.initializeTheme();

			// First theme is loaded and applied
			assert.isTrue (firstTheme.isLoaded());
			assert.equal (applicator.getCurrentTheme(), firstTheme);

			// Other themes are not loaded
			nextThemes.forEach ((theme: MockTheme) => assert.isFalse (theme.isLoaded()));
		});

		it (("Switching to the next theme"), async function () {
			reset();

			const firstTheme = new MockTheme ("theme_1", '<path/>');
			themeList.addTheme (firstTheme);

			const secondTheme = new MockTheme ("theme_2", "<scarysvg>");
			themeList.addTheme (secondTheme);

			// Construct the theme manager
			const mgr = new ThemeManager (applicator, themeList, saver);
			await mgr.initializeTheme();
			
			// Setup the 'switch theme' button
			const switchThemeButton = new EmulatedButton;
			mgr.setSwitchThemeButton (switchThemeButton);

			// Second theme is not loaded initially
			assert.isFalse (secondTheme.isLoaded());

			// Second theme is loaded and applied after the button is clicked
			await switchThemeButton.click();
			assert.isTrue (secondTheme.isLoaded());
			assert.equal (applicator.getCurrentTheme(), secondTheme);
		});

		it (("Initial theme is selected after the last one"), async function () {
			reset();
			const themes = pushSomeThemes();

			// Construct the theme manager
			const mgr = new ThemeManager (applicator, themeList, saver);
			await mgr.initializeTheme();
			
			// Setup the 'switch theme' button
			const switchThemeButton = new EmulatedButton;
			mgr.setSwitchThemeButton (switchThemeButton);

			// Click through all the themes
			for (let i = 0; i < themes.length; i++) {
				await switchThemeButton.click();
			}

			// All themes are loaded
			themes.forEach (theme => {
				assert.isTrue (theme.isLoaded());
			})

			// The first theme is currently applied
			assert.equal (applicator.getCurrentTheme(), themes [0]);
		});

		it (("Theme indicator has correct information after being set"), async function () {
			reset();
			const themes = pushSomeThemes();

			// Construct the theme manager
			const mgr = new ThemeManager (applicator, themeList, saver);
			await mgr.initializeTheme();
			
			// Setup the mock theme indicator
			const indicator = new MockThemeIndicator;
			mgr.setThemeIndicator (indicator);

			// Indicator knows the current and the next theme
			assert.equal (indicator.getCurrentTheme(), themes [0]);
			assert.equal (indicator.getNextTheme(),    themes [1]);
		});

		it (("Theme indicator has correct information after themes switched"), async function () {
			reset();
			const themes = pushSomeThemes();

			// Construct the theme manager
			const mgr = new ThemeManager (applicator, themeList, saver);
			await mgr.initializeTheme();
			
			// Setup the 'switch theme' button
			const switchThemeButton = new EmulatedButton;
			mgr.setSwitchThemeButton (switchThemeButton);

			// Setup the mock theme indicator
			const indicator = new MockThemeIndicator;
			mgr.setThemeIndicator (indicator);

			// Switch the theme once
			await switchThemeButton.click();

			// Indicator knows the current and the next theme
			assert.equal (indicator.getCurrentTheme(), themes [1]);
			assert.equal (indicator.getNextTheme(),    themes [2]);
		});
	}
);
