import { useDispatch, useSelector } from "react-redux";
import { handleCloseDateModal, handleOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  const { isDateModalOpen } = useSelector((store) => store.ui);

  const openDateModal = () => {
    dispatch(handleOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(handleCloseDateModal());
  };

  const toggleDateModal = () => {
    isDateModalOpen ? openDateModal() : closeDateModal();
  };

  return {
    //Propiedades
    isDateModalOpen,

    //Métodos
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
