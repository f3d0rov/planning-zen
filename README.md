# 🪴 Planning Zen - a simple task management app.

Track your tasks and sort them with the help of Eisenhower Matrix.

![A screenshot of the app](screenshots/dark_mode.png)

## Usage

Double-click on an empty space in one of squares the to create a task. Double-click a task to edit it. Drag tasks to
move them between squares, to delete them or to mark them as complete. See the list of completed tasks by clicking the 
checkbox button at the top-right. That's basically it. Your information is stored locally in your browser's
[embedded database](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

## Why should you use this?

I designed this app to manage lots of small independent tasks _(work-related and not)._ I've tried other solutions
before, such as self-hosted [YouTrack](https://www.jetbrains.com/youtrack/) _(too complex for one guy's tiny ideas)_,
calendar apps like the one included in the [Nextcloud](https://nextcloud.com/) suite _(quickly turned into a mess once
there were more than 2-3 tasks per day to keep in mind)_, and sticky notes on the marker board mounted above my
workspace _(I am way too lazy to be standing up every time I have to make an edit. Also, my small handwriting and bad
vision make it really difficult to actually see what I have written on the sticky notes)_. It was obvious that I had to
~~find a solution designed with my specific use-case in mind~~ make my own task-tracking app.

## Why shouldn't you use this?

- __You need to synchronize data between different devices__. Everything in the app is stored in your browser, and there
is no server to keep your other devices updated.
- __You need to track time you spent on tasks__. This functionality is not implemented.
- __You want to use this app on your phone__. This app is designed to be used from a desktop browser, using a mouse as
one of the primary methods of input. Mobile experince is going to be either completely broken or very painful.
- __You have to manage the work of a team, not just your own__.
- __You want your task management app to maintain any information other than the name of the task__. You might have
noticed that this app is very light on features.

Still not sure? [Just try it](https://plan-zen.com). Click some buttons. Drag stuff around. You'll learn
_everything_ the app can do in _less than a minute_.

# Developer guide

Planning Zen is a web application written primarily with __[TypeScript](https://www.typescriptlang.org/)__,
__[HTML](https://www.youtube.com/watch?v=dQw4w9WgXcQ)__ and __[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)__.
__[npm](https://docs.npmjs.com/about-npm)__ is used as the package manager for the dependencies, among them:

- __[webpack](https://webpack.js.org/)__, used to compile the .js build files into compact packages;
- __[Mocha](https://mochajs.org/)__ and __[Chai](https://www.chaijs.com/)__, used for testing. _I learned how to test TS
code about a week ago so the test coverage honestly sucks;_
- __[Karma](https://karma-runner.github.io/latest/index.html)__, used to run the tests in a headless version of Chrome.

## Building

Clone the repository and run the following commands from its root:

```bash
npm install
npm run build # or `npm run build-app` if you want to skip building tests
```

This will build and pack the scripts used by the app. To run the tests, execute:

```bash
npm run test
```

Once the scripts are built and compiled into `web/dist/planner.js`, it will be possible to properly load the primary
page `web/index.html` with your web-browser. You should be able to use the app now.

## Code guide

`source` directory contains the primary code used by the app. `tests` directory contains the source code for tests.

### App code

The entry point for the app is located in `source/main.ts`. Function `main`, located here, is called once the page is
loaded.

`source/` subdirectories contain separate modules:

- `common` contains functions and classes that are often used in other modules to avoid code duplication.
- `tasks` contains the high-level `Task` and `TaskProvider` interfaces that can be used to implement different ways of
storing task-related information.
- `completed_tasks` contains the high-lever `CompletedTask` and `CompletedTaskProvider` interfaces that can be
implemented to modify the way completed tasks are stored.
- `idb` contains some of the common functions used by
[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)-based modules.
- `idb_tasks` contains the implementations of `Task` and `TaskProvider` that use IndexedDB for persistent storage.
- `idb_completed_tasks` contains the IndexedDB-based implementations of `CompletedTaskProvider` used to store the list
of completed tasks.
- `eisenhower` contains the code for the UI of the app, specifically - the Eisenhower Matrix. _Undoubtedly the biggest
mess here_.
- `completed_tasks_view` contains the code for the UI of the list of completed tasks.
- `themes` contains the code that controls the UI themes.
- `misc` is for stuff that doesn't really fit anywhere else but doesn't deserve its own folder either, like the code for
the button that opens the github page for the project.


## Style guide

A theme is simply a set of CSS rules that are applied to the page once the theme is selected. Adding a custom theme is
simple:

1. Select an existing theme to be used as a starting point. For example, use `web/dark_mode.css` if you're creating a
dark mode theme; use `web/light_mode.css` if you're creating a light mode theme. Copy the file and place it in the
`web/themes` directory alongside the other custom themes. Give it a nice name (the name should be a valid HTML class -
no spaces, ideally use only letters and underscores to separate words).

2. Add your theme to the `source/themes.ts` file. To do that, add an entry inside the `initCustomThemes` function
(take a look at how the other themes are added there). You will have to add the following lines to this function:

```ts
themes.addTheme (new CustomTheme ({
	themeName: 'Human readable name',
	themeClass: 'the_name_of_your_theme_file_without_the_extension', 
	themeSVGIcon: '<path d="TH3-SVG-1C0N T0-R3PR3S-3nt Y08R-7H3Me"/>'
}));
```

Set `themeName` to the name of your theme, `themeClass` to the name of your css file (no extension, no full path). Use `themeSVGIcon`
to select an SVG icon for your theme.

You will have to rebuild the app for the theme to be selectable.

3. Open the CSS file you created and make it so that the name of the class inside matched the name of the theme. For
example, for a theme named `glitter_factory_explosion` the beginning of the `glitter_factory_explosion.css` file would
look like this:

```css

.glitter_factory_explosion {
	--accent-color: yellow;
	--background-color: red;
	--text-color: pink;
	...
```

4. Modify the `.css` theme in a way you want!

In order to load custom themes locally you'll have to run an HTTP server that serves files from the `web/` directory.
While I am looking into how one can setup a web server using Node, you can start one using Python:

```bash
cd ./web
python -m http.server
```

You will then be able to open the app at `localhost:8000` with the full support of custom themes.

### Theme structure

A basic theme is just a CSS file (`web/light_mode.css`, `web/dark_mode.css`) with a set of `var(...)` variables defined
in it, for example:

```css
--accent-color: #10a810;
--background-color: #090901;
--text-color: white;
--task-criteria-color: rgb(94, 94, 94);

...
```

Modify these variables in order to change the colors of the app. In order to modify the appearance in a more complex
way, you can use the full extent of CSS capabilities - there are no limits here but your imagination. For example,
`high_contrast_dark.css` extends the CSS in order to add outlines to elements that do not have them by default.
