import '../index.css'

export default function Popup({ content }) {
    return (
        <div className="popup">
            <p>{ content }</p>
        </div>
    )
}