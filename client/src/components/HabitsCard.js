import React from "react"
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

const HabitsCard = ({ habit }) => {

    const renderUnits = () => {
        if (habit.name == "Water Intake") {
            return 'cups'
        } else if (habit.name == "Take a Shower") {
            return ''
        } else {
            return 'minutes'
        }
    }


    return (
        <Box>
            <Card sx={{ maxWidth: 800, padding: 5, margin: 2 }}>
                <CardContent
                    sx={{
                        "@media screen and (max-width: 800px)": {
                            paddingBottom: "20px",
                        },
                    }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        {habit.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Category: {habit.category} <br />
                        Goal: {habit.goal + renderUnits}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    )


}

export default HabitsCard;