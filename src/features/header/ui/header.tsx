import { type FC } from 'react';
import { LogOut } from 'lucide-react';

import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Logo } from '@/shared/ui/logo';
import { SearchField } from '@/shared/ui/search-field';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={cn(className, 'h-16 bg-primary-foreground flex items-center')}
    >
      <Container className="flex items-center justify-between w-full gap-4">
        <Logo />
        <SearchField onSearch={() => {}} />
        <div>
          <Button variant="outline">
            <LogOut />
            Выйти
          </Button>
        </div>
      </Container>
    </header>
  );
};
