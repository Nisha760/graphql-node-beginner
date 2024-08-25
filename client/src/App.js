import logo from './logo.svg';
import './App.css';
import { gql, useQuery } from "@apollo/client"
import { useEffect } from 'react';



const GET_TODOS = gql`
  query GetTodoList {
    getTodos {
      id
      title
      user {
        name
      }
    }
  }
`

function App() {

  const {loading, error, data} = useQuery(GET_TODOS);

  useEffect(() => {
    console.log(data);
  }, [data])

  if(loading)
    return <>loading...</>
  if(error)
    return <>{error}</>

  return (
    <div className="App">
      {JSON.stringify(data?.getTodos)}
    </div>
  );
}

export default App;
