import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export default function NavButton({ path = '..', text = 'Back' }) {
    const navigate = useNavigate()
    return (
        <Button variant="contained" sx={{ margin: 5 }} onClick={() => navigate(path)}>
            {text}
        </Button>
    )
}
