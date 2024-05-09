import { Fitness } from "../models/fitness.model.js";
import {
    response1AccordingtoBmi,
    response2AccordingtoBmi,
    response3AccordingtoBmi
} from '../utils/fitness.js'


export const FitnessController = async (req, res) => {
    const { age, height, weight, gender, goal } = req.body
    const userId = req.user._id
    try {

        if (!age || !height || !weight || !gender || !goal) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const fitnessDetails = await Fitness.create({
            userId,
            gender,
            age,
            height,
            weight,
            goal
        })

        res.status(201).json({
            success: true,
            message: "Details captured successfully",
            fitnessDetails
        })

    } catch (error) {
        console.log(error);
    }
}


export const getUserFitnessDetails = async (req, res) => {
    const userId = req.user._id
    try {
        const userFitness = await Fitness.find({ userId })
        if (!userFitness) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request"
            })
        }

        res.status(200).json({
            success: true,
            userFitness
        })
    } catch (error) {
        console.log(error);
    }
}


function calculateBMI(weight, height) {
   
    const BMI = weight / ((height * height) / 10000)
    return BMI.toFixed(2)
}


export const GetFitnessSuggetion = async (req, res) => {
    const userId = req.user._id
    try {
        const userFitness = await Fitness.find({ userId })
        const weight = userFitness[0].weight
        const height = userFitness[0].height
        const UserBMI = calculateBMI(weight, height)
        console.log(UserBMI);
        if (UserBMI > 18 && UserBMI < 25) {
            return res.status(200).json({
                fitnessSuggetion: response1AccordingtoBmi
            })
        }
        else if (UserBMI < 18) {
            return res.status(200).json({
                fitnessSuggetion: response2AccordingtoBmi
            })
        }
        else {
            return res.status(200).json({
                fitnessSuggetion: response3AccordingtoBmi
            })
        }
    } catch (error) {
        console.log(error);
    }
}