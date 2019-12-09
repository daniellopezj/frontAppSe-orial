import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradoresComponent } from './componentes/colaboradores/colaboradores.component';
import { ContainerComponent } from './componentes/container/container.component';

const routes: Routes = [
    { path: 'container', component: ContainerComponent },
    { path: 'colaboradores', component: ColaboradoresComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes,
        {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            scrollOffset: [0, 53]
        },
    )
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
