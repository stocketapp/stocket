const StockNavHeader = ({ companyName, symbol }: StockNavHeaderProps) => {
  const { TouchableOpacity } = require('react-native')
  const { AddToWatchlistButton, Text } = require('@components')
  const { ArrowLeftIcon } = require('@icons')
  const { useTheme } = require('@emotion/react')
  const { useNavigation } = require('@react-navigation/core')
  const { StockNavHeaderContainer, StockNavHeaderInner } = require('./styles')

  const { goBack } = useNavigation()
  const { colors } = useTheme()

  return (
    <StockNavHeaderContainer>
      <TouchableOpacity style={{ paddingVertical: 5, paddingRight: 5 }} onPress={goBack}>
        <ArrowLeftIcon size={34} color={colors.GREEN} />
      </TouchableOpacity>
      <StockNavHeaderInner>
        <Text type="title" weight="Black">
          {symbol}
        </Text>
        <Text weight="Medium" color={colors.GRAY}>
          {companyName}
        </Text>
      </StockNavHeaderInner>
      <AddToWatchlistButton symbol={symbol} />
    </StockNavHeaderContainer>
  )
}

interface StockNavHeaderProps {
  companyName: string
  symbol: string
}

export default StockNavHeader
