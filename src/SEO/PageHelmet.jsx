import { Helmet } from "react-helmet-async";

export default function PageHelmet({ title, desc, type, setName }) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={desc} />
            
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={desc} />
            
            <meta name="twitter:creator" content={setName} />
            <meta name="twitter:card" content={type} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={desc} />
        </Helmet>
    )
}