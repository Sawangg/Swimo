// Import react
import { useNavigate } from "react-router-dom";

// Import material-ui
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export default function Bar() {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate("/Profile");
    };
    const handleTitleClick = () => {
        navigate("/");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={handleTitleClick}>
                    Agence
                </Typography>
                <IconButton size="large" color="inherit" onClick={handleProfileClick}>
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
