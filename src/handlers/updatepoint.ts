import prisma from '../db'

export const getOneUpdatePoint = async (req, res) => {
    const updatePoint = await prisma.updatePoint.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({data: updatePoint})
}

//retrieving all updatePoints from a single update from a single product from a user
export const getUserUpdatePoints = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    res.json({data: updates})
}

//creating an update point from a single update from a single product from a user
export const createUpdatePoints = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        return res.json({message: 'nope!'})
    }

    const update = await prisma.update.findUnique({
        where: {
            id: req.body.updateId
        }
    })

    const updatePoint = await prisma.updatePoint.create({
        data: {
            name: req.body.name,
            description: req.body.description,
            updateId: req.body.updateId
        }
    })
    res.json({data: updatePoint})
}