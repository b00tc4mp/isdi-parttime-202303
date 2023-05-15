function PasswordRevealer({ value }) {
    const [revealed, setRevealed] = useState(false);

    return (
        <div>
            <input 
                type={revealed ? "text" : "password" }
                value={value}
                onChange={() => {}}
            />
            <button onClick={() => setRevealed(!revealed)}>Show/Hide</button>
        </div>
    );
}