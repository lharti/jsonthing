import { tags as t } from '@lezer/highlight'
import { createTheme, type CreateThemeOptions } from '@uiw/codemirror-themes'

const lightThemeSettings: CreateThemeOptions['settings'] = {
    background: '#FAFAFA',
    foreground: '#90A4AE',
    caret: '#272727',
    selection: '#80CBC440',
    selectionMatch: '#80CBC440',
    gutterBackground: '#FAFAFA',
    gutterForeground: '#90A4AE',
    gutterBorder: 'transparent',
    lineHighlight: '#CCD7DA50',

    fontFamily: 'var(--font-geist-mono)',
    fontSize: '14px',
}

const lightThemeStyles: CreateThemeOptions['styles'] = [
    {
        tag: [t.bracket, t.brace],
        color: '#90A4AE',
        fontWeight: 'bolder',
    },

    {
        tag: [t.propertyName],
        color: '#6182B8',
    },

    {
        tag: [t.string],
        color: '#91B859',
    },

    {
        tag: [t.number],
        color: '#F76D47',
    },

    {
        tag: [t.bool, t.null],
        color: '#91B859',
        fontWeight: 'bold',
    },
]

export const lightTheme = createTheme({
    theme: 'light',

    settings: lightThemeSettings,

    styles: lightThemeStyles,
})
