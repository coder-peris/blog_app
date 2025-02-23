import { useParams, Link, useNavigate } from "react-router-dom"
import { FaRegTrashAlt } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useStoreState, useStoreActions } from "easy-peasy";

const PostPage = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostById = useStoreState((state) => state.getPostById);
  const post = getPostById(id);

  const handleDelete = async (id) => {
    deletePost(id);
    navigate('/');
  }
  return (
    <main className="postPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}>
              <button>Edit Post <CiEdit /></button>
            </Link>
            <button onClick={() => handleDelete(post.id)}>
              Delete Post <FaRegTrashAlt />
            </button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>
              <Link to='/'>Go to Homepage</Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage;