interface Props {
    count: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export default function QuantitySelector({ count, onIncrease, onDecrease }: Props) {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60px",

            border: "1px solid #ddd",
            borderRadius: "8px"
        }}>
            <button
                onClick={onDecrease}
                style={{ fontSize: "18px", cursor: "pointer" }}
            >
                −
            </button>

            <span style={{ fontSize: "18px", fontWeight: 600 }}>
                {count}
            </span>

            <button
                onClick={onIncrease}
                style={{ fontSize: "18px", cursor: "pointer" }}
            >
                +
            </button>
        </div>
    );
}
