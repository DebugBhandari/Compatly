
import { axiosInstance } from '../Services/config';
const SwipeCard = (Swipe) => {
    const deleteSwipe = async () => {
        await axiosInstance.delete(`/metrics/swipehistory/${Swipe.id}`)
        .then((res) => {
            console.log('Swipe Deleted:', res);
        })
        .catch((err) => {
            console.error('Error deleting swipe:', err);
        });
    }
    return (
        <div className="swipeCard">
            <h3>{Swipe.fullname}</h3>
            <p>{Swipe.email}</p>
            <p>{Swipe.leftswipe ? 'Left Swipe' : 'Right Swipe'}</p>
            <button onClick={deleteSwipe}>Delete Swipe</button>
        </div>
    )
}

export default SwipeCard;
