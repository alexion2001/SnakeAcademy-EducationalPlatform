import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormsModule } from '@angular/forms'; 
import { MatInputModule } from '@angular/material/input'; 
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatRadioModule} from '@angular/material/radio';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { RichTextEditorModule} from '@syncfusion/ej2-angular-richtexteditor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatBadgeModule,
    MatRadioModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSelectModule,
    RichTextEditorModule,
    
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatBadgeModule,
    MatRadioModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatSelectModule,
    RichTextEditorModule  
  ]
})
export class MaterialModule { }
