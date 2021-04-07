const StockNavHeader = ({ companyName, symbol }: StockNavHeaderProps) => {
  const { TouchableOpacity } = require('react-native')
  const { Container, AddToWatchlistButton, Text } = require('@components')
  const { ArrowLeftIcon } = require('@icons')
  const { useTheme } = require('@emotion/react')
  const { useNavigation } = require('@react-navigation/core')

  const { goBack } = useNavigation()
  const { colors, p } = useTheme()

  return (
    <>
      <Container ph separate horizontal top={p.md}>
        <TouchableOpacity style={{ paddingVertical: 5, paddingRight: 5 }} onPress={goBack}>
          <ArrowLeftIcon size={34} color={colors.GREEN} />
        </TouchableOpacity>
        <Container separate alignItems="center">
          <Text type="title" weight="Black">
            {companyName}
          </Text>
          <Text weight="Bold" color={colors.GRAY}>
            {symbol}
          </Text>
        </Container>
        <AddToWatchlistButton symbol={symbol} />
      </Container>
    </>
  )
}

interface StockNavHeaderProps {
  companyName: string
  symbol: string
}

export default StockNavHeader
