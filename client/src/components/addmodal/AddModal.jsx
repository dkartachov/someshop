import { 
    Button,
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    TextField
} from "@mui/material";
import { getAddModalFields } from "../../utils/utils";
import { create } from "../../utils/api";

const AddModal = ({ open, close, save, module }) => {
    const onSave = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        try {
            await create(module, data);

            save();
            close();
        } catch (e) {
            console.log(e.message);
        }
    }

    return (
        <Dialog 
            open={open} 
            onClose={close} 
            disableRestoreFocus
        >
            <DialogTitle>{`Add ${module.slice(0, -1)}`}</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => onSave(e)}>
                    {(getAddModalFields(module) || []).map(field => (
                        <TextField 
                            key={field.id} 
                            id={field.id} 
                            name={field.name} 
                            placeholder={field.placeholder} 
                            type={field.type} 
                            variant={field.variant} 
                        />
                    ))}
                    <DialogActions>
                        <Button type='submit' onClick={close}>Save</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddModal;