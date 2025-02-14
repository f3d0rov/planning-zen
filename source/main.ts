
import { EisenhowerMatrixTaskEditor } from "./eisenhower/eisenhower_matrix_task_editor";
import { GithubPageOpener } from "./misc/github_page_opener";
import { StyleSwitcher } from "./misc/style_switcher";
import { IdbTaskProvider } from "./idb_tasks/idb_task_provider";
import { SizeController } from "./eisenhower/size_controller";
import { LocalStorageThemeSaver } from "./misc/theme_saver";
import { CompletedTasksOverlay } from "./completed_tasks_view/completed_tasks_overlay";
import { CompletedTasksOverlayOpener } from "./completed_tasks_view/completed_tasks_overlay_opener";
import { IdbOpener } from "./idb/idb_opener";
import { IdbCompletedTaskProvider } from "./idb_completed_tasks/idb_completed_task_provider";


function main () {
	logWelcomeMessage();
	initMiscTools();
	initTasks();
}

function logWelcomeMessage () {
	console.log ("%cPlanning Zen%c 1.0", "color:#8aee8a; font-size:32px;", "color: red;");
	console.log ("Check out the source code, report issues and offer improvements at %chttps://github.com/f3d0rov/planner%c", "color:green;");
}

function initMiscTools () {
	const themeSaver = new LocalStorageThemeSaver;
	const styleSwitcher = new StyleSwitcher (themeSaver);
	const githubPageOpener = new GithubPageOpener();
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
