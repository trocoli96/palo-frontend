// The key name ends in _MODAL, so we can also have _DRAWERS or _POPUPS in a future
export enum ApplicationModals {
  EXAMPLE_MODAL = 'EXAMPLE_MODAL',
}

export type ModalOptions<T extends ApplicationModals> = T extends ApplicationModals.EXAMPLE_MODAL
  ? ExampleModalOptions
  : never;
export interface ExampleModalOptions {
  variable: string;
}
