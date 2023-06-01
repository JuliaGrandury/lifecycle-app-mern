import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getLists } from "../features/lists/listSlice"

const MyLists = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { lists, isLoading, isError, message } = useSelector((state) => state.lists)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) {
      navigate("/authentication")
    }
    dispatch(getLists())
  }, [user, navigate, isError, message, dispatch])

  return (
    <section>
      <table>
        <thead>
          <tr>
            <td>List Name</td>
            <td>Description</td>
            <td>Access</td>
            <td>Number of Items</td>
            <td>Created On</td>
          </tr>
        </thead>
        <tbody>
          {lists.map((list) => (
            <tr key={list.listname}>
              <td>{list.listname}</td>
              <td>{list.description}</td>
              <td>{list.public ? "Public" : "Private"}</td>
              <td>{list.items.length}</td>
              <td>{list.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

export default MyLists
