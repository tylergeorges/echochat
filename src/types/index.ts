declare global {
	type ParamsBase = Record<string, string | undefined>;

	export interface LayoutProps<Params extends ParamsBase = {}> {
		children?: React.ReactNode;

		params: Params;
	}
	export interface PageProps<
		Params extends ParamsBase = {},
		SearchParams extends ParamsBase = {},
	> {
		params: Params;
		searchParams?: SearchParams;
	}
}

export {};
