import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChartModule,
    TableModule,
    MultiSelectModule,
    FormsModule,
    TagModule,
    ProgressBarModule,
    ToastModule,
    DropdownModule,
    SliderModule,
    ToggleButtonModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    RatingModule,
    ToolbarModule,
    DialogModule,
    RadioButtonModule,
    InputNumberModule
  ],
  exports:[
    ChartModule,
    TableModule,
    MultiSelectModule,
    FormsModule,
    TagModule,
    ProgressBarModule,
    ToastModule,
    DropdownModule,
    SliderModule,
    ToggleButtonModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    RatingModule,
    ToolbarModule,
    DialogModule,
    RadioButtonModule,
    InputNumberModule
  ]
})
export class PrimengModule { }
