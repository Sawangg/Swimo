// Import react
import { useState } from "react";

// Import material-ui
import { Card, CardContent, Typography, Dialog, AppBar, Toolbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface House {
    id: number;
    address: string;
    ownerName: string;
    type: string;
    nbRoom: number;
    area: number;
    state: string;
    price: number;
    date: Date;
    city: string;
    nbParking: number;
    image: string;
    desc: string;

}

type HouseProps = {
    house: House
}

export default function HouseCard({ house }: HouseProps) {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div>
            <Card variant="outlined" onClick={() => setDialogOpen(true)}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {house.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        City: {house.city}<br />
                        Type: {house.type}<br />
                        Price: {house.price}<br />
                        Description: {house.desc}
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
                            {house.address}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Typography variant="body2" color="text.secondary">
                    City: {house.city}<br />
                    Type: {house.type}<br />
                    Price: {house.price}<br />
                    Description: {house.desc}
                </Typography>
            </Dialog>
        </div>
    );
}
