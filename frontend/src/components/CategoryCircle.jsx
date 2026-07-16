export default function CategoryCircle({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} className="group flex min-w-28 flex-col items-center gap-2 text-center">
      <span className={`grid h-20 w-20 place-items-center rounded-full border text-2xl transition ${
        active ? 'border-[#ff4b00] bg-[#ff4b00] text-white' : 'border-white/10 bg-white/5 text-[#ff7a3d] group-hover:border-[#ff4b00]'
      }`}>
        {icon}
      </span>
      <span className="text-xs font-semibold text-slate-300">{label}</span>
    </button>
  )
}
