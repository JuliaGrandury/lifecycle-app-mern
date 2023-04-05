import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Closets = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  // const { items, isLoading, isError, message } = useSelector((state) => state.items)

  useEffect(() => {
    // if (isError) {
    //   console.log(message)
    // }

    if (!user) {
      navigate('/authentication')
    }

    // dispatch(getItems())

    // return () => {
    //   dispatch(reset())
    // }
  }, [user, navigate, dispatch])

  return (
    <section className="heading">
      <h1>Welcome to your closet {user ? user.username : null}</h1>
      <p>Closet Items</p>
    </section>
  )
}

export default Closets