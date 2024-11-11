import { useEffect } from 'react';
import { axiosInstance } from '../Services/config';
import useZuStore from '../zuStore';
import SwipeCard from './SwipeCard';

const Profile = () => {
    const setSwipes = useZuStore(state => state.setSwipes);
    const activeUser = useZuStore(state => state.activeUser);
    const swipes = useZuStore(state => state.swipes);
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
            {swipes.map((swipe) => {
               
                   <SwipeCard key={swipe.id} swipe={swipe} />
                

            })}
        </div>
    )
}

export default Profile;