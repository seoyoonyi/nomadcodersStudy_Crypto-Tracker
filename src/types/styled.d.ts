import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
		colors: {
			titleColor: string;
			bgColor: string;
			accentColor: string;
			active?: boolean;
		};
	}
}
