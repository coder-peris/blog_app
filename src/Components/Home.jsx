import Feed from "./Feed";
import { useStoreState } from "easy-peasy";

export const Home = ({ isLoading, fetchError }) => {
  const searchResults = useStoreState((s) => s.searchResults);
  return (
    <main className="home">
      {isLoading && <p className="status-msg">Loading...</p>}
      {fetchError && <p className="status-msg">Fetch Error...</p>}
      {!isLoading && !fetchError && (searchResults.length ? <Feed posts={searchResults} /> : <p className="status-msg">No posts found.</p>)}
    </main>
  )
}

export default Home;