const Tag = ({ label, color }) => {
  const tagStyles = {
    fontFamily: "Poppins, sans-serif",
    height: "30px",
    width: "fit-content",
    padding: "5px 12px",
    textAlign: "center",
    fontSize: "13px",
    borderRadius: "15px",
    color: `${color}`,
    border: `1px solid ${color}`,
  }

  return <div style={tagStyles}>{label}</div>
}

export default Tag
