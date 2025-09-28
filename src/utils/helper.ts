import { format } from 'date-fns';
import { CURRENCIES } from './types';

export const formatEventDateTime = (date: Date): string => {
  return `${format(date, 'EEE d MMM')} — ${format(date, 'h:mma')}`;
};

export const formatDate = (date: Date): string => {
  return format(date, 'd MMM h:mma');
};

const formatNumber = ({
    number,
    isCurrency = false,
    currency = CURRENCIES.USD,
    notation = 'standard',
  }: {
    number: number;
    isCurrency?: boolean;
    currency?: CURRENCIES;
    notation?: 'compact' | 'standard';
  }): string => {
    const locale = 'en-GB';
    const numberToFormat = number;
    return isCurrency
      ? new Intl.NumberFormat(locale, {
          currency,
          currencyDisplay: 'narrowSymbol',
          currencySign: 'accounting',
          notation,
          style: 'currency',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(numberToFormat)
      : new Intl.NumberFormat(locale, { notation }).format(numberToFormat);
  };

  export const helpers = {
    formatNumber,
    formatEventDateTime,
    formatDate,
  };