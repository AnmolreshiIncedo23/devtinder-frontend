import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed?.data);
  const getFeed = async () => {
    if (feed)
      return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    }
    catch (err) {
      console.log(err);
    }
  };
 

  useEffect(() => {
    getFeed();
  }, []);

  console.log(feed);
  if (feed==null)
    return;

  if(feed.length<=0)
    return <h1 className="flex justify-center">No New Users Found</h1>;
  return (
    feed && (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>)
  )
}

export default Feed