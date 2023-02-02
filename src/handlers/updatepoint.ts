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

export const updateUpdatePoint = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if (!match) {
        res.json({message: "No Match"})
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({data: updatedUpdate})
} 

export const deleteUpdatePoint = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])
}