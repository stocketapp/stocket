import React from 'react'
import { render } from '@testing-library/react-native'
import TotalInvested from './TotalInvested'

describe('TotalInvested', () => {
  it('matches the snapshot', () => {
    const { toJSON } = render(<TotalInvested />)

    expect(toJSON()).toMatchSnapshot()
  })
})
