export default function FilterBar({ category, setCategory, condition, setCondition, categories, conditions }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:flex lg:items-center">
      <select className="rounded-md border border-white/10 bg-[#171a1a] px-3 py-2 text-sm outline-none focus:border-[#ff4b00]" value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value="">Todas las categorias</option>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {conditions && (
        <select className="rounded-md border border-white/10 bg-[#171a1a] px-3 py-2 text-sm outline-none focus:border-[#ff4b00]" value={condition} onChange={(event) => setCondition(event.target.value)}>
          <option value="">Todas las condiciones</option>
          {conditions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
