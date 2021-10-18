import DeleteFavoriteItemPage from "./DeleteFavoriteItemPage";
import EditFavoriteItemPage from "./EditFavoriteItemPage";

export default function FavoriteItemPage() {

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
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>
                                <ul>
                                    <i class="bi bi-trash">&nbsp;</i>
                                    <i class="bi bi-pencil">&nbsp;</i>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>
                                <ul>
                                    <i class="bi bi-trash"></i>
                                    <i class="bi bi-pencil"></i>
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
