const express = require("express");
const router = express.Router();
const Listing = require("../Models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listeningController = require("../controller/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });


router
  .route("/")
  //Index Route
  .get(wrapAsync(listeningController.index))
  //create Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listeningController.createListing)
  );
 

//New Route
router.get("/new", isLoggedIn, listeningController.renderNewForm);

router
  .route("/:id")
  //show Route
  .get( wrapAsync(listeningController.showListing))
  //Update Route
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listeningController.updateListing)
  )
  //Delete Route
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listeningController.destroyListing)
  );

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listeningController.editListing)
);

//Search Route
// router.get(
//   "/search",
//   isLoggedIn,
//   wrapAsync(listeningController.searchListing)
// )

module.exports = router;
