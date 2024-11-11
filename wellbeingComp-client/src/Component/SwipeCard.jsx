
import { axiosInstance } from '../Services/config';
import "../Styles/SwipeCard.css";
import useZuStore from '../zuStore';

const SwipeCard = (swipe) => {
    const deleteSwipeFromStore = useZuStore((state) => state.deleteASwipe);
    const deleteSwipe = async (id) => {
        await axiosInstance.delete(`/metrics/swipe/delete/${id}`)
        .then((res) => {
            deleteSwipeFromStore(id);
            console.log('Swipe Deleted:', res);
        })
        .catch((err) => {
            console.error('Error deleting swipe:', err);
        });
    }
    
    return (
        <div className={swipe.swipe.leftswipe?"swipeCard leftswipe":"swipeCard rightswipe"}>
            <h2>{swipe.swipe.fullname}</h2>
            <p>{swipe.swipe.email}</p>
            <h3>Compatibility: {swipe.swipe.compatibility_percentage}%</h3>
            <button onClick={()=>deleteSwipe(swipe.swipe.id)} className="signin_button">Delete Swipe</button>
        </div>
    )
}

export default SwipeCard;
