import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const Settings = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate("/authentication")
    }
  }, [user, navigate])

  return (
    <section>
      This is {user.username}'s settings page
      {user.email}
    </section>
  )
}

export default Settings
