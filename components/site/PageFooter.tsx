import { Mark } from '@/components/home/bits';
import { PageLink } from './SiteNav';

/* The footer of the hub pages (updates, research, case files, the wall). The homepage has its own, with the sources. */
export function PageFooter({ children }: { children?: React.ReactNode }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-top">
          <PageLink className="logo" href="/" aria-label="Cars24 Patch — home"><Mark dark={false} /><span>Cars24 Patch</span></PageLink>
          <p className="foot-tag">made by people who are tired of swerving.<br /><span className="reb">Cars24 Patch · a Cars24 Rebellion.</span></p>
        </div>
        {children}
        <div className="foot-b"><span>© 2026 Cars24 Patch. All rights reserved.</span><span><PageLink href="/">back to the homepage</PageLink></span></div>
      </div>
    </footer>
  );
}
