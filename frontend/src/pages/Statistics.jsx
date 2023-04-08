import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Statistics = () => {

  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/authentication')
    }
  }, [user, navigate])

  return (
    <div>This is the Statistics Page
      <div>Your 5 Most Worn Items</div>
      <div>Your 5 Least Worn Items</div>
      <div>You wear 40% of your closet</div>
      <div>You have spent 100$ on your closet this year</div>
      <table>
        <tbody>
          <tr>
            <td>Items in Closet</td>
            <td>76</td>
          </tr>
          <tr>
            <td>Items in Repair</td>
            <td>3</td>
          </tr>
          <tr>
            <td>Items out of Closet</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Statistics