
import { assert } from "chai";
import { LocalStorageThemeSaver, ThemeSaver } from "../../source/misc/theme_saver";

describe (
	"LocalStorageStyleSaver",

	() => {
		it ("Clearing local storage", function () {
			window.localStorage.clear();
		});

		it ("Trying to restore a style with none stored", function () {
			const lsss: ThemeSaver = new LocalStorageThemeSaver;
			const restoredStyle = lsss.restoreStyle();
			assert.equal (restoredStyle, undefined);
		});
		
		it ("Save - restore a style", function () {
			const savedStyleName: string = "dark_theme;"
			const lsss: ThemeSaver = new LocalStorageThemeSaver;
			lsss.rememberStyle (savedStyleName);
			const restoredStyle = lsss.restoreStyle();
			assert.equal (restoredStyle, savedStyleName);
		});
	}
);