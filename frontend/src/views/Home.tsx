// Import components
import Bar from "components/Bar";
import HouseCard from "components/HouseCard";

// Import material-ui
import { Box, Grid } from "@mui/material";

export default function Home() {
    const houses = [
        {
            name: "test1",
            type: "appartment",
            desc: "the test1 appartetment",
            price: "100",
            city: "test1",
        },
        {
            name: "test2",
            type: "appartment",
            desc: "the test2 appartment",
            price: "100",
            city: "test2",
        },
        {
            name: "test3",
            type: "house",
            desc: "the test3 house",
            price: "100",
            city: "test3",
        },
        {
            name: "test4",
            type: "house",
            desc: "the test4 house",
            price: "100",
            city: "test4",
        },
    ];

    return (
        <div>
            <Bar />
            <Box m={1}>
                <Grid container spacing={1}>
                    {
                        houses.map(house => (
                            <Grid item xs={4} key={house.name}>
                                <HouseCard house={house} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </div>
    );
}
