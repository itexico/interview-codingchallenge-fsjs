import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ListsComponent } from './pages/lists/lists.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';

//Especificar rutas
const app_routes: Routes = [
    {path: 'lists', component: ListsComponent},
    {path: 'itemList', component: ItemsListComponent},
    {path: '**', pathMatch: 'full', redirectTo: ''}
]



@NgModule({
    imports:[
        RouterModule.forRoot(app_routes,{useHash:true})
    ],
    exports:[
        RouterModule
    ]

})
export class AppRoutingModule {

}