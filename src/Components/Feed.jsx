import Post from './Post';

const Feed = ({ posts }) => {
    return (
        <>
            {posts.map(x => (
                <Post key={x.id} post={x} />
            ))}
        </>
    )
}

export default Feed;