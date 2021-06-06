import { find } from 'lodash'
import iapProductsList from './iapProductsList'
import type { ProductValue } from 'types'

export function formatCurrency(num: number): string {
  return (num ?? 0).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

export function getProductValue(productId: string | null): ProductValue | null {
  const result = find(iapProductsList, el => el.productId === productId) ?? null
  return result
}

export function currencyToNumber(value: string): number {
  const number = parseFloat(value?.replace(/[$,]/g, ''))
  return number ?? 0
}

export function sumCurrency(a: string, b: string): string {
  const sum = currencyToNumber(a) + currencyToNumber(b)
  return formatCurrency(sum)
}

export function formatNumber(num: number): string {
  return (num ?? 0).toLocaleString('en-US')
}
