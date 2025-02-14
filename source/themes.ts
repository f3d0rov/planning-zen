
import { CustomTheme } from "./themes/custom_theme";
import { ThemeList } from "./themes/theme_list";

export function initCustomThemes (themes: ThemeList): void {
	themes.addTheme (new CustomTheme ({
		themeName: 'Pink Night',
		themeClass: 'pink_night',
		themeSVGIcon: '<path d="m606-286-33-144 111-96-146-13-58-136v312l126 77ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"/>'
	}));

	themes.addTheme (new CustomTheme ({
		themeName: 'Mild Panic',
		themeClass: 'mild_panic',
		themeSVGIcon: '<path d="M481-83Q347-218 267.5-301t-121-138q-41.5-55-54-94T80-620q0-92 64-156t156-64q45 0 87 16.5t75 47.5l-62 216h120l-34 335 114-375H480l71-212q25-14 52.5-21t56.5-7q92 0 156 64t64 156q0 48-13 88t-55 95.5q-42 55.5-121 138T481-83Zm-71-186 21-211H294l75-263q-16-8-33.5-12.5T300-760q-58 0-99 41t-41 99q0 31 11.5 62t40 70.5q28.5 39.5 77 92T410-269Zm188-48q111-113 156.5-180T800-620q0-58-41-99t-99-41q-11 0-22 1.5t-22 5.5l-24 73h116L598-317Zm110-363ZM294-480Z"/>'
	}));

	themes.addTheme (new CustomTheme({
		themeName: 'Cozy wood',
		themeClass: 'cozy_wood',
		themeSVGIcon: '<path d="M280-80v-160H0l154-240H80l280-400 120 172 120-172 280 400h-74l154 240H680v160H520v-160h-80v160H280Zm389-240h145L659-560h67L600-740l-71 101 111 159h-74l103 160Zm-523 0h428L419-560h67L360-740 234-560h67L146-320Zm0 0h155-67 252-67 155-428Zm523 0H566h74-111 197-67 155-145Zm-149 80h160-160Zm201 0Z"/>'
	}));

	themes.addTheme (new CustomTheme ({
		themeName: 'High Contrast Dark',
		themeClass: 'high_contrast_dark',
		themeSVGIcon: '<path d="M760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120Zm-560-80h280v-320l280 320v-560H480v240L200-200Z"/>'
	}));
}
