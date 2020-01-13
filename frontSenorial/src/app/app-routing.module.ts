import { SasignadosComponent } from './componentes/sasignados/sasignados.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradoresComponent } from './componentes/colaboradores/colaboradores.component';
import { ContainerComponent } from './componentes/container/container.component';
import { SrealizadosComponent } from './componentes/srealizados/srealizados.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { UsersComponent } from './componentes/users/users.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
    { path: '', component: ContainerComponent, children:[
        { path: 'colaboradores', component: ColaboradoresComponent },
        { path: 'asignados', component: SasignadosComponent },
        { path: 'realizados', component: SrealizadosComponent },
        { path: 'usuarios', component: UsersComponent },
        { path: '', component: InicioComponent },
    ]},
    { path: 'login', component: LoginComponent,},
   
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
