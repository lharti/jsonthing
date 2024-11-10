import { Button } from '@/components/ui/Button'
import {
    IconClipboardCopy,
    IconDeviceFloppy,
    IconWand,
} from '@tabler/icons-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { DocEditorActionBarBtn } from './ActionBarBtn'
import { SaveStatus } from './constants'
import { DocEditorActionBar } from './DocEditorActionBar'
import { useSaveContent } from './useSaveContent'

jest.mock('./ActionBarBtn')
jest.mock('./useSaveContent')

const setupMocks = () => {
    const ActionBarBtnMock = jest
        .mocked(DocEditorActionBarBtn)

        .mockImplementation(({ onClick, label }) => (
            <Button role="button" aria-label={label} onClick={onClick} />
        ))

    const useSaveContentMock = jest.mocked(useSaveContent).mockReturnValue({
        save: jest.fn(),
        status: SaveStatus.SAVED,
    })

    return { ActionBarBtnMock, useSaveContentMock }
}

describe('<DocEditorActionBar />', () => {
    it('should render', () => {
        expect.assertions(1)

        setupMocks()

        const { container } = render(
            <DocEditorActionBar
                docId="DOC_ID"
                value="{}"
                onChange={jest.fn()}
            />,
        )

        expect(container).toMatchSnapshot('<DocEditorActionBar />')
    })

    it('should setup useSaveContent', () => {
        expect.assertions(1)

        const { useSaveContentMock } = setupMocks()

        render(
            <DocEditorActionBar
                docId="DOC_ID"
                value="{}"
                onChange={jest.fn()}
            />,
        )

        expect(useSaveContentMock).toHaveBeenCalledWith(
            {
                id: 'DOC_ID',
                content: '{}',
            },

            {
                onError: expect.any(Function),
            },
        )
    })

    describe('prettify button', () => {
        it('should be setup correctly', () => {
            expect.assertions(1)

            const { ActionBarBtnMock } = setupMocks()

            render(
                <DocEditorActionBar
                    docId="DOC_ID"
                    value="{}"
                    onChange={jest.fn()}
                />,
            )

            expect(ActionBarBtnMock).toHaveBeenCalledWith(
                {
                    iconOnly: true,
                    label: 'Prettify',
                    Icon: IconWand,
                    onClick: expect.any(Function),
                },

                undefined,
            )
        })

        it('should prettify editor content when clicked', () => {
            expect.assertions(1)

            setupMocks()

            const uglyJson = `
            {"a":1,"b":2,
            "c": 3}`

            const onChange = jest.fn(value => value)

            render(
                <DocEditorActionBar
                    docId="DOC_ID"
                    value={uglyJson}
                    onChange={onChange}
                />,
            )

            const prettifyBtn = screen.getByRole('button', {
                name: 'Prettify',
            })

            prettifyBtn.click()

            const newEditorContent = onChange.mock.results[0].value

            expect(newEditorContent).toMatchInlineSnapshot(`
                            "{
                              "a": 1,
                              "b": 2,
                              "c": 3
                            }"
                    `)
        })
    })

    describe('copy button', () => {
        it('should be setup correctly', () => {
            expect.assertions(1)

            const { ActionBarBtnMock } = setupMocks()

            render(
                <DocEditorActionBar
                    docId="DOC_ID"
                    value="{}"
                    onChange={jest.fn()}
                />,
            )

            expect(ActionBarBtnMock).toHaveBeenCalledWith(
                {
                    iconOnly: true,
                    label: 'Copy',
                    Icon: IconClipboardCopy,
                    onClick: expect.any(Function),
                },

                undefined,
            )
        })

        it('should copy editor content to clipboard', async () => {
            expect.assertions(1)

            userEvent.setup()

            setupMocks()

            const editorContent = `{"random": ${Math.random()}`

            render(
                <DocEditorActionBar
                    docId="DOC_ID"
                    value={editorContent}
                    onChange={jest.fn()}
                />,
            )

            const copyBtn = screen.getByRole('button', {
                name: 'Copy',
            })

            copyBtn.click()

            const clipboardText = await navigator.clipboard.readText()

            expect(clipboardText).toStrictEqual(editorContent)
        })
    })

    describe('save button', () => {
        it('should be setup correctly', () => {
            expect.assertions(1)

            const { ActionBarBtnMock } = setupMocks()

            render(
                <DocEditorActionBar
                    docId="DOC_ID"
                    value="{}"
                    onChange={jest.fn()}
                />,
            )

            expect(ActionBarBtnMock).toHaveBeenCalledWith(
                {
                    variant: 'outline',
                    label: 'Saved',
                    Icon: IconDeviceFloppy,

                    onClick: expect.any(Function),

                    isLoading: false,
                    disabled: true,
                },

                undefined,
            )
        })

        it('should save content onClick', () => {
            expect.assertions(1)

            const { useSaveContentMock } = setupMocks()

            const saveMock = jest.fn()

            useSaveContentMock.mockReturnValue({
                save: saveMock,
                status: SaveStatus.IDLE,
            })

            const editorContent = Math.random().toString()

            render(
                <DocEditorActionBar
                    docId="DOC_ID"
                    value={editorContent}
                    onChange={jest.fn()}
                />,
            )

            const saveBtn = screen.getByRole('button', {
                name: 'Save',
            })

            saveBtn.click()

            expect(saveMock).toHaveBeenCalledOnce()
        })
    })
})
