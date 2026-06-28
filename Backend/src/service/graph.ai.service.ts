import {StateSchema, MessageValue, StateGraph, START,END} from "@langchain/langgraph"

type JUDGEMENT={
    winner:"solution_1" | "solution_2",
    solution_1_score:Number,
    solution_2_score:Number
}

type AIBATTLESTATE={
    message:typeof MessageValue,
    solution_1:String,
    solution_2:String,
    judgement:JUDGEMENT
}

const state:AIBATTLESTATE={
    message:MessageValue,
    solution_1:"",
    solution_2:"",
    judgement:{
        winner:"solution_1",
        solution_1_score:0,
        solution_2_score:0
    }
}