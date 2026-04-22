import { create } from 'zustand';
import type { Beneficiary } from '../data/mockBeneficiaries';
import { mockBeneficiaries } from '../data/mockBeneficiaries';

interface TransferForm {
  recipient: string;
  iban: string;
  amount: string;
  note: string;
}

interface TransferState {
  beneficiaries: Beneficiary[];
  form: TransferForm;
  success: boolean;
  setField: (key: keyof TransferForm, value: string) => void;
  selectBeneficiary: (beneficiary: Beneficiary) => void;
  send: () => void;
  reset: () => void;
}

const initialForm: TransferForm = {
  recipient: '',
  iban: '',
  amount: '',
  note: '',
};

export const useTransferStore = create<TransferState>((set) => ({
  beneficiaries: mockBeneficiaries,
  form: initialForm,
  success: false,
  setField: (key, value) =>
    set((state) => ({ form: { ...state.form, [key]: value } })),
  selectBeneficiary: (beneficiary) =>
    set((state) => ({
      form: { ...state.form, recipient: beneficiary.name, iban: beneficiary.iban },
    })),
  send: () => set({ success: true }),
  reset: () => set({ form: initialForm, success: false }),
}));
