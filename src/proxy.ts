import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

// Next's proxy adapter requires absolute Location URLs. Preserve next-intl's
// response, including its redirect origin, headers and locale cookie.
export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)"
  ]
};
