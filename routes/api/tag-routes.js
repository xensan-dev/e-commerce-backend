const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include:[
      {
      model: Product, 
      attributes: ['id', 'product_name' ]
    
    }
  ]
  }).then(tagData => {
    res.json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where:{
      id: req.params.id
    }, 
    include: [
      {
        model: Product, 
        attributes: ['product_name', 'price', 'stock']
      }
    ]
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({message: 'no tag found with this id'});
      return;
    }
    res.json(tagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name,
  }).then(tagData => {
    res.json(tagData)
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  ).then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }
    res.json(tagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }
    res.json(tagData);
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
