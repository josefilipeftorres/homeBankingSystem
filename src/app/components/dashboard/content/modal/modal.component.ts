import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Output() closeModalEvent = new EventEmitter<void>();

  operationForm: FormGroup = new FormGroup({
    operation: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
  });

  constructor(
    private apiService: ApiService,
  ) { }

  onSubmit() {
    if (this.operationForm.invalid) {
      return;
    }

    const { operation, amount } = this.operationForm.value;

    const operationData = {
      operation,
      amount,
    };

    this.apiService.doOperation(operationData).subscribe({
      next: (user: any) => {
        window.location.reload();
      },
      error: (err: any) => {
        console.log("Error doing operation: ", err);
      },
    });
    this.closeModal();
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
