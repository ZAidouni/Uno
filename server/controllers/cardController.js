const express = require('express')
const createError = require('http-errors')
const mongoose = require('mongoose')

const CardMg = require('../db/mongo/models/cardModel')
const UserMg = require('../db/mongo/models/userModel')

exports.getAll = async (req, res, next) => {
    try {
        const cards = await CardMg.find({})
        res.send(cards)
    } catch (error) {
        console.log(error.message)
    }
}

exports.getAllbutOne = async (req, res, next) => {
    try {
        const { id } = req.params
        const cards = await CardMg.find({ _id: { $ne: id } })
        res.send(cards)
    } catch (error) {
        console.log(error.message)
    }
}

exports.getMostUsed = async (req, res, next) => {
    try {
        const aggregateOptions = [
            { $unwind: '$cardsPlayed' },
            {
                $group: {
                    _id: '$cardsPlayed',
                    count: { $sum: 1 },
                },
            },
            { $sort: { count: -1 } },
            { $limit: 3 },
            {
                $lookup: {
                    from: 'cards',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'cardDetails',
                },
            },
            {
                $unwind: '$cardDetails',
            },
            {
                $project: {
                    _id: 0,
                    cardId: '$_id',
                    card: '$cardDetails',
                    count: 1,
                },
            },
        ]
        const cards = await UserMg.aggregate(aggregateOptions)
        res.send(cards)
    } catch (error) {
        console.log(error.message)
    }
}

exports.create
