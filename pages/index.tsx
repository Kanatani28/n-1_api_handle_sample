import axios from 'axios'
import React, { useEffect, useState } from 'react'

type User = {
  id: number
  name: string
  companyId: number
  companyName: string
}

type Company = {
  id: number
  name: string
}

export const Home = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const users = (await axios.get<User[]>('http://localhost:3000/api/users'))
        .data

      for (const user of users) {
        const company = (
          await axios.get<Company>(
            `http://localhost:3000/api/companies/${user.companyId}`
          )
        ).data
        user.companyName = company.name
      }
      setUsers(users)
      setLoading(false)
    }

    fetchData()
  }, [])
  return (
    <>
      {!loading && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>会社</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={`user${user.id}`}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.companyName}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      {loading && <div>ロード中...</div>}
    </>
  )
}

export default Home
