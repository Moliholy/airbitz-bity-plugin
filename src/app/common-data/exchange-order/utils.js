import { currencies } from '../currencies';

export function getFiatToCryptoRequestCategoryParameter(outputCryptoCurrencyCode) {
  switch (outputCryptoCurrencyCode) {
    case currencies.BTC.code:
      return 'BUY';
    default:
      throw new Error(`Unsupported output crypto currency "${outputCryptoCurrencyCode}"`);
  }
}

export function getCryptoToFiatRequestCategoryParameter(inputCurrencyCode, outputCurrencyCode) {
  const supportedFiatCurrencies = [
    currencies.EUR.code,
    currencies.CHF.code
  ];

  const isBtcToFiat = inputCurrencyCode === currencies.BTC.code &&
    supportedFiatCurrencies.indexOf(outputCurrencyCode) > -1;
  if (isBtcToFiat) {
    return 'SELL';
  }
  throw new Error(`Unsupported pair of currencies "${inputCurrencyCode}", ${outputCurrencyCode}"`);
}

export function createNotesForAirbitz() {
  return dateToString(new Date());
}

function dateToString(date) {
  const year = date.getFullYear();
  const month = getMonthName(date);
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${year}-${month}-${day} @ ${hours}:${minutes}`;
}

function getMonthName(date) {
  const locale = 'en-us';
  return date.toLocaleString(locale, { month: 'short' });
}
