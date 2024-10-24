import TodoList from '../components/TodoList'
import TodoStats from '../components/TodoStats'

const Test = () => {
  // rtk query example
  //   const { data: users, isLoading, isError, isSuccess } = useGetUsersQuery({ page: 1, limit: 10 })
  //   const { data: user } = useGetOneUserQuery('hazem')
  //   const [updateUser] = useUpdateUserMutation()

  //   const updateUserHnadler = () => {
  //     updateUser('test')
  //   }

  return (
    <div className="container-wrapper">
      <div className="blurred-circle"></div>
      <div className="app">
        <div className="container">
          <div className="app-grid">
            <div className="">
              <TodoStats />
            </div>
            <div className="main-content">
              <TodoList />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Test
