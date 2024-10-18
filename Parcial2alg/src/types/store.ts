export type AppState = {
 tasks: []
};

export type Observer = { render: () => void } & HTMLElement;

export enum Screens {
	'ADD_TASK' = 'ADD_TASK',
	'DELETE_TASK' = 'DELETE_TASK',
	'MARK_AS_COMPLETED' = 'MARK_AS_COMPLETED',
}
