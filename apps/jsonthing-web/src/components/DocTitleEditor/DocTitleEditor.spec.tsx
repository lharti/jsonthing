import { EditableHeading } from '@/components/ui/EditableHeading'
import { useUpdateDoc } from '@/hooks/useUpdateDoc'
import { render } from '@testing-library/react'
import React from 'react'
import { DocTitleEditor } from './index'

jest.mock('@/components/ui/EditableHeading')
jest.mock('@/hooks/useUpdateDoc')

function setupMocks() {
    const updateDocMock = jest.fn((_vars, options) => options?.onSuccess?.())

    jest.mocked(useUpdateDoc).mockReturnValue(
        // @ts-expect-error just mock it
        {
            updateDoc: updateDocMock,
        },
    )

    const EditableHeadingMock = jest.mocked(EditableHeading)

    EditableHeadingMock.mockImplementation(({ initialValue: value }) => (
        <div id="EditableHeading">{value}</div>
    ))

    const mockChange = (newTitle: string) =>
        // @ts-expect-error trust me bro
        EditableHeadingMock.mock.calls[0][0].onChange(newTitle)

    return {
        updateDocMock,
        mockChange,
    }
}

describe('<DocTitleEditor />', () => {
    it('should render', () => {
        expect.assertions(1)

        setupMocks()

        const { container } = render(
            <DocTitleEditor initialTitle="INITIAL_TITLE" docId="DOC_ID" />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                id="EditableHeading"
              >
                INITIAL_TITLE
              </div>
            </div>
        `)
    })

    it('should update title', () => {
        expect.assertions(2)

        const { updateDocMock, mockChange } = setupMocks()

        render(<DocTitleEditor initialTitle="INITIAL_TITLE" docId="DOC_ID" />)

        const newTitle = 'New Title'

        mockChange(newTitle)

        expect(updateDocMock).toHaveBeenCalledWith(
            {
                id: 'DOC_ID',

                payload: {
                    title: newTitle,
                },
            },

            {
                onSuccess: expect.any(Function),
            },
        )

        expect(document.title).toMatchInlineSnapshot(`"New Title - Jsonthing"`)
    })
})
