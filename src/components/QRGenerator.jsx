import QRCode from 'react-qr-code'

export default function QRGenerator({ value }) {
  return (
    <div className="inline-block rounded-lg bg-white p-4">
      <QRCode value={value} size={220} />
    </div>
  )
}
