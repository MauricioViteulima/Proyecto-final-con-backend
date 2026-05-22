import { Camera, CheckCircle2 } from 'lucide-react'
import Button from './Button'

export default function QRScanner({ onSuccess, completed }) {
  return (
    <div className="rounded-lg border border-dashed border-white/15 bg-white/5 p-6 text-center">
      {completed ? (
        <div className="grid place-items-center gap-3 py-8">
          <CheckCircle2 className="text-emerald-400" size={64} />
          <p className="text-xl font-black">Entrega completada</p>
        </div>
      ) : (
        <div className="grid place-items-center gap-4 py-8">
          <Camera className="text-[#ff7a3d]" size={58} />
          <p className="max-w-md text-sm text-slate-400">
            Camara simulada para la demo. El paquete html5-qrcode esta instalado, y este boton representa un escaneo correcto.
          </p>
          <Button type="button" onClick={onSuccess}>Simular escaneo correcto</Button>
        </div>
      )}
    </div>
  )
}
