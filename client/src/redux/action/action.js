
export const item=(data)=>{
    console.log("action",data)
    return{
        type: "ITEM",
        payload:data
    };
};
