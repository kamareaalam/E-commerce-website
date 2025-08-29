const Addnewproduct = require('../models/addnewproductmodel');

const filterProducts = async (req, res) => {
  try {
    const filter = {};
    const orConditions = [];

    if (req.query.gender) {
      filter.gender = { $in: req.query.gender.split(',') };
    }

    if (req.query.brand) {
      filter.brand = { $in: req.query.brand.split(',') };
    }
    // console.log("Filter used:", filter);


    if (req.query.size) {
      filter.productsize = { $in: req.query.size.split(',') };
    }

    if (req.query.discount) {
      const discountValues = req.query.discount.split(',').map(Number);
      discountValues.forEach(minDiscount => {
        orConditions.push({ discount: { $gte: minDiscount } });
      });
    }

    if (req.query.category) {
      filter.productcategory = { $in: req.query.category.split(',') };
    }

    if (req.query.color) {
      filter.color = { $in: req.query.color.split(',') };
    }

    if (req.query.bundle) {
      const bundleValues = req.query.bundle.split(',').map(val => new RegExp(`^${val}$`, 'i'));
      filter.bundle = { $in: bundleValues };
    }

    if (req.query.country) {
      filter.country = { $in: req.query.country.split(',') };
    }

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, 'i');
      orConditions.push(
        { productname: { $regex: searchRegex } },
        { brand: { $regex: searchRegex } },
        { productcategory: { $regex: searchRegex } }
      );
    }

    if (orConditions.length > 0) {
      filter.$or = orConditions;
    }

    if (req.query.minPrice && req.query.maxPrice) {
      const min = Number(req.query.minPrice);
      const max = Number(req.query.maxPrice);
      filter.productprice = { $gte: min, $lte: max };
    }

    let sortOption = {};
    switch (req.query.sort) {
      case "Price: Low to High":
        sortOption = { productprice: 1 };
        break;
      case "Price: High to Low":
        sortOption = { productprice: -1 };
        break;
      case "Better Discount":
        sortOption = { discount: -1 };
        break;
      case "What's New":
        sortOption = { createdAt: -1 };
        break;
      case "Popularity":
        sortOption = { createdAt: -1 };
        break;
      case "Customer Rating":
        sortOption = { rating: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const filteredProducts = await Addnewproduct.find(filter).sort(sortOption);

    res.status(200).json({ success: true, products: filteredProducts });
  } catch (error) {
    console.error("Filter Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { filterProducts };
