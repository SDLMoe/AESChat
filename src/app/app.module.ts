import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AddNewKeyDialog, ConfirmDelDialog, DashboardComponent, EditKeyDialog } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { EncryptionComponent } from './encryption/encryption.component';
import { AboutComponent } from './about/about.component';
import { EncryptionTextTextComponent } from './encryption-text-text/encryption-text-text.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarMessageComponent } from './snackbar-message/snackbar-message.component';
import { TextInputComponent } from './text-input/text-input.component';
import { EncryptionImageTextComponent } from './encryption-image-text/encryption-image-text.component';
import { MatTableModule } from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DropzoneDirective } from './directive/dropzone.directive';
import { DropUploadComponent } from './drop-upload/drop-upload.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SelectKeyComponent } from './select-key/select-key.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './loader/loader.component';
import { LoadingMaskDirective } from './directive/loading-mask.directive'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    EncryptionComponent,
    AboutComponent,
    EncryptionTextTextComponent,
    SnackbarMessageComponent,
    TextInputComponent,
    EncryptionImageTextComponent,
    EditKeyDialog,
    AddNewKeyDialog,
    DropzoneDirective,
    DropUploadComponent,
    SelectKeyComponent,
    ConfirmDelDialog,
    LoaderComponent,
    LoadingMaskDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ClipboardModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
