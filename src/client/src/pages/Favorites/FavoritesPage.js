import { useState } from "react";
import { useSelector } from "react-redux";
import FavoriteItemPage from "./Favorite/FavoriteItemPage";
import AddFavoritesPage from "./AddFavoritesPage";

export default function FavoritesPage() {

    const favorites = useSelector((state) => state.favorites);
    // console.log(favorites);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const openCreateModal = () => setIsOpenCreateModal(true);
    const closeCreateModal = () => setIsOpenCreateModal(false);

    let filteredLists = [];

    return (
        <>
            <div className="background-container">
                <div className="mx-5 py-5">
                    <h1 className="text-center">My Favorites</h1>
                    <div className="row">
                        <div className="col-lg-2 col-sm-12">
                            <h4 className="text-muted text-left p-1">Find</h4>
                            <div className="row justify-content-around">
                                <div className="col-4">
                                    <FavoriteItemPage className="row justify-content-around" />
                                    <FavoriteItemPage />
                                </div>
                            </div>
                            {/* <ListGroup
                            active={currentGenre}
                            onChange={(val) => this.handleChange("currentGenre", val)}
                            options={genres}
                        /> */}

                            {/* <Input
                            onChange={(val) =>
                                this.handleChange("rating", val.target.value)
                            }
                            label={"Rating"}
                            min={0}
                            max={10}
                            placeholder="0-10"
                            type="number"
                            iconClass="fas fa-star"
                        /> */}
                            <button to='/favorites/new' className='btn btn-primary btn-block my-2 text-white' onClick={openCreateModal} > Add New List </button>
                            {/* <Rating total={5} filled={rating} onChange={val => this.handleChange('rating', val)}/> */}
                        </div>
                        <div className="col-lg-10 col-sm-12">
                            {/* <Input
                            onChange={(event) =>
                                this.handleChange("searchFilter", event.target.value)
                            }
                            label="Search Movie"
                            iconClass="fas fa-search"
                            placeholder="Search..."
                        />
                        <p className="text-left text-muted">
                            {!!filteredMovies.length ? `${filteredMovies.length}` : "0"}
                            movies found.
                        </p> */}
                            {console.log("Lists: ", filteredLists)}
                            {!!filteredLists ? (
                                <h1 className="text-white">No List Found</h1>
                                // <MoviesTable
                                //     pageSize={pageSize}
                                //     currentPage={currentPage}
                                //     movies={filteredMovies}
                                // />
                            ) : (
                                <h1 className="text-white">No Movies</h1>
                            )}
                            <br />
                            {/* <Pagination
                            itemsCount={filteredMovies.length}
                            pageSize={pageSize}
                            onPageChange={this.onPageChange}
                            currentPage={currentPage}
                        /> */}
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
