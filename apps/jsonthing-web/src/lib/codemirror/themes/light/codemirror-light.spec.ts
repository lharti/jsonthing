import { lightTheme } from './codemirror-light'

describe('codemirrorLight', () => {
    it('should return light theme', () => {
        expect.assertions(1)

        expect(lightTheme).toMatchSnapshot('codemirror light theme')
    })
})
