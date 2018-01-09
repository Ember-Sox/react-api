const express = require('express');
const router = express.Router()
const db = require('../db/knex');

router.get('/random', (req, res, next) => {
  db('sayings').then(allSayings => {
    getRandomNumber(allSayings.length)
    .then(id => {
      db('sayings').where('id', id)
      .then(saying => {
        res.status(200).json(saying)
      }).catch(err => {
        res.status(400).json(err)
      })
    })
  })
})

router.post('/new', (req,res,next)=>{
  db('sayings').insert(req.body).returning('*')
  .then(saying =>{
    res.status(201).json(saying)
  })
  .catch(err=>{
    res.status(400).json(err)
  })
})

router.get('/all', (req,res,next)=>{
  db('sayings')
  .then(sayings=>{
    res.status(200).json(sayings)
  })
  .catch(err=>{
    res.status(400).json(err)
  })
})

router.get('/:id', (req, res, next)=>{
	db('sayings').where('id', req.params.id)
		.then(sayings=>{
			res.status(200).json(sayings)
		})
		.catch(err=>{
			res.status(400).json(err)
	})
})

router.put('/:id', (req, res, next)=>{
	db('sayings').where('id', req.params.id).update(req.body)
	.then(sayings=>{
		res.status(200).json(sayings)
	})
	.catch(err=>{
		res.status(400).json(err)
	})
})

function getRandomNumber(num) {
  const myFirstPromise = new Promise((resolve, reject) => {
    resolve(Math.floor(Math.random() * num))
  });
  return myFirstPromise
}

module.exports = router;
