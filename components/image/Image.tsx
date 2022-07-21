export default function Img(props: { src: string; srcAlt: string; alt: string; id?: string; className?: string; loading?: "eager" | "lazy" | undefined; }) {
    return (
        <picture>
            <source srcSet={props.src} type="image/webp" />
            <source srcSet={props.srcAlt} type="image/jpeg" />
            <img loading={props.loading} src={props.srcAlt} alt={props.alt} id={props.id} className={props.className} />
        </picture>
    );
}