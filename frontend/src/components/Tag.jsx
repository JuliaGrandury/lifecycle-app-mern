const tagColors = {
    'tasman': 'var(--primary-tasman)',
    'green': 'var(--primary-green)',
    'galactic': 'var(--primary-galactic)',
}

const Tag = ({ label, color }) => {

    const tagStyles = {
        fontFamily: 'Poppins, sans-serif',
        height: '28px',
        width: 'fit-content',
        padding: '5px 10px',
        textAlign: 'center',
        fontSize: '13px',
        borderRadius: '8px',
        color: 'white',
        backgroundColor: `${tagColors[color]}`
    }

    return (
        <div style={tagStyles}>{label}</div>
    )
}

export default Tag