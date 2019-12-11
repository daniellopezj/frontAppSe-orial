import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradoresComponent } from './componentes/colaboradores/colaboradores.component';
import { ContainerComponent } from './componentes/container/container.component';
import { SpendientesComponent } from './componentes/spendientes/spendientes.component';
import { SrealizadosComponent } from './componentes/srealizados/srealizados.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

const routes: Routes = [
    { path: 'container', component: ContainerComponent },
    { path: 'colaboradores', component: ColaboradoresComponent },
    { path: 'pendienes', component: SpendientesComponent },
    { path: 'realizados', component: SrealizadosComponent },
    { path: '', component: InicioComponent },
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
