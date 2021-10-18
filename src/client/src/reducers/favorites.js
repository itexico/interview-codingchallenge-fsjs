export default (favorites = [], action) => {

    switch (action.type) {
        case 'FETCH_ALL':
            return favorites;
        case 'CREATE':
            return favorites;
        default:
            return favorites;
    }
}