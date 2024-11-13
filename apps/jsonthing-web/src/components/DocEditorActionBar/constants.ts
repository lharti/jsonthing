export enum SaveStatus {
    IDLE = 'idle',
    PENDING = 'pending',
    SAVED = 'saved',

    NOT_ALLOWED = 'not_allowed',
}

export const SAVE_BTN_LABELS: Record<SaveStatus, string> = {
    [SaveStatus.IDLE]: 'Save',
    [SaveStatus.PENDING]: 'Saving...',
    [SaveStatus.SAVED]: 'Saved',

    [SaveStatus.NOT_ALLOWED]: 'Cannot save',
}
