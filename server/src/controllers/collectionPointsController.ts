import { Request, Response } from 'express'
import knex from '../database/connection'

const create = async (req: Request, res: Response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = req.body;

    const trx = await knex.transaction();

    const collectionPoint = {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        image: 'fa'
    }

    const insertedIds = await trx('collection_points').insert(collectionPoint)

    const pointId = insertedIds[0]

    const pointItems = items.map((itemId: number) => {
        return {
            itemId,
            pointId,
        }
    })
    await trx('collection_point_items').insert(pointItems)

    await trx.commit()

    return res.json({ ...collectionPoint, id: pointId})
}

const show = async (req: Request, res: Response) => {
    const { id } = req.params;

    const collectionPoint = await knex('collection_points').where('id', id).first();

    if(!collectionPoint) {
        return res.status(400).json({message: 'Collection point not found'})
    }

    const items = await knex('items')
        .join('collection_point_items', 'items.id', '=', 'colletion_point_items.item_id')
        .where('collection_point_items.point_id', id)
        .select('items.title')

    return res.json({
        collectionPoint,
        items
    })
}

const index = async (req: Request, res: Response) => {
    const { city, uf, items } = req.query

    const parsedItems = `${items}`.split(',').map(item => {
        parseInt(item.trim(), 10)
    })

    const points = await knex('collection_points')
        .join('collection_points_items', 'collection_points.id', '=', 'collection_point_items.collection_point_id')
        .whereIn('collection_point_items.item_id', parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('collection_points.*')

        return res.json(points)
}

export default {
    create,
    show,
    index,
}