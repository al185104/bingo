import { Routes } from '@angular/router';
import { Home } from './home/home';
import { History } from './history/history'

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'history', component: History }
];
