const sphereColors = {
    'Beige': '#d0be95',
    'Black': '#000',
    'Blue': '#3372a9',
    'Brown': '#683f20',
    'Green': '#60882d',
    'Grey': '#838383',
    'Magenta': '#894fa5',
    'Metallic': '#e4cf74',
    'Multicolor': '',
    'Neon': '#e4ff3a',
    'Orange': '#ec8a4c',
    'Pink': '#e46eb5',
    'Print': '',
    'Red': '#e83223',
    'White': '#fff',
    'Yellow': '#f8dd57',
}

const ColorSphere = ({ color }) => {

    const sphereStyles = {
        height: '15px',
        width: '15px',
        borderRadius: '8px',
        backgroundColor: `${sphereColors[color]}`
    }

    return (
        <div style={sphereStyles}></div>
    )
}

export default ColorSphere