// @flow

export function formatCurrency(num: number | string) {
  return Number(num).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
