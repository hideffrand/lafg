import { Helmet } from "react-helmet";

export default function PageHelmet({ author, title, desc, url }) {
    return (
        <Helmet>
            <title>{title}</title>
            <base href="https://www.lafg.online" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="author" content={author} />
            <meta name="description" content={desc} />
            
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            <meta property="og:image" content="https://i.ibb.co/SPGWxkF/meta-thumbnail.png" />
            
            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content={url} />
            <meta property="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content="https://i.ibb.co/SPGWxkF/meta-thumbnail.png" />
        </Helmet>
    )
}