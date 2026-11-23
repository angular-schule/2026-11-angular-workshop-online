import { Routes } from "@angular/router";
import { DashboardPage } from "./dashboard-page/dashboard-page";
import { BookDetailsPage } from "./book-details-page/book-details-page";

export const booksRoutes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
        path: 'dashboard',
        component: DashboardPage,
        /*resources: () => {
            return {
                booklist: nonBlocking(inject(BookStore).getAllResource())
            }
        }*/
    },
    { path: 'details/:isbn', component: BookDetailsPage },
];