import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpWrapperService} from "../../core/request/http-wrapper.service";
import {AuthUserService} from "../../core/auth/auth-user.service";
import {LoadingService} from "../../core/loading/loading.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";
import {API_ENDPOINTS} from "../../core/routes/api.endpoints";
import {ModalGenericComponent} from "../modal-generic/modal-generic.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "../../core/storage/local-storage.service";

class Administration {
  userId: number | undefined;
  userName: string | undefined;
  hours: number | undefined;
  useTelegram: boolean | undefined;
  incomeFileStatus: boolean | undefined;
  billFileStatus: boolean | undefined;
  completedHours: boolean | undefined;
  uploadActualBillFile: boolean | undefined;
  projectId: number | undefined;
  projectName: string | undefined
  companyId: number | undefined
  companyName: string | undefined
}


@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  private URL_READ: string = API_ENDPOINTS.RESOURCES.ADMINISTRATION_READ;
  private URL_SET_ACTIVE_TELEGRAM: string = API_ENDPOINTS.RESOURCES.ADMINISTRATION_SET_ACTIVE_TELEGRAM;
  private URL_UPLOAD_FILE: string = API_ENDPOINTS.RESOURCES.ADMINISTRATION_UPLOAD_FILE;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['userName', 'projectName', 'hours', 'useTelegram', 'incomeFiles', 'hoursDetail', 'billFiles', 'totalHours', 'billStatus', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  public registros: Administration[] = [];

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private httpWrapperService: HttpWrapperService,
    private authService: AuthUserService,
    private loadingService: LoadingService,
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    this.loadingService.tryToStopLoading();
    this.loadTable();
  }

  loadTable(): void {
    this.loadingService.tryToStartLoading();
    this.httpWrapperService.get(this.URL_READ).subscribe( ( response: any) => {
      this.registros = response.body;
      this.dataSource = new MatTableDataSource(this.registros);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingService.tryToStopLoading();

    });
  }

  changeSlide($event: MatSlideToggleChange) {
    console.log($event);
    const URL = this.URL_SET_ACTIVE_TELEGRAM + $event.source.id + '/status/' + $event.checked + '/set-active-telegram';
    this.httpWrapperService.put(URL).subscribe( (response: any) => {
      if(response.status === 'OK') {
        this.loadTable();
        this._snackBar.open('Estado cambiado', 'OK', {
          duration: 5000,
        });
        return;
      }
      this._snackBar.open('Error al intentar cambiar estado', 'OK', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }

  showModalUploadFile(type: string, userId: any, projectId: any, companyId: any) {
    const dialogRef = this.dialog.open(ModalGenericComponent, {
      width: '500px',
      data: {
        title: 'Subir archivo de ' + type,
        icon: 'cloud_upload',
        message: 'Seleccione el archivo a subir',
        buttonPrimary: 'Subir archivo',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      const URL: string = this.URL_UPLOAD_FILE + 'user-id/' + userId + '/project-id/' + projectId + '/company-id/' + companyId + '/upload-file-' + type;

      console.log('The dialog was closed');
      const formData: FormData = new FormData();
      formData.append('pdfFile', result);

      const headers = new HttpHeaders() // Usamos HttpHeaders en lugar de Headers
        .set('Accept', 'application/json')
        .set('Authorization', this.localStorageService.getItem('token') || '');

      // @ts-ignore
      this.httpClient.post(`${URL}`, formData, { headers: headers }).subscribe( {
          next: data => {
            console.log(data);
          },
          error: error => {
            console.log(error);
            this._snackBar.open('Error al intentar subir el archivo: ' + error.error.body.error, 'OK', {
              duration: 5000,
              verticalPosition: 'top'
            });
          },
          complete: () => {
            console.log('complete');
          }
        }
      );
    });
  }



  downloadFile(detalle: string) {

  }

  sendEmail(userId: any, projectId: any) {
    const URL: string = API_ENDPOINTS.RESOURCES.ADMINISTRATION_SEND_EMAIL + 'user-id/' + userId + '/project-id/' + projectId + '/send-email';
    this.loadingService.tryToStartLoading();
    this.httpWrapperService.get(URL).subscribe( (response: any) => {
      if(response.status === 'OK') {
        this._snackBar.open('Correo enviado', 'OK', {
          duration: 5000,
        });
        this.loadingService.tryToStopLoading();
        return;
      }
      this.loadingService.tryToStopLoading();
      this._snackBar.open('Error al intentar enviar correo', 'OK', {
        duration: 5000,
        verticalPosition: 'top'
      });
    });
  }
}
