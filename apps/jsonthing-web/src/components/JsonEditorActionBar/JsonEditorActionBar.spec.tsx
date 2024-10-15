import { Button } from '@/components/ui/Button'
import {
    IconClipboardCopy,
    IconDeviceFloppy,
    IconWand,
} from '@tabler/icons-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { JsonEditorActionBarBtn } from './ActionBarBtn'
import { SaveStatus } from './constants'
import { JsonEditorActionBar } from './JsonEditorActionBar'
import { useSaveContent } from './useSaveContent'

jest.mock('./ActionBarBtn')
const JsonEditorActionBarBtnMock = jest.mocked(JsonEditorActionBarBtn)

const mockActionBarBtn = () => {
    return JsonEditorActionBarBtnMock.mockImplementation(
        ({ onClick, label }) => (
            <Button role="button" aria-label={label} onClick={onClick} />
        ),
    )
}

// eslint-disable-next-line jest/no-untyped-mock-factory
jest.mock('next/navigation', () => ({
    useParams: jest.fn(() => ({ id: 'DOC_ID' })),
}))

jest.mock('./useSaveContent')

const useSaveContentMock = jest.mocked(useSaveContent).mockReturnValue({
    save: jest.fn(),
    status: SaveStatus.SAVED,
})

describe('<JsonEditorActionBar />', () => {
    it('should render', () => {
        expect.assertions(1)

        mockActionBarBtn()

        const { container } = render(
            <JsonEditorActionBar
                editorContent="{}"
                setEditorContent={jest.fn()}
            />,
        )

        expect(container).toMatchSnapshot('<JsonEditorActionBar />')
    })

    it('should setup useSaveContent', () => {
        expect.assertions(1)

        render(
            <JsonEditorActionBar
                editorContent="{}"
                setEditorContent={jest.fn()}
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

            const ActionBtnMock = mockActionBarBtn()

            render(
                <JsonEditorActionBar
                    editorContent="{}"
                    setEditorContent={jest.fn()}
                />,
            )

            expect(ActionBtnMock).toHaveBeenCalledWith(
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

            mockActionBarBtn()

            const uglyJson = `
            {"a":1,"b":2,
            "c": 3}`

            const setEditorContent = jest.fn(value => value)

            render(
                <JsonEditorActionBar
                    editorContent={uglyJson}
                    setEditorContent={setEditorContent}
                />,
            )

            const prettifyBtn = screen.getByRole('button', {
                name: 'Prettify',
            })

            prettifyBtn.click()

            const newEditorContent = setEditorContent.mock.results[0].value

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

            const ActionBtnMock = mockActionBarBtn()

            render(
                <JsonEditorActionBar
                    editorContent="{}"
                    setEditorContent={jest.fn()}
                />,
            )

            expect(ActionBtnMock).toHaveBeenCalledWith(
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

            mockActionBarBtn()

            const editorContent = `{"random": ${Math.random()}`

            render(
                <JsonEditorActionBar
                    editorContent={editorContent}
                    setEditorContent={jest.fn()}
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

            const ActionBtnMock = mockActionBarBtn()

            render(
                <JsonEditorActionBar
                    editorContent="{}"
                    setEditorContent={jest.fn()}
                />,
            )

            expect(ActionBtnMock).toHaveBeenCalledWith(
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

            const saveMock = jest.fn()

            useSaveContentMock.mockReturnValue({
                save: saveMock,
                status: SaveStatus.IDLE,
            })

            const editorContent = Math.random().toString()

            render(
                <JsonEditorActionBar
                    editorContent={editorContent}
                    setEditorContent={jest.fn()}
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
