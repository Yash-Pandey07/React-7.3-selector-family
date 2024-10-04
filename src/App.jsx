
import './App.css'
import { RecoilRoot, useRecoilState } from 'recoil';
import { todosAtomFamily } from './atom';

function App() {
  return <RecoilRoot>
    <Todo id={1}/>
    <Todo id={2} />
  </RecoilRoot>
}

function Todo({id}) {
   const [todo, setTodo] = useRecoilState(todosAtomFamily(id));


   if (!todo) {
    return <div>Loading...</div>; // Loading state
  }
  console.log(todo);
  

  return (
    <>
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <p>Completed: {todo.completed ? "Yes" : "No"}</p>
      <br />
    </>
  );
}

export default App