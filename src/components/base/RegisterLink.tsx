import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { REGISTER_URL } from '@/lib/siteConfig';

interface RegisterLinkProps {
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}

/**
 * Link "Đăng Ký" dùng chung.
 * Tự nhận biết REGISTER_URL là link nội bộ hay link ngoài để mở đúng cách.
 */
export default function RegisterLink({ className, children, onNavigate }: RegisterLinkProps) {
  const isExternal = /^https?:\/\//i.test(REGISTER_URL);

  if (isExternal) {
    return (
      <a
        href={REGISTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={onNavigate}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      to={REGISTER_URL}
      className={className}
      onClick={() => {
        onNavigate?.();
        window.scrollTo({ top: 0, behavior: 'auto' });
      }}
    >
      {children}
    </Link>
  );
}