import { ServiceUserService } from './../../Services/service-user.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  listInfo: any;
  showinfo: boolean;
  headElements = ['Nombre', 'Apellido', 'edad', 'Celular', 'correo'];
  fileName = 'Datos Usuarios.xlsx';

  constructor(private userService: ServiceUserService) { }
  ngOnInit() {
    this.loadinfo();
  }

  loadinfo() {

    this.showinfo = false;
    this.userService.requestgetUsers().subscribe(res => {
      if (res.responseCode == 200) {
        this.listInfo = res.object;
        this.showinfo = true;
      } else {
        console.log("ocurrio  un error")
      }
    })
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
