import { EditableHeading } from '@/components/ui/EditableHeading'
import { useUpdateDoc } from '@/hooks/useUpdateDoc'
import { render } from '@testing-library/react'
import React from 'react'
import { DocTitleEditor } from './index'

jest.mock('@/components/ui/EditableHeading')
const EditableHeadingMock = jest.mocked(EditableHeading)

jest.mock('@/hooks/useUpdateDoc')

const updateDocMock = jest.fn()

jest.mocked(useUpdateDoc).mockReturnValue(
    // @ts-expect-error just mock it
    {
        updateDoc: updateDocMock,
    },
)

describe('<DocTitleEditor />', () => {
    it('should render', () => {
        expect.assertions(1)

        EditableHeadingMock.mockImplementation(({ initialValue: value }) => (
            <div id="EditableHeading">{value}</div>
        ))

        const { container } = render(
            <DocTitleEditor initialTitle="INITIAL_TITLE" docId="DOC_ID" />,
        )

        expect(container).toMatchInlineSnapshot(`
            <div>
              <div
                class="flex items-center"
              >
                <div
                  id="EditableHeading"
                >
                  INITIAL_TITLE
                </div>
              </div>
            </div>
        `)
    })

    it('should update title', () => {
        expect.assertions(1)

        render(<DocTitleEditor initialTitle="INITIAL_TITLE" docId="DOC_ID" />)

        const newTitle = Math.random()

        // @ts-expect-error trust me bro
        EditableHeadingMock.mock.calls[0][0].onChange(newTitle)

        expect(updateDocMock).toHaveBeenCalledWith({
            id: 'DOC_ID',

            payload: {
                title: newTitle,
            },
        })
    })
})
