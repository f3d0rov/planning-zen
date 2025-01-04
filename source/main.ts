
import { BasicTaskProvider } from "./tasks/basic_task_provider";
import { EisenhowerMatrixTaskEditor } from "./eisenhower/eisenhower_matrix_task_editor";
import { GithubPageOpener } from "./misc/github_page_opener";
import { StyleSwitcher } from "./misc/style_switcher";
import { TaskProvider } from "./tasks/task_provider";


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
	const styleSwitcher = new StyleSwitcher;
	const githubPageOpener = new GithubPageOpener();
}

function initTasks () {
	const taskProvider: TaskProvider = new BasicTaskProvider;
	const app = new EisenhowerMatrixTaskEditor (taskProvider);
	app.restoreTasks();
}


window.addEventListener (
	'load',
	main
);
