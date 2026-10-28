// Payment ko jankari yaha halnus. Afno real details halepachhi matra course-taker lai dekhinchha.
// details: lines ko list, jastai ['eSewa ID: 98XXXXXXXX', 'Name: TRINEXA Technologies Pvt. Ltd.']
// qr: public folder ko QR image, jastai '/fonepay-qr.png'
// details ra qr duitai null bhaye "team le payment details pathaunchha" dekhinchha.
export const minAmount = 1000

export const paymentGroups = [
  {
    title: 'Online wallets and banking',
    methods: [
      { id: 'esewa', label: 'eSewa', details: null, qr: null },
      { id: 'khalti', label: 'Khalti', details: null, qr: null },
      { id: 'connectips', label: 'connectIPS', details: null, qr: null },
    ],
  },
  {
    title: 'Other payment options',
    methods: [
      { id: 'nepalpay', label: 'NepalPay', details: null, qr: null },
      { id: 'fonepay', label: 'Fonepay QR', details: null, qr: null },
      { id: 'bank', label: 'Bank Transfer', details: null, qr: null },
      { id: 'other', label: 'Other', details: null, qr: null },
    ],
  },
]