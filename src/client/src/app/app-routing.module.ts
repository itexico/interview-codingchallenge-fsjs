import { Routes, RouterModule } from '@angular/router';
import { NewListComponent } from './components/lists/new-list/new-list.component';
import { ListsComponent } from './components/lists/lists.component';
import { EditListComponent } from './components/lists/edit-list/edit-list.component';
import { ItemsComponent } from './components/items/items.component';
import { NewItemComponent } from './components/items/new-item/new-item.component';
import { EditItemComponent } from './components/items/edit-item/edit-item.component';

const routes: Routes = [
  {path: 'lists', component: ListsComponent},
  {path: 'new-list', component: NewListComponent},
  {path: 'edit-list/:id', component: EditListComponent},

  {path: 'items/:listId', component: ItemsComponent},
  {path: 'new-item/:listId', component: NewItemComponent},
  {path: 'edit-item/:id', component: EditItemComponent},

  {path: '**', pathMatch: 'full', redirectTo: 'lists'}
];

export const AppRouting = RouterModule.forRoot(routes, {useHash: true});
