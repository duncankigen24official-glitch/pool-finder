export interface Currency {
  code: string;
  name: string;
  symbol: string;
  region: string;
}

export const currencies: Currency[] = [
  // East African Currencies (Priority)
  { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', region: 'East Africa' },
  { code: 'TZS', name: 'Tanzanian Shilling', symbol: 'TSh', region: 'East Africa' },
  { code: 'UGX', name: 'Ugandan Shilling', symbol: 'USh', region: 'East Africa' },
  { code: 'RWF', name: 'Rwandan Franc', symbol: 'FRw', region: 'East Africa' },
  { code: 'BIF', name: 'Burundian Franc', symbol: 'FBu', region: 'East Africa' },
  { code: 'ETB', name: 'Ethiopian Birr', symbol: 'Br', region: 'East Africa' },
  { code: 'SOS', name: 'Somali Shilling', symbol: 'Sh.So.', region: 'East Africa' },
  { code: 'ERN', name: 'Eritrean Nakfa', symbol: 'Nfk', region: 'East Africa' },
  { code: 'DJF', name: 'Djiboutian Franc', symbol: 'Fdj', region: 'East Africa' },
  { code: 'SSP', name: 'South Sudanese Pound', symbol: '£', region: 'East Africa' },
  
  // Southern African Currencies
  { code: 'ZAR', name: 'South African Rand', symbol: 'R', region: 'Southern Africa' },
  { code: 'BWP', name: 'Botswana Pula', symbol: 'P', region: 'Southern Africa' },
  { code: 'NAD', name: 'Namibian Dollar', symbol: '$', region: 'Southern Africa' },
  { code: 'SZL', name: 'Swazi Lilangeni', symbol: 'L', region: 'Southern Africa' },
  { code: 'LSL', name: 'Lesotho Loti', symbol: 'L', region: 'Southern Africa' },
  { code: 'MWK', name: 'Malawian Kwacha', symbol: 'MK', region: 'Southern Africa' },
  { code: 'ZMW', name: 'Zambian Kwacha', symbol: 'ZK', region: 'Southern Africa' },
  { code: 'MZN', name: 'Mozambican Metical', symbol: 'MT', region: 'Southern Africa' },
  { code: 'MGA', name: 'Malagasy Ariary', symbol: 'Ar', region: 'Southern Africa' },
  { code: 'MUR', name: 'Mauritian Rupee', symbol: '₨', region: 'Southern Africa' },
  { code: 'SCR', name: 'Seychellois Rupee', symbol: '₨', region: 'Southern Africa' },
  { code: 'KMF', name: 'Comorian Franc', symbol: 'CF', region: 'Southern Africa' },
  
  // West African Currencies
  { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', region: 'West Africa' },
  { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', region: 'West Africa' },
  { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', region: 'West Africa' },
  { code: 'GMD', name: 'Gambian Dalasi', symbol: 'D', region: 'West Africa' },
  { code: 'GNF', name: 'Guinean Franc', symbol: 'FG', region: 'West Africa' },
  { code: 'LRD', name: 'Liberian Dollar', symbol: '$', region: 'West Africa' },
  { code: 'SLL', name: 'Sierra Leonean Leone', symbol: 'Le', region: 'West Africa' },
  { code: 'CVE', name: 'Cape Verdean Escudo', symbol: '$', region: 'West Africa' },
  
  // Central African Currencies
  { code: 'XAF', name: 'Central African CFA Franc', symbol: 'FCFA', region: 'Central Africa' },
  { code: 'CDF', name: 'Congolese Franc', symbol: 'FC', region: 'Central Africa' },
  { code: 'AOA', name: 'Angolan Kwanza', symbol: 'Kz', region: 'Central Africa' },
  { code: 'STN', name: 'São Tomé and Príncipe Dobra', symbol: 'Db', region: 'Central Africa' },
  
  // North African Currencies
  { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', region: 'North Africa' },
  { code: 'MAD', name: 'Moroccan Dirham', symbol: 'DH', region: 'North Africa' },
  { code: 'TND', name: 'Tunisian Dinar', symbol: 'د.ت', region: 'North Africa' },
  { code: 'LYD', name: 'Libyan Dinar', symbol: 'LD', region: 'North Africa' },
  { code: 'DZD', name: 'Algerian Dinar', symbol: 'DA', region: 'North Africa' },
  { code: 'SDG', name: 'Sudanese Pound', symbol: '£', region: 'North Africa' },
  { code: 'SHP', name: 'Saint Helena Pound', symbol: '£', region: 'North Africa' },
  
  // Major Global Currencies
  { code: 'USD', name: 'US Dollar', symbol: '$', region: 'North America' },
  { code: 'EUR', name: 'Euro', symbol: '€', region: 'Europe' },
  { code: 'GBP', name: 'British Pound', symbol: '£', region: 'Europe' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥', region: 'Asia' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', region: 'Asia' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹', region: 'Asia' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', region: 'Oceania' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', region: 'North America' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', region: 'Europe' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', region: 'Europe' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', region: 'Europe' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr', region: 'Europe' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', region: 'Oceania' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', region: 'Asia' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', region: 'Asia' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$', region: 'North America' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', region: 'South America' },
  { code: 'ARS', name: 'Argentine Peso', symbol: '$', region: 'South America' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$', region: 'South America' },
];

export const getCurrencySymbol = (code: string): string => {
  return currencies.find(c => c.code === code)?.symbol || code;
};

export const getCurrencyByCode = (code: string): Currency | undefined => {
  return currencies.find(c => c.code === code);
};

// Group currencies by region for better UX
export const getCurrenciesByRegion = (): Record<string, Currency[]> => {
  return currencies.reduce((acc, currency) => {
    if (!acc[currency.region]) {
      acc[currency.region] = [];
    }
    acc[currency.region].push(currency);
    return acc;
  }, {} as Record<string, Currency[]>);
};
