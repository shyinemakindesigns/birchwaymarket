// Page heading block. The heading carries its own weight; chapter position
// is shown in the footer's chapter list instead of a label above it.
export default function PageIntro({ title, children }) {
  return (
    <header className="intro">
      <h1 id="page-title" tabIndex={-1}>{title}</h1>
      {children && <div className="intro-lede">{children}</div>}
    </header>
  )
}
