import Container from '@/components/ui/Container';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center py-2 mt-2 shadow-md">
      <Container>
        <Link to="#" aria-label="Home">
          <img
            src="https://www.svgrepo.com/show/491978/gas-costs.svg"
            height="40"
            width="40"
          />
        </Link>
      </Container>
    </nav>
  );
}
