import { useUser } from "@stackframe/stack";
import { Marketplace } from './Marketplace'
import { AuthPage } from './AuthPage'

export function MarketplaceApp() {
  const user = useUser();

  if (!user) {
    return <AuthPage />;
  }

  return <Marketplace />;
}
