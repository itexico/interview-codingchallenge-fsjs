var express = require('express');
var router = express.Router();

var ctrlStuffs = require('../controllers/stuffs');
var ctrlItems = require('../controllers/items');

router.get('/stuffs', ctrlStuffs.stuffs);
/*router.post('/stuffs', ctrlStuffs.stuffsCreate);
router.get('/stuffs/:stuffid', ctrlStuffs.stuffsReadOne);
router.put('/stuffs/:stuffid', ctrlStuffs.stuffsUpdateOne);
router.delete('/stuffs/:stuffid', ctrlStuffs.stuffsDeleteOne);
*/
// stuff items
//router.post('/stuffs/:stuffid/items', ctrlItems.stuffsItemsCreate);
router.get('/stuffs/:stuffid/items/:itemid', ctrlItems.stuffsItemsReadOne);
/*router.put('/stuffs/:stuffid/items/:itemid', ctrlItems.stuffsItemsUpdateOne);
router.delete('/stuffs/:stuffid/items/:itemid', ctrlItems.stuffsItemsDeleteOne);
*/

module.exports = router;
