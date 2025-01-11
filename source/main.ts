
import { BasicTaskProvider } from "./tasks/basic_task_provider";
import { EisenhowerMatrixTaskEditor } from "./eisenhower/eisenhower_matrix_task_editor";
import { GithubPageOpener } from "./misc/github_page_opener";
import { StyleSwitcher } from "./misc/style_switcher";
import { TaskProvider } from "./tasks/task_provider";
import { IndexedDBTaskProvider } from "./indexed_db_tasks/indexed_db_task_provider";
import { SizeController } from "./eisenhower/size_controller";
import { LocalStorageThemeSaver } from "./misc/theme_saver";
import { BasicCompletedTaskProvider } from "./completed_tasks/basic_completed_task_provider";
import { CompletedTasksOverlay } from "./completed_tasks_view/completed_tasks_overlay";
import { CachedTask } from "./tasks/cached_task";
import { BasicTask } from "./tasks/basic_task";
import { CompletedTasksOverlayOpener } from "./completed_tasks_view/completed_tasks_overlay_opener";


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
	const taskProvider = new IndexedDBTaskProvider;
	await taskProvider.openDB();

	const completedTaskProvider = new BasicCompletedTaskProvider;


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
