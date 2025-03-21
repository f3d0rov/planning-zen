
import { EisenhowerMatrixTaskEditor } from "./eisenhower/eisenhower_matrix_task_editor";
import { GithubPageOpener } from "./misc/github_page_opener";
import { ThemeManager } from "./themes/theme_manager";
import { IdbTaskProvider } from "./idb_tasks/idb_task_provider";
import { SizeController } from "./eisenhower/size_controller";
import { LocalStorageThemeSaver } from "./themes/theme_saver";
import { CompletedTasksOverlay } from "./completed_tasks_view/completed_tasks_overlay";
import { CompletedTasksOverlayOpener } from "./completed_tasks_view/completed_tasks_overlay_opener";
import { IdbOpener } from "./idb/idb_opener";
import { IdbCompletedTaskProvider } from "./idb_completed_tasks/idb_completed_task_provider";
import { ThemeList } from "./themes/theme_list";
import { initCustomThemes } from "./themes";
import { BuiltinTheme } from "./themes/builtin_theme";
import { BasicButton } from "./common/button";
import { BodyClassThemeApplicator } from "./themes/theme_applicator";
import { NextThemeIconIndicator } from "./themes/theme_indicator";


function main () {
	logWelcomeMessage();
	initMiscTools();
	initTasks();
}

function logWelcomeMessage () {
	console.log ("%cPlanning Zen%c 1.0", "color:#8aee8a; font-size:32px;", "color: red;");
	console.log ("Check out the source code, report issues and offer improvements at %chttps://github.com/f3d0rov/planner%c", "color:green;");
}

async function initMiscTools () {
	await initThemes();
	const githubPageOpener = new GithubPageOpener();
}

async function initThemes () {
	const switchStyleButtonId = "switch_style_button";

	const themeList = initThemeList();
	const themeSaver = new LocalStorageThemeSaver;
	const themeApplicator = new BodyClassThemeApplicator;
	const themeManager = new ThemeManager (themeApplicator, themeList, themeSaver);
	await themeManager.initializeTheme();
	themeManager.setThemeIndicator (new NextThemeIconIndicator);

	const switchThemeButton = new BasicButton (switchStyleButtonId);
	themeManager.setSwitchThemeButton (switchThemeButton);
}

function initThemeList (): ThemeList {
	const themeList = new ThemeList;
	initBuiltinThemes (themeList);
	initCustomThemes (themeList);
	return themeList;
}

function initBuiltinThemes (themeList: ThemeList): void {
	themeList.addTheme (new BuiltinTheme (
		'light_mode',
		'<path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z"/>'
	));

	themeList.addTheme (new BuiltinTheme (
		'dark_mode',
		'<path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Zm0-80q88 0 158-48.5T740-375q-20 5-40 8t-40 3q-123 0-209.5-86.5T364-660q0-20 3-40t8-40q-78 32-126.5 102T200-480q0 116 82 198t198 82Zm-10-270Z"/>'
	));
}

async function initTasks () {
	const indexedDBOpener = new IdbOpener;

	const taskProvider = new IdbTaskProvider (indexedDBOpener);
	await taskProvider.openDB();

	const completedTaskProvider = new IdbCompletedTaskProvider (indexedDBOpener);
	await completedTaskProvider.openDb();

	const app = new EisenhowerMatrixTaskEditor (taskProvider, completedTaskProvider);
	await app.restoreTasks();

	const completedTasksOverlay = new CompletedTasksOverlay (completedTaskProvider);
	const overlayOpener = new CompletedTasksOverlayOpener (completedTasksOverlay);
	
	const sizeController = new SizeController;
	window.requestAnimationFrame (() => {
		sizeController.resize();
	});
}


window.addEventListener (
	'load',
	main
);
