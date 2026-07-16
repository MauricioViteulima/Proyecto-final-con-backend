export const formatPrice = (value) =>
  new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
    minimumFractionDigits: 2,
  }).format(Number(value || 0))

export const stars = (value = 0) => '★★★★★'.slice(0, Math.round(value)).padEnd(5, '☆')

export const makeId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`

export const isInstitutionalEmail = (email) =>
  /@(aloe\.ulima\.edu\.pe|ulima\.edu\.pe)$/i.test(String(email).trim())
