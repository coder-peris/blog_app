import { useEffect } from "react";
import { format } from "date-fns";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useStoreActions, useStoreState } from "easy-peasy";


const EditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const editedTitle = useStoreState((s) => s.editedTitle);
    const editedBody = useStoreState((s) => s.editedBody);
    const editPost = useStoreActions((a) => a.editPost);
    const setEditedTitle = useStoreActions((a) => a.setEditedTitle);
    const setEditedBody = useStoreActions((a) => a.setEditedBody);

    const getPostById = useStoreState((state) => state.getPostById);
    const post = getPostById(id);


    useEffect(() => {
        if (post) {
            setEditedTitle(post.title);
            setEditedBody(post.body);
        }
    }, [post])

    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd,yyyy pp');
        const editedPost = { id, title: editedTitle, datetime, body: editedBody };
        editPost(editedPost);
        navigate(`/post/${id}`);
    }

    return (
        <main className="newPost">
            {editedTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input
                            type="text"
                            id="postTitle"
                            placeholder="Enter title here"
                            value={editedTitle}
                            onChange={(e) => { setEditedTitle(e.target.value) }}
                        />

                        <label htmlFor="postBody">Content:</label>
                        <textarea
                            id="postBody"
                            required
                            placeholder="Enter content here"
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                        >
                        </textarea>

                        <button type="button" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editedTitle &&
                <>
                    <h2>Post not found.</h2>
                    <p>Well, that's disappointing.</p>
                    <p><Link to='/'>Go to homepage.</Link></p>
                </>
            }
        </main>
    )
}

export default EditPost;