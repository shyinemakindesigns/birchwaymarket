import { Link } from 'react-router-dom'
import PageIntro from '../components/PageIntro.jsx'

export default function NotFound() {
  return (
    <div className="page">
      <PageIntro title="Page not found">
        <p>There’s no page at this address. <Link to="/">Go to the home page</Link> or open the menu to pick a chapter.</p>
      </PageIntro>
    </div>
  )
}
