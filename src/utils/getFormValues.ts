export interface FormValue {
	value: string;
	label: string;
}

export function getFormValues(e: { [s: number]: string }): FormValue[] {
	return Object.keys(e).map((key) => ({
		value: key,
		label: e[ key ],
	}));
}
