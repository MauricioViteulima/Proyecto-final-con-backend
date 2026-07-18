import { useEffect, useState } from 'react'
import { AppContext } from './AppContextBase'
import { marketplaceProducts as mockMarketplaceProducts, storeProducts } from '../data/mockProducts'
import { makeId } from '../utils/format'
import * as publicationApi from '../services/publications.api.js'

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const writeStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))

// --- Adaptador API -> Frontend ---
// Si el backend usa otros nombres de campo, ajusta solo aquí.
const normalizeFromApi = (item) => ({
  id: item.id,
  type: 'marketplace',
  title: item.title || '',
  description: item.description || '',
  price: Number(item.price) || 0,
  category: item.category || '',
  condition: item.condition || '',
  image: item.image || '',
  location: item.location || '',
  whatsapp: item.whatsapp || '',
  sellerId: item.sellerId || item.seller_id || '',
  sellerName: item.sellerName || item.seller_name || '',
  sellerReputation: item.sellerReputation ?? item.seller_reputation ?? 4.3,
  status: item.status || 'disponible',
  interestedCount: item.interestedCount ?? item.interested_count ?? 0,
  interestedBy: item.interestedBy || item.interested_by || [],
  createdAt: item.createdAt || item.created_at || new Date().toISOString().slice(0, 10),
  source: 'api',
})

const extractList = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.publications)) return payload.publications
  return []
}

export function AppProvider({ children }) {
  const [user, setUserState] = useState(() => readStorage('ulima_user', null))

  const [marketplaceProducts, setMarketplaceProductsState] = useState(() =>
    mockMarketplaceProducts.map((item) => ({
      ...item,
      whatsapp: item.whatsapp || '',
      status: item.status || 'disponible',
      interestedCount: item.interestedCount || 0,
      interestedBy: item.interestedBy || [],
      source: 'mock',
    })),
  )

  const [cart, setCartState] = useState(() => readStorage('ulima_cart', []))
  const [favorites, setFavoritesState] = useState(() => readStorage('ulima_favorites', []))
  const [transactions, setTransactionsState] = useState(() => readStorage('ulima_transactions', []))
  const [toast, setToast] = useState(null)

  const persist = (key, setter) => (next) => {
    setter((current) => {
      const value = typeof next === 'function' ? next(current) : next
      writeStorage(key, value)
      return value
    })
  }

  const setUser = (next) => {
    setUserState(next)
    if (next) writeStorage('ulima_user', next)
    else localStorage.removeItem('ulima_user')
  }

  // marketplaceProducts ya no vive en localStorage: mock (fallback) + backend (real)
  const setMarketplaceProducts = setMarketplaceProductsState
  const setCart = persist('ulima_cart', setCartState)
  const setFavorites = persist('ulima_favorites', setFavoritesState)
  const setTransactions = persist('ulima_transactions', setTransactionsState)

  const notify = (message, type = 'success') => {
    setToast({ message, type })
    window.setTimeout(() => setToast(null), 2600)
  }

  // Carga publicaciones reales del backend y las mezcla con las demo
  useEffect(() => {
    let cancelled = false
    async function loadPublications() {
      try {
        const payload = await publicationApi.findAll()
        const apiItems = extractList(payload).map(normalizeFromApi)
        if (cancelled) return
        setMarketplaceProductsState((current) => {
          const mockOnly = current.filter((item) => item.source === 'mock')
          return [...apiItems, ...mockOnly]
        })
      } catch (error) {
        // Si el backend falla, se mantienen solo los productos demo ya cargados
        console.error('No se pudieron cargar las publicaciones del backend', error)
      }
    }
    loadPublications()
    return () => {
      cancelled = true
    }
  }, [])

  const login = (email, name = 'Alumno ULIMA') => {
    const nextUser = {
      id: 'user-1',
      name,
      email,
      reputation: readStorage('ulima_user', null)?.reputation ?? 4.6,
      successfulDeliveries: readStorage('ulima_user', null)?.successfulDeliveries ?? 3,
    }
    setUser(nextUser)
    notify('Sesion iniciada correctamente')
    return nextUser
  }

  const logout = () => {
    setUser(null)
    notify('Sesion cerrada')
  }

  const addMarketplaceProduct = async (product) => {
    const seller = user || { id: 'guest', name: 'Alumno invitado', reputation: 4.3 }
    const payload = {
      ...product,
      price: Number(product.price),
      sellerId: seller.id,
      sellerName: seller.name,
      sellerReputation: seller.reputation,
      whatsapp: product.whatsapp || '',
      status: product.status || 'disponible',
      interestedCount: product.interestedCount || 0,
      interestedBy: product.interestedBy || [],
    }
    try {
      const created = await publicationApi.create(payload)
      const nextProduct = created
        ? normalizeFromApi(created)
        : {
            ...payload,
            id: makeId('mk'),
            type: 'marketplace',
            source: 'api',
            createdAt: new Date().toISOString().slice(0, 10),
          }
      setMarketplaceProducts((items) => [nextProduct, ...items])
      notify('Publicacion creada')
      return nextProduct
    } catch (error) {
      notify(error.message || 'No se pudo crear la publicacion', 'error')
      throw error
    }
  }

  const updateMarketplaceProduct = async (id, updates) => {
    const current = marketplaceProducts.find((item) => item.id === id)
    const nextUpdates = {
      ...updates,
      price: updates.price !== undefined ? Number(updates.price) : current?.price,
    }
    try {
      if (current?.source === 'api') {
        await publicationApi.update({ ...current, ...nextUpdates, id })
      }
      setMarketplaceProducts((items) =>
        items.map((item) => (item.id === id ? { ...item, ...nextUpdates } : item)),
      )
      notify('Publicacion actualizada')
    } catch (error) {
      notify(error.message || 'No se pudo actualizar la publicacion', 'error')
    }
  }

  const toggleInterested = async (id, userId) => {
    const target = marketplaceProducts.find((item) => item.id === id)
    if (!target) return
    const interestedBy = target.interestedBy || []
    const isInterested = interestedBy.includes(userId)
    const nextInterestedBy = isInterested
      ? interestedBy.filter((uid) => uid !== userId)
      : [...interestedBy, userId]
    const nextCount = nextInterestedBy.length
    const nextStatus =
      nextCount > 0 && target.status !== 'vendido'
        ? 'interesado'
        : target.status === 'vendido'
          ? 'vendido'
          : 'disponible'

    setMarketplaceProducts((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, interestedBy: nextInterestedBy, interestedCount: nextCount, status: nextStatus }
          : item,
      ),
    )
    notify(isInterested ? 'Interés cancelado' : 'Interés registrado')

    if (target.source === 'api') {
      try {
        await publicationApi.update({
          ...target,
          id,
          interestedBy: nextInterestedBy,
          interestedCount: nextCount,
          status: nextStatus,
        })
      } catch (error) {
        console.error('No se pudo sincronizar el interés con el backend', error)
      }
    }
  }

  const isUserInterested = (id, userId) => {
    const product = marketplaceProducts.find((item) => item.id === id)
    return product && product.interestedBy && product.interestedBy.includes(userId)
  }

  const confirmPresencial = async (id) => {
    const target = marketplaceProducts.find((item) => item.id === id)
    setMarketplaceProducts((items) => items.map((item) => (item.id === id ? { ...item, status: 'vendido' } : item)))
    notify('Publicacion marcada como vendida')
    if (target?.source === 'api') {
      try {
        await publicationApi.update({ ...target, id, status: 'vendido' })
      } catch (error) {
        console.error('No se pudo sincronizar la venta con el backend', error)
      }
    }
  }

  const deleteMarketplaceProduct = async (id) => {
    const target = marketplaceProducts.find((item) => item.id === id)
    try {
      if (target?.source === 'api') {
        await publicationApi.remove(id)
      }
      setMarketplaceProducts((items) => items.filter((item) => item.id !== id))
      setFavorites((items) => items.filter((favorite) => favorite !== id))
      notify('Publicacion eliminada')
    } catch (error) {
      notify(error.message || 'No se pudo eliminar la publicacion', 'error')
    }
  }

  const toggleFavorite = (id) => {
    setFavorites((items) => (items.includes(id) ? items.filter((item) => item !== id) : [...items, id]))
  }

  const addToCart = (product) => {
    if (product.type !== 'store') return
    setCart((items) => {
      const exists = items.find((item) => item.id === product.id)
      if (exists) return items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      return [...items, { id: product.id, quantity: 1 }]
    })
    notify('Producto agregado al carrito')
  }

  const changeCartQuantity = (id, quantity) => {
    setCart((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeFromCart = (id) => setCart((items) => items.filter((item) => item.id !== id))

  const checkout = () => {
    setCart([])
    notify('Compra simulada finalizada')
  }

  const createTransaction = (product) => {
    const transaction = {
      id: makeId('tx'),
      productId: product.id,
      productTitle: product.title,
      price: product.price,
      buyer: user?.name || 'Comprador simulado',
      seller: product.sellerName,
      sellerId: product.sellerId,
      status: 'esperando_entrega',
      createdAt: new Date().toISOString(),
    }
    setTransactions((items) => [transaction, ...items])
    notify('Transaccion creada')
    return transaction
  }

  const completeTransaction = (id) => {
    setTransactions((items) =>
      items.map((item) => (item.id === id ? { ...item, status: 'entregado', deliveredAt: new Date().toISOString() } : item)),
    )
    setUserState((current) => {
      if (!current) return current
      const next = {
        ...current,
        reputation: Math.min(5, Number((current.reputation + 0.1).toFixed(1))),
        successfulDeliveries: current.successfulDeliveries + 1,
      }
      writeStorage('ulima_user', next)
      return next
    })
    notify('Entrega completada')
  }

  const allProducts = [...storeProducts, ...marketplaceProducts]
  const cartDetails = cart
    .map((item) => {
      const product = storeProducts.find((storeProduct) => storeProduct.id === item.id)
      return product ? { ...product, quantity: item.quantity } : null
    })
    .filter(Boolean)
  const cartTotal = cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const value = {
    user,
    login,
    logout,
    storeProducts,
    marketplaceProducts,
    allProducts,
    addMarketplaceProduct,
    updateMarketplaceProduct,
    deleteMarketplaceProduct,
    toggleInterested,
    isUserInterested,
    confirmPresencial,
    cart,
    cartDetails,
    cartTotal,
    addToCart,
    changeCartQuantity,
    removeFromCart,
    checkout,
    favorites,
    toggleFavorite,
    transactions,
    createTransaction,
    completeTransaction,
    toast,
    notify,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}