import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async ({get}) => {
      //Suspense add ti check useRecoilStateLoadable
      await new Promise (r => setTimeout(r , 5000));
      try {
        //express server
        const res = await axios.get(`http://localhost:3000/todo?id=${id}`);  
        return res.data.todo;    
        //json server   
        // const res = await axios.get(`http://localhost:3001/todos`); // Fetch all todos        //json server
        // const todoItem = res.data.find(todo => todo.id === id); // Directly find the specific todo
        // if (!todoItem) throw new Error("Todo not found");
        // return todoItem; // Return the found todo
      } catch (error) {
        console.error("Error fetching todo:", error);
        return null; // Return null or handle the error as needed
      }
    },
  })
});