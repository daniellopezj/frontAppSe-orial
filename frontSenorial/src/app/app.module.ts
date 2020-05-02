import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MaterialModule } from './material';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { NavApplicactionComponent } from './componentes/nav-applicaction/nav-applicaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from './componentes/container/container.component';
import { ColaboradoresComponent } from './componentes/colaboradores/colaboradores.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MatIconModule } from '@angular/material/icon';
import { IUPersonComponent } from './componentes/iuperson/iuperson.component';
import { SrealizadosComponent } from './componentes/srealizados/srealizados.component';
import { SasignadosComponent } from './componentes/sasignados/sasignados.component';
import { SelectColaboratorComponent } from './componentes/select-colaborator/select-colaborator.component';
import { UsersComponent } from './componentes/users/users.component';
import { LoginComponent } from './componentes/login/login.component';
import { APP_BASE_HREF } from '@angular/common';
import { ChangePassComponent } from './componentes/change-pass/change-pass.component';

@NgModule({
  declarations: [
    AppComponent,
    NavApplicactionComponent,
    ContainerComponent,
    ColaboradoresComponent,
    InicioComponent,
    IUPersonComponent,
    SrealizadosComponent,
    SasignadosComponent,
    SelectColaboratorComponent,
    UsersComponent,
    LoginComponent,
    ChangePassComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    MaterialModule,
    MatGridListModule,
    MatButtonModule,
    LayoutModule,
    AppRoutingModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents:[
     IUPersonComponent, SelectColaboratorComponent, ChangePassComponent
  ],
  providers: [{provide:APP_BASE_HREF,useValue:''}],
  bootstrap: [AppComponent]
})
export class AppModule { }
