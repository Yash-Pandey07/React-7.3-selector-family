
import './App.css'
import { RecoilRoot, useRecoilState , useRecoilStateLoadable ,useRecoilValueLoadable } from 'recoil';
import { todosAtomFamily } from './atom';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function App() {
   // State to track if any of the todos have an error
   const [hasError, setHasError] = useState(false);

  // return <RecoilRoot>
  //   <Todo id={1}/>
  //   <Todo id={2} />
  //   <Todo id={3} />
  // </RecoilRoot>

  return (
    <RecoilRoot>
      {/* If any error occurs, show the error message */}
      {hasError && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unable to load data — <strong>please try again later!</strong>
        </Alert>
      )}

      {/* Pass setHasError to child components */}
      <Todo id={1} setHasError={setHasError} />
      <Todo id={2} setHasError={setHasError} />
      <Todo id={3} setHasError={setHasError} />
    </RecoilRoot>
  );
}

function Todo({id , setHasError }) {
   //const [todo, setTodo] = useRecoilState(todosAtomFamily(id)); 
   //useRecoilStateLoadable his hook returns a Loadable object for the value along with the setter callback.
   const [todo, setTodo] = useRecoilStateLoadable(todosAtomFamily(id)); 
   //const [todo, setTodo] = useRecoilValueLoadable(todosAtomFamily(id)); 

  //if you are not using useRecoilStateLoadable so we need to add this check to check data is present or not from API .

  useEffect(() => {
    // If there's an error, update the error state in the parent
    if (todo.state === 'hasError') {
      setHasError(true);
    }
  }, [todo.state, setHasError]);

   // Loading state with MUI Skeletons
   if (todo.state === "loading") {
    //return <div>Loading...</div>; // Loading state
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

   // Skip individual error handling since we are showing a single error at the top
   if (todo.state === 'hasError') {
    return null;
  }

  //  // Error state if data failed to load
  // using it it MAIN function to render only 1 error if data is not present from backend .
  //  if (todo.state === 'hasError' || !todo.contents) {
  //   // return <div>
  //   //   Error While loading data from backend !!!! 
  //   // </div>

  //   return (
  //     <Alert severity="error">
  //       <AlertTitle>Error</AlertTitle>
  //       Unable to load data — <strong>please try again later!</strong>
  //     </Alert>
  //   );
  // }

   //console.log(todo.state);
    // Success state - Display todo if data is available
  if (todo.state === "hasValue"){

    const { title, description, completed } = todo.contents || {};

    if (!title && !description) {
      return (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          No data available for this todo item.
        </Alert>
      );
    }

    // return (
    //   <>
    //     <h3>{todo.contents.title}</h3>
    //     <p>{todo.contents.description}</p>
    //     <p>Completed: {todo.contents.completed ? "Yes" : "No"}</p>
    //     <br />
    //   </>
    // );
    return (
      <>
        <h3>{title || "Untitled"}</h3>
        <p>{description || "No description provided."}</p>
        <p>Completed: {completed ? 'Yes' : 'No'}</p>
        <br />
      </>
    );

  }

  return null; // Fallback
}

export default App