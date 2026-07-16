import { Search } from 'lucide-react'

export default function SearchBar({ value, onChange, placeholder = 'Buscar productos' }) {
  return (
    <label className="flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-2 focus-within:border-[#ff4b00]">
      <Search className="text-slate-400" size={18} />
      <input
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}
