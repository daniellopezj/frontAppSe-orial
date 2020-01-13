import { SasignadosComponent } from './componentes/sasignados/sasignados.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColaboradoresComponent } from './componentes/colaboradores/colaboradores.component';
import { ContainerComponent } from './componentes/container/container.component';
import { SrealizadosComponent } from './componentes/srealizados/srealizados.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { UsersComponent } from './componentes/users/users.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './_guards';

const routes: Routes = [
    { path: '', component: ContainerComponent, children:[
        { path: 'colaboradores', component: ColaboradoresComponent, canActivate: [AuthGuard] },
        { path: 'asignados', component: SasignadosComponent,canActivate: [AuthGuard] },
        { path: 'realizados', component: SrealizadosComponent,canActivate: [AuthGuard] },
        { path: 'usuarios', component: UsersComponent,canActivate: [AuthGuard] },
        { path: '', component: InicioComponent ,canActivate: [AuthGuard]},
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
