
import { useScrollToTop } from '@/hooks/useScrollToTop';

/**
 * Component that handles scrolling to top when navigation occurs
 * This is a "silent" component with no UI, just behavior
 */
const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

export default ScrollToTop;
