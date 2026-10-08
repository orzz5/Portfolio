import { useNavigate, useLocation } from 'react-router-dom';
import { scrollToHash } from '../lib/scroll';

export default function SmartLink({ to, children, onClick, ...rest }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    if (to.startsWith('/#')) {
      e.preventDefault();
      const hashIndex = to.indexOf('#');
      const path = to.slice(0, hashIndex);
      const hash = to.slice(hashIndex);
      if (location.pathname === path && location.hash === hash) {
        scrollToHash(hash);
      } else {
        navigate(to);
      }
      return;
    }

    if (to.startsWith('/') && !to.startsWith('//')) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
