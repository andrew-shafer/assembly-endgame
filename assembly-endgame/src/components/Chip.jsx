export default function Chip(props) {
    const styles = {
        backgroundColor: props.backgroundColor,
        color: props.color
    };

    return (
        <div className="chip" style={styles}>
            <span>{props.name}</span>
        </div>
    )
}