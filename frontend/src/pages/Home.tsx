// Import components
import Bar from "components/Bar";

// Import material-ui
import { Box, Grid } from "@mui/material";
import HouseCard, { House } from "components/HouseCard";
import useSWR from "swr";

export default function Home() {
    const { data } = useSWR("http://localhost:3001/api/housing", { suspense: true, fetcher: (...args) => fetch(...args).then(res => res.json()) });

    return (
        <>
            <Bar />
            <Box m={1}>
                <Grid container spacing={1}>
                    {
                        data.map((house: House) => (
                            <Grid item xs={4} key={house.id}>
                                <HouseCard house={house} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </>
    );
}
