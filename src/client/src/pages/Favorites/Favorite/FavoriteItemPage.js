
import AddFavoriteItemPage from "./AddFavoriteItemPage";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { deleteFavoritesItem } from '../../../actions/favorites';
import useModal from '../../../hooks/useModal';

export default function FavoriteItemPage({ favorite }) {

    const [isOpenCreateItemModal, openCreateItemModal, closeCreateItemModal] = useModal();
    const [favoriteListData, setFavoriteListData] = useState(favorite);

    const dispatch = useDispatch();

    const handleDelete = async (favorite, itemId) => {
        let updatedfavoriteData = {
            ...favoriteListData
        };
        var newItemList = favorite.items.filter(item => item.id !== itemId);
        console.log("updated favorite items: ", newItemList);
        updatedfavoriteData.items = newItemList
        setFavoriteListData(updatedfavoriteData);

        dispatch(deleteFavoritesItem(favorite._id, updatedfavoriteData));
    };

    return (
        <>
            <div className="card">
                <h4 className="text-center">{favorite.title}</h4>
                <div className="d-flex justify-content-end">
                    <button className="btn btn-sm font-size-sm text-light bg-success rounded-pill" onClick={openCreateItemModal} >Add Item</button>
                </div>
                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Item</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favorite.items.map((fav) => (
                            <tr key={fav.id}>
                                <td >{fav.name}</td>
                                <td>
                                    <button className="btn btn-sm font-size-sm bg-danger" onClick={(e) => handleDelete(favorite, fav.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddFavoriteItemPage
                isOpen={isOpenCreateItemModal}
                close={closeCreateItemModal}
                favorite={favorite} />
        </>
    )
}
