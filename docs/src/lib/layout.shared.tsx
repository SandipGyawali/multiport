import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { CreditCard } from 'lucide-react';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      enabled: true,
      title: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CreditCard size={24} />
          <span className='text-lg font-bold'>MultiPort</span> 
        </div>
      ),
      url: "/",
      transparentMode: "none"
    },
  };
}
