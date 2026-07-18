export default function ProgressiveBlur({ className = '' }) {
  return (
    <div className={`progressive-blur ${className}`} aria-hidden="true">
      <span className="progressive-blur__layer progressive-blur__layer--1" />
      <span className="progressive-blur__layer progressive-blur__layer--2" />
      <span className="progressive-blur__layer progressive-blur__layer--3" />
      <span className="progressive-blur__layer progressive-blur__layer--4" />
    </div>
  )
}
