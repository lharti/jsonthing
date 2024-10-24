export enum SaveStatus {
    IDLE = 'idle',
    PENDING = 'pending',
    SAVED = 'saved',
}

export const SAVE_BTN_LABELS = {
    [SaveStatus.IDLE]: 'Save',
    [SaveStatus.PENDING]: 'Saving...',
    [SaveStatus.SAVED]: 'Saved',
}
