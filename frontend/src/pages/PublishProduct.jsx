import { useNavigate, useSearchParams } from 'react-router-dom'
import PublicationForm from '../components/PublicationForm'
import { useApp } from '../context/useApp'

export default function PublishProduct() {
  const { addMarketplaceProduct, marketplaceProducts, updateMarketplaceProduct } = useApp()
  const [params] = useSearchParams()
  const editId = params.get('edit')
  const product = marketplaceProducts.find((item) => item.id === editId)
  const navigate = useNavigate()

  const submit = (data) => {
    if (product) updateMarketplaceProduct(product.id, data)
    else addMarketplaceProduct(data)
    navigate('/marketplace')
  }

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-[#ff7a3d]">Marketplace Alumnos</p>
        <h1 className="text-3xl font-black">{product ? 'Editar publicacion' : 'Publicar producto'}</h1>
      </div>
      <PublicationForm initialProduct={product} onSubmit={submit} />
    </div>
  )
}
