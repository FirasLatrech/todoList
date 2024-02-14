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
  const updateUserHnadler = () => {
    updateUser('test')
  }

  return <div onClick={updateUserHnadler}>Test</div>
}

export default Test
