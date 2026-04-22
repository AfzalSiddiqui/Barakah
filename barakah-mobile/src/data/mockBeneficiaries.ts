export interface Beneficiary {
  id: string;
  name: string;
  nameAr: string;
  iban: string;
  bank: string;
  bankAr: string;
  avatar: string;
}

export interface SavedBiller {
  id: string;
  name: string;
  nameAr: string;
  category: string;
  accountNumber: string;
  icon: string;
}

export const mockBeneficiaries: Beneficiary[] = [
  {
    id: 'ben-001',
    name: 'Ahmed Al-Fahad',
    nameAr: 'أحمد الفهد',
    iban: 'AE07****4821',
    bank: 'Emirates NBD',
    bankAr: 'الإمارات دبي الوطني',
    avatar: '👤',
  },
  {
    id: 'ben-002',
    name: 'Fatima Hassan',
    nameAr: 'فاطمة حسن',
    iban: 'AE21****7390',
    bank: 'Dubai Islamic Bank',
    bankAr: 'بنك دبي الإسلامي',
    avatar: '👩',
  },
  {
    id: 'ben-003',
    name: 'Omar Khalid',
    nameAr: 'عمر خالد',
    iban: 'AE45****1256',
    bank: 'Abu Dhabi Commercial',
    bankAr: 'أبوظبي التجاري',
    avatar: '👨',
  },
  {
    id: 'ben-004',
    name: 'Sara Al-Mansoori',
    nameAr: 'سارة المنصوري',
    iban: 'AE89****6047',
    bank: 'Mashreq Bank',
    bankAr: 'بنك المشرق',
    avatar: '👩‍💼',
  },
];

export const mockBillers: SavedBiller[] = [
  {
    id: 'bil-001',
    name: 'DEWA',
    nameAr: 'ديوا',
    category: 'utilities',
    accountNumber: '****4821',
    icon: '💡',
  },
  {
    id: 'bil-002',
    name: 'du',
    nameAr: 'دو',
    category: 'telecom',
    accountNumber: '****7390',
    icon: '📞',
  },
  {
    id: 'bil-003',
    name: 'Etisalat',
    nameAr: 'اتصالات',
    category: 'telecom',
    accountNumber: '****1256',
    icon: '📡',
  },
  {
    id: 'bil-004',
    name: 'Salik',
    nameAr: 'سالك',
    category: 'government',
    accountNumber: '****6047',
    icon: '🚗',
  },
];

export const billCategories = [
  { id: 'utilities', label: 'utilities', icon: '💡' },
  { id: 'telecom', label: 'telecom', icon: '📞' },
  { id: 'internet', label: 'internet', icon: '🌐' },
  { id: 'government', label: 'government', icon: '🏛️' },
  { id: 'education', label: 'education', icon: '🎓' },
  { id: 'insurance', label: 'insurance', icon: '🛡️' },
] as const;
