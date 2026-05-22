import EmptyState from './EmptyState'
import ProductCard from './ProductCard'

export default function ProductGrid({ products, renderItem }) {
  if (!products.length) return <EmptyState />
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (renderItem ? renderItem(product) : <ProductCard key={product.id} product={product} />))}
    </div>
  )
}
