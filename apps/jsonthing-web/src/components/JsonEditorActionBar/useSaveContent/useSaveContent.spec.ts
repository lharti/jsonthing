import { useUpdateDoc } from '@/hooks/useUpdateDoc'
import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { SaveStatus } from '../constants'
import { useSaveContent } from './index'

jest.mock('@/hooks/useUpdateDoc')

const updateDocMock = jest.fn()

jest.mocked(useUpdateDoc).mockReturnValue(
    // @ts-expect-error just mock it
    {
        updateDoc: updateDocMock,
    },
)

describe('useSaveContent', () => {
    it('should update api doc content', () => {
        expect.assertions(1)

        const { result } = renderHook(() =>
            useSaveContent({
                content: '{"a":1}',
                id: '1',
            }),
        )

        act(() => {
            result.current.save()
        })

        expect(updateDocMock).toHaveBeenCalledExactlyOnceWith(
            {
                id: '1',
                payload: {
                    content: '{"a":1}',
                },
            },

            expect.any(Object),
        )
    })

    it('should return status saved', () => {
        expect.assertions(1)

        const { result } = renderHook(() =>
            useSaveContent({
                content: '{"a":1}',
                id: '1',
            }),
        )

        expect(result.current.status).toBe(SaveStatus.SAVED)
    })

    it('should return status idle when content changed', () => {
        expect.assertions(1)

        const { result, rerender } = renderHook(
            ({ content }) =>
                useSaveContent({
                    content,
                    id: '1',
                }),

            {
                initialProps: {
                    content: '{"a":1}',
                },
            },
        )

        rerender({
            content: '{"a":2}',
        })

        expect(result.current.status).toBe(SaveStatus.IDLE)
    })

    describe('save', () => {
        it('should update status to pending', () => {
            expect.assertions(1)

            const { result } = renderHook(() =>
                useSaveContent({
                    content: '{"a":1}',
                    id: '1',
                }),
            )

            act(() => {
                result.current.save()
            })

            expect(result.current.status).toBe(SaveStatus.PENDING)
        })

        it('should update status to success onSuccess', () => {
            expect.assertions(1)

            const { result } = renderHook(() =>
                useSaveContent({
                    content: '{"a":1}',
                    id: '1',
                }),
            )

            act(() => {
                result.current.save()

                updateDocMock.mock.calls[0][1].onSuccess()
            })

            expect(result.current.status).toBe(SaveStatus.SAVED)
        })

        it('should update status to idle onError', () => {
            expect.assertions(1)

            const { result } = renderHook(() =>
                useSaveContent({
                    content: '{"a":1}',
                    id: '1',
                }),
            )

            act(() => {
                result.current.save()

                updateDocMock.mock.calls[0][1].onError()
            })

            expect(result.current.status).toBe(SaveStatus.IDLE)
        })

        it('should call options.onSuccess onSuccess', () => {
            expect.assertions(1)

            const onSuccess = jest.fn()

            const { result } = renderHook(() =>
                useSaveContent(
                    {
                        content: '{"a":1}',
                        id: '1',
                    },

                    {
                        onSuccess,
                    },
                ),
            )

            act(() => {
                result.current.save()

                updateDocMock.mock.calls[0][1].onSuccess()
            })

            expect(onSuccess).toHaveBeenCalledOnce()
        })

        it('should call options.onError onError', () => {
            expect.assertions(1)

            const onError = jest.fn()

            const { result } = renderHook(() =>
                useSaveContent(
                    {
                        content: '{"a":1}',
                        id: '1',
                    },

                    {
                        onError,
                    },
                ),
            )

            act(() => {
                result.current.save()

                updateDocMock.mock.calls[0][1].onError()
            })

            expect(onError).toHaveBeenCalledOnce()
        })
    })
})
