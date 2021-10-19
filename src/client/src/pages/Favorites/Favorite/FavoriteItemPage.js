import DeleteFavoriteItemPage from "./DeleteFavoriteItemPage";
import EditFavoriteItemPage from "./EditFavoriteItemPage";
import { useDispatch } from 'react-redux';
// import { deletePost } from '../../../actions/favorites';
// import Favorites from "../../../../../server/models/favoritesModels";


export default function FavoriteItemPage() {

    // const dispatch = useDispatch();

    return (
        <>
            <div className="row justify-content-around">
                <h4>Favorite</h4>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" >1</th>
                            <td>Mark</td>
                            <td>
                                <button className="bi bi-trash" onClick={() => console.log("test")}>delete</button>
                                <button className="bi bi-pencil" onClick={() => console.log("test")}>edit</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>
                                <ul>
                                    <i className="bi bi-trash"></i>
                                    <i className="bi bi-pencil"></i>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <DeleteFavoriteItemPage
            />
            <EditFavoriteItemPage
            />
        </>
    )
}
