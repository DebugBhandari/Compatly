import useZuStore from '../zuStore';
import SwipeCard from './SwipeCard';
import { useEffect } from 'react';
import { axiosInstance } from '../Services/config';

const Profile = () => {
   const swipes = useZuStore((state) => state.swipes);
   const setSwipes = useZuStore(state => state.setSwipes);
   const activeUser = useZuStore(state => state.activeUser);
    useEffect(() => {
        const fetchSwipes = async () => {
            await axiosInstance.get(`/metrics/swipehistory/${activeUser.id}`)
            .then((res) => {
                setSwipes(res.data);
            })
            .catch((err) => {
                console.error('Error getting swipes:', err);
            });
             }
            fetchSwipes();
    }, []);
  
    return (
        <div className="profileMainDiv">
            {swipes.map((swipe) => <SwipeCard key={swipe.id} swipe={swipe} />
                )}
        </div>
    )
}

export default Profile;