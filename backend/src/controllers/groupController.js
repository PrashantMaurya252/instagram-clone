


export const createGroup = async(req,res)=>{
    try {
        const myId = req.id
        const {name,members,description} = req.body

    } catch (error) {
        console.log(error,'create group error')
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

export const updateGroup = async(req,res)=>{
    try {
        const myId = req.id
        const {groupId,name,members,description} = req.body
    } catch (error) {
        console.log(error,'update group error')
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}


export const deleteGroup = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error,'delete group error')
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}

export const getAllGroups = async(req,res)=>{
    try {
        const myId = req.id
    } catch (error) {
        console.log(error,'get all groups error')
        return res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}
