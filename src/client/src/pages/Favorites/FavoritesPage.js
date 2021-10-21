import { useState } from "react";
import { useSelector } from "react-redux";
import FavoriteItemPage from "./Favorite/FavoriteItemPage";
import AddFavoritesPage from "./AddFavoritesPage";
import { Spinner } from "react-bootstrap";

export default function FavoritesPage() {

    const favorites = useSelector((state) => state.favorites);
    // console.log(favorites);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const openCreateModal = () => setIsOpenCreateModal(true);
    const closeCreateModal = () => setIsOpenCreateModal(false);

    return (
        <>
            <div className="background-container">
                <div className="mx-5 py-5">
                    <h1 className="text-center">My Favorites</h1>
                    <div className="row">
                        <div className="d-flex justify-content-end">
                            <button to='/favorites/new' className='btn btn-primary btn-block my-2 text-white' onClick={openCreateModal} > Add New List </button>
                        </div>
                        <div className="col-lg-10 col-sm-12">
                            {!favorites.length ? (
                                <>
                                    <Spinner animation="border" role="status">
                                        <span className=" visually-hidden">Loading...</span>
                                    </Spinner>
                                    <h4 className="text-center text-muted">No Lists Found</h4>
                                </>
                            ) : (
                                <div className="row justify-content-around">
                                    {favorites.map((favorite) => (
                                        <div className="col-4" key={favorite._id} >
                                            <FavoriteItemPage favorite={favorite} />
                                        </div>
                                    ))}
                                </div>
                            )}
                            <br />
                        </div>
                    </div>
                </div>
            </div >

            <AddFavoritesPage
                isOpen={isOpenCreateModal}
                close={closeCreateModal}
            />
        </>
    )
}
