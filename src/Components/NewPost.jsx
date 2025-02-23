import { format } from "date-fns";
import { useStoreActions, useStoreState } from "easy-peasy";
import { useNavigate } from "react-router-dom";



const NewPost = () => {
    const navigate = useNavigate();
    const posts = useStoreState((s) => s.posts);
    const newPostTitle = useStoreState((s) => s.newPostTitle);
    const newPostBody = useStoreState((s) => s.newPostBody);
    const savePost = useStoreActions((a) => a.savePost);
    const setNewPostTitle = useStoreActions((a) => a.setNewPostTitle);
    const setNewPostBody = useStoreActions((a) => a.setNewPostBody);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = posts.length ? String(Number(posts[posts.length - 1].id) + 1) : String(1);
        const datetime = format(new Date(), 'MMMM dd,yyyy pp');
        /* const title = newPostTitle;
        const body = newPostBody;
        const newPost = { id, title, datetime, body }; */
        const newPost = { id, title: newPostTitle, datetime, body: newPostBody };
        savePost(newPost);
        navigate('/');

    }
    return (
        <main className="newPost">
            <h2>Create a new post</h2>
            <form className="newPostForm" onSubmit={handleSubmit}>
                <label htmlFor="postTitle">Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    placeholder="Enter title here"
                    required
                    value={newPostTitle}
                    onChange={(e) => { setNewPostTitle(e.target.value) }}
                />

                <label htmlFor="postBody">Content:</label>
                <textarea
                    id="postBody"
                    required
                    placeholder="Enter content here"
                    value={newPostBody}
                    onChange={(e) => setNewPostBody(e.target.value)}
                >
                </textarea>

                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default NewPost;