import { CanDeactivateFn } from '@angular/router';
import { Register } from '../pages/public/register/register';

export const confirmToExitGuard: CanDeactivateFn<Register> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  const isLoading = component.isLoading();
  return isLoading
    ? confirm('Sei sicuro di voler uscire? Perderai i dati che sta inviando al server')
    : true;
};
