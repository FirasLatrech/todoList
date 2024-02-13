import {
  useGetOneUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
} from '../services/dashboardApi'

const Test = () => {
  // rtk query example
  const { data: users, isLoading, isError, isSuccess } = useGetUsersQuery({ page: 1, limit: 10 })
  const { data: user } = useGetOneUserQuery('hazem')
  const [updateUser] = useUpdateUserMutation()

  console.log({ users, user, isLoading, isError, isSuccess })

  return <div onClick={() => updateUser('test')}>Test</div>
}

export default Test
