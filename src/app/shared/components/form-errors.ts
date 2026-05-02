import { Component, computed, input } from "@angular/core";
import { FieldState } from "@angular/forms/signals";

@Component({
  selector: "app-form-errors",
  template: `
    @if (shouldShowError()) {
      @let firstError = firstErrorMessage();
      @if (firstError) {
        <small class="text-sm block text-red-500 mt-1">{{ firstError }}</small>
      }
    }
  `,
})
export class FormErrors {
  readonly control = input.required<FieldState<unknown>>();

  protected readonly shouldShowError = computed(() => {
    const field = this.control();
    return !field.valid() && (field.touched() || field.dirty());
  });

  protected readonly firstErrorMessage = computed(() => {
    const errors = this.control().errors();
    return errors.length > 0 ? errors[0].message : null;
  });
}
