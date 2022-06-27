import Document, { Html, Main, NextScript, Head } from "next/document";

class MyDocument extends Document {
  render () {
    return <Html lang="en"> 
      <Head></Head>
      <body> 
        <Main></Main>
        <NextScript/>
      </body>
    </Html>
  }
}

export default MyDocument;