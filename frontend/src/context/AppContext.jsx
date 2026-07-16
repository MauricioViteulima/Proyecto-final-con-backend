import { useMemo, useState } from 'react'
import { AppContext } from './AppContextBase'
import { marketplaceProducts as mockMarketplaceProducts, storeProducts } from '../data/mockProducts'
import { makeId } from '../utils/format'

const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

const writeStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value))

export function AppProvider({ children }) {
  const [user, setUserState] = useState(() => readStorage('ulima_user', null))
  const [marketplaceProducts, setMarketplaceProductsState] = useState(() => {
    const items = readStorage('ulima_marketplaceProducts', mockMarketplaceProducts)
    return items.map((item) => ({
      ...item,
      whatsapp: item.whatsapp || '',
      status: item.status || 'disponible',
      interestedCount: item.interestedCount || 0,
      interestedBy: item.interestedBy || [],
    }))
  })
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

  const setMarketplaceProducts = persist('ulima_marketplaceProducts', setMarketplaceProductsState)
  const setCart = persist('ulima_cart', setCartState)
  const setFavorites = persist('ulima_favorites', setFavoritesState)
  const setTransactions = persist('ulima_transactions', setTransactionsState)

  const notify = (message, type = 'success') => {
    setToast({ message, type })
    window.setTimeout(() => setToast(null), 2600)
  }

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

  const addMarketplaceProduct = (product) => {
    const seller = user || { id: 'guest', name: 'Alumno invitado', reputation: 4.3 }
    const nextProduct = {
      ...product,
      id: makeId('mk'),
      type: 'marketplace',
      price: Number(product.price),
      sellerId: seller.id,
      sellerName: seller.name,
      sellerReputation: seller.reputation,
      whatsapp: product.whatsapp || '',
      status: product.status || 'disponible',
      interestedCount: product.interestedCount || 0,
      interestedBy: product.interestedBy || [],
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setMarketplaceProducts((items) => [nextProduct, ...items])
    notify('Publicacion creada')
    return nextProduct
  }

  const updateMarketplaceProduct = (id, updates) => {
    setMarketplaceProducts((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, ...updates, price: updates.price !== undefined ? Number(updates.price) : item.price }
          : item,
      ),
    )
    notify('Publicacion actualizada')
  }

  const toggleInterested = (id, userId) => {
    let wasInterested = false
    setMarketplaceProducts((items) =>
      items.map((item) => {
        if (item.id !== id) return item
        const interestedBy = item.interestedBy || []
        const isInterested = interestedBy.includes(userId)
        wasInterested = isInterested
        const nextInterestedBy = isInterested ? interestedBy.filter((uid) => uid !== userId) : [...interestedBy, userId]
        const nextCount = nextInterestedBy.length
        return {
          ...item,
          interestedBy: nextInterestedBy,
          interestedCount: nextCount,
          status: nextCount > 0 && item.status !== 'vendido' ? 'interesado' : item.status === 'vendido' ? 'vendido' : 'disponible',
        }
      }),
    )
    notify(wasInterested ? 'Interés cancelado' : 'Interés registrado')
  }

  const isUserInterested = (id, userId) => {
    const product = marketplaceProducts.find((item) => item.id === id)
    return product && product.interestedBy && product.interestedBy.includes(userId)
  }

  const confirmPresencial = (id) => {
    setMarketplaceProducts((items) => items.map((item) => (item.id === id ? { ...item, status: 'vendido' } : item)))
    notify('Publicacion marcada como vendida')
  }

  const deleteMarketplaceProduct = (id) => {
    setMarketplaceProducts((items) => items.filter((item) => item.id !== id))
    setFavorites((items) => items.filter((favorite) => favorite !== id))
    notify('Publicacion eliminada')
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

  const allProducts = useMemo(() => [...storeProducts, ...marketplaceProducts], [marketplaceProducts])
  const cartDetails = useMemo(
    () =>
      cart
        .map((item) => {
          const product = storeProducts.find((storeProduct) => storeProduct.id === item.id)
          return product ? { ...product, quantity: item.quantity } : null
        })
        .filter(Boolean),
    [cart],
  )
  const cartTotal = useMemo(
    () => cartDetails.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartDetails],
  )

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
