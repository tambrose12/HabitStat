import React, { useContext } from "react";
import { UserContext } from "./context/user";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";

const Charts = () => {

    const { user } = useContext(UserContext)

    const waterData = {};
    const exerciseData = {};
    const meditationData = {};
    for (const entry of user.history) {
        console.log(entry)
        if (entry.habit.name == "Water Intake") {
            const date = new Date(entry.created_at).toLocaleDateString();
            if (!waterData[date]) {
                waterData[date] = 0;
            }
            waterData[date] += entry.amount;

        } else if (entry.habit.category == "exercise") {
            const date = new Date(entry.created_at).toLocaleDateString();
            if (!exerciseData[date]) {
                exerciseData[date] = 0;
            }
            exerciseData[date] += entry.amount;

        } else if (entry.habit.category == "meditation") {
            const date = new Date(entry.created_at).toLocaleDateString();
            if (!meditationData[date]) {
                meditationData[date] = 0;
            }
            meditationData[date] += entry.amount;


        }
    }



    const waterChartData = {
        labels: Object.keys(waterData),
        datasets: [{
            label: 'Daily Water Intake',
            data: Object.values(waterData),
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const exerciseChartData = {
        labels: Object.keys(exerciseData),
        datasets: [{
            label: 'Daily Minutes of Exercise',
            data: Object.values(exerciseData),
            backgroundColor: 'rgba(156, 44, 44, 0.5)',
            borderColor: 'rgba(156, 44, 44, 1)',
            borderWidth: 1
        }, {
            label: 'Daily Minutes of Meditation',
            data: Object.values(meditationData),
            backgroundColor: 'rgba(97, 28, 217, 0.5)',
            borderColor: 'rgba(97, 28, 217, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div className="chart">

            <Line data={waterChartData} />


            <Line data={exerciseChartData} />


        </div>
    )

}

export default Charts