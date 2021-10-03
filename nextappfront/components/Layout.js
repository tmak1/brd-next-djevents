import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from './Header';
import Footer from './Footer';
import Showcase from './partials/Showcase';
import SearchBox from './form-elements/SearchBox';

function Layout({ title = '', keywords, description, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{`${title}${title && ' - '}Next Events`}</title>
        <meta name="viewport" content="width=device-width" />
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
      </Head>
      <header>
        <Header />
        {router.pathname !== '/' &&
          router.pathname !== '/account/login' &&
          router.pathname !== '/account/signup' && (
            <div className="mt-20 ml-8 flex justify-center items-center md:hidden">
              <SearchBox />
            </div>
          )}
      </header>
      {router.pathname === '/' && <Showcase />}
      <div className="flex flex-col justify-between">
        <main className="w-full mx-auto p-5 lg:w-3/4">
          <div className="mt-10 md:mt-20">{children}</div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
}

Layout.defaultProps = {
  description: 'An app to find dj events',
  keywords: 'music, dj, edm, event',
};

export default Layout;
