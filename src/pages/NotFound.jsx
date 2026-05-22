import Button from '../components/Button'
import EmptyState from '../components/EmptyState'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl">
      <EmptyState title="Ruta no encontrada" text="Vuelve al inicio para seguir explorando ULIMA MARKET." />
      <div className="mt-4 flex justify-center">
        <Button to="/">Ir al home</Button>
      </div>
    </div>
  )
}
