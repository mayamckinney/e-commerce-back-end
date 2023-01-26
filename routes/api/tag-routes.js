const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
    // be sure to include its associated Product data
    Tag.findAll({
    include: [{
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then((productDataDb) => res.json(productDataDb))
  .catch((err) => {
    res.status(500).json(err);
  });

});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id
    },
      // be sure to include its associated Product data
      include: [{
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    }]
  })
  .then(productDataDb => {
    if (!productDataDb) {
      res.status(404).json({ message: 'There was no post found with this id.' });
      return;
    }
    res.json(productDataDb);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagDataDb => res.json(tagDataDb))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update({
    tag_name: req.body.tag_name
  }, {
    where: { id: req.params.id }
  })
  .then(tagDataDb => {
    if (!tagDataDb) {
      res.status(404).json({ message: 'There was no post found with that id.' });
      return;
    }
    res.json(tagDataDb);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagDataDb => {
    if (!tagDataDb) {
      res.status(404).json({ message: 'There was no post found with that id.' });
      return;
    }
    res.json(tagDataDb);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
