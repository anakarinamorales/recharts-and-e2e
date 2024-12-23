import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

import type { DocumentInitialProps, DocumentContext } from 'next/document';

const RootDocumentMarkup = (props: DocumentInitialProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  /* eslint-disable-next-line no-underscore-dangle */ // @ts-ignore
  const { pageType } = props.__NEXT_DATA__.props.pageProps;
  return (
    <>
      <Html>
        <Head />
        <body data-page-type={pageType || 'product-page'}>
          <Main />
          <div id='modal-root'></div>
          <NextScript />
        </body>
      </Html>
    </>
  );
};

class RootDocument extends Document<DocumentInitialProps> {
  static async getInitialProps(
    context: DocumentContext
  ): Promise<DocumentInitialProps> {
    let initialProps = await Document.getInitialProps(context);
    const sheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      // eslint-disable-next-line no-param-reassign
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return <RootDocumentMarkup {...this.props} />;
  }
}

export default RootDocument;
