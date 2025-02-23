import Layout from "./Components/Layout";
import Home from "./Components/Home";
import PostPage from "./Components/PostPage";
import About from "./Components/About";
import NewPost from "./Components/NewPost";
import Missing from "./Components/Missing";
import EditPost from "./Components/EditPost";
import { Route, Routes } from "react-router-dom";

import { useEffect } from "react";
import useAxiosFetch from "./hooks/useAxiosFetch";
import { useStoreActions } from "easy-peasy";


const App = () => {
  const setPosts = useStoreActions((actions)=> actions.setPosts);

/* Using custom hook for fetching data */
const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

useEffect(() => {
  setPosts(data);
}, [data]);

return (
  <Routes>
    <Route path='/' element={<Layout />} >
      <Route index element={<Home fetchError={fetchError} isLoading={isLoading}/>} />
      <Route path="about" element={<About />} />
      <Route path="new" element={<NewPost />} />
      <Route path="edit/:id" element={<EditPost />} />
      <Route path="post/:id" element={<PostPage />} />
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
);
}

export default App;