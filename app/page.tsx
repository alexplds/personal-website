import { ChatWidget } from "@/components/chat-widget";
import { DualIdentity } from "@/components/dual-identity";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <DualIdentity />
      <SiteFooter />
      <ChatWidget />
    </div>
  );
}
