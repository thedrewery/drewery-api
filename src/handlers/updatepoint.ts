import prisma from '../db'

export const getOneUpdatePoint = async (req, res) => {
    const update = await prisma.updatePoint.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({data: update})
}