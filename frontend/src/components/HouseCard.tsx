// Import react
import { useState } from "react";

// Import material-ui
import { Card, CardContent, Typography, Dialog, AppBar, Toolbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type houseProps = {
    house: {
        name: string,
        type: string,
        desc: string,
        price: string,
        city: string,
    }
}

export default function HouseCard({ house }: houseProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div>
            <Card variant="outlined" onClick={() => setDialogOpen(true)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        { house.name }
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        City: { house.city }<br />
                        Type: { house.type }<br />
                        Price: { house.price }<br />
                        Description: { house.desc }
                    </Typography>
                </CardContent>
            </Card>

            <Dialog fullScreen open={dialogOpen}>
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={() => setDialogOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            { house.name }
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Typography variant="body2" color="text.secondary">
                    City: { house.city }<br />
                    Type: { house.type }<br />
                    Price: { house.price }<br />
                    Description: { house.desc }
                </Typography>
            </Dialog>
        </div>
    );
}
