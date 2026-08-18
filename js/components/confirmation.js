import {openModal,closeModal} from './modal.js';
export function confirmAction({title='Are you sure?',message,confirmLabel='Continue',onConfirm}){
  openModal({title,content:`<p>${message}</p>`,actions:[{label:'Cancel',variant:'btn-secondary',onClick:closeModal},{label:confirmLabel,variant:'btn-primary',onClick:()=>{closeModal();onConfirm?.();}}]});
}
